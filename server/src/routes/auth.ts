import express from "express";
import { IsEmail, IsNotEmpty, validate } from "class-validator";

import User from "../database/models/User";
import { hashPassword } from "./utils";

const router = express.Router();

class Credentials {
  @IsNotEmpty()
  @IsEmail()
  username!: string;

  @IsNotEmpty()
  password!: string;
}

/**
 * Authenticates user and provides access token
 */
router.post("/login", async (req, res) => {
  // Credentials
  const credentials = new Credentials();
  credentials.username = req.body.username;
  credentials.password = req.body.password;

  // Validate request body
  const errors = await validate(credentials);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  return res.json({ success: true, access: "some_access_token" });
});

/**
 * Register user
 */
router.post("/register", async (req, res) => {
  // Credentials
  const credentials = new Credentials();
  credentials.username = req.body.username;
  credentials.password = req.body.password;

  // Validate request body
  const errors = await validate(credentials);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Create user
  try {
    const user = new User({
      email: credentials.username,
      password_hash: await hashPassword(credentials.password),
    });
    await user.save();

    return res.json({ success: true });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
});

export default router;
