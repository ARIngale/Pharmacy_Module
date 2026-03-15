export function exportInventoryCSV(medicines) {

  if (!medicines || medicines.length === 0) {
    alert("No inventory data available");
    return;
  }

  const headers = [
    "ID",
    "Name",
    "Manufacturer",
    "Price",
    "Quantity",
    "Expiry Date",
    "Status"
  ];

  const rows = medicines.map(m => [
    m.id,
    m.name,
    m.manufacturer,
    m.price,
    m.quantity,
    m.expiry_date,
    m.status
  ]);

  const csvContent =
    [headers, ...rows]
      .map(row => row.join(","))
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
