const jwt = require('jsonwebtoken')

const protect = ( roles ) => {
    return (req , res , next) => {
        let token 
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
            let decode = jwt.verify(token , 'jwtCode')
            if(decode.roles.includes(roles)) {
                next()
            } else {
                res.status(401).json('Not a valid token')
            }
        } else {
            res.status(401).json('Not a valid token')
        }
    }
}

module.exports = protect