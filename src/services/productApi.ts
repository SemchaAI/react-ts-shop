import { IProduct, IType, TProductDTO } from '@/models/products';
import { baseApi } from './api/baseApi';

import {
  PRODUCT_ROUTE,
  PRODUCT_ROUTE_TYPE,
  PRODUCT_TAG,
  TYPE_TAG,
} from '@/app/utils/consts';

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({ selectedType, limit, page, title }) => ({
        url: PRODUCT_ROUTE,
        method: 'GET',
        params: { typeId: selectedType, limit, page, title },
      }),
      providesTags: [PRODUCT_TAG],
    }),
    getTypes: build.query<IType[], null>({
      query: () => ({
        url: PRODUCT_ROUTE_TYPE,
        method: 'GET',
      }),
      providesTags: [TYPE_TAG],
    }),
    getOneProduct: build.query<IProduct, string>({
      query: (id) => ({
        url: `${PRODUCT_ROUTE}/${id}`,
        method: 'GET',
      }),
    }),
    createType: build.mutation<IType, { name: string }>({
      query: (name) => ({
        url: PRODUCT_ROUTE_TYPE,
        method: 'POST',
        body: name,
      }),
      invalidatesTags: [TYPE_TAG],
    }),
    createProduct: build.mutation<IProduct, FormData>({
      query: (body) => {
        return {
          url: PRODUCT_ROUTE,
          method: 'POST',
          // headers: {
          //   'Content-Type': 'multipart/form-data',
          // },
          body,
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetTypesQuery,
  useGetOneProductQuery,
  useCreateTypeMutation,
  useCreateProductMutation,
} = productApi;
