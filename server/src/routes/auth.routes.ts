import { Router } from "express";

import {
  forgotPasswordController,
  verifyResetTokenController,
  resetPasswordController,
  loginController,
  registerController,
  deleteAccountController,
} from "../controllers/auth.controller.js";

const router = Router();

router.post(
  "/forgot-password",
  forgotPasswordController
);

router.get(
  "/verify-reset-token",
  verifyResetTokenController
);

router.post(
  "/reset-password",
  resetPasswordController
);

router.post(
  "/login",
  loginController
);

router.post(
  "/register",
  registerController
);

router.delete(
  "/account",
  deleteAccountController
);

export default router;