import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: ' http://localhost:3001' }),
    reducerPath: 'adminApi',
    tagTypes: ['User', 'Customers', 'Orders'],
    endpoints: (builder) => ({

        getUsers: builder.query({
            query: (id) => `general/user/${id}`,
            providesTags: ['User'],
        }),
        getCustomers: builder.query({
            query: () => `client/customers`,
            providesTags: ['Customers'],
        }),
        getOrders: builder.query({
            query: () => `client/orders`,
            providesTags: ['Orders'],
        }),
    }),
});

export const { useGetUsersQuery, useGetCustomersQuery, useGetOrdersQuery } = apiSlice;