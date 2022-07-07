import User from '../../../models/User'
import connectDb from '../../../middleware/connect'
import jwt from 'jsonwebtoken'
import cryptoJs from 'crypto-js'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req, res)
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success: false, error: "Please use different email. User with this email already exists" });
            }

            const securePassword = cryptoJs.AES.encrypt(req.body.password, process.env.CRYPTO_SIGN).toString()

            user = await User.create({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: securePassword,
                friends:[],
                channels:[]
            })

            const authToken = jwt.sign( {id: user._id} , process.env.JWT_SIGN );
            res.status(200).json({ success: true, authToken:cryptoJs.AES.encrypt(authToken, process.env.CRYPTO_SIGN).toString()});
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