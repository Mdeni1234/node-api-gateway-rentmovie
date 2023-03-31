const jwt = require('jsonwebtoken')


const jwtAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send({message: "User not logged in"})

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }
        req.user = user
        req.token = token
        
        next()
    })
};

const ensureAdmin = async (req, res, next) => {
    try{
        const role_name = req.user["role"]
        if(role_name === 'admin') return next()
        else{
            throw new Error("Role must be 'admin'")
        }
    }catch(error) {
        return res.status(401).json(({message: error.message}))
    }
}

module.exports = {
    jwtAuth,
    ensureAdmin
}