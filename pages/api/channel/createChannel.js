import Channel from '../../../models/Channel'
import User from '../../../models/User'
import connectDb from '../../../middleware/connect'
import verify from '../../../middleware/verify'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req, res)
        verify(req,res)
        try {
            let user = await User.findById( req.userId );
            if (!user) {
                return res.status(400).json({ success: false, error: "user not found!" });
            }

            let channel = await Channel.create({
                name: req.body.name,
                description: req.body.description,
                hostId: req.userId,
                inviteKey: req.body.inviteKey,
                members:[req.hostId]
            })

            res.status(200).json({ success: true, channel });
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