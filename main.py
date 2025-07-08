# main.py

from fastapi import FastAPI
from fastapi_cache import FastAPICache
from backend.survey import get_structured_quota, get_running_surveys
"""
from survey import  get_clean_quota
"""

app = FastAPI()

"""Returns stractured JSON data from a particular survey ID"""
@app.get("/survey/{survey_id}/quota")
def structured_quota(survey_id: int):
    return get_structured_quota(survey_id)

"""Lists all running surveys"""
@app.get("/surveys/running")
def list_surveys():
    return get_running_surveys()
"""

@app.get("/survey/{survey_id}/quota")
def read_quota(survey_id: int):
    return get_clean_quota(survey_id)
    """