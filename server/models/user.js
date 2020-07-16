const mongoose = require("mongoose")
const bcrypt = require("bcrypt-nodejs")
const e = require("express")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    password: {type: String}
})

//On save hook, encrypt password
//Before saving a model, run this function
userSchema.pre('save', function(next) {
    //get access to user model
    const user = this

    //generate a salt, then run the callback
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err)
        }

        //hash (encrypt) the password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) {
                return next(err)
            }
            //overwrite plain text password with encrypted password
            user.password=hash
            next()
        })
    })
})

userSchema.methods.comparePasswords = (candidatePassword,user, callback) => {
    console.log('debug', user)
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
        //console.log('in compare', this)
        if(err) {
            return callback(err)
        } else {
            callback(null, isMatch)
        }
    } )
}

const ModelClass = mongoose.model('user', userSchema)

module.exports = ModelClass
