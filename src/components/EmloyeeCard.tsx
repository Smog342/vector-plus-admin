import { DeleteIcon } from "../icons/DeleteIcon";
import { useDeleteUserMutation, useGetUsersQuery } from "../store/api/mainApi";
import { EmployeeType } from "../types";

export const EmployeesCard = (props: EmployeeType) => {
  const [deleteUser] = useDeleteUserMutation();
  const { refetch } = useGetUsersQuery();

  return (
    <>
      <tr className="border-b border-[#EFF3F6]">
        <td className="text-center py-[32px] px-[32px] w-[32%]">
          {props.lastName + " " + props.firstName + " " + props.patronymic}
        </td>
        <td className="text-center py-[32px] w-[32%]">
          {props.role === "ROLE_TESTER" ? "ТЕСТОЛОГ" : "УЧИТЕЛЬ"}
        </td>
        <td className="text-center py-[32px] w-[32%]">
          {props.organizationName}
        </td>
        <td className="py-[32px] w-[40px]">
          <div className="flex items-center gap-[8px]">
            <div
              onClick={() => {
                deleteUser(props.id).then(() => {
                  refetch();
                });
              }}
            >
              <DeleteIcon visible />
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};
