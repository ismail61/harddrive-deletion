import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useGetOrdersQuery } from 'state/api';

const columns = [
  {
    field: '_id',
    headerName: 'ID',
    flex: 0.5,
  },
  {
    field: 'customerId',
    headerName: 'Customer',
    flex: 0.4,
  },
  {
    field: 'devices',
    headerName: 'Devices',
    flex: 0.4,
  },
  {
    field: 'collectionDate',
    headerName: 'Collection Date',
    flex: 0.4,
  },
  {
    field: 'authCode',
    headerName: 'Auth Code',
    flex: 0.4,
  },
];

const Orders = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const { data, isLoading, refetch } = useGetOrdersQuery({
    page: 1
  });

  useEffect(() => {
    refetch();
    if (data?.data?.orders) {
      const newOrders = [];
      for (let index = 0, len = data?.data?.orders.length; index < len; index++) {
        const order = data?.data?.orders[index];
        const customerId = order?.customer?.email || order?.customer?.name || order?.orderId;
        newOrders.push({
          ...order,
          customerId,
          collectionDate: order?.collectionDate?.split('T')[0],
        })
      }
      setOrders(newOrders);
    }
  }, [data]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Orders" />
      <div className='mt-4 pt-2'>
        <button type="button" className="btn" style={{ backgroundColor: '#3498db' }} onClick={() => navigate('/add-order')}>Add Order</button>
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
          loading={isLoading || !orders}
          getRowId={(row) => row._id}
          rows={orders || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Orders;
