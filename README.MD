# 🏥 Pharmacy Module -- Sales & Inventory Management

A full‑stack **Pharmacy Management Module** designed to manage medicine
inventory, track sales transactions, and monitor purchase orders through
a modern dashboard interface.

This project was built as part of a technical assessment and
demonstrates a **RESTful backend architecture with a React frontend**,
real API integration, and modular code organization.

------------------------------------------------------------------------

# 🚀 Live Deployment

**Frontend (Vercel)**\
https://pharmacy-module-three.vercel.app/

**Backend (Render)**\
https://pharmacy-module-jq5b.onrender.com


------------------------------------------------------------------------

# 🧰 Tech Stack

## Frontend

-   React (Vite)
-   TailwindCSS
-   Axios
-   Lucide Icons
-   Responsive UI Components

## Backend

-   FastAPI
-   SQLAlchemy ORM
-   SQLite Database
-   Pydantic Validation

## Deployment

-   Backend: Render
-   Frontend: Vercel

------------------------------------------------------------------------

# 📂 Project Structure

    Pharmacy_Module
    │
    ├── backend
    │   ├── app
    │   │   ├── routers
    │   │   │   ├── inventory.py
    │   │   │   └── dashboard.py
    │   │   │
    │   │   ├── services
    │   │   │   ├── inventory_service.py
    │   │   │   └── dashboard_service.py
    │   │   │
    │   │   ├── models.py
    │   │   ├── schemas.py
    │   │   ├── database.py
    │   │   └── main.py
    │   │
    │   └── requirements.txt
    │
    ├── frontend
    │   ├── src
    │   │   ├── components
    │   │   ├── pages
    │   │   ├── layouts
    │   │   ├── api
    │   │   └── utils
    │
    └── README.md

------------------------------------------------------------------------

# 📊 Features

-   Dashboard analytics for pharmacy performance
-   Medicine inventory management
-   Sales tracking and billing system
-   Purchase order management
-   Inventory search and filtering
-   CSV export for inventory reports
-   Modular backend architecture
-   RESTful API design

------------------------------------------------------------------------

# 🔗 REST API Architecture

The backend follows **RESTful principles**, where endpoints represent
resources and support standard HTTP operations.

Two main API modules:

    /inventory
    /dashboard

------------------------------------------------------------------------

# 📦 Inventory APIs

## List Medicines

    GET /inventory/medicines

Returns all medicines stored in the database.

------------------------------------------------------------------------

## Add Medicine

    POST /inventory/medicines

Example request:

``` json
{
  "name": "Paracetamol",
  "manufacturer": "ABC Pharma",
  "price": 20,
  "quantity": 100,
  "expiry_date": "2027-01-01",
  "status": "Active"
}
```

------------------------------------------------------------------------

## Update Medicine

    PUT /inventory/medicines/{medicine_id}

Updates medicine stock information.

------------------------------------------------------------------------

## Update Medicine Status

    PATCH /inventory/medicines/{medicine_id}/status

Possible statuses:

-   Active
-   Low Stock
-   Expired
-   Out of Stock

------------------------------------------------------------------------

## Search Medicines

    GET /inventory/search?query={medicine_name}

Supports quick medicine lookup when making a sale.

------------------------------------------------------------------------

## Filter Medicines

    GET /inventory/filter?status={status}

Filter examples:

-   Active
-   Low Stock
-   Expired
-   Out of Stock

------------------------------------------------------------------------

# 📈 Inventory Summary API

    GET /inventory/summary

Returns aggregated statistics used for the inventory overview.

Example response:

``` json
{
  "total_items": 20,
  "active_stock": 15,
  "low_stock": 3,
  "total_value": 54000
}
```

Aggregation uses SQL functions:

-   COUNT()
-   SUM()

------------------------------------------------------------------------

# 💊 Sales APIs

## Create Sale

    POST /dashboard/sale

Example request:

``` json
{
  "medicine_id": 1,
  "quantity_sold": 2,
  "patient_name": "John Doe",
  "status": "Completed",
  "total_price": 40
}
```

Each sale record stores:

    medicine_id
    quantity_sold
    patient_name
    status
    total_price
    sale_date

------------------------------------------------------------------------

## Recent Sales

    GET /dashboard/recent-sales

Returns latest sales transactions displayed in the dashboard.

------------------------------------------------------------------------

# 📉 Dashboard Analytics APIs

## Today's Sales Amount

    GET /dashboard/today-sales-amount

Calculates total revenue generated today using:

    SUM(total_price)
    WHERE date(sale_date) = today

------------------------------------------------------------------------

## Today's Sales Count

    GET /dashboard/today-sales-count

Returns the number of sales transactions performed today.

------------------------------------------------------------------------

## Low Stock Count

    GET /dashboard/low-stock-count

Counts medicines where stock level is low.

------------------------------------------------------------------------

## Purchase Orders Count

    GET /dashboard/purchase-orders-count

Returns the number of purchase orders created.

------------------------------------------------------------------------

# 📥 Purchase Order APIs

## Create Purchase Order

    POST /dashboard/purchase-orders

Example request:

``` json
{
  "medicine_name": "Paracetamol",
  "quantity": 200,
  "supplier": "MedSupply Ltd",
  "total_cost": 3000
}
```

Tracks supplier orders for inventory restocking.

------------------------------------------------------------------------

# 🔐 Data Consistency Strategy

The backend ensures reliable data updates using the following
mechanisms.

### Request Validation

All incoming requests are validated using **Pydantic schemas**:

    MedicineCreate
    MedicineUpdate
    SaleCreate
    PurchaseOrderCreate

Invalid inputs are rejected before database operations.

------------------------------------------------------------------------

### Service Layer Architecture

The backend follows a layered architecture:

    routers → handle HTTP requests
    services → implement business logic
    models → define database tables
    schemas → validate requests and responses

This separation improves maintainability and scalability.

------------------------------------------------------------------------

### SQLAlchemy Transactions

Database operations follow a structured pattern:

    db.add()
    db.commit()
    db.refresh()

This ensures atomic writes and consistent database updates.

------------------------------------------------------------------------

### Database Aggregation

Dashboard statistics use SQL aggregate functions:

    COUNT()
    SUM()
    DATE()

These queries run directly in the database to generate real‑time
analytics.

------------------------------------------------------------------------

# ⚙️ Running Locally

### Backend

    cd backend
    pip install -r requirements.txt
    uvicorn app.main:app --reload

Backend runs at:

    http://localhost:8000

API documentation:

    http://localhost:8000/docs

------------------------------------------------------------------------

### Frontend

    cd frontend
    npm install
    npm run dev

Frontend runs at:

    http://localhost:5173

------------------------------------------------------------------------

# 🌐 Deployment

## Backend (Render)

Start command:

    uvicorn app.main:app --host 0.0.0.0 --port 10000

------------------------------------------------------------------------

## Frontend (Vercel)

Environment variable:

    VITE_API_URL=https://your-backend.onrender.com

------------------------------------------------------------------------

# 📜 License

This project is developed for educational and assessment purposes.

------------------------------------------------------------------------

# 👨‍💻 Author

Atharva Ingale
