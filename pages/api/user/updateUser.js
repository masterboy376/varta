import User from '../../../models/User'
import connectDb from '../../../middleware/connect'
import verify from '../../../middleware/verify'
import cryptoJs from 'crypto-js'

const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req, res)
        verify(req,res)
        try {
            let user = await User.findById( req.userId );
            if (!user) {
                return res.status(400).json({ success: false, error: "user not found!" });
            }

            const verifyPassword = cryptoJs.AES.encrypt(req.body.verifyPassword, process.env.CRYPTO_SIGN).toString()
            if(verifyPassword==user.password){
                user = User.findByIdAndUpdate(req.userId, req.body.newUserData)
                return res.status(200).json({ sucess: true, user })
            }
            else{
                return res.status(400).json({ success: false, error: "invalid password!" });
            }

        }
        catch (e) {
            return res.status(500).json({ success: false, msg: "internal server error occurred" })
        }
    }
    else {
        return res.status(400).json({ success: false, error: 'Please make a valid request' })
    }
}

export default handler