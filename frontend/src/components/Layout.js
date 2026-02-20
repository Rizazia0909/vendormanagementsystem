import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/dashboard.css";

const Layout = ({ children, title }) => {
    const location = useLocation();

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <nav className="sidebar">
                <div className="sidebar-header">
                    VendorPortal
                </div>
                <ul className="nav-links">
                    <li className="nav-item">
                        <Link
                            to="/dashboard"
                            className={location.pathname === "/dashboard" ? "active" : ""}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/vendors"
                            className={location.pathname === "/vendors" ? "active" : ""}
                        >
                            Vendors
                        </Link>
                    </li>
                    <li className="nav-item" style={{ marginTop: 'auto' }}>
                        <Link to="/" onClick={handleLogout}>Logout</Link>
                    </li>
                </ul>
            </nav>

            {/* Main Content */}
            <main className="main-content">
                <header className="header">
                    <h2>{title}</h2>
                </header>
                <div className="content-area">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
