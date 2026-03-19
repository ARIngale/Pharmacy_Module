from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

# MEDICINE TABLE

class Medicine(Base):
    __tablename__ = "medicines"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    generic_name = Column(String, nullable=True)
    category = Column(String, nullable=True)
    batch_no = Column(String, nullable=True)
    cost_price = Column(Float, nullable=True)
    manufacturer = Column(String, nullable=True)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, default=0)
    expiry_date = Column(Date, nullable=True)
    status = Column(String, default="Active")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # 🔗 relationship
    sale_items = relationship("SaleItem", back_populates="medicine")


# SALE (INVOICE)

class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)

    patient_name = Column(String, nullable=True)

    payment_method = Column(String, default="Cash")  # 🆕 NEW

    total_price = Column(Float)

    sale_date = Column(DateTime, server_default=func.now())

    items = relationship("SaleItem", back_populates="sale", cascade="all, delete")


# SALE ITEMS (MULTIPLE ITEMS PER SALE)

class SaleItem(Base):
    __tablename__ = "sale_items"

    id = Column(Integer, primary_key=True, index=True)
    sale_id = Column(Integer, ForeignKey("sales.id"))
    medicine_id = Column(Integer, ForeignKey("medicines.id"))
    quantity = Column(Integer)
    price = Column(Float)

    sale = relationship("Sale", back_populates="items")
    medicine = relationship("Medicine", back_populates="sale_items")

    # ✅ ADD THESE
    @property
    def medicine_name(self):
        return self.medicine.name if self.medicine else None

    @property
    def expiry_date(self):
        return self.medicine.expiry_date if self.medicine else None


# PURCHASE ORDERS

class PurchaseOrder(Base):
    __tablename__ = "purchase_orders"

    id = Column(Integer, primary_key=True, index=True)
    medicine_name = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    supplier = Column(String, nullable=True)
    total_cost = Column(Float, nullable=False)
    order_date = Column(DateTime(timezone=True), server_default=func.now())