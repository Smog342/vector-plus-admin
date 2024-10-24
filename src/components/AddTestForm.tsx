import { useEffect, useRef, useState } from "react";
import { CustomButton } from "./CustomButton";
import { useLocation, useNavigate } from "react-router-dom";
import { RadioEmpty } from "../icons/RadioEmpty";
import { RadioChecked } from "../icons/RadioChecked";
import { SchoolLevel, SchoolType } from "../types";
import { useCreateTestMutation, useGetTestsQuery } from "../store/api/mainApi";
import uuid from "react-uuid";
import { DeleteIcon } from "../icons/DeleteIcon";
import { Modal, Form, Input, Radio } from "antd";

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
    }[]
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
            onFinish={(values) => {
              //console.log(values);
              console.log(questionsData);
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
                      <Form.Item
                        style={{ marginBottom: 0 }}
                        name={`question${i + 1}Type`}
                      >
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
                                    qd.id === obj.id
                                      ? { ...qd, type: "one" }
                                      : qd
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
                      </Form.Item>
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
                    ) : (
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
            onFinish={(values) => {
              console.log(values);
              navigate("/admin/tests/1");
            }}
            layout="vertical"
            className="flex flex-col gap-[32px]"
          ></Form>
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
                  {props.type === "SCHOOL" ? (
                    <div className="flex flex-col gap-[12px]">
                      <p className="font-onest font-medium text-[20px]/[25.5px]">
                        Целевая аудитория
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
                    <input
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
                    ></input>
                  </div>
                </div>
                <div className="mx-auto">
                  <CustomButton
                    type="BLUE"
                    text="ПРОДОЛЖИТЬ"
                    onClick={() => {
                      setQuestionsData(
                        Array.from({ length: questionsNumber }, () => ({
                          id: uuid(),
                          description: "",
                          type: "one",
                          points: 0,
                          answervariants: [],
                          answerFieldValue: "",
                          correctAnswers: [],
                          oneCorrectAnswer: "",
                        }))
                      );
                      console.log(questionsData);
                      navigate("/admin/tests/1");
                    }}
                    submit={false}
                  />
                </div>
              </>
            ) : pathname === "/admin/tests/1" ? (
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
                        <input
                          className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
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
                        ></input>
                      </div>
                      <div className="flex flex-col gap-[12px]">
                        <p className="font-onest font-medium text-[20px]/[25.5px]">
                          Тип вопроса
                        </p>
                        <div className="flex gap-[24px] flex-wrap">
                          <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                            <input
                              type="radio"
                              value={"one"}
                              className="hidden"
                              name={`question${i + 1}Type`}
                              onChange={() => {
                                setQuestionsData((prev) =>
                                  prev.map((qd) =>
                                    qd.id === obj.id
                                      ? { ...qd, type: "one" }
                                      : qd
                                  )
                                );
                              }}
                            ></input>
                            {questionsData[i].type === "one" ? (
                              <RadioChecked />
                            ) : (
                              <RadioEmpty />
                            )}
                            Один правильный вариант
                          </label>
                          <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                            <input
                              type="radio"
                              value={"open"}
                              className="hidden"
                              name={`question${i + 1}Type`}
                              onChange={() => {
                                setQuestionsData((prev) =>
                                  prev.map((qd) =>
                                    qd.id === obj.id
                                      ? { ...qd, type: "open" }
                                      : qd
                                  )
                                );
                              }}
                            ></input>
                            {questionsData[i].type === "open" ? (
                              <RadioChecked />
                            ) : (
                              <RadioEmpty />
                            )}
                            Ввод текста
                          </label>
                          <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                            <input
                              type="radio"
                              value={"match"}
                              name={`question${i + 1}Type`}
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
                            ></input>
                            {questionsData[i].type === "match" ? (
                              <RadioChecked />
                            ) : (
                              <RadioEmpty />
                            )}
                            Сопоставление
                          </label>
                          <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                            <input
                              type="radio"
                              value={"several"}
                              name={`question${i + 1}Type`}
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
                            ></input>
                            {questionsData[i].type === "several" ? (
                              <RadioChecked />
                            ) : (
                              <RadioEmpty />
                            )}
                            Несколько правильных вариантов
                          </label>
                        </div>
                      </div>
                      {questionsData[i].type === "several" ||
                      questionsData[i].type === "one" ? (
                        <div className="flex flex-col gap-[12px]">
                          <p className="font-onest font-medium text-[20px]/[25.5px]">
                            Варианты ответов
                          </p>
                          <input
                            className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                            placeholder="Введите возможный вариант"
                            onKeyUp={(e) => {
                              e.preventDefault();
                              if (e.code === "Enter") {
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
                                            },
                                          ],
                                        }
                                      : qd
                                  )
                                );
                              }
                              console.log(e.code);
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
                          ></input>
                          {questionsData[i].answervariants.map((ans, j) => (
                            <div
                              className="flex w-full items-center"
                              key={ans.id}
                            >
                              <p className="font-onest font-medium text-[20px]/[25.5px] w-[60%]">
                                {ans.text}
                              </p>
                              <div className="ml-auto flex gap-[8px]">
                                <input
                                  placeholder="Ссылка на изображение"
                                  className=""
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
                                                          images: [
                                                            {
                                                              image:
                                                                e.target.value,
                                                            },
                                                          ],
                                                        }
                                                      : variant
                                                ),
                                            }
                                          : qd
                                      )
                                    );
                                  }}
                                ></input>
                                {questionsData[i].type === "several" ? (
                                  <button
                                    onClick={() => {
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
                                                            correct:
                                                              !ans.correct,
                                                          }
                                                        : variant
                                                  ),
                                              }
                                            : qd
                                        )
                                      );
                                    }}
                                    type="button"
                                    className=""
                                  >
                                    {ans.correct ? (
                                      <RadioChecked />
                                    ) : (
                                      <RadioEmpty />
                                    )}
                                  </button>
                                ) : (
                                  <label className="flex items-center gap-[8px] font-onest font-normal text-black text-[16px]/[20.4px]">
                                    <input
                                      type="radio"
                                      value={
                                        questionsData[i].answervariants[j].text
                                      }
                                      name={`question${i + 1}OneAnswerOnly`}
                                      onChange={() => {
                                        setQuestionsData((prev) =>
                                          prev.map((qd) =>
                                            qd.id === obj.id
                                              ? {
                                                  ...qd,
                                                  oneCorrectAnswer: `${questionsData[i].answervariants[j].text}`,
                                                }
                                              : qd
                                          )
                                        );
                                      }}
                                      className="hidden"
                                    ></input>
                                    {questionsData[i].oneCorrectAnswer ===
                                    `${questionsData[i].answervariants[j].text}` ? (
                                      <RadioChecked />
                                    ) : (
                                      <RadioEmpty />
                                    )}
                                  </label>
                                )}
                              </div>
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
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-col gap-[12px]">
                            <p className="font-onest font-medium text-[20px]/[25.5px]">
                              Правильные ответы
                            </p>
                            <input
                              className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                              placeholder="Введите правильный ответ"
                              onKeyUp={(e) => {
                                e.preventDefault();
                                if (e.code === "Enter") {
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
                                              },
                                            ],
                                          }
                                        : qd
                                    )
                                  );
                                }
                                console.log(e.code);
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
                            ></input>
                            {questionsData[i].correctAnswers.map((ans) => (
                              <div
                                className="flex w-full items-center"
                                key={ans.id}
                              >
                                <p className="font-onest font-medium text-[20px]/[25.5px] w-[60%]">
                                  {ans.text}
                                </p>
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
                            ))}
                          </div>
                        </>
                      )}
                      <div className="flex flex-col gap-[12px]">
                        <p className="font-onest font-medium text-[20px]/[25.5px]">
                          Балл за ответ
                        </p>
                        <input
                          className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                          placeholder="Введите балл за ответ"
                          onChange={(e) => {
                            setQuestionsData((prev) =>
                              prev.map((qd) =>
                                qd.id === obj.id
                                  ? { ...qd, points: parseInt(e.target.value) }
                                  : qd
                              )
                            );
                          }}
                          value={
                            Number.isNaN(questionsData[i].points)
                              ? ""
                              : questionsData[i].points
                          }
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
                      Описание
                    </p>
                    <textarea
                      className="bg-[#EFF3F6] rounded-[12px] py-[16px] px-[24px] placeholder:font-onest placeholder:font-normal placeholder:text-[16px]/[20.4px] placeholder:text-[#B1C5D3] font-onest font-normal text-[16px]/[20.4px] text-black focus:outline-none focus:border focus:border-[#009EEB]"
                      placeholder="Введите описание теста"
                      value={ratePhrase}
                      onChange={(e) => setRatePhrase(e.target.value)}
                    ></textarea>
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
                      addTest({
                        title: testName,
                        description: ratePhrase,
                        targetAudience: schoolLevel,
                        organizationType: props.type,
                        pointsRating: [],
                        oneSelectedAnswerQuestions: [],
                        manySelectedAnswerQuestions: [],
                        inputQuestions: [],
                        matchQuestions: [],
                      }).then(() => {
                        refetch().then(() => {
                          setTestName("");
                          setQuestionsNumber(0);
                          setSchoolLevel("");
                          setRatePhrase("");
                          setQuestionsFieldValue("");
                          navigate("/admin/tests");
                          dialog.current?.close();
                        });
                      });
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
