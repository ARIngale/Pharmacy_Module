from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel
from typing import Optional
from datetime import date

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
    name: Optional[str] = None
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

class SaleCreate(BaseModel):
    medicine_id: int
    quantity_sold: int
    patient_name: str
    status: str
    total_price: float
    sale_date: Optional[datetime] = None


class SaleResponse(BaseModel):
    id: int
    medicine_id: int
    quantity_sold: int
    patient_name: str
    status: str
    total_price: float
    sale_date: datetime

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