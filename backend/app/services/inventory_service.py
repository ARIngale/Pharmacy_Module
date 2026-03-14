from sqlalchemy.orm import Session
from models import Medicine
from schemas import MedicineCreate, MedicineUpdate
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


# List medicines
def get_medicines(db: Session):
    return db.query(Medicine).all()


# Add new medicine
def create_medicine(db: Session, medicine: MedicineCreate):
    status = calculate_status(medicine.quantity, medicine.expiry_date)

    new_medicine = Medicine(
        name=medicine.name,
        manufacturer=medicine.manufacturer,
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

    medicine.status = calculate_status(
        medicine.quantity,
        medicine.expiry_date
    )

    db.commit()
    db.refresh(medicine)

    return medicine


# Mark expired or out-of-stock
def update_medicine_status(db: Session, medicine_id: int, status: str):
    medicine = db.query(Medicine).filter(Medicine.id == medicine_id).first()

    if not medicine:
        return None

    medicine.status = status

    db.commit()
    db.refresh(medicine)

    return medicine


# Search medicines by name
def search_medicines(db: Session, query: str):
    return db.query(Medicine).filter(
        Medicine.name.ilike(f"%{query}%")
    ).all()


# Filter medicines by status
def filter_medicines(db: Session, status: str):
    return db.query(Medicine).filter(
        Medicine.status == status
    ).all()


# Get low stock medicines
def get_low_stock_medicines(db: Session):
    return db.query(Medicine).filter(
        Medicine.quantity < LOW_STOCK_THRESHOLD
    ).all()