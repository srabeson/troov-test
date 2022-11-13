import express from "express";
import { IsNotEmpty, validate } from "class-validator";

import Obj from "../database/models/Obj";

const router = express.Router();

class CreateObjectRequestBody {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  description!: string;
}

/**
 * Get available objects
 */
router.get("/", async (req, res) => {
  return res.json(await Obj.find({}));
});

/**
 * Create a new object
 */
router.post("/create", async (req, res) => {
  // Prepare request body
  const reqBody = new CreateObjectRequestBody();
  reqBody.name = req.body.name;
  reqBody.description = req.body.description;

  // Validate request body
  const errors = await validate(reqBody);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Create object
  try {
    const object = new Obj(reqBody);
    await object.save();
    return res.json({ success: true, object: object });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
});

export default router;
