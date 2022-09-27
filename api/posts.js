import express from "express";
import { check, validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import User from "../models/User.js";
import Post from "../models/Post.js";
import "dotenv/config";
import auth from "../middleware/auth.js";

const router = express.Router();

// @route get api/get
// @description Test rout
// @access Public

router.get("/", (req, res) => res.send("Test post Social"));

// @route get api/post
// @description Test rout
// @access Private

router.post(
  "/",
  [auth, [check("text", "Post must exist").not().isEmpty()]],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("post req", req);
    try {
      const user = await User.findById(req.user.id);
      console.log("Found user", user);
      const post = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const newPost = await post.save();
      res.status(201).json({ post: newPost });
    } catch (error) {}
  }
);

export default router;
