const jwt = require('jsonwebtoken')
// const SECRET = process.env.SECRET_KEY
const SECRET = 'asdgerg34t53tg34ntgn#$%'


module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, SECRET, (err,payload) => {
        if(err){
            res.status(401).json({verified: false})
        }
        else{
            // console.log('Authenticated')
            next()
        }
    })
}