const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser, 
    deleteUser,
    createFriend,
    deleteFriend
} = require('../../controllers/user-controller');

//Setup GET all and POST at /api/users
router
.route('/')
.get(getAllUsers)
.post(createUser);

//Setup GET one, PUT, and DELETE at /api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

//Setup friends routes at /api/users/:id/friends/:friendId
router
.route('/:id/friends/:friendId')
.post(createFriend)
.delete(deleteFriend);

//removing thought
//router.route('/:thoughtId').delete(deleteThought);

module.exports = router;