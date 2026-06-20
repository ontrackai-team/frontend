from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.routes.schedules import router as schedule_router

app = FastAPI(title="OnTrackAI API")

# 🌍 Frontend URLs (Vercel + local dev)
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://frontend-black-kappa-17.vercel.app"
]

# 🔐 CORS Middleware (IMPORTANT for frontend-backend communication)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📦 Routers
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(schedule_router, prefix="/schedules", tags=["Schedules"])

# 🏠 Health check
@app.get("/")
def root():
    return {
        "message": "OnTrackAI Backend Running 🚀"
    }