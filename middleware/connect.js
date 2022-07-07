import mongoose from 'mongoose'

const connectDb = async (req,res)=>{
    try{
        if(!(mongoose.connections[0].readyState)){
            var db = await mongoose.connect(process.env.MONGO_URI,()=>{console.log("connected")}).catch((error) => { console.log(error); });
        }
    }
    catch(error){
        return res.json({ success: false, msg: 'Faild! to establish connection' })
    }
}

export default connectDb