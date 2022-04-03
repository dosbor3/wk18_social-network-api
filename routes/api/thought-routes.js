const router = require('express').Router();
const { 
    getAllThoughts,
    getThoughtById, 
    createThought,
    updateThought,
    deleteThought,
    createReaction, 
    deleteReaction  
} = require('../../controllers/thought-controller');

router
.route('/')
.get(getAllThoughts);

router
.route('/:id')
.post(createThought)
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

//setup reactions route
router
.route('/:thoughtId/reactions/')
.post(createReaction)
.delete(deleteReaction);

router.route('/:thoughtId/reactions/').post()

module.exports = router;

