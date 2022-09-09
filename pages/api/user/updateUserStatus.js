import User from '../../../models/User'
import connectDb from '../../../middleware/connect'

const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req, res)
        try {
            if(process.env.EXTERNAL_SIGN == req.body.externalSign){
                let user = await User.findById(req.body.userId);
                if (!user) {
                    return res.status(400).json({ success: false, error: "user not found!" });
                }
                user = await User.findByIdAndUpdate(req.userId, {status:req.body.status})
                return res.status(200).json({ success: true })
            }
            else{
                return res.status(400).json({ success: false, msg: "Unauthorized source" })
            }

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