import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './rootReducer';
import { baseApi } from '@/services/api/baseApi';
import { themeSlice } from '@/stores/theme.slice';
import { userSlice } from '@/stores/user.slice';
import { cartSlice } from '@/stores/cart.slice';
import { favoriteSlice } from '@/stores/favorite.slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    themeSlice.name,
    userSlice.name,
    cartSlice.name,
    favoriteSlice.name,
  ],
  // blacklist: [userSlice.name],
};

export function makeStore() {
  const store = configureStore({
    devTools: true,
    reducer: persistReducer(
      persistConfig,
      rootReducer
    ) as unknown as typeof rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware),
  });

  setupListeners(store.dispatch);

  return store;
}

export const appStore = makeStore();
export const persistedStore = persistStore(appStore);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch;
