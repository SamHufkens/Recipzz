const jwt = require("jsonwebtoken")
const User = require("../models/User")
require('dotenv').config

const requireAuth = (req, res, next) => {
    const token  =req.cookies.jwt
     // ckeck jwt exist & is verified
    if (token) {
        jwt.verify(token, process.env.JWTSECRET, (err, decodedtoken) => {
            if (err) {
                console.log(err.message)
                res.redirect("/login")
            } 
            else {
                console.log(decodedtoken)
                next()
            }
        })
    } 
    else {
        res.redirect("/login")
    }
}

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.JWTSECRET, async (err, decodedtoken) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null
                next()
            } else {
                console.log(decodedtoken)
                let user = await User.findById(decodedtoken.id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports = {requireAuth, checkUser}