import express, { Router } from "express";
import { authentication } from "../auth/auth.mjs";
import * as homeController from "../Controllers/homeConroller.mjs";
const homeRouter = express.Router();


homeRouter.get('/', homeController.postdata);

export default homeRouter;