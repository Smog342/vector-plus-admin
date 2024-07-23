import { useState } from "react";
import { SchoolType } from "../types";

export const TestsTable = () => {
  const [schoolType, setSchoolType] = useState<SchoolType>("SCHOOL");

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
      </div>
    </>
  );
};
