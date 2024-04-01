import { privateInstance } from "@lib/apiPrivate";

export const loadSettings = async (userId: string) => {
  return privateInstance.post("http://localhost:3000/settings/load", {
    userId,
  });
};
