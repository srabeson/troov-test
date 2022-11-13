import express from "express";

import loginController from "../controllers/auth/loginController";
import registerController from "../controllers/auth/registerController";

const router = express.Router();

/**
 * Login user (via an access token)
 */
router.post("/login", loginController);

/**
 * Register user
 */
router.post("/register", registerController);

export default router;
