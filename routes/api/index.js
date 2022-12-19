const router = require('express').Router();
const userRoutes = require('./userRoutes')
const thoughtRoutes = require('./thoughtRoutes')

// Setting user routes to include /users and thought routes to include /thoughts
router.use('/users', userRoutes)
router.use('/thoughts', thoughtRoutes)

module.exports = router;