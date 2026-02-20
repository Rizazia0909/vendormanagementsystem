import React, { useState, useEffect } from "react";

const VendorModal = ({ isOpen, onClose, onSave, vendor }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        contractStartDate: "",
        contractEndDate: "",
    });

    useEffect(() => {
        if (vendor) {
            setFormData({
                name: vendor.name || "",
                email: vendor.email || "",
                contact: vendor.contact || "",
                contractStartDate: vendor.contractStartDate ? vendor.contractStartDate.split('T')[0] : "",
                contractEndDate: vendor.contractEndDate ? vendor.contractEndDate.split('T')[0] : "",
            });
        } else {
            setFormData({
                name: "",
                email: "",
                contact: "",
                contractStartDate: "",
                contractEndDate: "",
            });
        }
    }, [vendor, isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h3>{vendor ? "Edit Vendor" : "Add New Vendor"}</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Vendor Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact Number</label>
                            <input
                                type="text"
                                name="contact"
                                className="form-control"
                                value={formData.contact}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <label>Contract Start</label>
                                <input
                                    type="date"
                                    name="contractStartDate"
                                    className="form-control"
                                    value={formData.contractStartDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col">
                                <label>Contract End</label>
                                <input
                                    type="date"
                                    name="contractEndDate"
                                    className="form-control"
                                    value={formData.contractEndDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {vendor ? "Save Changes" : "Register Vendor"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VendorModal;
