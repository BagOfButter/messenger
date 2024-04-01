import { put, takeLatest, all, call } from "redux-saga/effects";
import { loginUser as loginUserApi } from "@widgets/LoginForm/api/login";
import { logoutUser as logoutUserApi } from "@widgets/LogoutButton/api/logout";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoginFormInput } from "@widgets/LoginForm/models/types";
import { userActions } from "@features/user/models/actions";

function* setUserWorker({ payload }: PayloadAction<LoginFormInput>): Generator {
  try {
    const response = yield call([null, loginUserApi], { ...payload });
    const userId: string = response.data.userId;
    const username: string = response.data.username;

    yield put(userActions.setUser({ userId: userId, username: username }));
  } catch (error) {
    console.error("Login failed:", error.message);
  }
}

function* removeUserWorker({ payload }: PayloadAction<string>): Generator {
  try {
    const response = yield call(logoutUserApi, payload);

    yield put(userActions.removeUser());
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
}

function* watchAuth(): Generator {
  yield takeLatest(userActions.setUser.type, setUserWorker);
  yield takeLatest(userActions.removeUser.type, removeUserWorker);
}

export function* authSagas(): Generator {
  yield all([watchAuth()]);
}
