import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loggedUser = window.localStorage.getItem("loggedWeatherAppUser");
const initialState = loggedUser ? JSON.parse(loggedUser) : null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(_state, action) {
      return action.payload;
    },
    updateUser(state, action) {
      return { ...state, ...action.payload };
    },
    logout() {
      return null;
    },
  },
});
export const { setUser, updateUser, logout } = userSlice.actions;

export default userSlice.reducer;
