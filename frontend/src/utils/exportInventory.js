export function exportInventoryCSV(medicines) {

  if (!medicines || medicines.length === 0) {
    alert("No inventory data available");
    return;
  }

  const headers = [
    "ID",
    "Medicine Name",
    "Generic Name",
    "Category",
    "Batch No",
    "Manufacturer",
    "Cost Price",
    "MRP",
    "Quantity",
    "Stock Value",
    "Expiry Date",
    "Status"
  ];

  const rows = medicines.map(m => {

    const stockValue = (m.cost_price || 0) * (m.quantity || 0);

    return [
      m.id,
      m.name,
      m.generic_name || "-",
      m.category || "-",
      m.batch_no || "-",
      m.manufacturer || "-",
      m.cost_price || 0,
      m.price || 0,
      m.quantity || 0,
      stockValue,
      m.expiry_date
        ? new Date(m.expiry_date).toLocaleDateString()
        : "-",
      m.status
    ];
  });

  // Handle commas properly
  const csvContent =
    [headers, ...rows]
      .map(row =>
        row.map(value => `"${value}"`).join(",")
      )
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "inventory_report.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}