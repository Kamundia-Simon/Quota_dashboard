# main.py

from fastapi import FastAPI
from survey import get_structured_quota
"""
from survey import  get_clean_quota
"""

app = FastAPI()

@app.get("/survey/{survey_id}/quota")
def structured_quota(survey_id: int):
    return get_structured_quota(survey_id)
"""

@app.get("/survey/{survey_id}/quota")
def read_quota(survey_id: int):
    return get_clean_quota(survey_id)
    """