import { data } from "../models/users.js";
import bcrypt from 'bcrypt'

import { sendCookie } from "../utils/features.js";
import ErrorHandeler from "../middlewares/error.js";


export const getMyprofile = (req,res)=>{

     
      res.status(200).json({
        success:true,
        user:req.user,

      })

}

export const login = async(req,res,next)=>{

    try {

      const{email,password} = req.body;

    const user = await data.findOne({email}).select("+password");

    if(!user) return next(new ErrorHandeler("Invalid email and password",404))


    const isMatched = await bcrypt.compare(password,user.password);

 
     if(!isMatched) return next(new ErrorHandeler("Invalid email and password",400))

    sendCookie(user,res,`welcome back , ${user.name}`,200)
      
    } catch (error) {
       next(error)
    }
}


export const register = async(req,res,next)=>{

   try {

    const{name ,email,password} = req.body;

    let user = await data.findOne({email});

  
      if(user) return next(new ErrorHandeler("User Already Exist ",400))

    
      const hashedPass = await bcrypt.hash(password,10)

       user = await data.create({
        name,
        email,
        password:hashedPass,
      }) 
    sendCookie(user,res,"registerd successfully",201)

    
   } catch (error) {
     next(error)
   }
}

export const logout = (req,res)=>{

  res
  .status(200)
  .cookie("token","",{
    expires:new Date(Date.now()),
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    Secure:process.env.NODE_ENV === "Development" ? false : true,
  })
  .json({
    success:true,
    user:req.user,
    message:"Logout successfully",
  })
}