import express from "express";

import Obj from "../database/models/Obj";

const router = express.Router();

/**
 * Get available objects
 */
router.get("/", async (req, res) => {
  return res.json(await Obj.find({}));
});

export default router;
