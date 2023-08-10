import {app} from './app.js'
import { connectDB } from './data/database.js';

const port = process.env.PORT;

connectDB();


app.listen(port,(req,res)=>{
    console.log(`server is running at port ${port} in ${process.env.NODE_ENV} mode`)
})