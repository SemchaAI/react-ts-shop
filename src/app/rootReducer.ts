import { combineReducers } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
// import persistReducer from 'redux-persist/es/persistReducer';

import { themeSlice } from '@/stores/theme.slice';
import { userSlice } from '@/stores/user.slice';
// very important to be initialized here
import { baseApi } from '@/services/api/baseApi';
import { favoriteSlice } from '@/stores/favorite.slice';
import { cartSlice } from '@/stores/cart.slice';
import { productSlice } from '@/stores/product.slice';
// import { errorSlice } from '@/entities/error';
// import { userSlice } from '@/entities/user';

// const userPersistConfig = {
//   key: userSlice.name,
//   storage,
//   whitelist: ['accessToken'],
// };

export const rootReducer = combineReducers({
  [themeSlice.name]: themeSlice.reducer,
  [productSlice.name]: productSlice.reducer,
  // [errorSlice.name]: errorSlice.reducer,
  // [userSlice.name]: persistReducer(userPersistConfig, userSlice.reducer),
  [userSlice.name]: userSlice.reducer,
  [favoriteSlice.name]: favoriteSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
