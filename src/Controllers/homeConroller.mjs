import express from "express";
import postModel from "../Models/postSchema.mjs";
import { errorResponse, successResponse } from "../services/response.mjs";


export const postdata= async (req,res)=>{
    try{
        const myPost= await postModel.find().populate('user').
            populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        if(myPost.length>0){
        return res.render('home', {status: 200, allpost: myPost, title: "BlogPost | Home"});
        }
        else{
            return res.render('home', {message: "No Post Found! Add a New Post", allpost: 0, title: "BlogPost | Home"});
        }
    }
    catch(err)
    {
        return errorResponse(err, res);
    }
}