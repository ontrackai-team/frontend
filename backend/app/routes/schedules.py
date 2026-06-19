from fastapi import APIRouter
from app.models.schedule import ScheduleCreate
from app.database import db

router = APIRouter(
    prefix="/schedules",
    tags=["Schedules"]
)

schedules_collection = db["schedules"]

@router.post("/")
def create_schedule(schedule: ScheduleCreate):

    result = schedules_collection.insert_one(
        schedule.dict()
    )

    return {
        "message": "Schedule created",
        "id": str(result.inserted_id)
    }


@router.get("/")
def get_schedules():

    schedules = []

    for schedule in schedules_collection.find():
        schedule["_id"] = str(schedule["_id"])
        schedules.append(schedule)

    return schedules