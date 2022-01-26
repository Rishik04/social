import express from "express";
const {mongoose, model, Schema}=pkg
import pkg from "mongoose";


const allPostSchema=new Schema({
    post:[
        {
            type: Schema.Types.ObjectId,
            ref: 'posts'
        }
    ]
})

const allPostModel= model("allPost",allPostSchema);

export default allPostModel;