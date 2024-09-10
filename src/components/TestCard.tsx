import { DeleteIcon } from "../icons/DeleteIcon";
import { EyeIcon } from "../icons/EyeIcon";
import { TestDataType } from "../types";
import { useDispatch } from "react-redux";

export const TestCard = (props: TestDataType) => {
  // const [visible, setVisible] = useState(props.visible);
  const dispatch = useDispatch();

  return (
    <>
      <tr className="border-b border-[#EFF3F6]">
        <td className="text-center py-[32px] px-[32px] w-[24%]">
          {props.title}
        </td>
        <td className="text-center py-[32px] w-[24%]">
          {props.targetAudience === "JUNIOR"
            ? "1-4 класс"
            : props.targetAudience === "MIDDLE"
            ? "5-9 класс"
            : "10-11 класс"}
        </td>
        <td className="text-center py-[32px] w-[24%]">
          {props.numberOfQuestions}
        </td>
        <td className="text-center py-[32px] px-[32px] w-[24%]">
          "100 баллов - Хорошо"
        </td>
        <td className="py-[32px] w-[40px]">
          <div className="flex items-center gap-[8px]">
            <div
              onClick={() => {
                // setVisible((prev) => !prev);
                // dispatch(changeTestVisibility(props.id));
              }}
            >
              <EyeIcon visible={props.status} />
            </div>
            <div
              onClick={() => {
                //dispatch(deleteTest(props.id));
                console.log("trying");
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
