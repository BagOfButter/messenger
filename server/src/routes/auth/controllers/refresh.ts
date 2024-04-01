import { Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { RefreshToken } from "@models/refreshTokenModel";
import { generateAccessToken } from "@utils/generateTokens";

export const handleRefresh = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  if (!userId) {
    return res.status(401).json({ message: "UserID is required" });
  }

  try {
    const refreshToken = await RefreshToken.findOne({ userId: userId });
    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Refresh token not found for the user" });
    }

    const decoded = jwt.verify(
      refreshToken?.token,
      process.env.REFRESH_TOKEN_SECRET as Secret
    ) as JwtPayload;

    const accessToken = generateAccessToken(decoded.userId);

    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    console.error("Error refreshing the token:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
