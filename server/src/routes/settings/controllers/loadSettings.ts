import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Settings } from "@models/settingsModel";

export const handleLoadSettings = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.body.userId;

  try {
    const settings = await Settings.findOne({ userId });

    if (!settings) {
      return res.status(401).json({ message: "Settings not found" });
    }

    res.status(200).json({
      colorTheme: settings.colorTheme,
      fontSize: settings.fontSize,
    });
  } catch (error) {
    console.error("Error loading settings in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
