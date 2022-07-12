import express from "express";
import { authentication } from "../auth/auth.mjs";
import * as searchController from "../Controllers/searchController.mjs"

const searchRouter = express.Router();

searchRouter.get('/', authentication, searchController.searchpage);

searchRouter.post('/query', authentication, searchController.findquery)


export default searchRouter;