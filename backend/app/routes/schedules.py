from fastapi import APIRouter, Depends, Header
from app.models.schedule import ScheduleCreate
from app.database import db

from app.utils.deps import get_current_user

router = APIRouter(
    prefix="/schedules",
    tags=["Schedules"]
)

schedules_collection = db["schedules"]



@router.get("/")
def get_schedules(
    authorization: str = Header(...)
):

    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    schedules = schedules_collection.find(
        {"user_id": user["user_id"]}
    )

    result = []

    for s in schedules:
        s["_id"] = str(s["_id"])
        result.append(s)

    return result


@router.post("/")
def create_schedule(schedule: ScheduleCreate):

    result = schedules_collection.insert_one(
        schedule.dict()
    )

    return {
        "message": "Schedule created",
        "id": str(result.inserted_id)
    }
# CREATE schedule (JWT protected)
@router.post("/")
def create_schedule(
    schedule: ScheduleCreate,
    authorization: str = Header(...)
):

    token = authorization.replace("Bearer ", "")

    user = get_current_user(token)

    data = schedule.dict()
    data["user_id"] = user["user_id"]

    result = schedules_collection.insert_one(data)

    return {
        "id": str(result.inserted_id)
    }