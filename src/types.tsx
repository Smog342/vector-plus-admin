export type ButtonProps = {
  type: "BLUE" | "WHITE";
  text: string;
  onClick: Function;
  submit: boolean;
};

export type SchoolType = "SCHOOL" | "KINDERGARTEN";
export type SchoolLevel =
  | "JUNIOR"
  | "MIDDLE"
  | "HIGHSCHOOL"
  | "GROUP 1"
  | "GROUP 2"
  | "GROUP 3";

export type TestDataType = {
  id: number;
  title: string;
  targetAudience: SchoolLevel;
  organizationType: SchoolType;
  numberOfQuestions: number;
  status: "ACTIVE" | "DISABLED";
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

export type EmployeeType = {
  id: number;
  role: string;
  username: string;
  organizationName: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  birthDate: string;
};

export type AddEmployeeType = {
  username: string;
  password: string;
  organizationId: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  birthDate: string;
  education: string;
  workPlace: string;
  workPosition: string;
  workExperience: number;
};

type BaseQuestionType = {
  questionNumber: number;
  text: string;
  image: string;
};

type BaseAnswerType = {
  images: { image: string }[];
  text: string;
  variantNumber: number;
  points: number;
};

type BaseMatchType = {
  firstImage: string;
  firstText: string;
  secondImage: string;
  secondText: string;
  points: number;
};

export type AddTestData = {
  title: string;
  description: string;
  targetAudience: string;
  organizationType: string;
  pointsRating: {
    points: number;
    message: string;
  }[];
  oneSelectAnswerQuestions: {
    questionNumber: number;
    text: string;
    image: string;
    answerVariants: BaseAnswerType[];
  }[];
  manySelectAnswerQuestions: {
    questionNumber: number;
    text: string;
    image: string;
    answerVariants: BaseAnswerType[];
  }[];
  inputQuestions: {
    questionNumber: number;
    text: string;
    image: string;
    answerVariants: Omit<BaseAnswerType, "variantNumber" | "images">[];
  }[];
  matchQuestions: {
    questionNumber: number;
    text: string;
    image: string;
    pairs: BaseMatchType[];
  }[];
};
