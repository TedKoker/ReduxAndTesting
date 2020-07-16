const jwt = require("jwt-simple")
const User = require("../models/user")
const config = require("../config")

function tokenForUser(user) {
    const timestamp = new Date().getTime()
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = (req, res, next) => {
    res.send({ token: tokenForUser(req.user) })
}

exports.signup = function(req, res, next) {
    
    const email = req.body.email
    const pass = req.body.password

    if(!email || !pass) {
        return res.status(422).send({error: "You must provide email and password"})
    }

    //see if a user with given emails exsits
    User.findOne({email: email}, function(err, existingUser) {
        if(err) {
            return next(err)
        }

        //if user with email exists, return error
        if(existingUser) {
            return res.status(422).send({error:"Email is in use"})
        }

        //if user with email does not exists, create and save user record
        const user = new User({
            email: email, 
            password: pass
        })
        user.save(function(err) {
            if(err) {
                return next(err)
            }

            //repond to request indicated the user was created
            res.json({token: tokenForUser(user)})
        })
    })
}