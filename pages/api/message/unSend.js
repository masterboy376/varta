import Message from '../../../models/Message'
import User from '../../../models/User'
import connectDb from '../../../middleware/connect'
import verify from '../../../middleware/verify'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req, res)
        verify(req,res)
        try {
            const user = await User.findById( req.userId );
            if (!user) {
                return res.status(400).json({ success: false, error: "user not found!" });
            }

            let message = await Message.findById(req.body.messageId)
            if (req.userId.toString()!=message.from.toString()) {
                return res.status(400).json({ success: false, error: "action denied!" });
            }

            message = Message.findByIdAndDelete(req.body.messageId)


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