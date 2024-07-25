import { useLocation, useNavigate } from "react-router-dom";
import { EmployersIcon } from "../icons/EmployersIcon";
import { TestIcons } from "../icons/TestsIcon";
import { ExitIcon } from "../icons/ExitIcon";

export const NavPavel = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="h-screen fixed bg-white w-[280px] flex flex-col py-[80px]">
      <p className="font-onest font-bold text-black text-[16px]/[20.4px] mx-auto">
        ООО ВЕКТОР РАЗВИТИЯ+
      </p>
      <div
        className="h-[72px] mt-[48px] pl-[35px] flex gap-[16px] items-center cursor-pointer relative"
        onClick={() => {
          navigate("/admin/tests");
        }}
      >
        <div
          className={`absolute left-0 h-[72px] w-[4px] rounded-r-[16px] bg-[#009EEB] ${
            pathname.includes("/admin/tests") ? "" : "hidden"
          }`}
        ></div>
        <TestIcons
          color={pathname.includes("/admin/tests") ? "#009EEB" : "#648AA8"}
        />
        <p
          className={`font-onest font-medium text-[20px]/[25.5px] ${
            pathname.includes("/admin/tests")
              ? "text-[#009EEB]"
              : "text-[#648AA8]"
          }`}
        >
          Список тестов
        </p>
      </div>
      <div
        className="h-[72px] pl-[47px] flex gap-[16px] items-center cursor-pointer relative"
        onClick={() => {
          navigate("/admin/employees");
        }}
      >
        <div
          className={`absolute left-0 h-[72px] w-[4px] rounded-r-[16px] bg-[#009EEB] ${
            pathname !== "/admin/employees" ? "hidden" : ""
          }`}
        ></div>
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
