const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { isEmail } = require('validator')
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minlength:[2, 'First name must be 2 or more characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minlength:[2, 'Last name must be 2 or more characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [isEmail, 'Invalid Email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength:[8, 'Password must be 8 or more characters']
    },
}, {timestamps: true})

UserSchema.pre('save', async function(next) {
    try{
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        next()
    }
    catch(error){
        console.log('ERR in hash password ', error);
    }
})

// Virtual field
UserSchema.virtual('confirmPassword')
    .get(() => this.confirmPassword)
    .set(value => this.confirmPassword = value)

// Middleware
UserSchema.pre('validate', function (next) { 
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords dont match')
    }
    next()
})
module.exports = mongoose.model('User', UserSchema)