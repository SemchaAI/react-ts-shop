import { IProduct } from '@/models/products';
import { cartApi } from '@/services/cartApi';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface ICartSlice {
  _id: null | string;
  items: IProduct[];
}

const initialState: ICartSlice = {
  _id: null,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    setCartProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.items = action.payload;
    },
    reset: () => initialState,
  },
  selectors: {
    isInCart: (state, _id: string | null) => {
      if (!_id) return false;
      const event = (item: IProduct) => item._id === _id;
      return state.items.some(event);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cartApi.endpoints.getCartProducts.matchFulfilled,
      (state, { payload }) => {
        state.items = payload;
        state._id = payload._id;
      }
    );
    builder.addMatcher(
      cartApi.endpoints.addOne.matchFulfilled,
      (state, { payload }) => {
        state.items = [...state.items, payload];
      }
    );
    builder.addMatcher(
      cartApi.endpoints.deleteOne.matchFulfilled,
      (state, { payload }) => {
        state.items = state.items.filter((item) => item._id !== payload._id);
      }
    );
  },
});

// const items = computed(() => state.value.items)
// const inCart = computed(() => state.value.items.length)
// const total = computed(() =>
//   state.value.items.map((item) => item.price).reduce((a, b) => a + b, 0)
// )

// export const getUser = (state: IUserSlice) => state.user.user;
// export const getIsAuth = (state: IUserSlice) => state.user.isAuth;

// selectors
export const { isInCart } = cartSlice.selectors;

// actions
export const { reset } = cartSlice.actions;
