import { useAppDispatch } from "@shared/useAppDispatch/useAppDispatch";
import { useAppSelector } from "@shared/useAppSelector/useAppSelector";
import { selectColorTheme } from "@features/settings/models/selector";
import { selectUserId } from "@features/user/models/selector";
import { settingsActions } from "@features/settings/models/actions";
import { setTheme } from "@widgets/ThemeSettings/api/setTheme";
import {
  SettingsItem,
  SettingsName,
  SettingsRadioInput,
} from "@shared/SettingsItem/ui/styled";

const ThemeSettings = () => {
  const dispatch = useAppDispatch();
  const colorTheme = useAppSelector(selectColorTheme);
  const userId = useAppSelector(selectUserId);

  const handleThemeChange = async (e) => {
    const newTheme = e.target.value;
    try {
      await setTheme({ userId: userId, colorTheme: newTheme });
      dispatch(settingsActions.setColorTheme(newTheme));
    } catch (error) {
      console.error("Error updating theme on the server:", error);
    }
  };

  return (
    <SettingsItem>
      <SettingsName>Color Theme</SettingsName>
      <label>
        <SettingsRadioInput
          type="radio"
          value="light"
          checked={colorTheme === "light"}
          onChange={handleThemeChange}
        />
        Light
      </label>
      <label>
        <SettingsRadioInput
          type="radio"
          value="dark"
          checked={colorTheme === "dark"}
          onChange={handleThemeChange}
        />
        Dark
      </label>
    </SettingsItem>
  );
};

export default ThemeSettings;
