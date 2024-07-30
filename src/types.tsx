export type ButtonProps = {
  type: "BLUE" | "WHITE";
  text: string;
  onClick: Function;
  submit: boolean;
};

export type SchoolType = "SCHOOL" | "PRESCHOOL";

export type TestDataType = {
  id: number;
  name: string;
  grade: string;
  school: SchoolType;
  questionNumber: number;
  rate: string;
  visible: boolean;
};
