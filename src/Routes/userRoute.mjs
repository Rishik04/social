import express from "express"
import { authentication } from "../auth/auth.mjs";
import * as userControl from "../Controllers/userController.mjs";
import path from "path"

const userRouter = express.Router()
const __dirname = path.resolve();

userRouter.post("/register",userControl.userdata);
// userRouter.post("/post",function(req,res){
//     res.send("post done")
// })

userRouter.get("/register",(req,res)=>{
    return res.render('register')
})

userRouter.get('/', userControl.logincheck);

userRouter.get('/login', (req, res)=>{
    return res.render("login");
})

userRouter.get('/logout', userControl.logout);

userRouter.post("/login",userControl.login)

export default userRouter;