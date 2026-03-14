from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional


# Medicine Schemas

class MedicineBase(BaseModel):
    name: str
    manufacturer: Optional[str]
    price: float
    quantity: int
    expiry_date: Optional[date]


class MedicineCreate(MedicineBase):
    pass


class MedicineUpdate(BaseModel):
    name: Optional[str]
    manufacturer: Optional[str]
    price: Optional[float]
    quantity: Optional[int]
    expiry_date: Optional[date]
    status: Optional[str]


class MedicineResponse(MedicineBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# Sales Schemas

class SaleCreate(BaseModel):
    medicine_id: int
    quantity_sold: int
    total_price: float


class SaleResponse(SaleCreate):
    id: int
    sold_at: datetime

    class Config:
        from_attributes = True


# Purchase Order Schemas

class PurchaseOrderCreate(BaseModel):
    medicine_name: str
    quantity: int
    supplier: Optional[str]
    total_cost: float


class PurchaseOrderResponse(PurchaseOrderCreate):
    id: int
    order_date: datetime

    class Config:
        from_attributes = True