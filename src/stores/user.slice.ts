import { IUserStore } from '@/models/user';
import { userApi } from '@/services/userApi';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IUserStore = {
  user: {
    role: 'USER',
    id: '',
    name: '',
    email: '',
    isActivated: false,
  },
  isAuth: false,
  isLoading: false,
  accessToken: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    reset: () => initialState,
    isAdmin: (state) => {
      state.user.role === 'ADMIN';
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.user = payload.user;
      }
    );
  },
});

// export const getUser = (state: IUserSlice) => state.user.user;
// export const getIsAuth = (state: IUserSlice) => state.user.isAuth;
// export const getIsLoading = (state: IUserSlice) => state.user.isLoading;

// selectors
// export const { getUser, getIsAuth, getIsLoading } = userSlice.selectors;

// actions
export const { setAuth, setToken, setLoading, reset, isAdmin } =
  userSlice.actions;
