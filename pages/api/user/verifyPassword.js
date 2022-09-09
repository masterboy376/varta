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

            let bytes = cryptoJs.AES.decrypt(user.password, process.env.CRYPTO_SIGN);
            let originalPassword = bytes.toString(cryptoJs.enc.Utf8);
            if (req.body.password != originalPassword) {
                return res.status(400).json({ success: false, error: `invalid password.` });
            }

            return res.status(200).json({ success: true, msg:'verified successfully.' });
            
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