import express from "express";
const { Schema, model, mongoose }=pkg;
import pkg from "mongoose";

const commentSchema= new Schema({

    comment:{
        type: String
    }

});

const commentModel= model("comments",likeSchema);

export default commentModel