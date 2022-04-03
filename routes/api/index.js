const router = require('express').Router();

const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');


// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/api/thoughts', thoughtRoutes);
router.use('/api/users', userRoutes);

module.exports = router;