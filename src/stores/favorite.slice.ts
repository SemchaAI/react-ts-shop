import { IProduct } from '@/models/products';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IFavoriteSlice {
  items: IProduct[];
}
const initialState: IFavoriteSlice = {
  items: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,

  reducers: {
    addFavorite: (state, action: PayloadAction<IProduct>) => {
      console.log('add');
      // state.items = [...state.items, action.payload];
      state.items.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<IProduct>) => {
      console.log('remove');
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
    },
    favoriteHandler: (state, action: PayloadAction<IProduct>) => {
      console.log('payload', action.payload);
      const reducersPath = favoriteSlice.actions;
      console.log(isFavorite(state, action.payload));
      // isFavorite(state, action.payload)
      //   ? reducersPath.removeFavorite(action.payload)
      reducersPath.addFavorite(action.payload);
    },
    reset: () => initialState,
  },
});

export const isFavorite = (state: IFavoriteSlice, product: IProduct | null) => {
  if (!product) return false;
  const items = state.items;
  return items.some((e) => e._id === product._id);
};

// export const getUser = (state: IUserSlice) => state.user.user;
// export const getIsAuth = (state: IUserSlice) => state.user.isAuth;
// export const getIsLoading = (state: IUserSlice) => state.user.isLoading;

// selectors
// export const { getUser, getIsAuth, getIsLoading } = userSlice.selectors;

// actions
export const { reset, addFavorite, removeFavorite, favoriteHandler } =
  favoriteSlice.actions;
