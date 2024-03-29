import express from "express";
const { Schema, model, mongoose }=pkg;
import pkg from "mongoose";

const likeSchema= new Schema({

    like:{
        type: Number,
        enum:[1],
        default: 0
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    post:[{
        type: Schema.Types.ObjectId,
        ref: "posts"
    }]

});

const likeModel= model("likes",likeSchema);

export default likeModel