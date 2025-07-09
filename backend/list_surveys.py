import requests
from config import ASKIA_BASE_URL, ASKIA_TOKEN

"""Lists running surveys and key fields"""

def get_running_surveys() -> list:
    url = f"{ASKIA_BASE_URL}/SurveyTasks?status=Running"
    headers = {
        "Authorization": ASKIA_TOKEN
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()

    raw_surveys = response.json().get("Response", [])

    running_summaries = []
    for survey in raw_surveys:
        try:
            summary = {
                "SurveyID": survey.get("Id"),
                "Name": survey.get("Name", "").strip(),
                "Description": survey.get("Description", "").strip(),
                "Completed": survey.get("ObjectState", {}).get("InterviewsCompletedCount", 0),
                "DateCreated": survey.get("DateCreated") or survey.get("DateCreation"),
                "DateModified": survey.get("DateModified") or survey.get("DateModification"),
            }
            """only return if ID and Name are present"""
            if summary["SurveyID"] and summary["Name"]:
                running_summaries.append(summary)
        except Exception as e:
        """log or skip malformed survey entries"""
            continue

    return running_summaries
