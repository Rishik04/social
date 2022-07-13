import express from "express";
import { authentication } from "../auth/auth.mjs";
import * as profileController from "../Controllers/profileController.mjs"

const profileRouter = express.Router();

profileRouter.get('/:user', authentication, profileController.Getprofile);

profileRouter.post('/connect', authentication, profileController.addfriend);


export default profileRouter;