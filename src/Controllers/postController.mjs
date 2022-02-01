import express from "express";
import allPostModel from "../Models/allpostSchema.mjs";
import postModel from "../Models/postSchema.mjs";
import { errorResponse, successResponse } from "../services/response.mjs";
import fs from "fs";
import path from "path";

export const postdata= async (req,res)=>{
    try{
        const allPost= await postModel.find().populate('user','id name profile');
        // console.log()
        if(allPost.length>0){
        // return successResponse(allPost,"Fetched Successfully",res);
        // console.log(allPost.length)
        return res.render('home',{'allpost':allPost})
        }
        else{
            // const error= new Error("No Post Found! Add a new post")
            return res.render('home',{message:"No Post Found! Add a New Post",allpost:0});
        }
    }
    catch(err)
    {
        return errorResponse(err, res);
    }
}

export const addpost = async (req,res)=>{
    try{
        let body= req.body;
        // console.log(body);
        const add=new postModel(body);
        
        add.user=req.user;

        add.img.data=fs.readFileSync('./src/upload/'+req.file.filename);
        add.img.contentType=req.file.mimetype;

        const post=await add.save();
        if(post)
        {
        const allPost= await postModel.find().populate('user','name profile');
        return successResponse(post.caption,"Successfully Posted", res);
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
        let body=req.body.like;
        // console.log(body)
        const findPost= await postModel.findOne({_id: req.params.id});

        // console.log(findPost)
        if(findPost)
        {
            const likes=findPost.like.concat(body)

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
        console.log(req.user)
        const post= await postModel.findOneAndDelete({
           user: req.user 
        },{_id: req.post_id})
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