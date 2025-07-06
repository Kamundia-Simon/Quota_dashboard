import requests
from config import ASKIA_BASE_URL, ASKIA_TOKEN, EXCLUDED


"""
def get_clean_quota(survey_id: int):
    url = f"{ASKIA_BASE_URL}/SurveyTasks/{survey_id}/Quota"
    headers = {
        "Authorization": f"Bearer {ASKIA_TOKEN}"
    }

    response = requests.get(url, headers=headers)
    response.raise_for_status()

    # Just return the full raw JSON from Askia
    return response.json()
"""

def is_valid_label(label: str) -> bool:
    return all(x.lower() not in label.lower() for x in EXCLUDED)


def extract_nested_quota(data: dict) -> dict:
    results = {}

    questions = data.get("Response", {}).get("Questions", [])

    for question in questions:
        q_name = question.get("QuestionShortcut")
        responses = question.get("Responses", [])

        if not q_name or not responses:
            continue

        q_block = {}

        for resp in responses:
            label = resp.get("ResponseShortCaption", "").strip()
            if not is_valid_label(label):
                continue

            min_target = resp.get("MinimumTargetCount", 0)
            max_target = resp.get("MaximumTargetCount", 0)
            completed = resp.get("InterviewsCompletedCount", 0)
            todo = max(0, max_target - completed)

            q_block[label] = {
                "MinTarget": min_target,
                "MaxTarget": max_target,
                "Completed": completed,
                "ToDo": todo,
                "Status": line_state_status(resp.get("LineState")),
                "AllowOverTarget": allow_over_target_text(resp.get("AllowOverQuota"))
            }

        if q_block:
            results[q_name] = q_block

    return results


def allow_over_target_text(code: int) -> str:
    return {
        0: "Never",
        1: "Always",
        2: "Survey routing"
    }.get(code, "Unknown")


def line_state_status(code: int) -> str:
    return {
        4371: "In progress",
        49153: "Minimum reached",
        53523: "In progress",
        32768: "Minimum reached",
        16: "In progress"
    }.get(code, "Unknown")


def get_raw_quota_data(survey_id: int) -> dict:
    url = f"{ASKIA_BASE_URL}/SurveyTasks/{survey_id}/Quota"
    headers = {
        "Authorization": ASKIA_TOKEN
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()

    try:
        return response.json()
    except ValueError:
        raise RuntimeError("Askia API did not return JSON.")

def get_structured_quota(survey_id: int) -> dict:
    raw = get_raw_quota_data(survey_id)
    return extract_nested_quota(raw)
