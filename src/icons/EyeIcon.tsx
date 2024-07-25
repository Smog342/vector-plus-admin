export const EyeIcon = (props: { visible: boolean }) => {
  return (
    <svg
      className={`mr-[6%] ${props.visible ? "" : "opacity-50"}`}
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.666748 6.00002C0.666748 6.00002 3.33341 0.666687 8.00008 0.666687C12.6667 0.666687 15.3334 6.00002 15.3334 6.00002C15.3334 6.00002 12.6667 11.3334 8.00008 11.3334C3.33341 11.3334 0.666748 6.00002 0.666748 6.00002Z"
        stroke="#648AA8"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z"
        stroke="#648AA8"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
