import jsonwebtoken from "jsonwebtoken";
import * as dotenv from 'dotenv';
import { errorResponse } from "../services/response.mjs";
import {LocalStorage} from 'node-localstorage'

dotenv.config();

// const localStorage= new LocalStorage('./scratch')

export const authentication= async (req,res,next)=>{
    try{
    const token = req.cookies.access_token;

    if(!token)
        return res.redirect('/user/login');

    else
    {
        const user = jsonwebtoken.decode(token)._id;
        res.locals.user = user
        next();
    }
    }
    catch(error)
    {
        return errorResponse(error,res);
    }
}

