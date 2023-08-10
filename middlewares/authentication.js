import jwt from 'jsonwebtoken'
import { data } from '../models/users.js';
export const isAuthenticated = async(req,res,next)=>{
    const  {token} = req.cookies;
   
    if(!token)
      return res.status(404).json({
        success:false,
        message:"Login first"
      })

      const decoded = jwt.verify(token,process.env.JWT_SEC);
      req.user = await data.findById(decoded._id)

      next()

};