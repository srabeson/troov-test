import { RequestHandler } from "express";
import { IsNotEmpty, validate } from "class-validator";

import Obj from "../../database/models/Obj";

class EditObjectRequestBody {
  @IsNotEmpty()
  id!: string;

  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  description!: string;
}

/**
 * Edits existing object identified by `id` in the request body
 * with the a new `name` and `description` also available in
 * the request body
 */
const editObjectController: RequestHandler = async (req, res) => {
  // Prepare request body
  const reqBody = new EditObjectRequestBody();
  reqBody.id = req.body.id;
  reqBody.name = req.body.name;
  reqBody.description = req.body.description;

  // Validate request body
  const errors = await validate(reqBody);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Edit object
  try {
    return res.json({
      success: true,
      object: await Obj.findByIdAndUpdate(
        reqBody.id,
        {
          name: reqBody.name,
          description: reqBody.description,
        },
        { returnDocument: "after" }
      ),
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};

export default editObjectController;
