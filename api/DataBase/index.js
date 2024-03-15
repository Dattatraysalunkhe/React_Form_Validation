import mongoose from "mongoose"
import { DB_NAME } from "../utils/constant.js";

const DB_Connect = async () => {
    
   try {
     const connect = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
 
     console.log("mongodb connected ")
   } catch (error) {
       console.log("mongodb connection failed",error)
   }

}


export {DB_Connect}