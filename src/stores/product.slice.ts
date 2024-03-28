import { IProduct, IType } from '@/models/products';
import { productApi } from '@/services/productApi';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface IProductSlice {
  products: IProduct[];
  brands: IType[];
  types: IType[];
  selectedType: { _id: string | undefined };
  page: number;
  total: number;
  limit: number;
  title: string | undefined;
}

const initialState: IProductSlice = {
  products: [],
  brands: [
    { _id: '0', name: 'Все' },
    { _id: '1', name: 'Adidas' },
  ],
  types: [],
  selectedType: {
    _id: undefined,
  },
  page: 1,
  total: 1,
  limit: 3,
  title: undefined,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
    setTitle: (state, title: PayloadAction<string | undefined>) => {
      state.title = title.payload;
    },
    setPage: (state, page: PayloadAction<number>) => {
      state.page = page.payload;
    },
    setSelectedType: (
      state,
      type: PayloadAction<{ _id: string | undefined }>
    ) => {
      state.selectedType = type.payload;
    },
    reset: () => initialState,
  },
  selectors: {
    // isInCart: (state, _id: string | null) => {
    //   if (!_id) return false;
    //   const event = (item: IProduct) => item._id === _id;
    //   return state.items.some(event);
    // },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productApi.endpoints.getTypes.matchFulfilled,
      (state, { payload }) => {
        state.types = payload;
      }
    );
    builder.addMatcher(
      productApi.endpoints.getProducts.matchFulfilled,
      (state, { payload }) => {
        state.total = payload.total;
        // i dont want to change bk, because i have 2 more project on it
        state.page = Number(payload.page);
      }
    );
    builder.addMatcher(
      productApi.endpoints.createType.matchFulfilled,
      (state, { payload }) => {
        state.types.push(payload);
      }
    );
  },
});

// selectors
// export const { isInCart } = cartSlice.selectors;

// actions
export const { reset, setSelectedType, setTitle, setPage } =
  productSlice.actions;
