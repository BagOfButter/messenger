import express, { Router } from "express";
import { body } from "express-validator";
import { handleLogin } from "@routes/auth/controllers/login";
import { handleRegister } from "@routes/auth/controllers/register";
import { handleRefresh } from "@routes/auth/controllers/refresh";
import { handleLogout } from "@routes/auth/controllers/logout";

const authRouter: Router = express.Router();

authRouter.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .notEmpty()
      .withMessage("Email is required"),

    body("password")
      .isLength({ min: 6, max: 18 })
      .withMessage("Password must be between 6 and 18 characters long")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  handleLogin
);

authRouter.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .notEmpty()
      .withMessage("Email is required"),

    body("username")
      .isLength({ min: 6, max: 18 })
      .withMessage("Username must be between 6 and 18 characters long")
      .notEmpty()
      .withMessage("Username is required"),

    body("password")
      .isLength({ min: 6, max: 18 })
      .withMessage("Password must be between 6 and 18 characters long")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  handleRegister
);

authRouter.post(
  "/refresh",
  [body("userId").notEmpty().withMessage("userId is required")],
  handleRefresh
);

authRouter.post(
  "/logout",
  [body("userId").notEmpty().withMessage("userId is required")],
  handleLogout
);

export { authRouter };
