import mongoose from 'mongoose'
const { Schema } = mongoose;


const ChannelSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    avatarColor:{
        type: String,
        required: true,
    },
    description:{
        type:String,
        required:true
    },
    hostId:{
        type: String,
        required: true,
    },
    inviteKey:{
        type: String,
        required: true,
        unique:true,
    },
    members:[
            {
                type: String,
            }
    ],
  } , {timestamps: true});

  mongoose.models = {}

  //creating model
  const Channel = mongoose.model('Channel', ChannelSchema);
  
  export default Channel;