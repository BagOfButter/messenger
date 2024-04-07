import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const handleLogout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
