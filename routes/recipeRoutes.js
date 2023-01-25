const {Router} = require('express')
const userController = require('../controllers/recipeController')
const { requireAuth } = require('../middleware/userMiddleware');

const router = Router()

// Register routes
router.get('/homeLogged', requireAuth ,userController.index_get)
router.post('/homeLogged', requireAuth,userController.create_post)
router.get('/create', requireAuth ,userController.create_get)
router.get('/:id', requireAuth ,userController.details)
router.delete('/:id', requireAuth, userController.delete_recipe)


module.exports = router