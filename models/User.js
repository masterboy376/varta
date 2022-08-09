import mongoose from 'mongoose'
const { Schema } = mongoose;


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    friends: [
        {
            type: String,
        }
    ],
    channels: [
        {
            type: String,
        }
    ],
    avatarColor:{
        type: String,
        required: true,
    },
}, { timestamps: true });

mongoose.models = {}

//creating model
const User = mongoose.model('User', UserSchema);

export default User;