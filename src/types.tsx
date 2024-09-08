export type ButtonProps = {
  type: "BLUE" | "WHITE";
  text: string;
  onClick: Function;
  submit: boolean;
};

export type SchoolType = "SCHOOL" | "PRESCHOOL";
export type SchoolLevel = "JUNIOR" | "MIDDLE" | "HIGHSCHOOL";

export type TestDataType = {
  id: number;
  name: string;
  grade: SchoolLevel;
  school: SchoolType;
  questionNumber: number;
  rate: string;
  visible: boolean;
};
