import express from "express";

import getObjectsController from "../controllers/api/getObjectsController";
import createObjectController from "../controllers/api/createObjectController";
import editObjectController from "../controllers/api/editObjectController";

const router = express.Router();

/**
 * Get available objects
 */
router.get("/", getObjectsController);

/**
 * Create a new object
 */
router.post("/create", createObjectController);

/**
 * Edit an existing object
 */
router.post("/edit", editObjectController);

export default router;
