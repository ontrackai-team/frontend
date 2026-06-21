from fastapi import APIRouter, Header, HTTPException
from app.models.schedule import ScheduleCreate, ScheduleUpdate
from app.database import db
from app.utils.deps import get_current_user
from bson import ObjectId

router = APIRouter(prefix="/schedules", tags=["Schedules"])

schedules_collection = db["schedules"]

# =========================
# CREATE
# =========================
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
        "id": str(result.inserted_id),
        "message": "Schedule created"
    }


# =========================
# READ ALL
# =========================
@router.get("/")
def get_schedules(authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    schedules = schedules_collection.find(
        {"user_id": user["user_id"]}
    )

    result = []

    for s in schedules:
        result.append({
            "id": str(s["_id"]),
            "title": s["title"],
            "date": s["date"],
            "duration": s["duration"],
            "status": s["status"]
        })

    return result


# =========================
# UPDATE
# =========================
@router.put("/{schedule_id}")
def update_schedule(
    schedule_id: str,
    schedule: ScheduleUpdate,
    authorization: str = Header(...)
):
    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    updated = schedules_collection.update_one(
        {
            "_id": ObjectId(schedule_id),
            "user_id": user["user_id"]
        },
        {"$set": schedule.dict(exclude_unset=True)}
    )

    if updated.modified_count == 0:
        raise HTTPException(status_code=404, detail="Schedule not found")

    return {"message": "Schedule updated"}


# =========================
# DELETE
# =========================
@router.delete("/{schedule_id}")
def delete_schedule(
    schedule_id: str,
    authorization: str = Header(...)
):
    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    deleted = schedules_collection.delete_one(
        {
            "_id": ObjectId(schedule_id),
            "user_id": user["user_id"]
        }
    )

    if deleted.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Schedule not found")

    return {"message": "Schedule deleted"}