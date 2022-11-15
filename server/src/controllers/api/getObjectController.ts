import { RequestHandler } from "express";
import { IsNotEmpty, validate } from "class-validator";

import Obj from "../../database/models/Obj";

class GetObjectRequestBody {
  @IsNotEmpty()
  id!: string;
}

/**
 * Retrieve the object identified by `id` in the request url parameters
 */
const getObjectsController: RequestHandler = async (req, res) => {
  // Prepare request body
  const reqBody = new GetObjectRequestBody();
  reqBody.id = req.params.id;

  // Validate request body
  const errors = await validate(reqBody);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Get object
  try {
    const obj = await Obj.findById(reqBody.id);
    if (obj) {
      return res.json({
        success: true,
        object: obj,
      });
    } else {
      return res.json({
        success: false,
        error: "Object not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};

export default getObjectsController;
