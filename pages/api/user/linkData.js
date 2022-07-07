import User from '../../../models/User'
import ResetCode from '../../../models/ResetCode'
import connectDb from '../../../middleware/connect'

const codeGenerator = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req, res)
        try {
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ success: false, error: "No user found with this Email. Please use different Email." });
            }

            let random = codeGenerator(30);

            const resetCode = await ResetCode.create({
                accountId: user._id,
                code: random,
            })

            const data = {
                name: user.name,
                code: random,
            }

            res.status(200).json({ success: true, data });
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