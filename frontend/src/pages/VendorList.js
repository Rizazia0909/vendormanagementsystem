import React, { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import VendorModal from "../components/VendorModal";

function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const res = await API.get("/vendors");
      setVendors(res.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleCreate = async (formData) => {
    try {
      await API.post("/vendors", formData);
      fetchVendors();
      setIsModalOpen(false);
    } catch (error) {
      alert("Error saving vendor");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await API.put(`/vendors/${selectedVendor._id}`, formData);
      fetchVendors();
      setIsModalOpen(false);
      setSelectedVendor(null);
    } catch (error) {
      alert("Error updating vendor");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      try {
        await API.delete(`/vendors/${id}`);
        fetchVendors();
      } catch (error) {
        alert("Error deleting vendor");
      }
    }
  };

  const openAddModal = () => {
    setSelectedVendor(null);
    setIsModalOpen(true);
  };

  const openEditModal = (vendor) => {
    setSelectedVendor(vendor);
    setIsModalOpen(true);
  };

  return (
    <Layout title="Vendors">
      <div className="header" style={{ marginBottom: "2rem" }}>
        <p className="text-muted">Manage your organization's vendors and their contract status.</p>
        <button className="btn btn-primary" onClick={openAddModal}>
          + Add Vendor
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Vendor Name</th>
                  <th>Contact</th>
                  <th>Contract Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr key={v._id}>
                    <td>
                      <strong>{v.name}</strong>
                      <div className="text-muted" style={{ fontSize: "0.75rem" }}>{v.email}</div>
                    </td>
                    <td>{v.contact || "N/A"}</td>
                    <td>
                      <span className={`status-badge ${v.contractStatus?.toLowerCase()?.replace(" ", "-")}`}>
                        {v.contractStatus}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                        <button className="btn btn-sm" onClick={() => openEditModal(v)} style={{ background: "#f1f5f9" }}>
                          Edit
                        </button>
                        <button className="btn btn-sm" onClick={() => handleDelete(v._id)} style={{ color: "var(--status-expired)", background: "var(--status-expired-bg)" }}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {vendors.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", padding: "3rem" }}>
                      <div className="text-muted">No vendors found. Start by adding one.</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <VendorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={selectedVendor ? handleUpdate : handleCreate}
        vendor={selectedVendor}
      />
    </Layout>
  );
}

export default VendorList;



