import User from '../../../models/User'
import connectDb from '../../../middleware/connect'

const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req, res)
        try {
            const userData = []
            let user

            
            for (let item of req.body.userIds){
                user = await User.findById( item ).select("-password");
                if (!user) {
                    continue
                }
                await userData.push(user)
            }

            res.status(200).json({ success: true, userData });
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