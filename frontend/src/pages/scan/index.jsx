import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { useAddScanMutation, useGetOrdersQuery, useGetScansQuery } from 'state/api';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';
import './index.css';
const columns = [
  {
    field: 'serialNumber',
    headerName: 'serialNumber',
    flex: 0.4,
  },
  {
    field: 'orderId',
    headerName: 'orderId',
    flex: 0.4,
  },
  {
    field: 'customer',
    headerName: 'Customer',
    flex: 0.4,
  },
  {
    field: 'deletionStatus',
    headerName: 'Deletion status',
    flex: 0.4,
  },
];

const Scans = () => {
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    orderId: "",
    serialNumber: "",
  });
  const [scans, setScans] = useState([]);
  const { data: scansData, isLoading, refetch } = useGetScansQuery();
  const { data: orderData, isLoading: orderLoading } = useGetOrdersQuery({
    page: 1
  });

  useEffect(() => {
    refetch();
    if (scansData?.data) {
      const newScans = [];
      for (let index = 0, len = scansData?.data.length; index < len; index++) {
        const scan = scansData?.data[index];
        const customer = scan?.customerInfo?.email || scan?.customerInfo?.name;
        newScans.push({
          ...scan,
          customer,
        })
      }
      setScans(newScans);
    }
  }, [scansData]);

  const [callAddScanAPI, { data, error, isLoading: addLoading }] = useAddScanMutation();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await callAddScanAPI(formData);
  };
  useEffect(() => {
    if (error) {
      setErrorMessage(error?.data?.message)
    } else if (data){
      refetch();
    }
  }, [data, error]);
  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="Scans" />
        <form className="row g-3" onSubmit={handleFormSubmit}>

          {errorMessage && (
            <div className="mt-2 text-center">
              <div style={{ color: 'red', marginTop: '20px' }} role="alert">
                {errorMessage || "An error occurred while adding the order."}
              </div>
            </div>
          )}
          <div className="col-lg-6 col-md-9 col-sm-12 form-input-responsive">
            <label htmlFor="orderId" className="form-label">
              Order Id
            </label>
            <select
              className="form-select"
              id="orderId"
              required
              value={formData.orderId}
              onChange={(e) => {
                setFormData({ ...formData, orderId: e.target.value });
                setErrorMessage('');
              }}
            >
              <option value="" disabled>Select a order id</option>
              {orderLoading ? (
                <option>Loading orders....</option>
              ) : (
                orderData?.data?.orders?.map((order) => (
                  <option key={order._id} value={order._id}>
                    {order._id}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="col-lg-6 col-md-9 col-sm-12 form-input-responsive">
            <label htmlFor="serialNumber" className="form-label">
              Serial Number
            </label>
            <input
              type="number"
              className="form-control"
              id="serialNumber"
              placeholder="Serial Number"
              required
              value={formData.serialNumber}
              onChange={(e) => {
                setFormData({ ...formData, serialNumber: e.target.value });
                setErrorMessage('');
              }}
            />
          </div>
          <div className="text-center" style={{ marginTop: '20px' }}>
            <button type="submit" className="btn" style={{ backgroundColor: '#3498db' }} disabled={isLoading}>
              {addLoading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Add new Scan"
              )}
            </button>
          </div>
        </form>

        <div className='mt-4 pt-2 pb-0'>
          <label>List of Scans</label>
        </div>
        <Box
          mt="40px"
          height="75vh"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: theme.palette.primary.light,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}>
          <DataGrid
            loading={isLoading || !scans}
            getRowId={(row) => row._id}
            rows={scans || []}
            columns={columns}
          />
        </Box>
      </Box>
    </>
  );
};

export default Scans;