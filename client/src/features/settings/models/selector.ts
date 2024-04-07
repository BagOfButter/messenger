import { RootState } from "@lib/redux/store";

export const selectSettings = (state: RootState) => state.settingsState;

export const selectColorTheme = (state: RootState) =>
  selectSettings(state).colorTheme;

export const selectFontSize = (state: RootState) =>
  selectSettings(state).fontSize;
