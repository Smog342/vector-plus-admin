import { TestDataType } from "../../types";
import { baseApi } from "./baseApi";

export const mainApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTests: builder.query<TestDataType[], void>({
      query: () => ({
        url: `admin/tests/all`,
      }),
    }),
  }),
});

export const { useGetTestsQuery } = mainApiSlice;
