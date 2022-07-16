import express from "express";
import postModel from "../Models/postSchema.mjs";
import { errorResponse, successResponse } from "../services/response.mjs";
import jsonwebtoken from "jsonwebtoken"
import userModel from "../Models/usersSchema.mjs";
import mongoose from "mongoose"
export const postdata= async (req,res)=>{
    try{
        const id = jsonwebtoken.decode(req.cookies.access_token)._id;
        res.locals.user = id;
        // const myPost= await postModel.find({user: id}).populate('user').
        //     populate({
        //     path: 'comments',
        //     populate: {
        //         path: 'user'
        //     }
        // }).sort({createdAt: 'desc'});

        // const postnew = await postModel.find({$or: [{user: id}, {user : {$in: ['62cd1976e201bdcf865d4236', '61ec1cfa9806db4571f8c79d']}}]})
        // console.log(postnew[0]._id)

        const postnew = await userModel.aggregate([{$match: {_id: new mongoose.Types.ObjectId(id)}},{$project:{'_id': '$_id', 'friends': '$friends'}}, {$lookup: {from:'posts', localField: 'friends', foreignField: 'user', as: 'allPost'}}, {$lookup: {from: 'posts', localField: '_id', foreignField: 'user', as: 'newpost'}}, {$project: {allPost: {$concatArrays: ['$allPost', '$newpost']}}}, {$unwind: '$allPost'}, {$lookup:{from: 'users', localField: 'allPost.user', foreignField: '_id', as: 'allPost.user'}}, {$unwind: '$allPost.user'}, {$lookup: {from: 'comments', localField: 'allPost.comments', foreignField: '_id', as: "allPost.comments"}}, {$lookup: {from: 'users', localField: 'allPost.comments.user', foreignField: '_id', as: 'allPost.allcommentsUser'}}, {$replaceRoot: {'newRoot': '$allPost'}}, {$addFields: {"comments.comUser": {$filter: {"input": '$allcommentsUser', as: 'com', cond: {$ne: ['$$com._id', 'comments.user']}}}}}, {$unset: 'allcommentsUser'}]);




        if(postnew.length>0){
       
        return res.render('home', {status: 200, allpost: postnew, title: "Shortpost | Home"});
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