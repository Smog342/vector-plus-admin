import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TestDataType } from "../../types";

const initialState: { tests: TestDataType[] } = {
  tests: [
    {
      id: 0,
      name: "Тест #1",
      grade: "1-4 класс",
      school: "SCHOOL",
      questionNumber: 5,
      rate: "100 - Отлично",
      visible: true,
    },
    {
      id: 1,
      name: "Тест #2",
      grade: "10-11 класс",
      school: "SCHOOL",
      questionNumber: 25,
      rate: "0 - Вы исключены",
      visible: true,
    },
  ],
};

const TestsSlice = createSlice({
  name: "TestSlice",
  initialState: initialState,
  reducers: {
    addTest: (state, action: PayloadAction<TestDataType>) => {
      state.tests.push(action.payload);
    },
    deleteTest: (state, action: PayloadAction<number>) => {
      state.tests = state.tests.filter((test) => {
        return test.id !== action.payload;
      });
    },
    changeTestVisibility: (state, action: PayloadAction<number>) => {
      let changedTest = state.tests.find((test) => test.id === action.payload);
      if (changedTest) {
        changedTest.visible = !changedTest.visible;
      }
      if (changedTest) {
        state = {
          ...state,
          tests: state.tests.map((test) =>
            test.id === action.payload ? changedTest : test
          ),
        };
      }
    },
  },
});

export const { addTest, deleteTest, changeTestVisibility } = TestsSlice.actions;
export default TestsSlice.reducer;
