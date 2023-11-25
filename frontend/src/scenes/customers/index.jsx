import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetCustomersQuery } from 'state/api';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AddCustomer from 'scenes/addCustomer';
const Customers = () => {
  const theme = useTheme();
  
  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 0.5,
    },
    {
      field: 'company',
      headerName: 'Company',
      flex: 0.4,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.4,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 0.4,
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 0.4,
    },
   
  ];

  const navigate = useNavigate();

  const [data,setData]=useState([]);
  
  const [loading,setLoading]=useState(true);
  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:3001/admin/get-all-customers?page=1', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTYwZTcyZDZlMDNmNGQ3MzQ1YTAxMDIiLCJpYXQiOjE3MDA4NDk1NDAsImV4cCI6MTcwMTQ1NDM0MH0.Luismpm9a67p3SaH-L6-4iFPkMBF8_B94TStF1ai2_M'
      },
    });
      const database = await response.json();
      setData(database.data.customers);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }
  console.log()

  useEffect(() => {
    fetchCustomers();
    setLoading(false);
  }, []);


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS"/>
       <div className='mt-4 pt-2'>
       <button type="button" class="btn" style={{ backgroundColor: '#3498db' }}  onClick={() => navigate('/addCustomer')}>Add Customer</button>
       </div>
       <div className='mt-4 pt-2 pb-0'>
        <label>List of Customers</label>
       </div>
      <Box
        mt="20px"
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

export default Customers;