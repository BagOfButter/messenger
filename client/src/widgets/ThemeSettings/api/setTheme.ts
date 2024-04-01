import { privateInstance } from "@lib/apiPrivate";
import { ThemeInfo } from "@widgets/ThemeSettings/models/types";

export const setTheme = async (data: ThemeInfo) => {
  return privateInstance.post("http://localhost:3000/settings/theme", data);
};
