const { User, } = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },    
    //get one User by id
    getUserById({params}, res) {
        User.findOne({_id: params.id})    
        .then(dbUserData => {
            //if no User is found, send 404
            if(!dbUserData) {
                res.status(404).json({ message: 'No User found with this id. '});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //createUser
    createUser({body}, res) {  //destructure the body out of the req object
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    //update User by id
    updateUser({ params, body }, res) {    //destructure the params and body out of the req object
        User.findOneAndUpdate({ _id: params.id }, body, { new: true }) //if not set to true, the original data would be returned not the updated data
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No User found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    //remove
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No User found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    createFriend({params, body}, res) {
        User.findOneAndUpdate(
          { _id: params.friendId },
          { $push: { friends: body }},
          { new: true }
        )
       .then(dbUserData => {
         if(!dbUserData) {
           res.status(404).json({message: 'no user found with this id'})
           return;
         }
         res.json(dbUserData);
       })
       .catch(err => res.json(err));
      },
      //delete Freind
      deleteFriend({params}, res) {
        User.findOneAndDelete(
          { _id: params.friendId },
          { $pull: {friends: {friendsId: params.friendsId } } },
          { new: true }
        )
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },
};
module.exports = userController;