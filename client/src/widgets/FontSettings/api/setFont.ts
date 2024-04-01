import { privateInstance } from "@lib/apiPrivate";
import { FontInfo } from "@widgets/FontSettings/models/types";

export const setFont = async (data: FontInfo) => {
  return privateInstance.post("http://localhost:3000/settings/font", data);
};
