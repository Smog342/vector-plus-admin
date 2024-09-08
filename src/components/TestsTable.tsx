import { useState } from "react";
import { SchoolType } from "../types";
import { EyeIcon } from "../icons/EyeIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { AddTestForm } from "./AddTestForm";
import { TestCard } from "./TestCard";
import { useAppSelector } from "../store";

export const TestsTable = () => {
  const [schoolType, setSchoolType] = useState<SchoolType>("SCHOOL");
  const tests = useAppSelector((state) => state.tests.tests);
  const { searchString } = useAppSelector((state) => state.searchString);

  return (
    <>
      <div className="bg-white rounded-[24px] p-[32px] border-[1px] border-[#DEE5EA] flex flex-col gap-[32px]">
        <div className="mx-auto flex">
          <div
            className={`w-[144px] h-[44px] rounded-l-[8px] font-onest font-medium text-[16px]/[20.4px] text-center px-[32px] py-[12px] ${
              schoolType === "SCHOOL"
                ? "bg-[#648AA8] text-white border border-[#648AA8]"
                : "bg-white text-[#B1C5D3] border border-[#B1C5D3] border-r-0"
            } cursor-pointer`}
            onClick={() => {
              setSchoolType((prev) => "SCHOOL");
            }}
          >
            Школьник
          </div>
          <div
            className={`w-[162px] h-[44px] rounded-r-[8px] font-onest font-medium text-[16px]/[20.4px] text-center px-[32px] py-[12px] ${
              schoolType === "PRESCHOOL"
                ? "bg-[#648AA8] text-white border border-[#648AA8]"
                : "bg-white text-[#B1C5D3] border border-[#B1C5D3] border-l-0"
            } cursor-pointer`}
            onClick={() => {
              setSchoolType((prev) => "PRESCHOOL");
            }}
          >
            Дошкольник
          </div>
        </div>
        <div>
          <table className="w-full h-full">
            <tr className="h-[52px] bg-[#EFF3F6]">
              <th className="rounded-l-[12px] font-onest font-medium text-[16px]/[20.4px] text-[#648AA8]">
                Название теста
              </th>
              <th className="font-onest font-medium text-[16px]/[20.4px] text-[#648AA8]">
                Целевая аудитория
              </th>
              <th className="font-onest font-medium text-[16px]/[20.4px] text-[#648AA8]">
                Количество вопросов
              </th>
              <th className="font-onest font-medium text-[16px]/[20.4px] text-[#648AA8]">
                Количество баллов
              </th>
              <th className="rounded-r-[12px] font-onest font-medium text-[16px]/[20.4px] text-[#648AA8]"></th>
            </tr>
            {searchString === ""
              ? tests.map((test) =>
                  test.school === schoolType ? <TestCard {...test} /> : <></>
                )
              : tests.map((test) =>
                  test.name.includes(searchString) ? (
                    <TestCard {...test} />
                  ) : (
                    <></>
                  )
                )}
          </table>
        </div>
        <AddTestForm />
      </div>
    </>
  );
};
