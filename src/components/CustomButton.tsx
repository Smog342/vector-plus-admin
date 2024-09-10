import { ButtonProps } from "../types";

export const CustomButton = (props: ButtonProps) => {
  return (
    <button
      type={props.submit ? "submit" : "button"}
      className={`h-[68px] rounded-[12px] px-[48px] py-[24px] font-onest font-bold text-[16px]/[20.4px] text-nowrap ${
        props.type === "WHITE"
          ? "bg-white text-[#009EEB] border border-[#009EEB]"
          : "bg-[#009EEB] text-white"
      } hover:bg-[#37BDFF] hover:text-white active:bg-[#018ACD] active:text-white focus:outline-none`}
      onClick={() => {
        props.onClick();
      }}
    >
      {props.text}
    </button>
  );
};
