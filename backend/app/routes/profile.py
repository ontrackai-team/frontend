from fastapi import APIRouter, Header, HTTPException
from app.database import profiles_collection
from app.utils.deps import get_current_user
from app.utils.json_encoder import clean_mongo
from pydantic import BaseModel

router = APIRouter(prefix="/profile", tags=["Profile"])


# =========================
# Profile Model
# =========================
class ProfileUpdate(BaseModel):
    bio: str = ""
    goal: str = ""
    avatar: str = ""
    level: str = "Beginner"


# =========================
# GET PROFILE
# =========================
@router.get("/")
def get_profile(authorization: str = Header(...)):

    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    profile = profiles_collection.find_one({
        "user_id": user["user_id"]
    })

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return clean_mongo(profile)


# =========================
# UPDATE PROFILE
# =========================
@router.put("/")
def update_profile(
    data: ProfileUpdate,
    authorization: str = Header(...)
):

    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    profiles_collection.update_one(
        {"user_id": user["user_id"]},
        {
            "$set": {
                "bio": data.bio,
                "goal": data.goal,
                "avatar": data.avatar,
                "level": data.level
            }
        }
    )

    profile = profiles_collection.find_one({
        "user_id": user["user_id"]
    })

    return {
        "message": "Profile updated successfully",
        "profile": clean_mongo(profile)
    }