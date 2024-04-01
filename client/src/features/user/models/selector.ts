import { RootState } from '@lib/redux/store';

export const selectUser = (state: RootState) => state.userState;

export const selectUserId = (state: RootState) => selectUser(state).userId;

export const selectUsername = (state: RootState) => selectUser(state).username;