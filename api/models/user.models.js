import mongoose from "mongoose";
import bcrypt from 'bcrypt'


const UserSchema= new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        firstname:{
            type:String,
            required:true,
        },
        lastname:{
            type:String,
            required:true,
            
        },
        password:{
            type:String,
            required:true,
        },
        
        refreshToken:{
            type:String,
        },
        admin:{
           type:Boolean,
        }
    },
    {
        timestamps:true
    }
)

UserSchema.pre("save", async function (next)  {
      if(!this.isModified("password")) return next();

      this.password = await bcrypt.hash(this.password,10)
      next()
})

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)                     
}




export const User = mongoose.model("User",UserSchema)