import { useAppDispatch } from "@shared/useAppDispatch/useAppDispatch";
import { useAppSelector } from "@shared/useAppSelector/useAppSelector";
import { selectFontSize } from "@features/settings/models/selector";
import { selectUserId } from "@features/user/models/selector";
import { settingsActions } from "@features/settings/models/actions";
import { setFont } from "@widgets/FontSettings/api/setFont";
import {
  SettingsItem,
  SettingsName,
  SettingsRadioInput,
} from "@shared/SettingsItem/ui/styled";

const FontSettings = () => {
  const dispatch = useAppDispatch();
  const fontSize = useAppSelector(selectFontSize);
  const userId = useAppSelector(selectUserId);

  const handleFontSizeChange = async (e) => {
    const newFont = e.target.value;
    try {
      await setFont({ userId: userId, fontSize: newFont });
      dispatch(settingsActions.setFontSize(newFont));
    } catch (error) {
      console.error("Error updating theme on the server:", error);
    }
  };

  return (
    <SettingsItem>
      <SettingsName>Font Size</SettingsName>
      <label>
        <SettingsRadioInput
          type="radio"
          value="small"
          checked={fontSize === "small"}
          onChange={handleFontSizeChange}
        />
        Small
      </label>
      <label>
        <SettingsRadioInput
          type="radio"
          value="medium"
          checked={fontSize === "medium"}
          onChange={handleFontSizeChange}
        />
        Medium
      </label>
      <label>
        <SettingsRadioInput
          type="radio"
          value="big"
          checked={fontSize === "big"}
          onChange={handleFontSizeChange}
        />
        Big
      </label>
    </SettingsItem>
  );
};

export default FontSettings;
