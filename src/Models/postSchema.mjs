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
        type: Number,
        ref: "users"
    }],
    comment:[{
        type: Schema.Types.ObjectId,
        ref: "comment"
    }]

});

const postModel= model("posts",postSchema);

export default postModel