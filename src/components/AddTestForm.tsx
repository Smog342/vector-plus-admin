import { useEffect, useRef, useState } from "react";
import { CustomButton } from "./CustomButton";
import { useLocation, useNavigate } from "react-router-dom";
import { RadioEmpty } from "../icons/RadioEmpty";
import { RadioChecked } from "../icons/RadioChecked";
import { SchoolLevel, SchoolType } from "../types";
import { useCreateTestMutation, useGetTestsQuery } from "../store/api/mainApi";
import uuid from "react-uuid";
import { DeleteIcon } from "../icons/DeleteIcon";
import { Modal, Form, Input, Radio, Button } from "antd";

export const AddTestForm = (props: { type: SchoolType }) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const [questionsNumber, setQuestionsNumber] = useState<number>(0);
  const [questionsFieldValue, setQuestionsFieldValue] = useState<string>("");
  const [schoolLevel, setSchoolLevel] = useState<SchoolLevel | "">("");
  const [testName, setTestName] = useState<string>("");
  const [ratePhrase, setRatePhrase] = useState<string>("");
  const [questionsData, setQuestionsData] = useState<
    {
      id: string;
      description: string;
      type: string;
      points: number;
      image: string;
      answervariants: {
        id: string;
        images: { image: string }[];
        text: string;
        variantNumber: number;
        correct: boolean;
        points: number;
      }[];
      answerFieldValue: string;
      correctAnswers: { id: string; text: string; points: number }[];
      oneCorrectAnswer: string;
      matchPairs: {
        id: string;
        firstText: string;
        secondText: string;
        firstImage: string;
        secondImage: string;
        points: number;
      }[];
    }[]
  >([]);

  const [ratePhrases, setRatePhrases] = useState<
    { id: string; points: number; message: string }[]
  >([]);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClickOutsideForm = ({ target }: MouseEvent) => {
    let tar = target as Element;
    if (dialog && !dialog.current?.firstChild?.contains(tar)) {
      console.log("Click outside detected");
      dialog.current?.close();
    }
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [addTest] = useCreateTestMutation();
  const { refetch } = useGetTestsQuery();

  useEffect(() => {
    dialog.current?.addEventListener("click", handleClickOutsideForm);
    return () => {
      dialog.current?.removeEventListener("click", handleClickOutsideForm);
    };
  }, []);

  return (
    <>
      <Modal
        className="!w-[768px]"
        open={isModalOpen}
        footer={false}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        {pathname === "/admin/tests" ? (
          <Form
            onFinish={(values) => {
              console.log(values);
              setQuestionsData(
                Array.from({ length: questionsNumber }, () => ({
                  id: uuid(),
                  description: "",
                  type: "one",
                  points: 0,
                  image: "",
                  answervariants: [],
                  answerFieldValue: "",
                  correctAnswers: [],
                  oneCorrectAnswer: "",
                  matchPairs: [],
                }))
              );
              navigate("/admin/tests/1");
            }}
            layout="vertical"
            className="flex flex-col gap-[32px]"
          >
            <>
              <p className="mr-auto font-onest font-bold text-[28px]/[35.7px]">
                Добавить тест
              </p>
              <div className="flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[12px]">
                  <p className="font-onest font-medium text-[20px]/[25.5px]">
                    Название теста
                  </p>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    name={"testName"}
                    rules={[
                      { required: true, message: "Не введено название теста" },
                    ]}
                  >
                    <Input
                      className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                      placeholder="Введите название теста"
                      value={testName}
                      onChange={(e) => {
                        setTestName(e.target.value);
                      }}
                    ></Input>
                  </Form.Item>
                </div>
                {props.type === "SCHOOL" ? (
                  <div className="flex flex-col gap-[12px]">
                    <p className="font-onest font-medium text-[20px]/[25.5px]">
                      Целевая аудитория
                    </p>
                    <div>
                      <Form.Item
                        style={{ marginBottom: 0 }}
                        name={"schoolLevel"}
                        rules={[
                          {
                            required: true,
                            message: "Не выбрана целевая аудитория",
                          },
                        ]}
                      >
                        <Radio.Group
                          className="flex gap-[24px]"
                          name="schoolLevel"
                          onChange={(e) =>
                            setSchoolLevel(e.target.value as SchoolLevel)
                          }
                        >
                          <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                            <Radio
                              type="radio"
                              value={"JUNIOR"}
                              className="hidden"
                            ></Radio>
                            {schoolLevel === "JUNIOR" ? (
                              <RadioChecked />
                            ) : (
                              <RadioEmpty />
                            )}
                            1-4 класс
                          </label>
                          <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                            <Radio
                              type="radio"
                              value={"MIDDLE"}
                              className="hidden"
                            ></Radio>
                            {schoolLevel === "MIDDLE" ? (
                              <RadioChecked />
                            ) : (
                              <RadioEmpty />
                            )}
                            5-9 класс
                          </label>
                          <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                            <Radio
                              type="radio"
                              value={"HIGHSCHOOL"}
                              className="hidden"
                            ></Radio>
                            {schoolLevel === "HIGHSCHOOL" ? (
                              <RadioChecked />
                            ) : (
                              <RadioEmpty />
                            )}
                            10-11 класс
                          </label>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-[24px]">
                    <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                      <input
                        type="radio"
                        value={"GROUP 1"}
                        name="schoolLevel"
                        className="hidden"
                        onChange={(e) =>
                          setSchoolLevel(e.target.value as SchoolLevel)
                        }
                      ></input>
                      {schoolLevel === "GROUP 1" ? (
                        <RadioChecked />
                      ) : (
                        <RadioEmpty />
                      )}
                      1 группа
                    </label>
                    <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                      <input
                        type="radio"
                        value={"GROUP 2"}
                        name="schoolLevel"
                        className="hidden"
                        onChange={(e) =>
                          setSchoolLevel(e.target.value as SchoolLevel)
                        }
                      ></input>
                      {schoolLevel === "GROUP 2" ? (
                        <RadioChecked />
                      ) : (
                        <RadioEmpty />
                      )}
                      2 группа
                    </label>
                    <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                      <input
                        type="radio"
                        value={"GROUP 3"}
                        name="schoolLevel"
                        className="hidden"
                        onChange={(e) =>
                          setSchoolLevel(e.target.value as SchoolLevel)
                        }
                      ></input>
                      {schoolLevel === "GROUP 3" ? (
                        <RadioChecked />
                      ) : (
                        <RadioEmpty />
                      )}
                      3 группа
                    </label>
                  </div>
                )}
                <div className="flex flex-col gap-[12px]">
                  <p className="font-onest font-medium text-[20px]/[25.5px]">
                    Количество вопросов
                  </p>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    name={"questionsNumber"}
                    rules={[
                      { required: true, message: "Не введено число вопросов" },
                      {
                        pattern: /^\d+$/,
                        message: "Некорректный ввод",
                      },
                    ]}
                  >
                    <Input
                      className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                      placeholder="Введите количество вопросов"
                      onChange={(e) => {
                        let num = parseInt(e.target.value);
                        if (Number.isNaN(num) || num < 0) {
                          num = 0;
                        }
                        setQuestionsNumber((_) => num);
                        setQuestionsFieldValue(e.target.value);
                      }}
                      value={questionsFieldValue}
                    ></Input>
                  </Form.Item>
                </div>
              </div>
              <div className="mx-auto">
                <CustomButton
                  type="BLUE"
                  text="ПРОДОЛЖИТЬ"
                  onClick={() => {}}
                  submit={true}
                />
              </div>
            </>
          </Form>
        ) : pathname === "/admin/tests/1" ? (
          <Form
            onFinish={() => {
              console.log(questionsData);
              navigate("/admin/tests/2");
            }}
            onKeyDown={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            layout="vertical"
            className="flex flex-col gap-[32px]"
            scrollToFirstError={{ behavior: "smooth" }}
          >
            <>
              {questionsData.map((obj, i) => (
                <>
                  <p className="mr-auto font-onest font-bold text-[28px]/[35.7px]">
                    {"Вопрос " + (i + 1)}
                  </p>
                  <div className="flex flex-col gap-[24px]">
                    <div className="flex flex-col gap-[12px]">
                      <p className="font-onest font-medium text-[20px]/[25.5px]">
                        Текст вопроса
                      </p>
                      <Form.Item
                        style={{ marginBottom: 0 }}
                        name={`question${i + 1}Text`}
                        rules={[
                          {
                            required: true,
                            message: "Не введена формулировка вопроса",
                          },
                        ]}
                      >
                        <Input
                          className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB] scroll-m-[32px]"
                          placeholder="Введите текст вопроса"
                          onChange={(e) => {
                            setQuestionsData((prev) =>
                              prev.map((qd) =>
                                qd.id === obj.id
                                  ? { ...qd, description: e.target.value }
                                  : qd
                              )
                            );
                          }}
                          value={questionsData[i].description}
                        ></Input>
                      </Form.Item>
                    </div>
                    <label className="font-onest font-normal text-black text-[16px]/[20.4px] underline cursor-pointer">
                      <input
                        type="file"
                        className="!hidden"
                        onChange={(e) => {
                          var reader = new FileReader();
                          if (e.target.files) {
                            reader.readAsDataURL(e.target.files[0]);
                            reader.onload = () => {
                              console.log(reader.result);
                              setQuestionsData((prev) =>
                                prev.map((qd) =>
                                  qd.id === obj.id
                                    ? {
                                        ...qd,
                                        image: reader.result as string,
                                      }
                                    : qd
                                )
                              );
                            };
                          } else {
                            console.log("Удаляем файл");
                          }
                        }}
                      ></input>
                      Загрузить изображение
                    </label>
                    <div className="flex flex-col gap-[12px]">
                      <p className="font-onest font-medium text-[20px]/[25.5px]">
                        Тип вопроса
                      </p>
                      <Radio.Group
                        className="flex gap-[24px] flex-wrap"
                        name={`question${i + 1}Type`}
                      >
                        <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                          <Radio
                            value={"one"}
                            className="hidden"
                            onChange={() => {
                              setQuestionsData((prev) =>
                                prev.map((qd) =>
                                  qd.id === obj.id ? { ...qd, type: "one" } : qd
                                )
                              );
                            }}
                          ></Radio>
                          {questionsData[i].type === "one" ? (
                            <RadioChecked />
                          ) : (
                            <RadioEmpty />
                          )}
                          Один правильный вариант
                        </label>
                        <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                          <Radio
                            value={"open"}
                            className="hidden"
                            onChange={() => {
                              setQuestionsData((prev) =>
                                prev.map((qd) =>
                                  qd.id === obj.id
                                    ? { ...qd, type: "open" }
                                    : qd
                                )
                              );
                            }}
                          ></Radio>
                          {questionsData[i].type === "open" ? (
                            <RadioChecked />
                          ) : (
                            <RadioEmpty />
                          )}
                          Ввод текста
                        </label>
                        <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                          <Radio
                            value={"match"}
                            onChange={() => {
                              setQuestionsData((prev) =>
                                prev.map((qd) =>
                                  qd.id === obj.id
                                    ? { ...qd, type: "match" }
                                    : qd
                                )
                              );
                            }}
                            className="hidden"
                          ></Radio>
                          {questionsData[i].type === "match" ? (
                            <RadioChecked />
                          ) : (
                            <RadioEmpty />
                          )}
                          Сопоставление
                        </label>
                        <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                          <Radio
                            value={"several"}
                            onChange={() => {
                              setQuestionsData((prev) =>
                                prev.map((qd) =>
                                  qd.id === obj.id
                                    ? { ...qd, type: "several" }
                                    : qd
                                )
                              );
                            }}
                            className="hidden"
                          ></Radio>
                          {questionsData[i].type === "several" ? (
                            <RadioChecked />
                          ) : (
                            <RadioEmpty />
                          )}
                          Несколько правильных вариантов
                        </label>
                      </Radio.Group>
                    </div>
                    {questionsData[i].type === "several" ||
                    questionsData[i].type === "one" ? (
                      <div className="flex flex-col gap-[12px]">
                        <p className="font-onest font-medium text-[20px]/[25.5px]">
                          Варианты ответов
                        </p>
                        <Input
                          className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                          placeholder="Введите возможный вариант"
                          onPressEnter={() => {
                            console.log("Hello");
                            setQuestionsData((prev) =>
                              prev.map((qd) =>
                                qd.id === obj.id
                                  ? {
                                      ...qd,
                                      answerFieldValue: "",
                                      answervariants: [
                                        ...qd.answervariants,
                                        {
                                          id: uuid(),
                                          text: qd.answerFieldValue,
                                          images: [],
                                          correct: false,
                                          points: 0,
                                          variantNumber:
                                            qd.answervariants.length === 0
                                              ? 0
                                              : Math.max(
                                                  ...qd.answervariants.map(
                                                    (ansvar) =>
                                                      ansvar.variantNumber
                                                  )
                                                ) + 1,
                                        },
                                      ],
                                    }
                                  : qd
                              )
                            );
                          }}
                          onChange={(e) => {
                            setQuestionsData((prev) =>
                              prev.map((qd) =>
                                qd.id === obj.id
                                  ? {
                                      ...qd,
                                      answerFieldValue: e.target.value,
                                    }
                                  : qd
                              )
                            );
                          }}
                          value={questionsData[i].answerFieldValue}
                        ></Input>
                        <div>
                          <Form.Item
                            style={{ marginBottom: 0 }}
                            name={`question${i + 1}Answers`}
                            rules={[
                              () => ({
                                validator() {
                                  if (
                                    questionsData[i].answervariants.length !== 0
                                  ) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(
                                    new Error(
                                      "Должен быть хотя бы один вариант ответа"
                                    )
                                  );
                                },
                              }),
                              () => ({
                                validator() {
                                  if (questionsData[i].type === "one") {
                                    if (
                                      questionsData[i].answervariants.filter(
                                        (av) => av.points !== 0
                                      ).length !== 1
                                    ) {
                                      console.log("Что-то пошло не так");
                                      console.log(
                                        questionsData[i].answervariants
                                      );
                                      console.log(
                                        questionsData[i].answervariants.filter(
                                          (av) => av.points !== 0
                                        ).length
                                      );
                                      return Promise.reject(
                                        new Error(
                                          "Должен быть только один ответ с ненулевым числом баллов"
                                        )
                                      );
                                    } else {
                                      return Promise.resolve();
                                    }
                                  } else {
                                    return Promise.resolve();
                                  }
                                },
                              }),
                            ]}
                          >
                            <div className="h-[1px] scroll-m-[114px]"></div>
                            {questionsData[i].answervariants.map((ans, j) => (
                              <div
                                className="flex w-full items-center"
                                key={ans.id}
                              >
                                <p className="font-onest font-medium text-[20px]/[25.5px] w-[60%]">
                                  {ans.text}
                                </p>
                                <div className="ml-auto mr-[8px]">
                                  <label className="font-onest font-normal text-black text-[16px]/[20.4px] underline cursor-pointer">
                                    <input
                                      type="file"
                                      className="!hidden"
                                      onChange={(e) => {
                                        var reader = new FileReader();
                                        if (e.target.files) {
                                          reader.readAsDataURL(
                                            e.target.files[0]
                                          );
                                          reader.onload = () => {
                                            console.log(reader.result);
                                            setQuestionsData((prev) =>
                                              prev.map((qd) =>
                                                qd.id === obj.id
                                                  ? {
                                                      ...qd,
                                                      answervariants:
                                                        qd.answervariants.map(
                                                          (variant) =>
                                                            variant.id ===
                                                            ans.id
                                                              ? {
                                                                  ...ans,
                                                                  images: [
                                                                    {
                                                                      image:
                                                                        reader.result as string,
                                                                    },
                                                                  ],
                                                                }
                                                              : variant
                                                        ),
                                                    }
                                                  : qd
                                              )
                                            );
                                          };
                                        } else {
                                          console.log("Удаляем файл");
                                        }
                                      }}
                                    ></input>
                                    Загрузить изображение
                                  </label>
                                </div>
                                <Form.Item
                                  style={{ margin: 0 }}
                                  name={`question${i + 1}Ans${
                                    ans.variantNumber
                                  }Point`}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Не указан балл за ответ",
                                    },
                                    {
                                      pattern: /^\d+$/,
                                      message: "Некорректный ввод",
                                    },
                                  ]}
                                  className="w-[10%]"
                                >
                                  <Input
                                    placeholder="Балл"
                                    value={
                                      questionsData[i].answervariants.find(
                                        (ansvar) => ansvar.id === ans.id
                                      )?.points
                                    }
                                    onChange={(e) => {
                                      setQuestionsData((prev) =>
                                        prev.map((qd) =>
                                          qd.id === obj.id
                                            ? {
                                                ...qd,
                                                answervariants:
                                                  qd.answervariants.map(
                                                    (variant) =>
                                                      variant.id === ans.id
                                                        ? {
                                                            ...ans,
                                                            points: parseInt(
                                                              e.target.value
                                                            ),
                                                          }
                                                        : variant
                                                  ),
                                              }
                                            : qd
                                        )
                                      );
                                    }}
                                  ></Input>
                                </Form.Item>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setQuestionsData((prev) =>
                                      prev.map((qd) =>
                                        qd.id === obj.id
                                          ? {
                                              ...qd,
                                              answervariants:
                                                qd.answervariants.filter(
                                                  (variant) =>
                                                    variant.id !== ans.id
                                                ),
                                            }
                                          : qd
                                      )
                                    );
                                  }}
                                >
                                  <DeleteIcon visible />
                                </button>
                              </div>
                            ))}
                          </Form.Item>
                        </div>
                      </div>
                    ) : questionsData[i].type === "open" ? (
                      <>
                        <div className="flex flex-col gap-[12px]">
                          <p className="font-onest font-medium text-[20px]/[25.5px]">
                            Правильные ответы
                          </p>
                          <Input
                            className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                            placeholder="Введите правильный ответ"
                            onPressEnter={() => {
                              setQuestionsData((prev) =>
                                prev.map((qd) =>
                                  qd.id === obj.id
                                    ? {
                                        ...qd,
                                        answerFieldValue: "",
                                        correctAnswers: [
                                          ...qd.correctAnswers,
                                          {
                                            id: uuid(),
                                            text: qd.answerFieldValue,
                                            points: 0,
                                          },
                                        ],
                                      }
                                    : qd
                                )
                              );
                            }}
                            onChange={(e) => {
                              setQuestionsData((prev) =>
                                prev.map((qd) =>
                                  qd.id === obj.id
                                    ? {
                                        ...qd,
                                        answerFieldValue: e.target.value,
                                      }
                                    : qd
                                )
                              );
                            }}
                            value={questionsData[i].answerFieldValue}
                          ></Input>
                          {questionsData[i].correctAnswers.map((ans, j) => (
                            <div
                              className="flex w-full items-center"
                              key={ans.id}
                            >
                              <p className="font-onest font-medium text-[20px]/[25.5px] w-[60%]">
                                {ans.text}
                              </p>
                              <div className="ml-auto flex gap-[8px] items-center w-[15%]">
                                <Form.Item
                                  style={{
                                    margin: 0,
                                  }}
                                  name={`question${i + 1}DirectAns${
                                    j + 1
                                  }Point`}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Не указан балл за ответ",
                                    },
                                    {
                                      pattern: /^\d+$/,
                                      message: "Некорректный ввод",
                                    },
                                  ]}
                                  className=""
                                >
                                  <Input
                                    placeholder="Балл"
                                    onChange={(e) => {
                                      setQuestionsData((prev) =>
                                        prev.map((qd) =>
                                          qd.id === obj.id
                                            ? {
                                                ...qd,
                                                correctAnswers:
                                                  qd.correctAnswers.map(
                                                    (variant) =>
                                                      variant.id === ans.id
                                                        ? {
                                                            ...ans,
                                                            points: parseInt(
                                                              e.target.value
                                                            ),
                                                          }
                                                        : variant
                                                  ),
                                              }
                                            : qd
                                        )
                                      );
                                    }}
                                  ></Input>
                                </Form.Item>
                                <button
                                  className="ml-auto"
                                  type="button"
                                  onClick={() => {
                                    setQuestionsData((prev) =>
                                      prev.map((qd) =>
                                        qd.id === obj.id
                                          ? {
                                              ...qd,
                                              correctAnswers:
                                                qd.correctAnswers.filter(
                                                  (cor) => cor.id !== ans.id
                                                ),
                                            }
                                          : qd
                                      )
                                    );
                                  }}
                                >
                                  <DeleteIcon visible />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <Form.Item
                          style={{ margin: 0 }}
                          name={`question${i + 1}MatchPairs`}
                          rules={[
                            () => ({
                              validator() {
                                if (questionsData[i].matchPairs.length !== 0) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error("Должна быть хотя бы одна пара")
                                );
                              },
                            }),
                          ]}
                        >
                          {questionsData[i].matchPairs.map((mp, j) => (
                            <>
                              <div className="flex w-full gap-[10px] items-center">
                                <Form.Item
                                  style={{
                                    margin: 0,
                                  }}
                                  name={`question${i + 1}MatchPair${
                                    j + 1
                                  }TextOne`}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Не указан текст первой пары",
                                    },
                                  ]}
                                  className="w-[40%]"
                                >
                                  <Input
                                    className="mr-auto"
                                    value={mp.firstText}
                                    onChange={(e) => {
                                      setQuestionsData((prev) =>
                                        prev.map((qd) =>
                                          qd.id === obj.id
                                            ? {
                                                ...qd,
                                                matchPairs: qd.matchPairs.map(
                                                  (pair) =>
                                                    pair.id === mp.id
                                                      ? {
                                                          ...pair,
                                                          firstText:
                                                            e.target.value,
                                                        }
                                                      : pair
                                                ),
                                              }
                                            : qd
                                        )
                                      );
                                    }}
                                  ></Input>
                                </Form.Item>
                                <Form.Item
                                  style={{
                                    margin: 0,
                                  }}
                                  name={`question${i + 1}MatchPair${
                                    j + 1
                                  }textSecond`}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Не указан текст второй пары",
                                    },
                                  ]}
                                  className="w-[40%] flex flex-col"
                                >
                                  <Input
                                    className="ml-auto"
                                    value={mp.secondText}
                                    onChange={(e) => {
                                      setQuestionsData((prev) =>
                                        prev.map((qd) =>
                                          qd.id === obj.id
                                            ? {
                                                ...qd,
                                                matchPairs: qd.matchPairs.map(
                                                  (pair) =>
                                                    pair.id === mp.id
                                                      ? {
                                                          ...pair,
                                                          secondText:
                                                            e.target.value,
                                                        }
                                                      : pair
                                                ),
                                              }
                                            : qd
                                        )
                                      );
                                    }}
                                  ></Input>
                                </Form.Item>
                                <Form.Item
                                  style={{
                                    margin: 0,
                                  }}
                                  name={`question${i + 1}MatchPair${
                                    j + 1
                                  }Point`}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Не указан балл за ответ",
                                    },
                                    {
                                      pattern: /^\d+$/,
                                      message: "Некорректный ввод",
                                    },
                                  ]}
                                  className=""
                                >
                                  <Input
                                    placeholder="Балл"
                                    onChange={(e) => {
                                      setQuestionsData((prev) =>
                                        prev.map((qd) =>
                                          qd.id === obj.id
                                            ? {
                                                ...qd,
                                                matchPairs: qd.matchPairs.map(
                                                  (pair) =>
                                                    pair.id === mp.id
                                                      ? {
                                                          ...pair,
                                                          points: parseInt(
                                                            e.target.value
                                                          ),
                                                        }
                                                      : pair
                                                ),
                                              }
                                            : qd
                                        )
                                      );
                                    }}
                                  ></Input>
                                </Form.Item>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setQuestionsData((prev) =>
                                      prev.map((qd) =>
                                        qd.id === obj.id
                                          ? {
                                              ...qd,
                                              matchPairs: qd.matchPairs.filter(
                                                (pair) => pair.id !== mp.id
                                              ),
                                            }
                                          : qd
                                      )
                                    );
                                  }}
                                >
                                  <DeleteIcon visible />
                                </button>
                              </div>
                              <div className="flex w-full">
                                <label className="font-onest font-normal text-black text-[16px]/[20.4px] underline cursor-pointer w-[40%]">
                                  <input
                                    type="file"
                                    className="!hidden"
                                    onChange={(e) => {
                                      var reader = new FileReader();
                                      if (e.target.files) {
                                        reader.readAsDataURL(e.target.files[0]);
                                        reader.onload = () => {
                                          console.log(reader.result);
                                          setQuestionsData((prev) =>
                                            prev.map((qd) =>
                                              qd.id === obj.id
                                                ? {
                                                    ...qd,
                                                    matchPairs:
                                                      qd.matchPairs.map(
                                                        (pair) =>
                                                          pair.id === mp.id
                                                            ? {
                                                                ...pair,
                                                                firstImage:
                                                                  reader.result as string,
                                                              }
                                                            : pair
                                                      ),
                                                  }
                                                : qd
                                            )
                                          );
                                        };
                                      } else {
                                        console.log("Удаляем файл");
                                      }
                                    }}
                                  ></input>
                                  Загрузить изображение
                                </label>
                                <label className="font-onest font-normal text-black text-[16px]/[20.4px] underline cursor-pointer w-[40%]">
                                  <input
                                    type="file"
                                    className="!hidden"
                                    onChange={(e) => {
                                      var reader = new FileReader();
                                      if (e.target.files) {
                                        reader.readAsDataURL(e.target.files[0]);
                                        reader.onload = () => {
                                          console.log(reader.result);
                                          setQuestionsData((prev) =>
                                            prev.map((qd) =>
                                              qd.id === obj.id
                                                ? {
                                                    ...qd,
                                                    matchPairs:
                                                      qd.matchPairs.map(
                                                        (pair) =>
                                                          pair.id === mp.id
                                                            ? {
                                                                ...pair,
                                                                secondImage:
                                                                  reader.result as string,
                                                              }
                                                            : pair
                                                      ),
                                                  }
                                                : qd
                                            )
                                          );
                                        };
                                      } else {
                                        console.log("Удаляем файл");
                                      }
                                    }}
                                  ></input>
                                  Загрузить изображение
                                </label>
                              </div>
                            </>
                          ))}
                        </Form.Item>
                        <Button
                          type="primary"
                          className="mx-auto"
                          onClick={() => {
                            setQuestionsData((prev) =>
                              prev.map((qd) =>
                                qd.id === obj.id
                                  ? {
                                      ...qd,
                                      answerFieldValue: "",
                                      matchPairs: [
                                        ...qd.matchPairs,
                                        {
                                          id: uuid(),
                                          firstText: "",
                                          secondText: "",
                                          firstImage: "",
                                          secondImage: "",
                                          points: 0,
                                        },
                                      ],
                                    }
                                  : qd
                              )
                            );
                          }}
                        >
                          Добавить
                        </Button>
                      </>
                    )}
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
                  submit={true}
                  type="BLUE"
                  onClick={() => {}}
                />
              </div>
            </>
          </Form>
        ) : (
          <Form
            onFinish={() => {
              console.log({
                title: testName,
                description: "",
                targetAudience: schoolLevel,
                organizationType: props.type,
                pointsRating: ratePhrases,
                oneSelectedAnswerQuestions: questionsData
                  .filter((qd) => qd.type === "one")
                  .map((qd, i) => ({
                    questionNumber:
                      questionsData.indexOf(
                        questionsData.find((question) => question.id === qd.id)!
                      ) + 1,
                    text: qd.description,
                    image: qd.image,
                    answerVariants: qd.answervariants,
                  })),
                manySelectedAnswerQuestions: questionsData
                  .filter((qd) => qd.type === "several")
                  .map((qd, i) => ({
                    questionNumber:
                      questionsData.indexOf(
                        questionsData.find((question) => question.id === qd.id)!
                      ) + 1,
                    text: qd.description,
                    image: qd.image,
                    answerVariants: qd.answervariants,
                  })),
                inputQuestions: questionsData
                  .filter((qd) => qd.type === "open")
                  .map((qd, i) => ({
                    questionNumber:
                      questionsData.indexOf(
                        questionsData.find((question) => question.id === qd.id)!
                      ) + 1,
                    text: qd.description,
                    image: qd.image,
                    answerVariants: qd.correctAnswers,
                  })),
                matchQuestions: questionsData
                  .filter((qd) => qd.type === "match")
                  .map((qd, i) => ({
                    questionNumber:
                      questionsData.indexOf(
                        questionsData.find((question) => question.id === qd.id)!
                      ) + 1,
                    text: qd.description,
                    image: qd.image,
                    pairs: qd.matchPairs,
                  })),
              });
              addTest({
                title: testName,
                description: "Описание теста",
                targetAudience: schoolLevel,
                organizationType: props.type,
                pointsRating: ratePhrases.map((phrase) => {
                  const { id, ...rest } = phrase;
                  return rest;
                }),
                oneSelectAnswerQuestions: questionsData
                  .filter((qd) => qd.type === "one")
                  .map((qd) => ({
                    questionNumber:
                      questionsData.indexOf(
                        questionsData.find((question) => question.id === qd.id)!
                      ) + 1,
                    text: qd.description,
                    image: qd.image,
                    answerVariants: qd.answervariants.map((ansvar) => {
                      const { id, correct, ...rest } = ansvar;
                      return rest;
                    }),
                  })),
                manySelectAnswerQuestions: questionsData
                  .filter((qd) => qd.type === "several")
                  .map((qd) => ({
                    questionNumber:
                      questionsData.indexOf(
                        questionsData.find((question) => question.id === qd.id)!
                      ) + 1,
                    text: qd.description,
                    image: qd.image,
                    answerVariants: qd.answervariants.map((ansvar) => {
                      const { id, correct, ...rest } = ansvar;
                      return rest;
                    }),
                  })),
                inputQuestions: questionsData
                  .filter((qd) => qd.type === "open")
                  .map((qd) => ({
                    questionNumber:
                      questionsData.indexOf(
                        questionsData.find((question) => question.id === qd.id)!
                      ) + 1,
                    text: qd.description,
                    image: qd.image,
                    answerVariants: qd.correctAnswers.map((ansvar) => {
                      const { id, ...rest } = ansvar;
                      return rest;
                    }),
                  })),
                matchQuestions: questionsData
                  .filter((qd) => qd.type === "match")
                  .map((qd) => ({
                    questionNumber:
                      questionsData.indexOf(
                        questionsData.find((question) => question.id === qd.id)!
                      ) + 1,
                    text: qd.description,
                    image: qd.image,
                    pairs: qd.matchPairs.map((matchpair) => {
                      const { id, ...rest } = matchpair;
                      return rest;
                    }),
                  })),
              })
                .unwrap()
                .then(() => {
                  refetch()
                    .unwrap()
                    .then(() => {
                      navigate("/admin/employees");
                      setIsModalOpen(false);
                      setTimeout(() => {
                        navigate("/admin/tests");
                      }, 0);
                    });
                });
            }}
            layout="vertical"
            className="flex flex-col gap-[32px]"
          >
            <>
              <p className="mr-auto font-onest font-bold text-[28px]/[35.7px]">
                Добавить тест
              </p>
              <div className="flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[12px]">
                  <p className="font-onest font-medium text-[20px]/[25.5px]">
                    Критерии оценки
                  </p>
                  <div className="flex gap-[16px] font-onest font-normal text-[16px]/[20.4px] text-black">
                    <p>
                      <span className="text-[#009EEB] font-bold">0-19</span> —
                      «Нормально»
                    </p>
                    <p>
                      <span className="text-[#009EEB] font-bold">20-59</span> —
                      «Хорошо»
                    </p>
                    <p>
                      <span className="text-[#009EEB] font-bold">60+</span> —
                      «Отлично»
                    </p>
                  </div>
                  <div className="flex flex-col gap-[16px]">
                    <Form.Item
                      name={`ratePhrases`}
                      style={{ margin: 0 }}
                      rules={[
                        () => ({
                          validator() {
                            if (ratePhrases.length !== 0) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Должна быть хотя бы одна оценка")
                            );
                          },
                        }),
                      ]}
                    >
                      {ratePhrases.map((rtp, i) => (
                        <>
                          <div className="flex items-center gap-[16px]">
                            <Form.Item
                              name={`ratePhrase${i}`}
                              style={{ margin: 0 }}
                              rules={[
                                { required: true, message: "Не указан балл" },
                                {
                                  pattern: /^\d+$/,
                                  message: "Некорректный ввод",
                                },
                              ]}
                            >
                              <Input
                                placeholder="Введите балл"
                                value={rtp.points}
                                onChange={(e) => {
                                  setRatePhrases((prev) =>
                                    prev.map((phr) =>
                                      phr.id === rtp.id
                                        ? {
                                            ...phr,
                                            points: parseInt(e.target.value),
                                          }
                                        : phr
                                    )
                                  );
                                }}
                              ></Input>
                            </Form.Item>
                            <Input
                              placeholder="Введите оценку"
                              value={rtp.message}
                              onChange={(e) => {
                                setRatePhrases((prev) =>
                                  prev.map((phr) =>
                                    phr.id === rtp.id
                                      ? { ...phr, message: e.target.value }
                                      : phr
                                  )
                                );
                              }}
                            ></Input>
                            <button
                              type="button"
                              onClick={() => {
                                setRatePhrases((prev) =>
                                  prev.filter((phr) => phr.id !== rtp.id)
                                );
                              }}
                            >
                              <DeleteIcon visible />
                            </button>
                          </div>
                        </>
                      ))}
                    </Form.Item>
                  </div>
                  <Button
                    className="mx-auto"
                    type="primary"
                    onClick={() => {
                      setRatePhrases((prev) => [
                        ...prev,
                        { id: uuid(), points: 0, message: "" },
                      ]);
                    }}
                  >
                    Добавить
                  </Button>
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
                  submit={true}
                  type="BLUE"
                  onClick={() => {}}
                />
              </div>
            </>
          </Form>
        )}
      </Modal>
      <div className="mx-auto">
        <CustomButton
          text="ДОБАВИТЬ ТЕСТ"
          type="BLUE"
          onClick={() => {
            setIsModalOpen(true);
          }}
          submit={false}
        />
      </div>
    </>
  );
};
