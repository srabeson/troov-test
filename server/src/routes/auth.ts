import express from "express";
import { IsEmail, IsNotEmpty, validate } from "class-validator";

const router = express.Router();

class Credentials {
  @IsNotEmpty()
  @IsEmail()
  username!: string;

  @IsNotEmpty()
  password!: string;
}

/* Authenticates user and provides access token */
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

export default router;
