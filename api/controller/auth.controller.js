import { User } from "../models/user.models.js";
import jwt from 'jsonwebtoken'
import { ApiError } from "../utils/ApiError.js";
import { ApiRespones } from "../utils/ApiResponce.js";

const signup = async (req,res) => {

    const {username,firstname,lastname,password ,admin}= req.body

    const existingUser =await User.findOne(
      {
        $or:[{username},{firstname}]
      }
    )

    if (existingUser) {
      throw new ApiError(409, "username already exists")
  }
  const user = await User.create({
    firstname,
    lastname,
    username,
    password,
    admin
 })

 const createdUser = await User.findById(user._id).select(" -password -refreshToken ")

 if(!createdUser){
    throw new ApiError(500,"Creating user Failed")
 }

 return res
 .status(200)
 .json(
    new ApiRespones(200,createdUser,"userRegister SuccessFull")
 )

  
}

const signin = async (req,res) => {

    const { username , password }= req.body
  
    if(!username){
      throw new ApiError(401,"username is Required")
    }
  
    if(!password){
      throw new ApiError (401,"password is required")
    }
  
    const user = await User.findOne({
      username
    })
    console.log(user)
    if(!user){
      throw new ApiError(401,"User Not found")
    }
  
    const isPasswordValid = await user.isPasswordCorrect(password)
  
    if(!isPasswordValid){
      throw new ApiError(402,"Wrong creadential")
    }
  
    const isuservalid= await User.findById(user._id)
  
   const token = jwt.sign({_id:isuservalid._id}, process.env.REFRESH_TOKEN_SECRET)
  
   const uservalid = await User.findById(isuservalid._id).select("-password")
  
    
  
    const options = {
      httpOnly:true,
      secure:true,
    }
  
    return res
    .status(200)
    .cookie('accesstoken',token,options)
    .json(
       new ApiRespones(200,uservalid,"login Successfull")
    )
  
  
  }


  const signout = async (req,res,next) => {
    try {
       res.clearCookie('access_token')
       res.status(200).json('User Looged Out');
    } catch (error) {
        next(error)
    }
}
  
  
  
  const updateUser = async (req,res) => {
  
   if(req.user._id !== req.params.id){
     throw new ApiError(400,"Authorised person can  only update ")
   }
  
   const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          $set:{
            username:req.body.username,
            fullname:req.body.fullname,
            email:req.body.email,
            password:req.body.password
          }
        },
        {
           new:true
        }
   ).select("-password")
  
   return res
   .status(200)
   .json(
     new ApiRespones(200,updatedUser,"Profile Updated")
   )
  
  }
  

  
  
  
  
  export {signup, signin, signout, updateUser}