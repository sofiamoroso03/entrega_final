import express from "express";
import { login, register, verifyEmail } from "../controllers/auth.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";

const auth_router = express.Router();

auth_router.post("/register", validateBody(registerSchema), register);
auth_router.post("/login", validateBody(loginSchema), login);
auth_router.get("/verify-email/:verify_email_token", verifyEmail);

export default auth_router;