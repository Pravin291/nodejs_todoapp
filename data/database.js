
import mongoose from "mongoose"

export const connectDB = ()=>{

    mongoose.connect(process.env.MONGO_URI,{
        dbName:"backend",
    }).then((c)=>console.log(`Database connectd with ${c.connection.host}`))
      .catch((e) => console.log(e))
}
