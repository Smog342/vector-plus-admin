import { useEffect, useRef, useState } from "react";
import { CustomButton } from "./CustomButton";
import { useLocation, useNavigate } from "react-router-dom";
import { RadioEmpty } from "../icons/RadioEmpty";
import { RadioChecked } from "../icons/RadioChecked";
import { SchoolLevel } from "../types";
import { useDispatch } from "react-redux";
import { addTest } from "../store/reducers/TestsSlice";

export const AddTestForm = () => {
  const dialog = useRef<HTMLDialogElement>(null);
  const [questionsNumber, setQuestionsNumber] = useState<number>(0);
  const [schoolLevel, setSchoolLevel] = useState<SchoolLevel | "">("");
  const [testName, setTestName] = useState<string>("");
  const [pointsSum, setPointsSum] = useState<number>(0);
  const [ratePhrase, setRatePhrase] = useState<string>("");

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          text="ДОБАВИТЬ ТЕСТ"
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
            {pathname === "/admin/tests" ? (
              <>
                <p className="mr-auto font-onest font-bold text-[28px]/[35.7px]">
                  Добавить тест
                </p>
                <div className="flex flex-col gap-[24px]">
                  <div className="flex flex-col gap-[12px]">
                    <p className="font-onest font-medium text-[20px]/[25.5px]">
                      Название теста
                    </p>
                    <input
                      className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                      placeholder="Введите название теста"
                      value={testName}
                      onChange={(e) => {
                        setTestName(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    <p className="font-onest font-medium text-[20px]/[25.5px]">
                      Целевая аудтория
                    </p>
                    <div className="flex gap-[24px]">
                      <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                        <input
                          type="radio"
                          value={"JUNIOR"}
                          name="schoolLevel"
                          className="hidden"
                          onChange={(e) =>
                            setSchoolLevel(e.target.value as SchoolLevel)
                          }
                        ></input>
                        {schoolLevel === "JUNIOR" ? (
                          <RadioChecked />
                        ) : (
                          <RadioEmpty />
                        )}
                        1-4 класс
                      </label>
                      <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                        <input
                          type="radio"
                          value={"MIDDLE"}
                          name="schoolLevel"
                          className="hidden"
                          onChange={(e) =>
                            setSchoolLevel(e.target.value as SchoolLevel)
                          }
                        ></input>
                        {schoolLevel === "MIDDLE" ? (
                          <RadioChecked />
                        ) : (
                          <RadioEmpty />
                        )}
                        5-9 класс
                      </label>
                      <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                        <input
                          type="radio"
                          value={"HIGHSCHOOL"}
                          name="schoolLevel"
                          className="hidden"
                          onChange={(e) =>
                            setSchoolLevel(e.target.value as SchoolLevel)
                          }
                        ></input>
                        {schoolLevel === "HIGHSCHOOL" ? (
                          <RadioChecked />
                        ) : (
                          <RadioEmpty />
                        )}
                        10-11 класс
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    <p className="font-onest font-medium text-[20px]/[25.5px]">
                      Количество вопросов
                    </p>
                    <input
                      className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                      placeholder="Введите количество вопросов"
                      onChange={(e) => {
                        let num = parseInt(e.target.value);
                        if (Number.isNaN(num) || num < 0) {
                          num = 0;
                        }
                        setQuestionsNumber((prev) => num);
                      }}
                      value={questionsNumber}
                    ></input>
                  </div>
                </div>
                <div className="mx-auto">
                  <CustomButton
                    type="BLUE"
                    text="ПРОДОЛЖИТЬ"
                    onClick={() => {
                      navigate("/admin/tests/1");
                    }}
                    submit={false}
                  />
                </div>
              </>
            ) : pathname === "/admin/tests/1" ? (
              <>
                {[...Array(questionsNumber)].map((obj, i) => (
                  <>
                    <p className="mr-auto font-onest font-bold text-[28px]/[35.7px]">
                      {"Вопрос " + (i + 1)}
                    </p>
                    <div className="flex flex-col gap-[24px]">
                      <div className="flex flex-col gap-[12px]">
                        <p className="font-onest font-medium text-[20px]/[25.5px]">
                          Текст вопроса
                        </p>
                        <input
                          className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                          placeholder="Введите текст вопроса"
                        ></input>
                        <label className="font-onest font-normal text-black text-[16px]/[20.4px] underline cursor-pointer">
                          <input type="file" className="hidden"></input>
                          Загрузить изображение
                        </label>
                      </div>
                      <div className="flex flex-col gap-[12px]">
                        <p className="font-onest font-medium text-[20px]/[25.5px]">
                          Целевая аудтория
                        </p>
                        <div className="flex gap-[24px] flex-wrap">
                          <label>
                            <input
                              type="radio"
                              value={"one"}
                              name={`question${i + 1}Type`}
                            ></input>
                            Один правильный вариант
                          </label>
                          <label>
                            <input
                              type="radio"
                              value={"open"}
                              name={`question${i + 1}Type`}
                            ></input>
                            Ввод текста
                          </label>
                          <label>
                            <input
                              type="radio"
                              value={"match"}
                              name={`question${i + 1}Type`}
                            ></input>
                            Сопоставление
                          </label>
                          <label>
                            <input
                              type="radio"
                              value={"several"}
                              name={`question${i + 1}Type`}
                            ></input>
                            Несколько правильных вариантов
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[12px]">
                        <p className="font-onest font-medium text-[20px]/[25.5px]">
                          Балл за ответ
                        </p>
                        <input
                          className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                          placeholder="Введите балл за ответ"
                        ></input>
                      </div>
                    </div>
                  </>
                ))}
                <div className="mt-auto mx-auto flex gap-[32px]">
                  <CustomButton
                    text="ВЕРНУТЬСЯ"
                    submit={false}
                    type="WHITE"
                    onClick={() => {
                      navigate("/admin/tests");
                    }}
                  />
                  <CustomButton
                    text="СОХРАНИТЬ"
                    submit={false}
                    type="BLUE"
                    onClick={() => {
                      navigate("/admin/tests/2");
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <p className="mr-auto font-onest font-bold text-[28px]/[35.7px]">
                  Результат
                </p>
                <div className="flex flex-col gap-[24px]">
                  <div className="flex flex-col gap-[12px]">
                    <p className="font-onest font-medium text-[20px]/[25.5px]">
                      Критерии оценки
                    </p>
                    <div className="flex gap-[16px]">
                      <p className="font-onest font-normal text-[16px]/[20.4px]">
                        <span className="text-[#009EEB] font-bold">0-19</span> —
                        «Нормально»
                      </p>
                      <p className="font-onest font-normal text-[16px]/[20.4px]">
                        <span className="text-[#009EEB] font-bold">20-59</span>{" "}
                        — «Хорошо»
                      </p>
                      <p className="font-onest font-normal text-[16px]/[20.4px]">
                        <span className="text-[#009EEB] font-bold">60+</span> —
                        «Отлично»
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    <p className="font-onest font-medium text-[20px]/[25.5px]">
                      Сумма баллов
                    </p>
                    <input
                      className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                      placeholder="Введите сумму баллов"
                      value={pointsSum}
                      onChange={(e) => {
                        let num = parseInt(e.target.value);
                        if (Number.isNaN(num) || num < 0) {
                          num = 0;
                        }
                        setPointsSum((prev) => num);
                      }}
                    ></input>
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    <p className="font-onest font-medium text-[20px]/[25.5px]">
                      Описание
                    </p>
                    <input
                      className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                      placeholder='Введите описание, например "Хорошо"'
                      value={ratePhrase}
                      onChange={(e) => setRatePhrase(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="mt-auto mx-auto flex gap-[32px]">
                  <CustomButton
                    text="ВЕРНУТЬСЯ"
                    submit={false}
                    type="WHITE"
                    onClick={() => {
                      navigate("/admin/tests/1");
                    }}
                  />
                  <CustomButton
                    text="СОХРАНИТЬ"
                    submit={false}
                    type="BLUE"
                    onClick={() => {
                      dispatch(
                        addTest({
                          id: Math.random() * 1000,
                          name: testName,
                          grade: schoolLevel as SchoolLevel,
                          school: "SCHOOL",
                          questionNumber: questionsNumber,
                          rate: pointsSum + " - " + ratePhrase,
                          visible: true,
                        })
                      );
                      setTestName("");
                      setQuestionsNumber(0);
                      setSchoolLevel("");
                      setPointsSum(0);
                      setRatePhrase("");
                      navigate("/admin/tests");
                      dialog.current?.close();
                    }}
                  />
                </div>
              </>
            )}
          </form>
        </div>
      </dialog>
    </>
  );
};
