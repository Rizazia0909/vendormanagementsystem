import React, { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Dashboard() {
  const [expiringVendors, setExpiringVendors] = useState([]);
  const [totalVendors, setTotalVendors] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expiringRes, allRes] = await Promise.all([
          API.get("/vendors/contracts/expiring"),
          API.get("/vendors")
        ]);
        setExpiringVendors(expiringRes.data);
        setTotalVendors(allRes.data.length);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout title="Dashboard">
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card stat-card">
          <div className="text-muted">Total Vendors</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-color)' }}>{totalVendors}</div>
        </div>
        <div className="card stat-card">
          <div className="text-muted">Active Contracts</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--status-active)' }}>
            {totalVendors - expiringVendors.length}
          </div>
        </div>
        <div className="card stat-card">
          <div className="text-muted">Expiring Soon</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--status-expiring)' }}>{expiringVendors.length}</div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.25rem' }}>⏰</span>
          Contracts Expiring Soon
        </h3>

        {expiringVendors.length === 0 ? (
          <p className="text-muted">No expiring contracts found.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Vendor Name</th>
                  <th>Contract End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {expiringVendors.map((vendor) => (
                  <tr key={vendor._id}>
                    <td><strong>{vendor.name}</strong></td>
                    <td>{new Date(vendor.contractEndDate).toLocaleDateString()}</td>
                    <td>
                      <span className="status-badge expiring-soon">Expiring Soon</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;


