import { Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { generateAccessToken } from "@utils/generateTokens";

export const handleRefresh = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const refreshToken = req.cookies.refreshToken;
  if (!userId) {
    return res.status(401).json({ message: "UserID is required" });
  }
  if (!refreshToken) {
    return res.status(401).json({ message: "RefreshToken is required" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
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
