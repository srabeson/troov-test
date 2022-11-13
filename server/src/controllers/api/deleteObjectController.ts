import { RequestHandler } from "express";
import { IsNotEmpty, validate } from "class-validator";

import Obj from "../../database/models/Obj";

class DeleteObjectRequestBody {
  @IsNotEmpty()
  id!: string;
}

/**
 * Deletes existing object identified by `id` in the request body
 */
const deleteObjectController: RequestHandler = async (req, res) => {
  // Prepare request body
  const reqBody = new DeleteObjectRequestBody();
  reqBody.id = req.body.id;

  // Validate request body
  const errors = await validate(reqBody);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Delete object
  try {
    const deletedObject = await Obj.findByIdAndDelete(reqBody.id);
    if (deletedObject) {
      return res.json({
        success: true,
        object: deletedObject,
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

export default deleteObjectController;
