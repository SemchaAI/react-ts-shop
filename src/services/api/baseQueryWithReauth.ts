import {
  type FetchBaseQueryMeta,
  type FetchArgs,
  type FetchBaseQueryError,
  type BaseQueryApi,
} from '@reduxjs/toolkit/query';

import { type QueryReturnValue } from '@reduxjs/toolkit/src/query/baseQueryTypes';

import { baseQuery } from './baseQuery';

import { redirect } from 'react-router-dom';
import { setToken } from '@/stores/user.slice';
import { IAuthResponse, ILogoutResponse } from '@/models/user';
import { USER_ROUTE_REFRESH, USER_ROUTE_LOGOUT } from '@/app/utils/consts';

const AUTH_ERROR_CODES = new Set([401]);

export async function baseQueryWithReauth(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: NonNullable<unknown>
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
  let result = await baseQuery(args, api, extraOptions);
  if (
    typeof result.error?.status === 'number' &&
    AUTH_ERROR_CODES.has(result.error.status)
  ) {
    try {
      const refreshResult = (await baseQuery(
        { url: USER_ROUTE_REFRESH },
        api,
        extraOptions
      )) as QueryReturnValue<
        IAuthResponse,
        FetchBaseQueryError,
        FetchBaseQueryMeta
      >;
      // console.log('refreshResult', refreshResult);
      if (refreshResult.data) {
        // store the new token
        api.dispatch(setToken(refreshResult.data.accessToken));
        // Retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        (await baseQuery(
          {
            url: USER_ROUTE_LOGOUT,
            method: 'POST',
          },
          api,
          extraOptions
        )) as QueryReturnValue<
          ILogoutResponse,
          FetchBaseQueryError,
          FetchBaseQueryMeta
        >;

        // console.log('logoutResult', logoutResult);
        // api.dispatch(logout());
        // window.location.href = '/login';
        redirect('/login');
      }
    } catch (e) {
      console.log(e);
    }
  }
  return result;
}
