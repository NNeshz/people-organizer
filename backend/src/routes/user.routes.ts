import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller";

const router = Router();

// Register a new user
router.post("/signup", signup);

// Login a user
router.post("/login", login);

// Logout a user
router.post("/logout", logout);

export default router;
