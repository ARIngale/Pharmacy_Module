from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.services import dashboard_service
from app.schemas import MedicineResponse, PurchaseOrderResponse


router = APIRouter()


# Get today's sales summary
@router.get("/sales-summary")
def get_today_sales_summary(db: Session = Depends(get_db)):
    summary = dashboard_service.get_today_sales_summary(db)
    return {
        "status": "success",
        "data": summary
    }


# Get total items sold
@router.get("/items-sold")
def get_total_items_sold(db: Session = Depends(get_db)):
    items = dashboard_service.get_total_items_sold(db)
    return {
        "status": "success",
        "data": items
    }


# Get low stock medicines
@router.get("/low-stock", response_model=List[MedicineResponse])
def get_low_stock_items(db: Session = Depends(get_db)):
    medicines = dashboard_service.get_low_stock_items(db)
    return medicines


# Get purchase order summary
@router.get("/purchase-orders")
def get_purchase_order_summary(db: Session = Depends(get_db)):
    summary = dashboard_service.get_purchase_order_summary(db)
    return {
        "status": "success",
        "data": summary
    }