import User from '../../../models/User'
import connectDb from '../../../middleware/connect'
import verify from '../../../middleware/verify'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req, res)
        verify(req,res)
        try {
            let user1 = await User.findById( req.userId );
            if (!user1) {
                return res.status(400).json({ success: false, error: "user not found!" });
            }
            let user2 = await User.findById( req.body.friendId );
            if (!user2) {
                return res.status(400).json({ success: false, error: "user not found to be added as a friend!" });
            }
            
            let newUser1Friends = [...user1.friends]
            let newUser2Friends = [...user2.friends]
            if(!newUser1Friends.includes(req.body.friendId) && !newUser2Friends.includes(req.userId)){
                newUser1Friends.push(req.body.friendId)
                newUser2Friends.push(req.userId)
            }

            user1 = await User.findByIdAndUpdate(req.userId, {friends:newUser1Friends})
            user2 = await User.findByIdAndUpdate(req.body.friendId, {friends:newUser2Friends})
            return res.status(200).json({ success: true, user1, user2 });
            
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