import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

const loggedUser = window.localStorage.getItem("loggedWeatherAppUser");
const initialState = JSON.parse(loggedUser) ?? null;
// const initialState =  null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(_state, action) {
      return action.payload;
    },
  },
});

export const setUserData = (user) => {
  return async (dispatch: Dispatch) => {
    dispatch(setUser(user));
  };
};

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
