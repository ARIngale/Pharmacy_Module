from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date

from app.models import Sale, Medicine, PurchaseOrder, SaleItem


# TODAY SALES SUMMARY

def get_today_sales_summary(db: Session):
    today = date.today()

    total_sales = db.query(
        func.sum(Sale.total_price)
    ).filter(
        func.date(Sale.sale_date) == today
    ).scalar()

    total_transactions = db.query(
        func.count(Sale.id)
    ).filter(
        func.date(Sale.sale_date) == today
    ).scalar()

    return {
        "date": str(today),
        "total_sales": total_sales or 0,
        "transactions": total_transactions or 0
    }


# TOTAL ITEMS SOLD TODAY
def get_total_items_sold(db: Session):
    today = date.today()

    total_items = db.query(
        func.sum(SaleItem.quantity)
    ).join(Sale).filter(
        func.date(Sale.sale_date) == today
    ).scalar()

    return {
        "date": str(today),
        "total_items_sold": total_items or 0
    }


# LOW STOCK MEDICINES
def get_low_stock_items(db: Session, threshold: int = 20):
    return db.query(Medicine).filter(
        Medicine.quantity < threshold
    ).all()


# PURCHASE ORDER SUMMARY
def get_purchase_order_summary(db: Session):
    total_orders = db.query(func.count(PurchaseOrder.id)).scalar()

    total_spent = db.query(func.sum(PurchaseOrder.total_cost)).scalar()

    latest_orders = db.query(PurchaseOrder)\
        .order_by(PurchaseOrder.order_date.desc())\
        .limit(5).all()

    return {
        "total_orders": total_orders or 0,
        "total_spent": total_spent or 0,
        "recent_orders": latest_orders
    }


# LOW STOCK COUNT
def get_low_stock_count(db: Session):
    return db.query(Medicine).filter(
        Medicine.status == "Low Stock"
    ).count()


# PURCHASE ORDER COUNT
def get_purchase_order_count(db: Session):
    return db.query(PurchaseOrder).count()


# TODAY SALES AMOUNT
def get_today_sales_amount(db: Session):
    today = date.today()

    total = db.query(func.sum(Sale.total_price)).filter(
        func.date(Sale.sale_date) == today
    ).scalar()

    return total or 0


# TODAY SALES COUNT
def get_today_sales_count(db: Session):
    today = date.today()

    return db.query(Sale).filter(
        func.date(Sale.sale_date) == today
    ).count()


# RECENT SALES (WITH ITEMS 🔥)
def get_recent_sales(db: Session, limit: int = 5):

    sales = db.query(Sale)\
        .order_by(Sale.sale_date.desc())\
        .limit(limit)\
        .all()

    result = []

    for sale in sales:

        items = []
        for item in sale.items:
            items.append({
                "medicine_name": item.medicine.name,
                "quantity": item.quantity,
                "price": item.price,
                "expiry_date": item.medicine.expiry_date
            })

        result.append({
            "id": sale.id,
            "patient_name": sale.patient_name,
            "payment_method": sale.payment_method,
            "total_price": sale.total_price,
            "sale_date": sale.sale_date,
            "items": items
        })

    return result


# CREATE PURCHASE ORDER
def create_purchase_order(db: Session, order):

    new_order = PurchaseOrder(
        medicine_name=order.medicine_name,
        quantity=order.quantity,
        supplier=order.supplier,
        total_cost=order.total_cost
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return new_order