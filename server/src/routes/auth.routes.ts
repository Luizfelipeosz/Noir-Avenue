
import { Router } from "express";

import {
  forgotPasswordController,
  verifyResetTokenController,
  resetPasswordController,
  loginController,
  registerController,
  deleteAccountController,
  changePasswordController,
} from "../controllers/auth.controller.js";

import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Recuperação de senha
router.post("/forgot-password", forgotPasswordController);
router.get("/verify-reset-token", verifyResetTokenController);
router.post("/reset-password", resetPasswordController);

// Autenticação
router.post("/login", loginController);
router.post("/register", registerController);

// Rotas protegidas
router.post(
  "/change-password",
  authenticateToken,
  changePasswordController
);

router.delete(
  "/account",
  authenticateToken,
  deleteAccountController
);

export default router;
