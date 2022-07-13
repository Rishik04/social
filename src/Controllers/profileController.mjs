import express from "express";
import pkg from 'mongoose';
const { isValidObjectId, Mongoose } = pkg;
import postModel from "../Models/postSchema.mjs";
import userModel from "../Models/usersSchema.mjs";
import { errorResponse, successResponse } from "../services/response.mjs";
import jsonwebtoken from "jsonwebtoken"

export const Getprofile = async(req, res)=>{

    if(isValidObjectId(req.params.user))
    {
    const finduser = await userModel.findOne({_id: req.params.user}).populate('name');

    if(finduser!=null)
    {
        res.locals.user = jsonwebtoken.decode(req.cookies.access_token)._id
        res.locals.name = jsonwebtoken.decode(req.cookies.access_token).name

        const friends = await userModel.findOne({_id: jsonwebtoken.decode(req.cookies.access_token)._id})

        // console.log(friends.friends)

        const findpost = await postModel.find({user: finduser._id}).populate('user', 'name').populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        return res.render('profile', {title: "Profile", allpost: findpost, profile: finduser.profile, friends: friends.friends})
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

export const addfriend = async(req, res)=>{
    try{
        if(req.xhr)
        {
            const friend = await userModel.findOne({_id: res.locals.user})
            if(!friend.friends.includes(req.body._id))
            {
                const updatefriend = await userModel.findOneAndUpdate({_id: res.locals.user}, {$push: {friends: req.body._id}})
                
                return successResponse(updatefriend, "Connected", res);
            }
            else{
                if(isValidObjectId(req.body._id))
                {
                    const newupdatefriend = await userModel.findOneAndUpdate({_id: res.locals.user}, {$pull: {friends: req.body._id}})
                    return successResponse(newupdatefriend, "Connect", res);
                }
            }
        }
    }
    catch(err)
    {
        return errorResponse(err, res);
    }
}