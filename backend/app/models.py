from sqlalchemy import Column, Integer, String, Float, Date, DateTime
from sqlalchemy.sql import func
from app.database import Base


class Medicine(Base):
    __tablename__ = "medicines"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    manufacturer = Column(String, nullable=True)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, default=0)
    expiry_date = Column(Date, nullable=True)
    status = Column(String, default="Active")  
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    medicine_id = Column(Integer, nullable=False)
    quantity_sold = Column(Integer, nullable=False)
    total_price = Column(Float, nullable=False)
    sold_at = Column(DateTime(timezone=True), server_default=func.now())


class PurchaseOrder(Base):
    __tablename__ = "purchase_orders"

    id = Column(Integer, primary_key=True, index=True)
    medicine_name = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    supplier = Column(String, nullable=True)
    total_cost = Column(Float, nullable=False)
    order_date = Column(DateTime(timezone=True), server_default=func.now())