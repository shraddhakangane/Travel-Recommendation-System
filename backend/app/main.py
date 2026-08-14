from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.destination import router as destination_router
from app.api.favorite import router as favorite_router
from app.api.rating import router as rating_router
from app.api.recommendation import router as recommendation_router
from app.api.personalized_recommendation import (
    router as personalized_recommendation_router,
)
from app.api.trip import router as trip_router


app = FastAPI(
    title="Travel Recommendation System API",
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# ROUTERS
# ============================================================

app.include_router(auth_router)
app.include_router(destination_router)
app.include_router(favorite_router)
app.include_router(rating_router)
app.include_router(recommendation_router)
app.include_router(personalized_recommendation_router)
app.include_router(trip_router)


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():
    return {
        "message": "Travel Recommendation System API is running"
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }