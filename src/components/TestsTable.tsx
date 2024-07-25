import { useState } from "react";
import { SchoolType } from "../types";
import { EyeIcon } from "../icons/EyeIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { AddTestForm } from "./AddTestForm";

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
            <tr className="border-b border-[#EFF3F6]">
              <td className="text-center py-[32px] px-[32px] w-[24%]">
                Геологические признаки вулканической активности и их специфика в
                применении в условиях Камчатского края
              </td>
              <td className="text-center py-[32px] w-[24%]">1-4 класс</td>
              <td className="text-center py-[32px] w-[24%]">20</td>
              <td className="text-center py-[32px] px-[32px] w-[24%]">
                100 - Отлично, ты боольшой молодец! Старайся и дальше так
                делать, и у тебя всё получится! 100 - отлично
                {/* <p className="relative">100 - отлично</p> */}
              </td>
              <td className="py-[32px] w-[40px]">
                <div className="flex items-center gap-[8px]">
                  <EyeIcon visible />
                  <DeleteIcon visible />
                </div>
              </td>
            </tr>
            <tr className="">
              <td className="text-center py-[32px]">Тест 1</td>
              <td className="text-center py-[32px]">1-4 класс</td>
              <td className="text-center py-[32px]">20</td>
              <td className="text-center py-[32px]">100 - Отлично</td>
            </tr>
            <tr className="">
              <td className="text-center py-[32px]">Тест 1</td>
              <td className="text-center py-[32px]">1-4 класс</td>
              <td className="text-center py-[32px]">20</td>
              <td className="text-center py-[32px]">100 - Отлично</td>
            </tr>
            <tr className="">
              <td className="text-center py-[32px]">Тест 1</td>
              <td className="text-center py-[32px]">1-4 класс</td>
              <td className="text-center py-[32px]">20</td>
              <td className="text-center py-[32px]">100 - Отлично</td>
            </tr>
            <tr className="">
              <td className="text-center py-[32px]">Тест 1</td>
              <td className="text-center py-[32px]">1-4 класс</td>
              <td className="text-center py-[32px]">20</td>
              <td className="text-center py-[32px]">100 - Отлично</td>
            </tr>
            <tr className="">
              <td className="text-center py-[32px]">Тест 1</td>
              <td className="text-center py-[32px]">1-4 класс</td>
              <td className="text-center py-[32px]">20</td>
              <td className="text-center py-[32px]">100 - Отлично</td>
            </tr>
            <tr className="">
              <td className="text-center py-[32px]">Тест 1</td>
              <td className="text-center py-[32px]">1-4 класс</td>
              <td className="text-center py-[32px]">20</td>
              <td className="text-center py-[32px]">100 - Отлично</td>
            </tr>
            <tr className="">
              <td className="text-center py-[32px]">Тест 1</td>
              <td className="text-center py-[32px]">1-4 класс</td>
              <td className="text-center py-[32px]">20</td>
              <td className="text-center py-[32px]">100 - Отлично</td>
            </tr>
          </table>
        </div>
        <AddTestForm />
      </div>
    </>
  );
};
