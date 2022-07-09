import express from "express"
import { authentication } from "../auth/auth.mjs";
import * as userControl from "../Controllers/userController.mjs";
import path from "path"

const userRouter = express.Router()
const __dirname = path.resolve();

userRouter.post("/register",userControl.userdata);

userRouter.get("/register",(req,res)=>{return res.render('register')})
userRouter.get('/login', (req, res)=>{return res.render("login");})

userRouter.post("/login",userControl.login)
userRouter.get('/logout', userControl.logout);


export default userRouter;