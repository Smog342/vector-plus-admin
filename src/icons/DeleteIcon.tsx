export const DeleteIcon = (props: { visible: boolean }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      fillOpacity={props.visible ? "100%" : "50%"}
    >
      <g opacity="0.7">
        <path
          d="M2 4H3.33333H14"
          stroke="#FF5789"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.6666 4.00004V13.3334C12.6666 13.687 12.5261 14.0261 12.2761 14.2762C12.026 14.5262 11.6869 14.6667 11.3333 14.6667H4.66659C4.31296 14.6667 3.97382 14.5262 3.72378 14.2762C3.47373 14.0261 3.33325 13.687 3.33325 13.3334V4.00004M5.33325 4.00004V2.66671C5.33325 2.31309 5.47373 1.97395 5.72378 1.7239C5.97383 1.47385 6.31296 1.33337 6.66659 1.33337H9.33325C9.68687 1.33337 10.026 1.47385 10.2761 1.7239C10.5261 1.97395 10.6666 2.31309 10.6666 2.66671V4.00004"
          stroke="#FF5789"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.66675 7.33337V11.3334"
          stroke="#FF5789"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.33325 7.33337V11.3334"
          stroke="#FF5789"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
};
