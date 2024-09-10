import { useDispatch } from "react-redux";
import { SearchIcon } from "../icons/SearchIcon";
import { useAppSelector } from "../store";
import { setSearchString } from "../store/reducers/SearchStringSlice";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const { searchString } = useAppSelector((state) => state.searchString);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  return (
    <>
      <div className="flex items-center">
        <p className="font-onest font-bold text-black text-[32px]/[40.8px] mr-auto">
          {pathname === "/admin/tests"
            ? "Список тестов"
            : pathname === "/admin/employees"
            ? "Список сотрудников"
            : "Список организаций"}
        </p>
        <div className="relative">
          <SearchIcon />
          <input
            value={searchString}
            onChange={(e) => {
              dispatch(setSearchString(e.target.value));
            }}
            placeholder="Поиск"
            className="w-[246px] h-[34px] rounded-[24px] border border-[#B1C5D380] border-opacity-50 ml-auto bg-inherit focus:outline-none py-[16px] px-[40px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black"
          ></input>
        </div>
      </div>
    </>
  );
};
