import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { useCheckScanQuery } from 'state/api';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';
import './index.css';
const columns = [
  {
    field: 'serialNumber',
    headerName: 'Serial Number',
    flex: 0.4,
  },
  {
    field: 'deletionStatus',
    headerName: 'Deletion Status',
    flex: 0.4,
  },
  {
    field: 'orderId',
    headerName: 'Order Id',
    flex: 0.4,
  },
];

const Check = () => {
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [scanData, setScanData] = useState([]);

  const { data, error, isLoading } = useCheckScanQuery({
    serialNumber,
  });

  useEffect(() => {
  if (scanData && error) {
    setScanData([]);
  } else if (data) {
    setScanData([data?.data]);
  } else if (serialNumber !== '' && error) {
    setErrorMessage(error?.data?.message);
    setScanData([]);
  }
}, [data]);


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Checks" />
      {errorMessage && (
        <div className="mt-2 text-center">
          <div style={{ color: 'red', marginTop: '20px' }} role="alert">
            {errorMessage || "An error occurred while adding the order."}
          </div>
        </div>
      )}
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
          value={serialNumber}
          onChange={(e) => {
            setSerialNumber(e.target.value);
            setErrorMessage('');
            setScanData([]);
          }}
        />
      </div>
      {
        scanData ? <Box
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
            loading={isLoading || !scanData}
            getRowId={(row) => row._id}
            rows={scanData || []}
            columns={columns}
          />
        </Box> : null
      }

    </Box>
  );
};

export default Check;