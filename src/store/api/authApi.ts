import { baseApi } from "./baseApi";

export const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getToken: builder.mutation<
      { token: string; id: number; username: string },
      { username: string; password: string; schoolName: null }
    >({
      query: (arg) => ({
        url: `auth/login`,
        body: arg,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetTokenMutation } = authApiSlice;
