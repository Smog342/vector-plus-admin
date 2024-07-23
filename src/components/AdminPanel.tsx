import { useLocation } from "react-router-dom";
import { NavPavel } from "./NavPanel";
import { Header } from "./Header";
import { TestsTable } from "./TestsTable";

export const AdminPanel = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="flex w-screen h-screen bg-gray-100">
        <NavPavel />
        <div className="w-full pt-[70px] px-[64px] flex flex-col gap-[32px]">
          {pathname === "/admin" ? (
            <>
              <Header />
              <TestsTable />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
