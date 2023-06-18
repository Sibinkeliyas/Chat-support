const jwt = require('jsonwebtoken')

const generateToken = (roles) => {
    return jwt.sign({roles} , 'jwtCode' , {
        expiresIn : '30d'
    })
}

module.exports = generateToken