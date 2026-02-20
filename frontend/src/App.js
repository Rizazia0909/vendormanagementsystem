import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import VendorList from "./pages/VendorList";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>

      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendors"
          element={
            <ProtectedRoute>
              <VendorList />
            </ProtectedRoute>
          }
        />

      </Routes>

    </Router>
  );
}

export default App;

