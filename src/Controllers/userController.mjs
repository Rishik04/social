import express from "express"
import jsonwebtoken from "jsonwebtoken";
import userModel from "../Models/usersSchema.mjs";
import { successResponse, errorResponse } from "../services/response.mjs";
import * as bcrypt from "bcrypt"
// import bodyParser from "body-parser";
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
        // let userList=await userModel.find({
        //     email: req.body.email,
        //     // password: bcrypt.compare(req.body.password,password)
        // });
        const {email,password}=req.body;
        // console.log(req.body)
        let userList=await userModel.findOne({email: email});

        const pwd= await bcrypt.compare(password,userList.password);

        if(pwd){
                    const token=jsonwebtoken.sign(userList.toJSON(),process.env.AUTH0_SECRET_KEY);
                    const myPost=await postModel.find({user: userList._id})
                    return successResponse(myPost,"Successfully Logged In",res);
                    return res.render('home');
                }

            // return successResponse(token,"Successfully Logged In",res);
        else{
            const error=new Error("Invalid Password or email");
            return errorResponse(error,res);
        }
    }
    catch(err){
        const error= new Error("No user Found! Please register")
        return errorResponse(error,res);
    }
}