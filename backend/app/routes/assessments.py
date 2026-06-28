from fastapi import APIRouter, Header, HTTPException
from bson import ObjectId

from app.database import db
from app.utils.deps import get_current_user
from app.models.assessment import (
    AssessmentCreate,
    AssessmentUpdate
)

router = APIRouter(
    prefix="/assessments",
    tags=["Assessments"]
)

collection = db["assessments"]


# ======================
# CREATE
# ======================
@router.post("/")
def create_assessment(
    assessment: AssessmentCreate,
    authorization: str = Header(...)
):
    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    data = assessment.dict()
    data["user_id"] = user["user_id"]



    result = collection.insert_one(data)

    return {
        "id": str(result.inserted_id)
    }


# ======================
# READ
# ======================
@router.get("/")
def get_assessments(
    authorization: str = Header(...)
):
    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    docs = collection.find({
        "user_id": user["user_id"]
    })

    assessments = []

    for doc in docs:
        assessments.append({
            "id": str(doc["_id"]),
            "title": doc["title"],
            "subject": doc["subject"],
            "due_date": doc["due_date"],
            "priority": doc["priority"],
            "status": doc["status"]
        })

    return assessments


# ======================
# UPDATE
# ======================
@router.put("/{assessment_id}")
def update_assessment(
    assessment_id: str,
    assessment: AssessmentUpdate,
    authorization: str = Header(...)
):
    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    data = assessment.dict(exclude_unset=True)

    if "due_date" in data:
        data["due_date"] = data["due_date"].isoformat()

    result = collection.update_one(
        {
            "_id": ObjectId(assessment_id),
            "user_id": user["user_id"]
        },
        {"$set": data}
    )

    if result.modified_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Assessment not found"
        )

    return {"message": "Updated"}


# ======================
# DELETE
# ======================
@router.delete("/{assessment_id}")
def delete_assessment(
    assessment_id: str,
    authorization: str = Header(...)
):
    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    result = collection.delete_one(
        {
            "_id": ObjectId(assessment_id),
            "user_id": user["user_id"]
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Assessment not found"
        )

    return {"message": "Deleted"}