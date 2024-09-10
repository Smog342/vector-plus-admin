export type ButtonProps = {
  type: "BLUE" | "WHITE";
  text: string;
  onClick: Function;
  submit: boolean;
};

export type SchoolType = "SCHOOL" | "KINDERGARTEN";
export type SchoolLevel = "JUNIOR" | "MIDDLE" | "HIGHSCHOOL";

export type TestDataType = {
  id: number;
  title: string;
  targetAudience: SchoolLevel;
  organizationType: SchoolType;
  numberOfQuestions: number;
  status: boolean;
};

export type organizationDataType = {
  id: number;
  name: string;
  type: SchoolType;
  groups: [
    {
      id: number;
      name: string;
    }
  ];
};
