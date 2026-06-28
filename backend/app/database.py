from pymongo import MongoClient
from app.config import settings

client = MongoClient(settings.MONGODB_URL)

db = client[settings.DATABASE_NAME]

users_collection = db["users"]
profiles_collection = db["profiles"]