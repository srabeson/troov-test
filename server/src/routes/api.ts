import express from "express";

import getObjectsController from "../controllers/api/getObjectsController";
import createObjectController from "../controllers/api/createObjectController";

const router = express.Router();

/**
 * Get available objects
 */
router.get("/", getObjectsController);

/**
 * Create a new object
 */
router.post("/create", createObjectController);

export default router;
