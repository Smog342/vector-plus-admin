import { useState } from "react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EyeIcon } from "../icons/EyeIcon";
import { TestDataType } from "../types";
import { useDispatch } from "react-redux";
import { changeTestVisibility, deleteTest } from "../store/reducers/TestsSlice";

export const TestCard = (props: TestDataType) => {
  // const [visible, setVisible] = useState(props.visible);
  const dispatch = useDispatch();

  return (
    <>
      <tr className="border-b border-[#EFF3F6]">
        <td className="text-center py-[32px] px-[32px] w-[24%]">
          {props.name}
        </td>
        <td className="text-center py-[32px] w-[24%]">{props.grade}</td>
        <td className="text-center py-[32px] w-[24%]">
          {props.questionNumber}
        </td>
        <td className="text-center py-[32px] px-[32px] w-[24%]">
          {props.rate}
        </td>
        <td className="py-[32px] w-[40px]">
          <div className="flex items-center gap-[8px]">
            <div
              onClick={() => {
                // setVisible((prev) => !prev);
                dispatch(changeTestVisibility(props.id));
              }}
            >
              <EyeIcon visible={props.visible} />
            </div>
            <div
              onClick={() => {
                dispatch(deleteTest(props.id));
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
