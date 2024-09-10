import { DeleteIcon } from "../icons/DeleteIcon";
import {
  useDeleteOrganizationMutation,
  useGetOrganizationsQuery,
} from "../store/api/mainApi";
import { organizationDataType } from "../types";

export const OrganizationCard = (props: organizationDataType) => {
  const [deleteOrg] = useDeleteOrganizationMutation();
  const { refetch } = useGetOrganizationsQuery();

  return (
    <>
      <tr className="border-b border-[#EFF3F6]">
        <td className="text-center py-[32px] px-[32px] w-[32%]">
          {props.name}
        </td>
        <td className="text-center py-[32px] w-[32%]">
          {props.type === "SCHOOL" ? "ШКОЛА" : "ДЕТСКИЙ САД"}
        </td>
        <td className="text-center py-[32px] w-[32%]">
          {props.groups.map((gr) => (
            <p>{gr.name + " "}</p>
          ))}
        </td>
        <td className="py-[32px] w-[40px]">
          <div className="flex items-center gap-[8px]">
            <div
              onClick={() => {
                deleteOrg(props.id).then(() => {
                  refetch();
                });
              }}
            >
              <DeleteIcon visible />
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};
