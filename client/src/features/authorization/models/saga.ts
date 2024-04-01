import { put, takeLatest, all, call } from "redux-saga/effects";
import { loginUser as loginUserApi } from "@widgets/LoginForm/api/login";
import { logoutUser as logoutUserApi } from "@widgets/LogoutButton/api/logout";
import { authActions } from "@features/authorization/models/actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoginFormInput } from "@widgets/LoginForm/models/types";

function* loginUserWorker({
  payload,
}: PayloadAction<LoginFormInput>): Generator {
  try {
    const response = yield call([null, loginUserApi], { ...payload });
    const accessToken: string = response.data.accessToken;

    yield put(authActions.login(accessToken));
  } catch (error) {
    console.error("Login failed:", error.message);
  }
}

function* logoutUserWorker({ payload }: PayloadAction<string>): Generator {
  try {
    const response = yield call(logoutUserApi, payload);

    yield put(authActions.logout());
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
}

function* watchAuth(): Generator {
  yield takeLatest(authActions.login.type, loginUserWorker);
  yield takeLatest(authActions.logout.type, logoutUserWorker);
}

export function* authSagas(): Generator {
  yield all([watchAuth()]);
}
