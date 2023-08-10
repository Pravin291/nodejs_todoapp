import express from 'express';
import usesrRouter from './routers/users.js';
import taskRouter from './routers/task.js';
import {config} from 'dotenv'
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from 'cors'

export const app = express();


config({
    path:"./data/config.env"
})
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTED_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

app.use("/",usesrRouter);

 app.use("/",taskRouter);

app.get('/',(req,res)=>{
    res.send("nice pravin")
})
app.use(errorMiddleware)
