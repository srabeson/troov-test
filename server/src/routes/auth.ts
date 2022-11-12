import express from "express";
const router = express.Router();

/* Authenticates user and provides access token */
router.post("/login", (req, res) => {
  return res.json({ access: "some_access_token" });
});

export default router;
