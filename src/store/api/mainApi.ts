import { SchoolType, TestDataType, organizationDataType } from "../../types";
import { baseApi } from "./baseApi";

export const mainApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTests: builder.query<TestDataType[], void>({
      query: () => ({
        url: `admin/tests/all`,
      }),
    }),
    getOrganizations: builder.query<organizationDataType[], void>({
      query: () => ({
        url: `organizations/all`,
      }),
    }),
    createOrganization: builder.mutation<
      void,
      { name: string; type: SchoolType; groups: string[] }
    >({
      query: (arg) => ({
        url: `admin/organizations`,
        body: arg,
        method: "POST",
      }),
    }),
    deleteOrganization: builder.mutation<void, number>({
      query: (id) => ({
        url: `admin/organizations/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTestsQuery,
  useGetOrganizationsQuery,
  useCreateOrganizationMutation,
  useDeleteOrganizationMutation,
} = mainApiSlice;
