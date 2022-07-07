import User from '../../../models/User'
import connectDb from '../../../middleware/connect'

const handler = async (req, res) => {
    connectDb(req,res)
    try {
    const users = await User.find().select("-password")
    return res.status(200).json({ success: true, users })
    }
    catch (error) {
        return res.status(500).json({ success: false, error: `Internal server error occurred! -> ${error}` })
    }
}

export default handler