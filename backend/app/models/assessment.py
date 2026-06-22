from pydantic import BaseModel
from datetime import date
from typing import Optional

class AssessmentCreate(BaseModel):
    title: str
    subject: str
    due_date: date
    priority: str = "Medium"
    status: str = "Pending"

class AssessmentUpdate(BaseModel):
    title: Optional[str] = None
    subject: Optional[str] = None
    due_date: Optional[date] = None
    priority: Optional[str] = None
    status: Optional[str] = None