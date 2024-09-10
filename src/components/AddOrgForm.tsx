import { useEffect, useRef, useState } from "react";
import { CustomButton } from "./CustomButton";
import { RadioEmpty } from "../icons/RadioEmpty";
import { RadioChecked } from "../icons/RadioChecked";
import { SchoolType } from "../types";
import {
  useCreateOrganizationMutation,
  useGetOrganizationsQuery,
} from "../store/api/mainApi";

export const AddOrgForm = () => {
  const dialog = useRef<HTMLDialogElement>(null);
  const [groupName, setGroupName] = useState<string>("");
  const [groups, setGroups] = useState<string[]>([]);
  const [schoolType, setSchoolType] = useState<SchoolType | "">("");
  const [orgName, setOrgName] = useState<string>("");

  const { refetch } = useGetOrganizationsQuery();
  const [createOrg] = useCreateOrganizationMutation();

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
          text="ДОБАВИТЬ ОРГАНИЗАЦИЮ"
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
                Добавить организацию
              </p>
              <div className="flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[12px]">
                  <p className="font-onest font-medium text-[20px]/[25.5px]">
                    Название организации
                  </p>
                  <input
                    className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                    placeholder="Введите название теста"
                    value={orgName}
                    onChange={(e) => {
                      setOrgName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <p className="font-onest font-medium text-[20px]/[25.5px]">
                    Целевая аудитория
                  </p>
                  <div className="flex gap-[24px]">
                    <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                      <input
                        type="radio"
                        value={"SCHOOL"}
                        name="schoolLevel"
                        className="hidden"
                        onChange={(e) =>
                          setSchoolType(e.target.value as SchoolType)
                        }
                      ></input>
                      {schoolType === "SCHOOL" ? (
                        <RadioChecked />
                      ) : (
                        <RadioEmpty />
                      )}
                      Школа
                    </label>
                    <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                      <input
                        type="radio"
                        value={"KINDERGARTEN"}
                        name="schoolLevel"
                        className="hidden"
                        onChange={(e) =>
                          setSchoolType(e.target.value as SchoolType)
                        }
                      ></input>
                      {schoolType === "KINDERGARTEN" ? (
                        <RadioChecked />
                      ) : (
                        <RadioEmpty />
                      )}
                      Детский сад
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <p className="font-onest font-medium text-[20px]/[25.5px]">
                    Группы
                  </p>
                  <input
                    className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                    placeholder="Введите названия групп"
                    value={groupName}
                    onKeyUp={(e) => {
                      e.preventDefault();
                      if (e.code === "Enter" && groupName !== "") {
                        setGroups((prev) => [...prev, groupName]);
                        setGroupName("");
                      }
                      console.log(e.code);
                    }}
                    onChange={(e) => setGroupName(e.target.value)}
                  ></input>
                  {groups.map((gr) => (
                    <p className="font-onest font-medium text-[20px]/[25.5px]">
                      {gr}
                    </p>
                  ))}
                </div>
              </div>
              <div className="mx-auto">
                <CustomButton
                  type="BLUE"
                  text="ДОБАВИТЬ"
                  onClick={() => {
                    createOrg({
                      name: orgName,
                      type: schoolType as SchoolType,
                      groups: groups,
                    }).then(() => {
                      setOrgName("");
                      setGroupName("");
                      setGroups([]);
                      setSchoolType("");
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
