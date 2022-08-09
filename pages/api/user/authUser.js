import User from '../../../models/User'
import connectDb from '../../../middleware/connect'
import jwt from 'jsonwebtoken'
import cryptoJs from 'crypto-js'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req, res)
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(400).json({ success: false, error: `Please try to login with the correct credentials.` });
            }

            let bytes = cryptoJs.AES.decrypt(user.password, process.env.CRYPTO_SIGN);
            let originalPassword = bytes.toString(cryptoJs.enc.Utf8);
            if (req.body.password != originalPassword) {
                return res.status(400).json({ success: false, error: `Please try to login with the correct credentials.` });
            }

            const authToken = jwt.sign({ id: user._id }, process.env.JWT_SIGN);

            res.json({ success: true, authToken: cryptoJs.AES.encrypt(authToken, process.env.CRYPTO_SIGN).toString() });
        }
        catch (error) {
            res.status(500).json({ success: false, error: `Internal serer error occured! -> ${error}` });
        }
    }
    else {
        return res.status(400).json({ success: false, error: 'Please make a valid request' })
    }
}

export default handler