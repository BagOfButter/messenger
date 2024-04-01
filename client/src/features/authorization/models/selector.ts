import { RootState } from "@lib/redux/store";

export const selectAuth = (state: RootState) => state.authState;

export const selectAccessToken = (state: RootState) =>
  selectAuth(state).accessToken;

export const selectIsLoggedIn = (state: RootState) =>
  selectAuth(state).isLoggedIn;
