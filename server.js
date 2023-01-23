const express = require('express')
const userRouter = require('./routes/userRoutes')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()


app.set('view engine', 'ejs')

// middleware
app.use(express.static('public'))

// Port number
app.listen(process.env.PORT)


// Default Home Page (no auth)
app.get('/', (req, res) => {
    res.render('homeDefault', {
        title: "Home",
        cssFile: "../css/style.css"
    })
})

// About Page (no auth)
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        cssFile: ""
    })
})

// Users routes
app.use(userRouter)


// Status code 404 -> if page doesn't exist
app.use((req, res) => {
    res.render('404', {
        title: "404"
    })
})