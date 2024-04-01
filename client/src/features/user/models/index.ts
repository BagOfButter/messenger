import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "@features/user/models/types";

const initialState: InitialState = {
  userId: null,
  username: null,
};

export const UserSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserId: (state, { payload }: PayloadAction<string | null>) => {
      state.userId = payload;
    },
    setUsername: (state, { payload }: PayloadAction<string | null>) => {
      state.username = payload;
    },
    setUser: (
      state,
      { payload }: PayloadAction<{ userId: string; username: string }>
    ) => {
      const { userId, username } = payload;
      state.userId = userId;
      state.username = username;
    },
    removeUser: (state) => {
      state.userId = null;
      state.username = null;
    },
  },
});

export const UserActions = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
