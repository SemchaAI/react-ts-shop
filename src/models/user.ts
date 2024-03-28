export interface IUser {
  id: string;
  isActivated: boolean;
  email: string;
  name: string;
  role: string;
}

export interface IUserStore {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
  accessToken: string | null;
}
export interface IUserSlice {
  user: IUserStore;
}

// RES REQ
export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
export interface ILogoutResponse {
  acknowledged: boolean;
  deletedCount: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
