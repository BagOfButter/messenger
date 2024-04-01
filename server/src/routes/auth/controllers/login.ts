import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { User } from "@models/userModel";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@utils/generateTokens";

export const handleLogin = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = generateAccessToken(user._id);

    const refreshToken = await generateRefreshToken(user._id);

    res.status(200).json({
      accessToken,
      userId: user._id,
      username: user.username,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
