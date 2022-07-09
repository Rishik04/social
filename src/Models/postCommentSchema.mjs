import express from "express";
const { Schema, model, mongoose }=pkg;
import pkg from "mongoose";

const commentSchema= new Schema({

    comment:{
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    posts:{
        type: Schema.Types.ObjectId,
        ref: "posts"
    }
},{timestamps: true});

const commentModel= model("comments",commentSchema);

export default commentModel