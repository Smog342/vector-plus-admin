import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { accessToken: string } = { accessToken: "" };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    logOut: (state) => {
      state.accessToken = "";
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
