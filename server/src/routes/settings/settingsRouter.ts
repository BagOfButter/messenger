import express, { Router } from "express";
import { body } from "express-validator";
import { handleLoadSettings } from "@routes/settings/controllers/loadSettings";
import { handleSetTheme } from "@routes/settings/controllers/setTheme";
import { handleSetFont } from "@routes/settings/controllers/setFont";
import { authenticateToken } from "@middleware/authenticateToken";

const settingsRouter: Router = express.Router();

settingsRouter.post(
  "/load",
  [body("userId").notEmpty().withMessage("userId is required")],
  handleLoadSettings
);

settingsRouter.post(
  "/theme",
  authenticateToken,
  [
    body("userId").notEmpty().withMessage("UserID is required"),
    body("colorTheme").notEmpty().withMessage("Theme is required"),
  ],
  handleSetTheme
);

settingsRouter.post(
  "/font",
  authenticateToken,
  [
    body("userId").notEmpty().withMessage("UserID is required"),
    body("fontSize").notEmpty().withMessage("Font size is required"),
  ],
  handleSetFont
);

export { settingsRouter };
