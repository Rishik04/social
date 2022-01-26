import express from "express";
const { Schema, model, mongoose }=pkg;
import pkg from "mongoose";

const likeSchema= new Schema({

    like:{
        type: Number,
        enum: {
            values: 1
        }
    }

});

const likeModel= model("likes",likeSchema);

export default likeModel