import express from "express";
const router = express.Router();

// @route get api/auth
// @description Test rout
// @access Public

router.get("/", (req, res) => res.send("Test auth Social"));

export default router;
