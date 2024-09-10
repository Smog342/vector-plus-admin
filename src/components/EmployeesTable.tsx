import { useState } from "react";
import { AddTestForm } from "./AddTestForm";
import { useAppSelector } from "../store";
import { useGetUsersQuery } from "../store/api/mainApi";
import { EmployeesCard } from "./EmloyeeCard";
import { AddTesterForm } from "./AddTesterForm";
import { AddTeacherForm } from "./AddTeacherForm";

export const EmployeesTable = () => {
  const [schoolType, setSchoolType] = useState<"ROLE_TESTER" | "ROLE_TEACHER">(
    "ROLE_TESTER"
  );
  const { data: users = [] } = useGetUsersQuery();
  const { searchString } = useAppSelector((state) => state.searchString);

  return (
    <>
      <div className="bg-white rounded-[24px] p-[32px] border-[1px] border-[#DEE5EA] flex flex-col gap-[32px]">
        <div className="mx-auto flex">
          <div
            className={`w-[144px] h-[44px] rounded-l-[8px] font-onest font-medium text-[16px]/[20.4px] text-center px-[32px] py-[12px] ${
              schoolType === "ROLE_TESTER"
                ? "bg-[#648AA8] text-white border border-[#648AA8]"
                : "bg-white text-[#B1C5D3] border border-[#B1C5D3] border-r-0"
            } cursor-pointer`}
            onClick={() => {
              setSchoolType((prev) => "ROLE_TESTER");
            }}
          >
            Учитель
          </div>
          <div
            className={`w-[162px] h-[44px] rounded-r-[8px] font-onest font-medium text-[16px]/[20.4px] text-center px-[32px] py-[12px] ${
              schoolType === "ROLE_TEACHER"
                ? "bg-[#648AA8] text-white border border-[#648AA8]"
                : "bg-white text-[#B1C5D3] border border-[#B1C5D3] border-l-0"
            } cursor-pointer`}
            onClick={() => {
              setSchoolType((prev) => "ROLE_TEACHER");
            }}
          >
            Тестолог
          </div>
        </div>
        <div>
          <table className="w-full h-full">
            <tr className="h-[52px] bg-[#EFF3F6]">
              <th className="rounded-l-[12px] font-onest font-medium text-[16px]/[20.4px] text-[#648AA8]">
                ФИО
              </th>
              <th className="font-onest font-medium text-[16px]/[20.4px] text-[#648AA8]">
                Тип
              </th>
              <th className="font-onest font-medium text-[16px]/[20.4px] text-[#648AA8]">
                Организация
              </th>
              <th className="rounded-r-[12px] font-onest font-medium text-[16px]/[20.4px] text-[#648AA8]"></th>
            </tr>
            {searchString === ""
              ? users.map((user) =>
                  user.role === schoolType ? <EmployeesCard {...user} /> : <></>
                )
              : users.map((user) =>
                  (
                    user.lastName +
                    " " +
                    user.firstName +
                    " " +
                    user.patronymic
                  ).includes(searchString) ? (
                    <EmployeesCard {...user} />
                  ) : (
                    <></>
                  )
                )}
          </table>
        </div>
        {schoolType === "ROLE_TESTER" ? <AddTesterForm /> : <AddTeacherForm />}
      </div>
    </>
  );
};
