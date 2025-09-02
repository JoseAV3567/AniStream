import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
// PRODUCCION export const baseUrl = ''
// DEV        export baseUrl = 'http://127.0.0.1:8000'

// DEPENDIENDO DE LA VARIABLE DEBUG EVALUAMOS SI NOS ENCONTRAMOS EN EL ENTORNO DE DESARROLLO O EL ENTORNO DE PRODUCCION
export const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
console.log(baseUrl);

const axiosBaseQuery =
  ({
    baseUrl = "",
    prepareHeaders,
    fetchFn,
    paramsSerializer,
    ...baseFetchOptions
  }) =>
  async ({ url, params, method, body, headers = {} }, api, extraOptions) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        ...(params && { params }),
        ...(body && { data: body }),
        ...(headers && { headers: prepareHeaders(headers, api) }),

        responseType: "json",
      });
      return { data: result.data };
    } catch (err) {
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

const baseQuery = axiosBaseQuery({
  baseUrl: `${baseUrl}/api/v1`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;
    if (token) {
      headers.authorization = `Bearer ${token.access}`;
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh/",
        method: "POST",
        body: { refresh: api.getState().auth.token?.refresh },
      },
      api,
      extraOptions
    );
  }

  return result;
};

export const apiSliceWithRefresh = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: "apiSliceWithRefresh",
  refetchOnMountOrArgChange: 30,
  endpoints: (builder) => ({}),
});

export const apiSlice = createApi({
  baseQuery,
  reducerPath: "apiSlice",
  refetchOnMountOrArgChange: 30,
  endpoints: (builder) => ({}),
});
