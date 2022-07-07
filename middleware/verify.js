import jwt from 'jsonwebtoken'
import cryptoJs from 'crypto-js'

const verify = (req, res) => {
    const JWT_SECRET = process.env.JWT_SIGN;

    const rawToken = req.body.authToken;
    let bytes = cryptoJs.AES.decrypt(rawToken, process.env.CRYPTO_SIGN);
    let token = bytes.toString(cryptoJs.enc.Utf8);
    if (!token) {
        res.status(401).send({ success: false, error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.userId = data.id;
    } catch (error) {
        return res.status(401).send({ success: false, error: "Please authenticate using a valid token" })
    }

}

export default verify