from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from schemas import MedicineCreate, MedicineUpdate, MedicineResponse
from services import inventory_service


router = APIRouter()


# List medicines
@router.get("/medicines", response_model=List[MedicineResponse])
def list_medicines(db: Session = Depends(get_db)):
    medicines = inventory_service.get_medicines(db)
    return medicines


# Add new medicine
@router.post(
    "/medicines",
    response_model=MedicineResponse,
    status_code=status.HTTP_201_CREATED
)
def add_medicine(medicine: MedicineCreate, db: Session = Depends(get_db)):
    return inventory_service.create_medicine(db, medicine)


# Update medicine
@router.put("/medicines/{medicine_id}", response_model=MedicineResponse)
def update_medicine(
    medicine_id: int,
    medicine: MedicineUpdate,
    db: Session = Depends(get_db)
):
    updated = inventory_service.update_medicine(db, medicine_id, medicine)

    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medicine not found"
        )

    return updated


# Mark expired / out-of-stock
@router.patch("/medicines/{medicine_id}/status", response_model=MedicineResponse)
def update_medicine_status(
    medicine_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    updated = inventory_service.update_medicine_status(db, medicine_id, status)

    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medicine not found"
        )

    return updated


# Search medicines
@router.get("/search", response_model=List[MedicineResponse])
def search_medicines(
    query: str = Query(..., description="Search medicine by name"),
    db: Session = Depends(get_db)
):
    return inventory_service.search_medicines(db, query)


# Filter medicines by status
@router.get("/filter", response_model=List[MedicineResponse])
def filter_medicines(
    status: str = Query(..., description="Filter by status"),
    db: Session = Depends(get_db)
):
    return inventory_service.filter_medicines(db, status)