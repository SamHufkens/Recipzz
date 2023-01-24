const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleErrors = (err) => {
    console.log(err.code, err.message)
    let errors = {username: '', email: '', password: ''}

    // Check if email or password is correct when logging in
    if (err.message === "Incorrect email") {
        errors.email = "This email is incorrect."
    }

    if (err.message === "Incorrect password") {
        errors.password = "This password is incorrect."
    }

    // Check for duplicate errors
    if (err.code === 11000) {
        if (err.message.includes('username')) {
            errors.username = 'This username already exist.'
        }

        if (err.message.includes('email')) {
            errors.email = 'This email already exist.'
        }
        return errors
    }

    // Validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
           errors[properties.path] = properties.message
        })
    }
    return errors
}

const maxAge =  3 * 24 * 60 *60
// Create JWT token
const createToken = (id) =>  {
    return jwt.sign({id}, process.env.JWTSECRET, {
        expiresIn: maxAge
    })
}



// Register
const register_get = (req, res) => {
    res.render('user/register', {
        title: "Register",
        cssFile: "../css/register.css"
    })
}

const register_post = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const user = await User.create({username, email, password})
        res.status(201).json({user: user._id})
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

// Login
const login_get = (req, res) => {
    res.render('user/login', {
        title: "Login",
        cssFile: "../css/register.css"
    })
}

const login_post = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json({user: user._id})
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

const logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/')
}


module.exports = {
    register_get,
    register_post,
    login_get,
    login_post,
    logout_get
}




