import express from "express";
const { Schema, model, mongoose }=pkg;
import pkg from "mongoose";

const postSchema= new Schema({
    caption:{
        type: String,
        required: true
    },
    img:{
        data: Buffer,
        contentType: String
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    like:[{
        type: Schema.Types.ObjectId,
        ref: "likes",
    }],
    comments:[{
        type: Schema.Types.ObjectId,
        ref: "comments"
    }]

},{timestamps: true});

const postModel= model("posts",postSchema);

export default postModel