import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetCustomersQuery, useGetOrdersQuery } from 'state/api';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';
import './index.css';
const Check= () => {
  const theme = useTheme();
  const { data, isLoading } = useGetOrdersQuery();

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 0.5,
    },
    {
      field: 'serialNumber',
      headerName: 'serialNumber',
      flex: 0.4,
    },
    {
      field: 'deletion State',
      headerName: 'deletion State',
      flex: 0.4,
    },
    {
      field: 'orderNumber',
      headerName: 'orderNumber',
      flex: 0.4,
    },
  ];

    //this is for order result
    const [orderinput, setOrderinput] = useState("");
    const [orderResult, setOrderResult] = useState("");
  
    const handleInputChange = (event) => {
      const value = event.target.value;
      setOrderinput(value);
      const calculatedResult = value ? Math.pow(parseFloat(value), 2) : "";
      setOrderResult(calculatedResult);
    };


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Checks" />
     
        <div className="">
          <label>
            Devices Check
            <input
              type="number"
              value={orderinput}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>Devices Deletion Progress: {orderResult}</div>
      <div className='mt-4 pt-2 pb-0'>
        <label>List of Checks</label>
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
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Check;