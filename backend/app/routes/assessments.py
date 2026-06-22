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