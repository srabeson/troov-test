import { RequestHandler } from "express";

import Obj from "../../database/models/Obj";

const getObjectsController: RequestHandler = async (req, res) => {
  return res.json(await Obj.find({}));
};

export default getObjectsController;
