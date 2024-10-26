import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa'; // Importing cloud icon

const TOKENS = {
  usdt: { name: "USDT", address: "0xdac17f958d2ee523a2206206994597c13d831ec7" },
  usdc: { name: "USDC", address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" },
  stEth: { name: "stETH", address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84" },
  matic: { name: "MATIC", address: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0" },
};

const Portfolio = ({ userID }) => {
  const [rows, setRows] = useState([{ symbol: "", type: "stock", bought: "", quantity: "" }]);
  const [importOpen, setImportOpen] = useState(false);

  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { symbol: "", type: "stock", bought: "", quantity: "" }]);
  };

  const exportToCSV = () => {
    const csvContent = rows
      .map(row => `${row.symbol},${row.type},${row.bought},${row.quantity}`)
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "portfolio.csv";
    link.click();
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(rows);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "portfolio.json";
    link.click();
  };

  const exportToModel = async () => {
    try {
      await fetch("http://localhost/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: rows }),
      });
      alert("Data sent to model successfully!");
    } catch (error) {
      console.error("Error sending data to model:", error);
      alert("Failed to send data to model.");
    }
  };

  const savePortfolio = async () => {
    try {
      const response = await fetch("http://localhost:5003/api/portfolio/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID, portfolio: rows }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Portfolio saved successfully!");
      } else {
        alert("Failed to save portfolio.");
      }
    } catch (error) {
      console.error("Error saving portfolio:", error);
      alert("An error occurred while saving the portfolio.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#001f3f" }}>Portfolio</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ position: "relative" }}>
          <button onClick={() => setImportOpen(!importOpen)} style={buttonStyle}>Import Profile</button>
          {importOpen && (
            <div style={dropdownStyle}>
              <button onClick={() => alert("Importing from Groww")} style={buttonStyle}>Groww</button>
              <button onClick={() => alert("Importing from Kite")} style={buttonStyle}>Kite</button>
            </div>
          )}
        </div>
      </div>

      {/* Form Table */}
      <div style={{ overflowX: "auto", marginTop: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Symbol</th>
              <th style={tableHeaderStyle}>Type</th>
              <th style={tableHeaderStyle}>Bought Price</th>
              <th style={tableHeaderStyle}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} style={index % 2 ? rowStyle : altRowStyle}>
                <td style={cellStyle}>
                  <input
                    type="text"
                    value={row.symbol}
                    onChange={(e) => handleRowChange(index, "symbol", e.target.value)}
                    placeholder="e.g., USDT or AAPL"
                    style={inputStyle}
                  />
                </td>
                <td style={cellStyle}>
                  <select
                    value={row.type}
                    onChange={(e) => handleRowChange(index, "type", e.target.value)}
                    style={dropdownStyle}
                  >
                    <option value="stock">Stock</option>
                    <option value="token">Token</option>
                  </select>
                </td>
                <td style={cellStyle}>
                  <input
                    type="number"
                    value={row.bought}
                    onChange={(e) => handleRowChange(index, "bought", e.target.value)}
                    placeholder="Bought Price"
                    style={inputStyle}
                  />
                </td>
                <td style={cellStyle}>
                  <input
                    type="number"
                    value={row.quantity}
                    onChange={(e) => handleRowChange(index, "quantity", e.target.value)}
                    placeholder="Quantity"
                    style={inputStyle}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addRow} style={{ ...buttonStyle, marginTop: "10px" }}>Add Row</button>
      </div>

      {/* Export and Save Buttons */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
        <button onClick={exportToCSV} style={buttonStyle}>Export to CSV</button>
        <button onClick={exportToJSON} style={buttonStyle}>Export to JSON</button>
        <button onClick={exportToModel} style={buttonStyle}>Export to Model</button>
        <button onClick={savePortfolio} style={{ ...buttonStyle, display: "flex", alignItems: "center" }}>
          <FaCloudUploadAlt style={{ marginRight: "5px" }} /> Save
        </button>
      </div>
    </div>
  );
};

// Styling
const buttonStyle = {
  padding: "8px 20px",
  backgroundColor: "#001f3f",
  color: "white",
  borderRadius: "20px",
  border: "none",
  cursor: "pointer",
  fontSize: "0.9rem",
  display: "flex",
  alignItems: "center",
};

const dropdownStyle = {
  backgroundColor: "#001f3f",
  color: "white",
  padding: "8px 20px",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "100%",
  right: 0,
  zIndex: 1,
  gap: "10px",
};

const tableHeaderStyle = {
  fontWeight: "bold",
  padding: "12px",
  backgroundColor: "#f2f2f2",
  borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
};

const rowStyle = {
  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
};

const altRowStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.03)",
  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
};

const cellStyle = {
  padding: "10px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "5px",
  backgroundColor: "#f9f9f9",
};

export default Portfolio;
