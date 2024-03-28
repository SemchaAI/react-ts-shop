import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { CART_TAG, PRODUCT_TAG, TYPE_TAG, USER_TAG } from '@/app/utils/consts';

export const baseApi = createApi({
  tagTypes: [CART_TAG, USER_TAG, PRODUCT_TAG, TYPE_TAG],
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
