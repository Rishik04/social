import express from "express";
import { authentication } from "../auth/auth.mjs";
import * as postController from "../Controllers/postController.mjs";
import multer from "multer";

const postRouter= express.Router();
const upload=multer({dest: './src/upload'})



postRouter.get("/", postController.postdata)
postRouter.post("/addpost", authentication, upload.single('post'), postController.addpost);

postRouter.post("/delpost", authentication, postController.delpost);

postRouter.post("/like",authentication, postController.sendLike)

export default postRouter




