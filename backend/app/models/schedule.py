from pydantic import BaseModel
from datetime import date
from typing import Optional

class ScheduleCreate(BaseModel):
    title: str
    date: date
    duration: int
    status: str = "pending"


class ScheduleUpdate(BaseModel):
    title: Optional[str] = None
    date: Optional[date] = None
    duration: Optional[int] = None
    status: Optional[str] = None