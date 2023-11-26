import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCustomersQuery, useAddOrderMutation } from "state/api";

const AddCustomer = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerId: "",
    devices: "",
    collectionDate: "",
  });

  const [callAddOrderAPI, { data, error, isLoading }] = useAddOrderMutation();
  const { data: customersData, isLoading: customersLoading } = useGetCustomersQuery({
    page: 1,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await callAddOrderAPI(formData);
  };

  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const currentDateFormatted = `${year}-${month}-${day}`;
    setCurrentDate(currentDateFormatted);
  }, []);

  useEffect(() => {
    if (error) {
      setErrorMessage(error?.data?.message)
    } else if (data) {
      navigate('/orders');
    }
  }, [data, error, navigate]);

  return (
    <div className="container m-2">
      <form className="row g-3" onSubmit={handleFormSubmit}>
        {errorMessage && (
          <div className="mt-2 text-center">
            <div style={{ color: 'red', marginTop: '20px' }} role="alert">
              {errorMessage || "An error occurred while adding the order."}
            </div>
          </div>
        )}

        <div className="col-lg-6 col-md-9 col-sm-12 form-input-responsive">
          <label htmlFor="customerId" className="form-label">
            Customer
          </label>
          <select
            className="form-select"
            id="customerId"
            required
            value={formData.customerId}
            onChange={(e) => {
              setFormData({ ...formData, customerId: e.target.value });
              setErrorMessage('');
            }}
          >
            <option value="" disabled>Select a customer</option>
            {customersLoading ? (
              <option>Loading customers...</option>
            ) : (
              customersData?.data?.customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.email}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="col-lg-6 col-md-9 col-sm-12 form-input-responsive">
          <label htmlFor="devices" className="form-label">
            Devices
          </label>
          <input
            type="number"
            className="form-control"
            id="devices"
            placeholder="Devices"
            required
            value={formData.devices}
            onChange={(e) => {
              setFormData({ ...formData, devices: e.target.value });
              setErrorMessage('');
            }}
          />
        </div>

        <div className="col-lg-6 col-md-9 col-sm-12 form-input-responsive">
          <label htmlFor="inputAddress" className="form-label">
            Collection Date
          </label>
          <input
            type="date"
            className="form-control"
            id="inputAddress"
            min={currentDate}
            required
            value={formData.collectionDate}
            onChange={(e) => {
              setFormData({ ...formData, collectionDate: e.target.value });
              setErrorMessage('');
            }}
          />
        </div>

        <div className="col-12 text-center" style={{ marginTop: '50px' }}>
          <button type="submit" className="btn" style={{ backgroundColor: '#3498db' }} disabled={isLoading}>
            {isLoading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Add new order"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
