import { useNavigate } from "react-router-dom";
import { CustomButton } from "./CustomButton";

export const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex w-screen h-screen bg-gray-100">
        <div className="bg-white w-[544px] h-[468px] rounded-[24px] mx-auto my-auto p-[32px] border-[1px] border-[#DEE5EA]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("submitted!");
              navigate("/admin");
            }}
            className="flex flex-col gap-[32px]"
          >
            <p className="mx-auto font-onest font-bold text-[28px]/[35.7px]">
              Войдите в админ панель
            </p>
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[12px]">
                <p className="font-onest font-medium text-[20px]/[25.5px]">
                  Логин
                </p>
                <input
                  className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3]"
                  placeholder="Введите логин"
                ></input>
              </div>
              <div className="flex flex-col gap-[12px]">
                <p className="font-onest font-medium text-[20px]/[25.5px]">
                  Пароль
                </p>
                <input
                  className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3]"
                  placeholder="Введите пароль"
                ></input>
              </div>
            </div>
            <div className="mx-auto">
              <CustomButton
                type="BLUE"
                text="ВОЙТИ"
                onClick={() => {}}
                submit
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
