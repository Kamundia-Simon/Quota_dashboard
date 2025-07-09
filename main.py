# main.py

from fastapi import FastAPI
from fastapi_cache import FastAPICache
from backend.survey import get_structured_quota
from backend.list_surveys import get_running_surveys

from fastapi.middleware.cors import CORSMiddleware
"""
from survey import  get_clean_quota
"""

app = FastAPI()
# 👇 Allow frontend (on localhost:5173) to access backend (on localhost:8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL (adjust if needed)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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