import { RootState } from "@lib/redux/store";

export const selectSettins = (state: RootState) => state.settingsState;

export const selectColorTheme = (state: RootState) =>
  selectSettins(state).colorTheme;

export const selectFontSize = (state: RootState) =>
  selectSettins(state).fontSize;
