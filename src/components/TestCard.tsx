import { DeleteIcon } from "../icons/DeleteIcon";
import { EyeIcon } from "../icons/EyeIcon";
import {
  useChangeTestStatusMutation,
  useDeleteTestMutation,
  useGetTestsQuery,
} from "../store/api/mainApi";
import { TestDataType } from "../types";

export const TestCard = (props: TestDataType) => {
  const [deleteTest] = useDeleteTestMutation();
  const [changeTestStatus] = useChangeTestStatusMutation();
  const { refetch } = useGetTestsQuery();

  return (
    <>
      <tr className="border-b border-[#EFF3F6]">
        <td className="text-center py-[32px] px-[32px] w-[32%]">
          {props.title}
        </td>
        <td className="text-center py-[32px] w-[32%]">
          {props.targetAudience === "JUNIOR"
            ? "1-4 класс"
            : props.targetAudience === "MIDDLE"
            ? "5-9 класс"
            : props.targetAudience === "GROUP 1"
            ? "1 группа"
            : props.targetAudience === "GROUP 2"
            ? "2 группа"
            : props.targetAudience === "GROUP 3"
            ? "3 группа"
            : "10-11 класс"}
        </td>
        <td className="text-center py-[32px] w-[32%]">
          {props.numberOfQuestions}
        </td>
        <td className="py-[32px] w-[40px]">
          <div className="flex items-center gap-[8px]">
            <div
              onClick={() => {
                changeTestStatus(props.id).then(() => {
                  refetch();
                });
              }}
            >
              <EyeIcon visible={props.status === "ACTIVE"} />
            </div>
            <div
              onClick={() => {
                deleteTest(props.id).then(() => {
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
