from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
from pymongo import MongoClient
import os
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

#reads your .env file so Python can access your MongoDB URL
load_dotenv()
#connects your code to MongoDB using that URL
import certifi
cluster = MongoClient(os.getenv("MongoDB_URL"), tlsCAFile=certifi.where())
#creating a database for storage
db = cluster ["AI_Assessment_Assistant"]
#creates a collection for our users
user_collection = db.Users
#creates a collection for our assessments
assessment_collection = db.assessments

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT setup
SECRET_KEY = "OnTrackAI--SecKey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# User schema
class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

#creates a FASTAPI app
OnTrackAI = FastAPI (title = "AI Assessment Assistant")

assessments = []

OnTrackAI.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#creating endpoint that returns a message when our URL is visited indicating it is live
@OnTrackAI.get("/")
def root():
    return {"Message": "AI Assessment Reminder API"}
#creating endpoint that tells the status of our server
@OnTrackAI.get ("/health")
def health():
    return {"Status": "Server is ready to hit"}
#Registration endpoint
@OnTrackAI.post("/register")
def register(user: UserRegister):
    # Checking if email already exists
    existing_user = user_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash the password
    hashed_password = pwd_context.hash(user.password)
    
    # Save user to MongoDB
    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password
    }
    user_collection.insert_one(new_user)
    return {"message": "User registered successfully"}

# Login endpoint
@OnTrackAI.post("/login")
def login(user: UserLogin):
    try:
        existing_user = user_collection.find_one({"email": user.email})
        if not existing_user:
            raise HTTPException(status_code=400, detail="Invalid email or password")
        if not pwd_context.verify(user.password, existing_user["password"]):
            raise HTTPException(status_code=400, detail="Invalid email or password")
        token_data = {"sub": user.email}
        token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
        return {"token": token}
    except HTTPException:
        raise
    except Exception as e:
        return {"error": str(e)}
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
