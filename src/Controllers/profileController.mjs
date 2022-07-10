import express from "express";
import pkg from 'mongoose';
const { isValidObjectId } = pkg;
import postModel from "../Models/postSchema.mjs";
import userModel from "../Models/usersSchema.mjs";
import { errorResponse } from "../services/response.mjs";
import jsonwebtoken from "jsonwebtoken"

export const Getprofile = async(req, res)=>{

    if(isValidObjectId(req.params.user))
    {
    const finduser = await userModel.findOne({_id: req.params.user}).populate('name');

    if(finduser!=null)
    {
        res.locals.user = jsonwebtoken.decode(req.cookies.access_token)._id
        const findpost = await postModel.find({user: finduser._id}).populate('user', 'name').populate('comments');
        return res.render('profile', {title: "Profile", posts: findpost})
    }
    else{
        return res.redirect('back');
    }
}
else{
    const error = new Error("no user found")
    return errorResponse(error, res);
}

}