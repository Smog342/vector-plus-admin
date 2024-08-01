import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { searchString: string } = { searchString: "" };

const searchStringSlice = createSlice({
  name: "searchString",
  initialState,
  reducers: {
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
  },
});

export const { setSearchString } = searchStringSlice.actions;

export default searchStringSlice.reducer;
