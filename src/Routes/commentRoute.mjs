import express from "express";
import { authentication } from "../auth/auth.mjs";
import * as commentController from "../Controllers/commentController.mjs"

const commentRouter= express.Router();

commentRouter.post("/", commentController.addComment);


export default commentRouter;