import jsonwebtoken from "jsonwebtoken";
import * as dotenv from 'dotenv';
import { errorResponse } from "../services/response.mjs";

dotenv.config();

export const authentication= async (req,res,next)=>{
    try{
    const authHeader= req.header('auth-header');
    const data=jsonwebtoken.verify(authHeader, process.env.AUTH0_SECRET_KEY);
    req.user=data._id;
    // console.log(data);
    next();
    }
    catch(error)
    {
        return errorResponse(error,res);
    }
}
