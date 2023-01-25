const express = require('express')
const userRouter = require('./routes/userRoutes')
const recipeRouter = require('./routes/recipeRoutes')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const { checkUser } = require('./middleware/userMiddleware');

const app = express()


app.set('view engine', 'ejs')

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));


// Connect to mongodb
mongoose.connect(process.env.dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(process.env.PORT))
    .catch((err) => console.log(err))



app.get("*", checkUser)

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
// Recipes routes
app.use( recipeRouter)


// Status code 404 -> if page doesn't exist
app.use((req, res) => {
    res.render('404', {
        title: "404"
    })
})