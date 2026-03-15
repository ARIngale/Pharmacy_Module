import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

// dashourd all counts
export const getTodaySalesAmount = () =>
  API.get("/dashboard/today-sales-amount");

export const getTodaySalesCount = () =>
  API.get("/dashboard/today-sales-count");

export const getLowStockCount = () =>
  API.get("/dashboard/low-stock-count");

export const getPurchaseOrdersCount = () =>
  API.get("/dashboard/purchase-orders-count");


// Sales summary card
export const getSalesSummary = () =>
  API.get("/dashboard/sales-summary");

// Items sold card
export const getItemsSold = () =>
  API.get("/dashboard/items-sold");

// Low stock indicator
export const getLowStock = () =>
  API.get("/dashboard/low-stock");

// Purchase order summary
export const getPurchaseOrders = () =>
  API.get("/dashboard/purchase-orders");

// Recent sales list
export const getRecentSales = () =>
  API.get("/dashboard/recent-sales");

export const createSale = (data) =>
  API.post("/dashboard/sale", data);

export const createPurchaseOrder = (data) =>
  API.post("/dashboard/purchase-orders", data);

// Get all medicines (table)
export const getMedicines = () =>
  API.get("/inventory/medicines");

// Add new medicine
export const addMedicine = (data) =>
  API.post("/inventory/medicines", data);

// Update medicine
export const updateMedicine = (id, data) =>
  API.put(`/inventory/medicines/${id}`, data);

// Search medicines
export const searchMedicines = (query) =>
  API.get(`/inventory/search?query=${query}`);

// Filter medicines
export const filterMedicines = (status) =>
  API.get(`/inventory/filter?status=${status}`);


export const getInventorySummary = () =>
  API.get("/inventory/summary");

export const exportInventory = () =>
  API.get("/inventory/export", { responseType: "blob" });
