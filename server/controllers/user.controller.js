const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY
module.exports = {

    registerUser: async (req, res) => {
        const potentialUser = await User.findOne({email:req.body.email})
        if (potentialUser){
            res.status(400).json({error:{errors:'This email already exists'}})
        }
        else{
            try{
                const newUser = await User.create(req.body)
                const expires = new Date(Date.now() + 900000)
                const userToken = jwt.sign({_id: newUser._id, name:`${newUser.firstName} ${newUser.lastName}`}, SECRET)
                res.status(201)
                    .cookie('userToken', userToken, {httpOnly:true, expires: expires})
                    .json({success: 'user logged in',userToken:userToken, newUser: newUser})
            }
            catch(err){
                res.status(400).json({error: err})
            }

        }
    },

    loginUser: async (req, res) => {
        const user = await User.findOne({email:req.body.email})
        const expires = new Date(Date.now() + 900000)
        if (!user){
            res.status(400).json({error:'Invalid Email/Password'})
        }
        try{
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
            if(!isPasswordValid){
                res.status(400).json({error: 'Invalid Email/Password'})
            }
            else{
                const userToken = jwt.sign({_id: user._id, name:`${user.firstName} ${user.lastName}`}, SECRET)
                res.status(201)
                    .cookie('userToken', userToken, {httpOnly:true, expires: expires})
                    .json({success: 'user logged in',userToken:userToken, user: user})
            }
        }
        catch(error){
            res.status(400).json({error:`something went wrong ${error}`})
        }
    },
    logout: (req, res) => {
        res.clearCookie('userToken')
        res.json({message:'User logged out'})
    },
    findOneUser: (req, res) => {
        User.findById({_id: req.params.id})
            .then(user => res.json({user:user}))
            .catch(err => console.log(err))
    }
}