from fastapi import FastAPI
from app.routes.auth import router as auth_router
from app.routes.auth import router as auth_router
from app.routes.schedules import router as schedule_router



app = FastAPI()

app.include_router(auth_router)
app.include_router(auth_router)
app.include_router(schedule_router)

@app.get("/")
def root():
    return {
        "message": "OnTrackAI Backend Running"
    }