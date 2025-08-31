// authSlice.js

import { IUser } from "@/types/user.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  user: IUser | null;
  token: string | null;
} = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, updateUser } = authSlice.actions;

export default authSlice.reducer;
