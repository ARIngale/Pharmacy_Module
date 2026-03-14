from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app.models import Base
from app.routers import inventory, dashboard


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Pharmacy Module API",
    description="Backend API for Pharmacy Dashboard and Inventory",
    version="1.0.0"
)


# CORS configuration (for React frontend)
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Root route
@app.get("/")
def root():
    return {
        "message": "Pharmacy API is running"
    }


# Register Routers
app.include_router(
    inventory.router,
    prefix="/inventory",
    tags=["Inventory"]
)

app.include_router(
    dashboard.router,
    prefix="/dashboard",
    tags=["Dashboard"]
)