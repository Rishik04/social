import express from "express";
import { authentication } from "../auth/auth.mjs";
import * as postController from "../Controllers/postController.mjs";
import multer from "multer";
import commentRouter from "./commentRoute.mjs";

const postRouter = express.Router();
const upload = multer({dest: './src/upload'})



postRouter.post("/addpost", authentication, upload.single('post'), postController.addpost);

postRouter.post("/delpost", authentication, postController.delpost);

postRouter.use("/addcomment", authentication, commentRouter)


export default postRouter




