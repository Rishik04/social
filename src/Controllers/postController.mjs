import express from "express";
import allPostModel from "../Models/allpostSchema.mjs";
import postModel from "../Models/postSchema.mjs";
import { errorResponse, successResponse } from "../services/response.mjs";
import fs from "fs";
import path from "path";
import likeModel from "../Models/post.likeSchema.mjs";
import commentModel from "../Models/postCommentSchema.mjs";
import jsonwebtoken from "jsonwebtoken";

export const addpost = async (req,res)=>{
    try{
        let body= req.body;
        // console.log(body);
        const add=new postModel(body);
        
        add.user= jsonwebtoken.decode(req.cookies.access_token)._id;

        add.img.data=fs.readFileSync('./src/upload/'+req.file.filename);
        add.img.contentType=req.file.mimetype;

        const post=await add.save();
        if(post)
        {
        const allPost= await postModel.find().populate('user','name profile');
        return successResponse({},"Successfully Posted", res);
        // return res.render('home',{'allpost':allPost})
        }
        else{
            const error= new Error("Unable to Post");
            return errorResponse(error,res);
        }
    }
    catch(err)
    {
        return errorResponse(err, res);
    }
}

export const sendLike= async (req,res)=>{
    try{
        // console.log(req.body)
        const likes=await new likeModel(req.body).save();
        console.log(likes);
        const findPost= await postModel.findOneAndUpdate({_id: req.body.postid},{like: 2});

        // console.log(findPost)
        if(findPost)
        {
            const likes=findPost.like.concat(req.body)

            // console.log(likes.length)
            findPost.like.push(likes.length)
            await findPost.save();
            return successResponse(findPost,"Liked",res);
        }
        else{
            let error= new Error("Can't find the post");
            return errorResponse(error, res);
        }
    }
    catch(err)
    {
        return errorResponse(err, res);
    }
}

export const delpost= async (req,res)=>{
    try{
        // console.log(req.user)
        // console.log(req.body.postid)
        const post= await postModel.findOneAndDelete({_id: req.body.postid,user: req.user},{_id: req.body.postid});
        if(post)
        return successResponse(post._id,"Deleted Successfully",res);
        else{
            let error = new Error("You are not allowed to delete this post");
            return errorResponse(error,res);
        }
    }
    catch(err)
    {
        return errorResponse(err,res)
    }
}