import express from "express";
const router = express.Router();

/**
 * Get available objects
 */
router.get("/", (req, res) => {
  return res.json({
    message: "hello, world",
  });
});

export default router;
