const jwt = require('jsonwebtoken');

function jwtToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return res.sendStatus(401)
    
    req.token = token
    
    next()
}

module.exports = { jwtToken }