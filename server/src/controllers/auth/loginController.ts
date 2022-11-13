import { RequestHandler } from "express";
import { validate } from "class-validator";

import Credentials from "./Credentials";
import User from "../../database/models/User";
import { comparePasswords, generateAccessToken } from "./utils";

/**
 * Grants the user with an access token
 * provided the user credentials (`email` and `password`)
 * in the request body
 */
const loginController: RequestHandler = async (req, res) => {
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

  // Authenticate user
  try {
    // Ensure user exists
    const user = await User.findOne({
      email: credentials.username,
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User not found.",
      });
    }

    // Compare provided password with user's password hash
    if (!(await comparePasswords(credentials.password, user.password_hash))) {
      return res.status(400).json({
        success: false,
        error: "Wrong email or password.",
      });
    }

    // Give the client an access token
    return res.json({
      success: true,
      access_token: generateAccessToken({ email: user.email }),
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};

export default loginController;
