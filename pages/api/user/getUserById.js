import User from '../../../models/User'
import connectDb from '../../../middleware/connect'

const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req, res)
        try {
            let user = await User.findById( req.body.userId );
            if (!user) {
                return res.status(400).json({ success: false, error: "user not found!" });
            }

            res.status(200).json({ success: true, user });
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