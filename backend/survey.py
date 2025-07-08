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
"""filter out sytem responses such as DK/NA, Invalid"""
"""Get list of running surveys"""
def get_running_surveys():
    url = f"{ASKIA_BASE_URL}/SurveyTasks?status=Running"
    headers = {
        "Authorization": ASKIA_TOKEN
    }

    response = requests.get(url, headers=headers)
    response.raise_for_status()

    return response.json()

def is_valid_label(label: str) -> bool:
    return all(x.lower() not in label.lower() for x in EXCLUDED)

"""Converting numerical codes for AllowOverQuota to human readable txt"""
def allow_over_target_text(code: int) -> str:
    return {
        0: "Survey routing",
        1: "Agent decides",
        2: "Never",
        3: "Always"
    }.get(code, "Unknown")

"""Converting numerical LineState codes to human readable txt"""
def line_state_status(code: int) -> str:
    return {
        4371: "In progress",
        49153: "Minimum reached",
        53523: "In progress",
        32768: "Minimum reached",
        16: "In progress"
    }.get(code, "Unknown")

"""Recursive function to parse all the quota questions and suquestion"""
def parse_question_shortcut(question_list: list) -> dict:
    result = {}

    """Loops through each quota question"""
    for question in question_list:
        q_name = question.get("QuestionShortcut", "").strip()
        if not q_name:
            continue

        q_block = {}

        """Loop through each responsein current question"""
        for resp in question.get("Responses", []):
            label = resp.get("ResponseShortCaption", "").strip()
            if not is_valid_label(label):
                continue

            # Extract metrics for this response label
            entry = {
                "MinTarget": resp.get("MinimumTargetCount", 0),
                "MaxTarget": resp.get("MaximumTargetCount", 0),
                "Completed": resp.get("InterviewsCompletedCount", 0),
                "ToDo": max(0, resp.get("MaximumTargetCount", 0) - resp.get("InterviewsCompletedCount", 0)),
                "Status": line_state_status(resp.get("LineState")),
                "AllowOverTarget": allow_over_target_text(resp.get("AllowOverQuota"))
            }
            """recursively process sub-quotas inside each response"""
            sub_questions = resp.get("Questions", [])
            if sub_questions:
                entry["SubQuotas"] = parse_question_shortcut(sub_questions)

            q_block[label] = entry

        if q_block:
            result[q_name] = q_block

    return result

"""function to extract quota data into structured format"""
def extract_nested_quota(data: dict) -> dict:
    root_questions = data.get("Response", {}).get("Questions", [])
    return parse_question_shortcut(root_questions)

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
