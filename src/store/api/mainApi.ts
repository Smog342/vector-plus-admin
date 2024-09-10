import {
  AddEmployeeType,
  AddTestData,
  EmployeeType,
  SchoolType,
  TestDataType,
  organizationDataType,
} from "../../types";
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
    getUsers: builder.query<EmployeeType[], void>({
      query: () => ({
        url: `admin/users/all`,
      }),
    }),
    getGroupes: builder.query<{ id: number; name: string }[], number>({
      query: (id) => ({
        url: `organizations/groups?organizationId=${id}`,
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
    createTester: builder.mutation<void, AddEmployeeType>({
      query: (arg) => ({
        url: `admin/users?role=tester`,
        body: arg,
        method: "POST",
      }),
    }),
    createTeacher: builder.mutation<
      void,
      AddEmployeeType & { groupIds: number[] }
    >({
      query: (arg) => ({
        url: `admin/users/teacher`,
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
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `admin/users/${id}`,
        method: "DELETE",
      }),
    }),
    deleteTest: builder.mutation<void, number>({
      query: (id) => ({
        url: `admin/tests?testId=${id}`,
        method: "DELETE",
      }),
    }),
    changeTestStatus: builder.mutation<void, number>({
      query: (id) => ({
        url: `admin/tests/status?testId=${id}`,
        method: "PATCH",
      }),
    }),
    createTest: builder.mutation<void, AddTestData>({
      query: (arg) => ({
        url: `admin/tests`,
        body: arg,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetTestsQuery,
  useGetOrganizationsQuery,
  useCreateOrganizationMutation,
  useDeleteOrganizationMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateTesterMutation,
  useGetGroupesQuery,
  useCreateTeacherMutation,
  useDeleteTestMutation,
  useChangeTestStatusMutation,
  useCreateTestMutation,
} = mainApiSlice;
