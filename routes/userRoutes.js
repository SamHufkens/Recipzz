const {Router} = require('express')
const userController = require('../controllers/userController')

const router = Router()

// Register routes
router.get('/register', userController.register_get)
router.post('/register', userController.register_post)

// Login routes
router.get('/login', userController.login_get)
router.post('/login', userController.login_post)

// Logout routes
router.get('/logout', userController.logout_get)



module.exports = router