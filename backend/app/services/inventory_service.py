from sqlalchemy.orm import Session
from app.models import Medicine
from app.schemas import MedicineCreate, MedicineUpdate
from datetime import date


LOW_STOCK_THRESHOLD = 20


def calculate_status(quantity: int, expiry_date):
    today = date.today()

    if expiry_date and expiry_date < today:
        return "Expired"

    if quantity == 0:
        return "Out of Stock"

    if quantity < LOW_STOCK_THRESHOLD:
        return "Low Stock"

    return "Active"


#  List medicines
def get_medicines(db: Session):
    return db.query(Medicine).all()


# Add new medicine
def create_medicine(db: Session, medicine: MedicineCreate):
    status = calculate_status(medicine.quantity, medicine.expiry_date)

    new_medicine = Medicine(
        name=medicine.name,
        generic_name=medicine.generic_name,
        category=medicine.category,
        batch_no=medicine.batch_no,
        manufacturer=medicine.manufacturer,
        cost_price = medicine.cost_price,
        price=medicine.price,
        quantity=medicine.quantity,
        expiry_date=medicine.expiry_date,
        status=status
    )

    db.add(new_medicine)
    db.commit()
    db.refresh(new_medicine)

    return new_medicine


# Update medicine
def update_medicine(db: Session, medicine_id: int, medicine_data: MedicineUpdate):
    medicine = db.query(Medicine).filter(Medicine.id == medicine_id).first()

    if not medicine:
        return None

    update_data = medicine_data.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(medicine, key, value)

    # Recalculate status
    medicine.status = calculate_status(
        medicine.quantity,
        medicine.expiry_date
    )

    db.commit()
    db.refresh(medicine)

    return medicine


# Update status manually
def update_medicine_status(db: Session, medicine_id: int, status: str):
    medicine = db.query(Medicine).filter(Medicine.id == medicine_id).first()

    if not medicine:
        return None

    medicine.status = status

    db.commit()
    db.refresh(medicine)

    return medicine


# Search medicines (IMPROVED 🔥)
def search_medicines(db: Session, query: str):
    return db.query(Medicine).filter(
        (Medicine.name.ilike(f"%{query}%")) |
        (Medicine.generic_name.ilike(f"%{query}%"))
    ).all()


# Filter medicines
def filter_medicines(db: Session, status: str):
    if status == "Low Stock":
        return db.query(Medicine).filter(
            Medicine.quantity < LOW_STOCK_THRESHOLD,
            Medicine.quantity > 0
        ).all()

    if status == "Out of Stock":
        return db.query(Medicine).filter(
            Medicine.quantity == 0
        ).all()

    return db.query(Medicine).filter(
        Medicine.status == status
    ).all()


# Get low stock medicines
def get_low_stock_medicines(db: Session):
    return db.query(Medicine).filter(
        Medicine.quantity < LOW_STOCK_THRESHOLD
    ).all()