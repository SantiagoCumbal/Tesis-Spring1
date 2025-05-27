import mongoose from 'mongoose';
import moongoose from 'mongoose'

moongoose.set('strictQuery',true)

const connection = async()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URI_LOCAL)
       console.log("databade is connected");
       
        
    } catch (error) {
        console.log(error);
        
        
    }
    }


export default connection