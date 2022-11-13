import { RequestHandler } from "express";
import { validate } from "class-validator";

import Credentials from "./Credentials";
import User from "../../database/models/User";
import { hashPassword } from "./utils";

/**
 * Creates a new user with the information (`email` and `password`)
 * provided in the request body
 */
const registerController: RequestHandler = async (req, res) => {
  // Credentials
  const credentials = new Credentials();
  credentials.username = req.body.username;
  credentials.password = req.body.password;

  // Validate request body
  const errors = await validate(credentials);
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  // Create user
  try {
    const user = new User({
      email: credentials.username,
      password_hash: await hashPassword(credentials.password),
    });
    await user.save();

    return res.json({
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};

export default registerController;
