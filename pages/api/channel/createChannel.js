import Channel from '../../../models/Channel'
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

            let channel = await Channel.findOne({name:req.body.name})
            if(channel){
                return res.status(400).json({ success: false, error: "channel with this name already exist please try another name!" });
            }

            channel = await Channel.create({
                name: req.body.name,
                avatarColor: req.body.avatarColor,
                description: req.body.description,
                hostId: req.userId,
                inviteKey: cryptoJs.AES.encrypt(req.userId, process.env.CRYPTO_SIGN).toString(),
                members:[req.userId]
            })

            let newChannels = [...user.channels]
                if(!newChannels.includes(channel._id)){
                    newChannels.push(channel._id)
                }

            user = await User.findByIdAndUpdate(req.userId, {channels: newChannels})

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