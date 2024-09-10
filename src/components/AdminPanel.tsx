import { useLocation } from "react-router-dom";
import { NavPavel } from "./NavPanel";
import { Header } from "./Header";
import { TestsTable } from "./TestsTable";
import { EmployeesTable } from "./EmployeesTable";
import { OrganizationsTable } from "./OrganizationsTable";

export const AdminPanel = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <NavPavel />
        <div className="w-full h-full pt-[70px] pl-[344px] pr-[64px] flex flex-col gap-[32px]">
          {pathname.includes("/admin/tests") ? (
            <>
              <Header />
              <TestsTable />
            </>
          ) : pathname.includes("/admin/employees") ? (
            <>
              <Header />
              <EmployeesTable />
            </>
          ) : (
            <>
              <Header />
              <OrganizationsTable />
            </>
          )}
        </div>
      </div>
    </>
  );
};
