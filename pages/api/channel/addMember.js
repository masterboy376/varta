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

            if(req.body.inviteKey){
                let channel = await Channel.findOne({inviteKey:req.body.inviteKey})
                if(!channel){
                    return res.status(400).json({ success: false, error: "invalid invite key!" });
                }
                let newMembers = [...channel.members]
                let newChannels = [...user.channels]
                if(!newMembers.includes(req.userId) && !newChannels.includes(channel._id)){
                    newMembers.push(req.userId)
                    newChannels.push(channel._id)
                }
                else{
                    return res.status(400).json({ success: false, error: "you are already in this channel!" });
                }
                channel = await Channel.findOneAndUpdate({inviteKey:req.body.inviteKey}, {members: newMembers})
                user = await User.findByIdAndUpdate(req.userId, {channels: newChannels})
                return res.status(200).json({ success: true, channel, user });
            }
            else{
                let member = await User.findById(req.body.memberId)
                if(!member){
                    return res.status(400).json({ success: false, error: "invalid user!" });
                }
                let channel = await Channel.findOne({hostId:req.userId})
                if(!channel){
                    return res.status(400).json({ success: false, error: "channel not found!" });
                }
                let newMembers = [...channel.members] 
                let newChannels = [...member.channels]
                if(!newMembers.includes(req.body.memberId) && !newChannels.includes(channel._id)){
                    newMembers.push(req.body.memberId)
                    newChannels.push(channel._id)
                }
                channel = await Channel.findOneAndUpdate({hostId:req.userId}, {members: newMembers})
                member = await User.findByIdAndUpdate(req.body.memberId, {channels: newChannels})
                return res.status(200).json({ success: true, channel, member });
            }
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