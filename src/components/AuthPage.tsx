import { useNavigate } from "react-router-dom";
import { CustomButton } from "./CustomButton";
import { useGetTokenMutation } from "../store/api/authApi";
import { useDispatch } from "react-redux";
import { logIn } from "../store/reducers/AuthSlice";

export const AuthPage = () => {
  const [getToken] = useGetTokenMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex min-w-screen min-h-screen bg-gray-100">
        <div className="bg-white w-[544px] h-[468px] rounded-[24px] mx-auto my-auto p-[32px] border-[1px] border-[#DEE5EA]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("submitted!");
              const target = e.target as typeof e.target & {
                username: { value: string };
                password: { value: string };
              };
              console.log(target.username.value);
              console.log(target.password.value);
              getToken({
                username: target.username.value,
                password: target.password.value,
                schoolName: null,
              })
                .unwrap()
                .then((ans) => {
                  dispatch(logIn(ans.token));
                  navigate("/admin/tests");
                })
                .catch(() => {
                  console.log("Авторизация не прошла");
                });
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
                  className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                  placeholder="Введите логин"
                  name="username"
                ></input>
              </div>
              <div className="flex flex-col gap-[12px]">
                <p className="font-onest font-medium text-[20px]/[25.5px]">
                  Пароль
                </p>
                <input
                  className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                  placeholder="Введите пароль"
                  name="password"
                  type="password"
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
