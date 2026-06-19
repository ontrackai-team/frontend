from pydantic import BaseModel
from datetime import date

class ScheduleCreate(BaseModel):
    title: str
    date: date
    duration: int
    status: str = "pending"