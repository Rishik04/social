import express from "express";
import postModel from "../Models/postSchema.mjs";
import { errorResponse, successResponse } from "../services/response.mjs";
import jsonwebtoken from "jsonwebtoken"

export const postdata= async (req,res)=>{
    try{
        const id = jsonwebtoken.decode(req.cookies.access_token)._id;
        res.locals.user = id;
        const myPost= await postModel.find({user: id}).populate('user').
            populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        }).sort({createdAt: 'desc'});

        const postnew = await postModel.find({$or: [{user: id}, { }]})

        if(myPost.length>0){
       
        return res.render('home', {status: 200, allpost: myPost, title: "Shortpost | Home"});
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