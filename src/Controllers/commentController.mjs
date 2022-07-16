import express from "express";
import postModel from "../Models/postSchema.mjs";
import { errorResponse, successResponse } from "../services/response.mjs";
import commentModel from "../Models/postCommentSchema.mjs";
import jsonwebtoken from "jsonwebtoken";


export const addComment = async(req, res)=>{
    try{
        let body = req.body;
        const post = await postModel.findOne({_id: body.posts}).sort({createdAt: 'desc'})
        if(post)
        {
            const addcom = await new commentModel(body);
            addcom.user = jsonwebtoken.decode(req.cookies.access_token)._id;
            addcom.save();

            if(addcom)
            {
                post.comments.push(addcom);
                post.save();
                let len = post.comments.length;

                if(req.xhr)
                {
                    await addcom.populate('user', 'name');
                   return res.send({data: addcom, length: len, message: "Successfully added"});
                }
            }
        }
    }
    catch(err)
    {
        return errorResponse(err, res);
    }
}