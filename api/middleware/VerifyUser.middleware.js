import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'

export const VerifyUser = async (req,res,next) => {
   try {

      const token =req.cookies.accesstoken

      if(!token){
         throw new ApiError(401,"Token is not valid through cookie")
      }

      jwt.verify(token,process.env.REFRESH_TOKEN_SECRET, (err,user) =>{
         if(err){
            return new ApiError(401,"token is not verify by jwt")
         }

         req.user = user;

         next()
      })
      
   } catch (error) {
      console.log("token is not valid",error)
   }
}