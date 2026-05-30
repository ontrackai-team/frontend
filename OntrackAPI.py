from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
from pymongo import MongoClient
import os

#reads your .env file so Python can access your MongoDB URL
load_dotenv()
#connects your code to MongoDB using that URL
cluster = MongoClient(os.getenv ("MongoDB_URL"))
#creating a database for storage
db = cluster ["AI_Assessment_Assistant"]
#creates a collection for our users
user_collection = db.Users
#creates a collection for our assessments
assessment_collection = db.assessments

#creates a FASTAPI app
OnTrackAI = FastAPI (title = "AI Assessment Assistant")

assessments = []

#creating endpoint that returns a message when our URL is visited indicating it is live
@OnTrackAI.get("/")
def root():
    return {"Message": "AI Assessment Reminder API"}
#creating endpoint that tells the status of our server
@OnTrackAI.get ("/health")
def health():
    return {"Status": "Server is ready to hit"}
#creating endpoint that updates assessment
@OnTrackAI.post ("/assessments")
def create_assessment(assessment: str):
    assessments.append(assessment)
    return assessments
#creating endpoint that finds all assessments
@OnTrackAI.get ("/assessments")
def find_all_assessments():
    return assessments
#creating an endpoint that finds one assessment 
@OnTrackAI.get ("/assessments/{assessment_id}")
def find_one_assessment(assessment_id: int):
    if assessment_id < len(assessments):
        return assessments[assessment_id]
    else:
        raise HTTPException(status_code=404, detail = f"{assessment_id} not found")
#delete assessment endpoint
@OnTrackAI.delete ("/assessments/{assessment_id}")
def delete_assessment(assessment_id: str):
    return assessments
