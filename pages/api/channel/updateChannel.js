import Channel from '../../../models/Channel'
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

            let channel = await Channel.findOne({hostId:req.userId})
            if(!channel){
                return res.status(400).json({ success: false, error: "channel not found!" });
            }

            channel = await Channel.findOneAndUpdate({hostId:req.userId}, req.body.newChannelData)
            return res.status(200).json({ sucess: true, channel })
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