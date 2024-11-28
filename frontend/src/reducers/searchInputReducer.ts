import { createSlice } from "@reduxjs/toolkit";

interface InputState {
  value: string;
}

const initialState: InputState = {
  value: "",
};

const searchInputSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    onSubmit: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default searchInputSlice.reducer;
export const { onSubmit } = searchInputSlice.actions;
