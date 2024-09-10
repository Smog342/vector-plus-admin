import { useEffect, useRef, useState } from "react";
import { CustomButton } from "./CustomButton";
import {
  useCreateTeacherMutation,
  useGetGroupesQuery,
  useGetOrganizationsQuery,
  useGetUsersQuery,
} from "../store/api/mainApi";

export const AddTeacherForm = () => {
  const dialog = useRef<HTMLDialogElement>(null);
  const [orgName, setOrgName] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const [orgId, setOrgId] = useState<number>(0);
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [patronymic, setPatronymic] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [groups, setGroups] = useState<number[]>([]);

  const { data: orgs = [] } = useGetOrganizationsQuery();
  const { data: groupes = [] } = useGetGroupesQuery(orgId);
  const { refetch } = useGetUsersQuery();
  const [createTeacher] = useCreateTeacherMutation();

  const handleClickOutsideForm = ({ target }: MouseEvent) => {
    let tar = target as Element;
    if (dialog && !dialog.current?.firstChild?.contains(tar)) {
      console.log("Click outside detected");
      dialog.current?.close();
    }
  };

  useEffect(() => {
    dialog.current?.addEventListener("click", handleClickOutsideForm);
    return () => {
      dialog.current?.removeEventListener("click", handleClickOutsideForm);
    };
  }, []);
  return (
    <>
      <div className="mx-auto">
        <CustomButton
          text="ДОБАВИТЬ УЧИТЕЛЯ"
          type="BLUE"
          onClick={() => {
            dialog.current?.showModal();
          }}
          submit={false}
        />
      </div>
      <dialog
        ref={dialog}
        className="backdrop:opacity-50 backdrop:bg-black outline-none w-[768px] rounded-[24px]"
      >
        <div id="test-add-form" className="p-[32px] bg-white">
          <form className="flex flex-col gap-[32px]">
            <>
              <p className="mr-auto font-onest font-bold text-[28px]/[35.7px]">
                Добавить тестолога
              </p>
              <div className="flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[12px]">
                  <p className="font-onest font-medium text-[20px]/[25.5px]">
                    Фамилия
                  </p>
                  <input
                    className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                    placeholder="Введите фамилию"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <p className="font-onest font-medium text-[20px]/[25.5px]">
                    Имя
                  </p>
                  <input
                    className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                    placeholder="Введите имя"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <p className="font-onest font-medium text-[20px]/[25.5px]">
                    Отчество
                  </p>
                  <input
                    className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                    placeholder="Введите отчество"
                    value={patronymic}
                    onChange={(e) => {
                      setPatronymic(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <p className="font-onest font-medium text-[20px]/[25.5px]">
                    Логин
                  </p>
                  <input
                    className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                    placeholder="Введите логин"
                    value={login}
                    onChange={(e) => {
                      setLogin(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <p className="font-onest font-medium text-[20px]/[25.5px]">
                    Пароль
                  </p>
                  <input
                    className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <p className="font-onest font-medium text-[20px]/[25.5px]">
                    Организация
                  </p>
                  <select
                    className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                    value={orgName}
                    onChange={(e) => {
                      setOrgName(e.target.value);
                      setGroups([]);
                      console.log(e.target.value);
                      setOrgId(parseInt(e.target.value));
                    }}
                    //onChange={(e) => {const currentOrg = orgs.find(org => org.id === e.target.value) if(currentOrg){setOrgName(currentOrg.name)}}}
                  >
                    {orgs.map((org) => (
                      <option value={org.id} label={org.name}></option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <p className="font-onest font-medium text-[20px]/[25.5px]">
                    Группы
                  </p>
                  <select
                    className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                    value={groupName}
                    onChange={(e) => {
                      setGroupName(e.target.value);
                      const group = groups.find(
                        (gr) => gr === parseInt(e.target.value)
                      );
                      if (group === undefined) {
                        setGroups((prev) => [
                          ...prev,
                          parseInt(e.target.value),
                        ]);
                      }
                    }}
                    //onChange={(e) => {const currentOrg = orgs.find(org => org.id === e.target.value) if(currentOrg){setOrgName(currentOrg.name)}}}
                  >
                    {groupes.map((gr) => (
                      <option value={gr.id} label={gr.name}></option>
                    ))}
                  </select>
                </div>
                {groups.map((gr) => {
                  const toDisplay = groupes.find((gruppa) => gruppa.id === gr);
                  if (toDisplay) {
                    return (
                      <p className="font-onest font-medium text-[20px]/[25.5px]">
                        {toDisplay.name}
                      </p>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </div>
              <div className="mx-auto">
                <CustomButton
                  type="BLUE"
                  text="ДОБАВИТЬ"
                  onClick={() => {
                    createTeacher({
                      username: login,
                      password: password,
                      organizationId: orgId,
                      firstName: firstName,
                      lastName: lastName,
                      patronymic: patronymic,
                      birthDate: "05.16.2002",
                      education: "КФУ",
                      workPlace: "КФУ",
                      workPosition: "КФУ",
                      workExperience: 1,
                      groupIds: groups,
                    }).then(() => {
                      setFirstName("");
                      setLastName("");
                      setPatronymic("");
                      setLogin("");
                      setPassword("");
                      setOrgName("");
                      setGroupName("");
                      setGroups([]);
                      refetch().then(() => {
                        dialog.current?.close();
                      });
                    });
                  }}
                  submit={false}
                />
              </div>
            </>
          </form>
        </div>
      </dialog>
    </>
  );
};
