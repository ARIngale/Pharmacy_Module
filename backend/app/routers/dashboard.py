from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.services import dashboard_service
from app.schemas import MedicineResponse,PurchaseOrderCreate, PurchaseOrderResponse, SaleCreate, SaleResponse
from app.models import Sale, SaleItem, Medicine

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


@router.post("/sale", response_model=SaleResponse)
def create_sale(data: SaleCreate, db: Session = Depends(get_db)):

    total_price = 0

    # Create Sale (Invoice)
    new_sale = Sale(
        patient_name=data.patient_name,
        payment_method=data.payment_method,
        total_price=0
    )

    db.add(new_sale)
    db.commit()
    db.refresh(new_sale)

    # Add items
    for item in data.items:

        medicine = db.query(Medicine).filter(
            Medicine.id == item.medicine_id
        ).first()

        if not medicine:
            continue

        # ❗ stock validation (important)
        if medicine.quantity < item.quantity:
            raise Exception(f"Not enough stock for {medicine.name}")

        item_total = medicine.price * item.quantity
        total_price += item_total

        # reduce stock
        medicine.quantity -= item.quantity

        sale_item = SaleItem(
            sale_id=new_sale.id,
            medicine_id=item.medicine_id,
            quantity=item.quantity,
            price=medicine.price
        )

        db.add(sale_item)

    # update total
    new_sale.total_price = total_price

    db.commit()
    db.refresh(new_sale)

    return new_sale