from pydantic import BaseModel
from datetime import date, datetime
from typing import List, Optional


# Medicine Schemas

class MedicineBase(BaseModel):
    name: str

    generic_name: Optional[str] = None
    category: Optional[str] = None
    batch_no: Optional[str] = None
    cost_price: Optional[float] = None
    manufacturer: Optional[str]
    price: float
    quantity: int
    expiry_date: Optional[date]


class MedicineCreate(MedicineBase):
    pass


class MedicineUpdate(BaseModel):
    name: Optional[str] = None
    generic_name: Optional[str] = None
    category: Optional[str] = None
    batch_no: Optional[str] = None
    manufacturer: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None
    expiry_date: Optional[date] = None
    status: Optional[str] = None


class MedicineResponse(MedicineBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# Sales Schemas


# SALE ITEM (EACH MEDICINE)
class SaleItemCreate(BaseModel):
    medicine_id: int
    quantity: int


class SaleItemResponse(BaseModel):
    medicine_name: str
    quantity: int
    price: float
    expiry_date: Optional[datetime]

    class Config:
        from_attributes = True


# SALE (INVOICE)
class SaleCreate(BaseModel):
    patient_name: str
    payment_method: str  
    items: List[SaleItemCreate]


class SaleResponse(BaseModel):
    id: int
    patient_name: str
    payment_method: str
    total_price: float
    sale_date: datetime
    items: List[SaleItemResponse]

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
    medicine_name: str
    quantity: int
    supplier: Optional[str]
    total_cost: float


    class Config:
        from_attributes = True