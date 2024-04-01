import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "@features/settings/models/types";

const initialState: InitialState = {
  colorTheme:
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  fontSize: "medium",
};

export const SettingsSlice = createSlice({
  name: "settingsSlice",
  initialState,
  reducers: {
    setColorTheme: (state, { payload }: PayloadAction<string>) => {
      state.colorTheme = payload;
    },
    setFontSize: (state, { payload }: PayloadAction<string>) => {
      state.fontSize = payload;
    },
    setSettings: (
      state,
      { payload }: PayloadAction<{ colorTheme: string; fontSize: string }>
    ) => {
      const { colorTheme, fontSize } = payload;
      state.colorTheme = colorTheme;
      state.fontSize = fontSize;
    },
    clearSettings: (state) => {
      state.colorTheme =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      state.fontSize = "medium";
    },
  },
});

export const SettingsActions = SettingsSlice.actions;
export const SettingsReducer = SettingsSlice.reducer;
