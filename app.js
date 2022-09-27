import express from "express";
import authRouter from "./api/auth.js";
import postsRouter from "./api/posts.js";
import usersRouter from "./api/users.js";
import "dotenv/config";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
// route

app.get("/", (req, res) => res.send("Hello social"));
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

console.log(process.env.MONGO_URI);
// start

// mongoose.connect(process.env.MONGO_URI, () => {
//   console.log("Connected to MongoDB");
// });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connected to MongoDB", error);
  }
};

connectDB();

app.listen(process.env.port || 5000);
