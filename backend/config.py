"""This file contains the base url and Askia's WEBAPI token"""
import os
from dotenv import load_dotenv

load_dotenv()

ASKIA_BASE_URL = os.getenv("ASKIA_BASE_URL")
ASKIA_TOKEN = os.getenv("ASKIA_TOKEN")
EXCLUDED = ["DK/NA", "Invalid"]  
""", "Unknown", "Not answered", "Other"(will explore validity of having the following here)"""