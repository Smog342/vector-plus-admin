import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://vector.kpfu.ru/api/",
  //credentials: "same-origin",
  prepareHeaders(headers, { getState }) {
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token.replaceAll('"', "")}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
