import mongoose from 'mongoose'
const { Schema } = mongoose;


const MessageSchema = new Schema({
    from:{
        type: String,
        required: true,
    },
    to:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
    isDm:{
        type: Boolean,
        required: true
    }
  } , {timestamps: true});

  mongoose.models = {}

  //creating model
  const Message = mongoose.model('Message', MessageSchema);
  
  export default Message;