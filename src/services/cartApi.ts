import { baseApi } from '@/services/api/baseApi';
import {
  CART_ROUTE,
  CART_ROUTE_ADD,
  CART_ROUTE_DELETE,
  CART_TAG,
} from '@/app/utils/consts';

interface IAddOne {
  userId: string;
  productId: string;
}

export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCartProducts: build.query({
      query: (userId: string) => ({
        url: CART_ROUTE,
        params: {
          userId,
        },
      }),
      providesTags: [CART_TAG],
    }),
    addOne: build.mutation({
      query: (body: IAddOne) => ({
        url: CART_ROUTE_ADD,
        method: 'POST',
        body,
      }),
      invalidatesTags: [CART_TAG],
    }),
    deleteOne: build.mutation({
      query: ({ userId, productId }: IAddOne) => ({
        url: CART_ROUTE_DELETE,
        method: 'DELETE',
        body: { userId, productId },
      }),
      invalidatesTags: [CART_TAG],
    }),
  }),
});

export const {
  useGetCartProductsQuery,
  useAddOneMutation,
  useDeleteOneMutation,
} = cartApi;
