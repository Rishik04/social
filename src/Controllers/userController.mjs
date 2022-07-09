import express from "express"
import jsonwebtoken from "jsonwebtoken";
import userModel from "../Models/usersSchema.mjs";
import { successResponse, errorResponse } from "../services/response.mjs";
import * as bcrypt from "bcrypt"
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import postModel from "../Models/postSchema.mjs";
dotenv.config();


export const userdata= async (req, res)=>{
    try{
        let cryptsalt=await bcrypt.genSalt(10);
        req.body.password=await bcrypt.hash(req.body.password,cryptsalt);
        let userObj=await new userModel(req.body).save();
        jsonwebtoken.sign(userObj.toJSON(), process.env.AUTH0_SECRET_KEY,(err,token)=>{
            if(err)
            return errorResponse(err,res);
            else{
                return successResponse(token,"Successfully Registered",res);
            }
        });
}
catch(error){
    return errorResponse(error, res);
}
};

export const login= async(req, res)=>{
    try{
        const {email,password}=req.body;
        let userList=await userModel.findOne({email: email});

        const pwd= await bcrypt.compare(password,userList.password);

        if(pwd){
                    const myPost=await postModel.find({user: userList._id})
                    const token=jsonwebtoken.sign(userList.toJSON(),process.env.AUTH0_SECRET_KEY);
                    return res.cookie("access_token", token, {
                        httponly: true,
                    }).redirect('/', 200, {status: 200, allpost: myPost, title: "BlogPost | Home"})
                }
        else{
            const error=new Error("Invalid Password or email");
            return errorResponse(error,res);
        }
    }
    catch(err){
        const error = new Error("No user Found! Please register")
        return errorResponse(error,res);
    }
}

export const logincheck = async(req, res)=>{
    const token = req.cookies.access_token;

    if(!token)
        return res.redirect('/user/login');

    else
    {
        const val = jsonwebtoken.decode(token);
        const myPost=await postModel.find({user: val._id})
        return res.render('home', {status: 200, allpost: myPost, title: "BlogPost | Home"});
    }
}

export const logout = async(req, res)=>{
    return res.clearCookie("access_token")
    .redirect('/user/login', 200, {message: "successfully logout"});
}