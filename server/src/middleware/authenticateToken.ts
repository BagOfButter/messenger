import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { User, UserType } from "@models/userModel";

type AuthenticatedRequest = Request & {
  user?: Document & UserType;
};

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "Access token not provided" });
  }

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as Secret
    ) as JwtPayload;

    const user = (await User.findById(decoded.userId)) as Document & UserType;

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid access token" });
  }
};
