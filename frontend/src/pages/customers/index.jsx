import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetCustomersQuery } from 'state/api';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
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

const Customers = () => {
  const { data: customers, isLoading, refetch } = useGetCustomersQuery({
    page: 1
  });

  useEffect(() => {
    refetch();
  }, [customers])
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" />
      <div className='mt-4 pt-2'>
        <button type="button" class="btn" style={{ backgroundColor: '#3498db' }} onClick={() => navigate('/add-customer')}>Add Customer</button>
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
          loading={isLoading || !customers?.data?.customers}
          getRowId={(row) => row._id}
          rows={customers?.data?.customers || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;