import { Router } from "express";
import { login, logout, profile, signup } from "../controllers/auth.controller";
import { isAuth } from "../middleware/isAuthenticated";
import { validateSchema } from "../middleware/validateSchema";
import { UserLoginSchema, UserSignupSchema } from "../schemas/user.schema";

const router = Router();

// Register a new user
router.post("/signup", validateSchema(UserSignupSchema), signup);

// Login a user
router.post("/login", validateSchema(UserLoginSchema), login);

// Logout a user
router.post("/logout", logout);

// Get the current user profile
router.get("/profile", isAuth, profile);

export default router;
