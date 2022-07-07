import User from '../../../models/User'
import ResetCode from '../../../models/ResetCode'
import connectDb from '../../../middleware/connect'
import jwt from 'jsonwebtoken'
import cryptoJs from 'crypto-js'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req, res)
        try {
            let codeDetail = await ResetCode.findOne({code:req.body.code})
            if(!codeDetail){
                return res.status(400).json({ success: false, error: "Invalid Link!" });
            }
            if(new Date().getTime()>codeDetail.expiryTime){
                codeDetail = await ResetCode.findByIdAndDelete(codeDetail._id);
                return res.status(400).json({ success: false, error: "Link expierd! Please retry." });
            }
            console.log(codeDetail)
            let user = await User.findById(codeDetail.accountId);
            if (!user) {
                return res.status(400).json({ success: false, error: "User does not exists!" });
            }

            const securePassword = cryptoJs.AES.encrypt(req.body.password, process.env.CRYPTO_SIGN).toString()

            user = await User.findByIdAndUpdate(user._id, {password:securePassword})

            codeDetail = await ResetCode.findByIdAndDelete(codeDetail._id);

            const authToken = jwt.sign( {id: user._id} , process.env.JWT_SIGN );
            res.status(200).json({ success: true, authToken: authToken });
        }
        catch (error) {
            res.status(500).json({ success: false, error: `Internal serer error has occured! -> ${error}` });
        }
    }
    else {
        return res.status(400).json({ success: false, error: 'Please make a valid request' })
    }
}

export default handler