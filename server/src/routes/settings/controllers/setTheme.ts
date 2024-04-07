import mongoose from "mongoose";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Settings } from "@models/settingsModel";

export const handleSetTheme = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = new mongoose.Types.ObjectId(req.body.userId);
  const colorTheme = req.body.colorTheme;

  try {
    const settings = await Settings.findOne({ userId });

    if (!settings) {
      return res.status(401).json({ message: "Settings not found" });
    }

    settings.colorTheme = colorTheme;

    await settings.save();

    res.status(200).json({ message: "Color theme updated successfully" });
  } catch (error) {
    console.error("Error loading settings in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
