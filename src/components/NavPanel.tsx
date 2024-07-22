import { useLocation, useNavigate } from "react-router-dom";
import { EmployersIcon } from "../icons/EmployersIcon";
import { TestIcons } from "../icons/TestsIcon";
import { ExitIcon } from "../icons/ExitIcon";

export const NavPavel = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="h-full bg-white w-[280px] flex flex-col py-[70px]">
      <p className="font-onest font-bold text-black text-[16px]/[20.4px] mx-auto">
        ООО ВЕКТОР РАЗВИТИЯ+
      </p>
      <div
        className="mt-[48px] ml-[47px] flex gap-[16px] items-center cursor-pointer"
        onClick={() => {
          navigate("/admin");
        }}
      >
        <TestIcons color={pathname === "/admin" ? "#009EEB" : "#648AA8"} />
        <p
          className={`font-onest font-medium text-[20px]/[25.5px] ${
            pathname === "/admin" ? "text-[#009EEB]" : "text-[#648AA8]"
          }`}
        >
          Список тестов
        </p>
      </div>
      <div
        className="mt-[48px] ml-[47px] flex gap-[16px] items-center cursor-pointer"
        onClick={() => {
          navigate("/admin/employees");
        }}
      >
        <EmployersIcon
          color={pathname === "/admin/employees" ? "#009EEB" : "#648AA8"}
        />
        <p
          className={`font-onest font-medium text-[20px]/[25.5px] ${
            pathname === "/admin/employees"
              ? "text-[#009EEB]"
              : "text-[#648AA8]"
          }`}
        >
          Сотрудники
        </p>
      </div>
      <div
        className="mt-auto ml-[47px] flex gap-[16px] items-center cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <ExitIcon />
        <p className="font-onest font-medium text-[20px]/[25.5px] text-[#648AA8]">
          Выйти
        </p>
      </div>
    </nav>
  );
};
