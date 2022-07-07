import Message from '../../../models/Message'
import User from '../../../models/User'
import connectDb from '../../../middleware/connect'
import verify from '../../../middleware/verify'
import cryptoJs from 'crypto-js'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req, res)
        verify(req,res)
        try {
            const user = await User.findById( req.userId );
            if (!user) {
                return res.status(400).json({ success: false, error: "user not found!" });
            }

            if (req.userId.toString()!=req.body.from.toString()) {
                return res.status(400).json({ success: false, error: "action denied!" });
            }

            const secureMessage = cryptoJs.AES.encrypt(req.body.message, process.env.CRYPTO_SIGN).toString()

            const message = await Message.create({
                from: req.body.from,
                to: req.body.true,
                message: secureMessage,
                isDm: req.body.isDm,
            })

            res.status(200).json({ success: true, message });
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