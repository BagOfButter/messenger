import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { User } from "@models/userModel";
import { Settings } from "@models/settingsModel";

export const handleRegister = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body);
  const { email, username, password } = req.body;

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username is already in use" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      username,
      passwordHash,
    });

    await newUser.save();

    const defaultSettings = new Settings({
      userId: newUser._id,
      colorTheme: "light",
      fontSize: "medium",
    });

    await defaultSettings.save();

    res
      .status(201)
      .json({ message: "Registration successful", userId: newUser._id });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
