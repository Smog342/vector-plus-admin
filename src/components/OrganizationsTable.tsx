import { useAppSelector } from "../store";
import { useGetOrganizationsQuery } from "../store/api/mainApi";
import { OrganizationCard } from "./OrganizationCard";
import { AddOrgForm } from "./AddOrgForm";

export const OrganizationsTable = () => {
  const { data: orgs = [] } = useGetOrganizationsQuery();
  const { searchString } = useAppSelector((state) => state.searchString);

  return (
    <>
      <div className="bg-white rounded-[24px] p-[32px] border-[1px] border-[#DEE5EA] flex flex-col gap-[32px]">
        <div>
          <table className="w-full h-full">
            <tr className="h-[52px] bg-[#EFF3F6]">
              <th className="rounded-l-[12px] font-onest font-medium text-[16px]/[20.4px] text-[#648AA8]">
                Название организации
              </th>
              <th className="font-onest font-medium text-[16px]/[20.4px] text-[#648AA8]">
                Группы
              </th>
              <th className="font-onest font-medium text-[16px]/[20.4px] text-[#648AA8]">
                Тип
              </th>
              <th className="rounded-r-[12px] font-onest font-medium text-[16px]/[20.4px] text-[#648AA8]"></th>
            </tr>
            {searchString === ""
              ? orgs.map((org) => <OrganizationCard {...org} />)
              : orgs.map((org) =>
                  org.name.includes(searchString) ? (
                    <OrganizationCard {...org} />
                  ) : (
                    <></>
                  )
                )}
          </table>
        </div>
        <AddOrgForm />
      </div>
    </>
  );
};
