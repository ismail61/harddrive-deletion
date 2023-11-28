import React, { useEffect, useState } from "react";
import "./index.css";
import { useCheckDeviceMutation } from "state/api";
import DownloadButton from "./Download/download";

const CustomerView = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    orderId: "",
    authCode: "",
  });
  const [callCheckDeviceAPI, { data: checkData, error, isLoading }] =
    useCheckDeviceMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await callCheckDeviceAPI(formData);
  };
  useEffect(() => {
    if (error) {
      setErrorMessage(error?.data?.message);
    }
  }, [checkData, error]);
  return (
    <>
      <div className="calc container pb-5 mt-5">
        <form className="row g-3" onSubmit={handleFormSubmit}>
          {errorMessage && (
            <div className="mt-2 text-center">
              <div style={{ color: "red", marginTop: "20px" }} role="alert">
                {errorMessage || "An error occurred while adding the order."}
              </div>
            </div>
          )}
          <div className="col-lg-6 col-md-9 col-sm-12 form-input-responsive">
            <label htmlFor="orderId" className="form-label">
              Order ID
            </label>
            <input
              type="text"
              className="form-control"
              id="orderId"
              placeholder="Order Id"
              required
              value={formData.orderId}
              onChange={(e) => {
                setFormData({ ...formData, orderId: e.target.value });
                setErrorMessage("");
              }}
            />
          </div>
          <div className="col-lg-6 col-md-9 col-sm-12 form-input-responsive">
            <label htmlFor="authCode" className="form-label">
              Auth Code
            </label>
            <input
              type="number"
              className="form-control"
              id="authCode"
              placeholder="Auth Code"
              required
              value={formData.authCode}
              onChange={(e) => {
                setFormData({ ...formData, authCode: e.target.value });
                setErrorMessage("");
              }}
            />
          </div>
          <div className="text-center" style={{ marginTop: "25px" }}>
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#3498db", width: "350px" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Check Progress and Details"
              )}
            </button>
          </div>
        </form>
        <div className="text-center mt-5">
          Devices Deletion Progress
          <br />
          {checkData?.data && (
            <progress
              max="100"
              value={
                (checkData?.data?.deletedDevices /
                  (checkData?.data?.totalDevices || 1)) *
                100
              }
              style={{ width: "400px", height: "40px" }}
            ></progress>
          )}
        </div>
      </div>

     
      <div className="container pt-4 pb-4">
      <div className="row pb-4">
          <div className="dbtn">
            <DownloadButton/>
          </div>
        </div>
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "auto",
          }}
        >
          <table style={{ width: "100%" }}>
            <thead>
              <th>Collection Date</th>
              <th>Devices</th>
            </thead>
            <tbody>
              <td>{checkData?.data?.order?.collectionDate?.split("T")[0]}</td>
              <td>{checkData?.data?.order?.devices}</td>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomerView;
