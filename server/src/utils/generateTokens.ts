import jwt, { Secret } from "jsonwebtoken";
import { RefreshToken } from "@models/refreshTokenModel";

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as Secret, {
    expiresIn: "15s",
  });
};

export const generateRefreshToken = async (userId: string): Promise<string> => {
  const refreshToken = jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET as Secret,
    { expiresIn: "2d" }
  );
  const refreshTokenDocument = new RefreshToken({
    userId,
    token: refreshToken,
  });
  await refreshTokenDocument.save();
  return refreshToken;
};
