import express from "express";
const router = express.Router();

// @route get api/post
// @description Test rout
// @access Public

router.get("/", (req, res) => res.send("Test post Social"));

export default router;
