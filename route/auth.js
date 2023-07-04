import express from "express";
import { login, logout } from "../controllers/authController.js";

const router = express.Router();

// create route
router.route("/login").post(login);
router.route("/logout").post(logout);

// export default router
export default router;
