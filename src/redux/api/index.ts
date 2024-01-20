import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsAPI = createApi({
  reducerPath: 'api/products',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    getProductByID: builder.query({
      query: (id) => `/product/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIDQuery } = productsAPI;
