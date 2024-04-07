import { privateInstance } from "@lib/apiPrivate";

export const logoutUser = async () => {
  return privateInstance.post("http://localhost:3000/auth/logout");
};
