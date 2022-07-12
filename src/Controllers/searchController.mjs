import express, { query } from "express";
import userModel from "../Models/usersSchema.mjs";
import { errorResponse, successResponse } from "../services/response.mjs";

export const searchpage = async(req,res)=>{
    res.render('search', {title: 'Search'});
}

export const findquery = async(req,res)=>{
    let query = req.body["search-query"];
    try{
        const findUser = await userModel.find({name: new RegExp(query, 'i') }, {name: 1, _id: 1})
        // console.log(findUser);
        if(req.xhr)
        {
            if(findUser)
            {
                return successResponse(findUser, "Successfully Fetched", res);
            }
            else{
                return successResponse({}, "No user Found", res);
            }
        }
    }

    catch(error)
    {
        return errorResponse(error, res);
    }
}