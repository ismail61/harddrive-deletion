import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetCustomersQuery, useGetOrdersQuery } from 'state/api';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const Orders = () => {


  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 0.5,
    },
    {
      field: 'customerId',
      headerName: 'customerId',
      flex: 0.4,
    },
    {
      field: 'devices',
      headerName: 'devices',
      flex: 0.4,
    },
    {
      field: 'collectionDate',
      headerName: 'collectionDate',
      flex: 0.4,
    },
    {
      field: 'authCode',
      headerName: 'authCode',
      flex: 0.4,
    },
   
  ];



  const theme = useTheme();
  const [data,setData]=useState([]);
  
  const [loading,setLoading]=useState(true);
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3001/admin/get-all-orders?page=1', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTYwZTcyZDZlMDNmNGQ3MzQ1YTAxMDIiLCJpYXQiOjE3MDA4NDk1NDAsImV4cCI6MTcwMTQ1NDM0MH0.Luismpm9a67p3SaH-L6-4iFPkMBF8_B94TStF1ai2_M'
      },
    });
      const database = await response.json();
      setData(database.data.orders);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }
  console.log(data);

  useEffect(() => {
    fetchOrders();
    setLoading(false);
  }, []);

  const navigate = useNavigate();


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Orders"/>
       <div className='mt-4 pt-2'>
       <button type="button" class="btn" style={{ backgroundColor: '#3498db' }}  onClick={() => navigate('/addOrder')}>Add Order</button>
       </div>

       <div className='mt-4 pt-2 pb-0'>
        <label>List of Orders</label>
       </div>
      <Box
        mt="10px"
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
          loading={loading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Orders;