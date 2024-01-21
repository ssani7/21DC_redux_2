import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsAPI = createApi({
  reducerPath: 'api/products',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  tagTypes: ['comments'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    getProductByID: builder.query({
      query: (id) => `/product/${id}`,
    }),
    getComments: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),
    postComment: builder.mutation({
      query: ({ id, comment }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: { comment },
      }),
      invalidatesTags: ['comments'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIDQuery,
  useGetCommentsQuery,
  usePostCommentMutation,
} = productsAPI;
