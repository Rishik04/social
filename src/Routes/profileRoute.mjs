import express from "express";
import { authentication } from "../auth/auth.mjs";
import * as profileController from "../Controllers/profileController.mjs"

const profileRouter = express.Router();

profileRouter.get('/:user', authentication, profileController.Getprofile);


export default profileRouter;