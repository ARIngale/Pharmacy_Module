from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date

from app.models import Sale, Medicine, PurchaseOrder


# Get today's sales summary
def get_today_sales_summary(db: Session):
    today = date.today()

    total_sales = db.query(
        func.sum(Sale.total_price)
    ).filter(
        func.date(Sale.sold_at) == today
    ).scalar()

    total_transactions = db.query(
        func.count(Sale.id)
    ).filter(
        func.date(Sale.sold_at) == today
    ).scalar()

    return {
        "date": str(today),
        "total_sales": total_sales or 0,
        "transactions": total_transactions or 0
    }


# Get total items sold today
def get_total_items_sold(db: Session):
    today = date.today()

    total_items = db.query(
        func.sum(Sale.quantity_sold)
    ).filter(
        func.date(Sale.sold_at) == today
    ).scalar()

    return {
        "date": str(today),
        "total_items_sold": total_items or 0
    }


# Get low stock medicines
def get_low_stock_items(db: Session, threshold: int = 20):
    medicines = db.query(Medicine).filter(
        Medicine.quantity < threshold
    ).all()

    return medicines


# Get purchase order summary
def get_purchase_order_summary(db: Session):
    total_orders = db.query(
        func.count(PurchaseOrder.id)
    ).scalar()

    total_spent = db.query(
        func.sum(PurchaseOrder.total_cost)
    ).scalar()

    latest_orders = db.query(PurchaseOrder).order_by(
        PurchaseOrder.order_date.desc()
    ).limit(5).all()

    return {
        "total_orders": total_orders or 0,
        "total_spent": total_spent or 0,
        "recent_orders": latest_orders
    }

# Low stock count
def get_low_stock_count(db: Session):
    return db.query(Medicine).filter(
        Medicine.status == "Low Stock"
    ).count()


# Purchase order count
def get_purchase_order_count(db: Session):
    return db.query(PurchaseOrder).count()


# Recent sales
def get_recent_sales(db: Session):
    return (
        db.query(Sale)
        .order_by(Sale.sale_date.desc())
        .limit(5)
        .all()
    )

# Today's total sales amount
def get_today_sales_amount(db: Session):
    today = date.today()

    total = db.query(func.sum(Sale.total_price)).filter(
        func.date(Sale.sale_date) == today
    ).scalar()

    return total or 0


# Today's sales transaction count
def get_today_sales_count(db: Session):
    today = date.today()

    count = db.query(Sale).filter(
        func.date(Sale.sale_date) == today
    ).count()

    return count


def get_recent_sales(db: Session, limit: int = 5):
    sales = (
        db.query(Sale)
        .order_by(Sale.sale_date.desc())
        .limit(limit)
        .all()
    )

    return sales

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
