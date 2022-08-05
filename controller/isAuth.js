const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = await jwt.verify(token, 'shhhhh');
        if (!decoded._id) {
            return res.status(500).json({ error: 'No login' })
        }
        req.info = decoded
        next()
    }catch(e){
        next('No Login')
    }
}
module.exports = isAuth;