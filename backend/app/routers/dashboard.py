from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.services import dashboard_service
from app.schemas import MedicineResponse,PurchaseOrderCreate, PurchaseOrderResponse, SaleCreate, SaleResponse
from app.models import Sale


router = APIRouter()

@router.post("/sale", response_model=SaleResponse)
def create_sale(sale: SaleCreate, db: Session = Depends(get_db)):

    new_sale = Sale(
        medicine_id=sale.medicine_id,
        quantity_sold=sale.quantity_sold,
        patient_name=sale.patient_name,
        status=sale.status,
        total_price=sale.total_price
    )

    db.add(new_sale)
    db.commit()
    db.refresh(new_sale)

    return new_sale


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

@router.get("/low-stock-count")
def get_low_stock_count(db: Session = Depends(get_db)):
    count = dashboard_service.get_low_stock_count(db)

    return {
        "status": "success",
        "data": {
            "low_stock_count": count
        }
    }

@router.get("/purchase-orders-count")
def get_purchase_order_count(db: Session = Depends(get_db)):
    count = dashboard_service.get_purchase_order_count(db)

    return {
        "status": "success",
        "data": {
            "total_orders": count
        }
    }

@router.get("/today-sales-amount")
def get_today_sales_amount(db: Session = Depends(get_db)):
    amount = dashboard_service.get_today_sales_amount(db)

    return {
        "status": "success",
        "data": {
            "today_sales_amount": amount
        }
    }


@router.get("/today-sales-count")
def get_today_sales_count(db: Session = Depends(get_db)):
    count = dashboard_service.get_today_sales_count(db)

    return {
        "status": "success",
        "data": {
            "today_sales_count": count
        }
    }

@router.get("/recent-sales")
def get_recent_sales(db: Session = Depends(get_db)):
    sales = dashboard_service.get_recent_sales(db)

    return {
        "status": "success",
        "data": sales
    }

@router.post("/purchase-orders", response_model=PurchaseOrderResponse)
def create_purchase_order(
    order: PurchaseOrderCreate,
    db: Session = Depends(get_db)
):

    new_order = dashboard_service.create_purchase_order(db, order)

    return new_order
