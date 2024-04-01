import { put, takeLatest, all, call } from "redux-saga/effects";
import { settingsActions } from "@features/settings/models/actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { loadSettings as loadSettingsApi } from "@widgets/LoginForm/api/loadSettings";
import { setTheme as setColorThemeApi } from "@widgets/ThemeSettings/api/setTheme";
import { setFont as setFontSizeApi } from "@widgets/FontSettings/api/setFont";

function* setColorThemeWorker({ payload }: PayloadAction<string>): Generator {
  try {
    yield call(setColorThemeApi, payload);
    yield put(settingsActions.setColorTheme(payload));
  } catch (error) {
    console.error("Error setting color theme:", error.message);
  }
}

function* setFontSizeWorker({ payload }: PayloadAction<string>): Generator {
  try {
    yield call(setFontSizeApi, payload);
    yield put(settingsActions.setFontSize(payload));
  } catch (error) {
    console.error("Error setting font size:", error.message);
  }
}

function* setSettingsWorker({ payload }: PayloadAction<string>): Generator {
  try {
    const response = yield call(loadSettingsApi, payload);
    const colorTheme: string = response.data.colorTheme;
    const fontSize: string = response.data.fontSize;

    yield put(settingsActions.setSettings({ colorTheme, fontSize }));
  } catch (error) {
    console.error("Loading settings failed:", error.message);
  }
}

function* watchSettings(): Generator {
  yield takeLatest(settingsActions.setColorTheme.type, setColorThemeWorker);
  yield takeLatest(settingsActions.setFontSize.type, setFontSizeWorker);
  yield takeLatest(settingsActions.setSettings.type, setSettingsWorker);
}

export function* settingsSagas(): Generator {
  yield all([watchSettings()]);
}
