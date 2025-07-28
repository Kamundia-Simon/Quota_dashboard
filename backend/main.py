# main.py

from fastapi import FastAPI
from fastapi_cache import FastAPICache
from models.survey import get_structured_quota
from models.list_surveys import get_running_surveys

from fastapi.middleware.cors import CORSMiddleware
"""
from survey import  get_clean_quota
"""

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

"""Returns stractured JSON data from a particular survey ID"""
@app.get("/surveys/{survey_id}/quota")
def structured_quota(survey_id: int):
    return get_structured_quota(survey_id)

"""Lists all running surveys"""
@app.get("/surveys/")
def list_surveys():
    return get_running_surveys()
"""

@app.get("/survey/{survey_id}/quota")
def read_quota(survey_id: int):
    return get_clean_quota(survey_id)
    """