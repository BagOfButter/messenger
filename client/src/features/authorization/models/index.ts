import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "@features/authorization/models/types";

const initialState: InitialState = {
  accessToken: null,
  isLoggedIn: false,
};

export const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAccess: (state, { payload }: PayloadAction<string | null>) => {
      state.accessToken = payload;
    },
    changeLoggedIn: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoggedIn = payload;
    },
    login: (state, { payload }: PayloadAction<string | null>) => {
      state.accessToken = payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.accessToken = null;
      state.isLoggedIn = false;
    },
  },
});

export const AuthActions = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;
