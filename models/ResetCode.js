import mongoose from 'mongoose'
const { Schema } = mongoose;


const ResetCodeSchema = new Schema({
    accountId: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    expiryTime: { type: Number, default: new Date().getTime() + 600000 }
}, { timestamps: true });

mongoose.models = {}

//creating model
const ResetCode = mongoose.model('ResetCode', ResetCodeSchema);

export default ResetCode;