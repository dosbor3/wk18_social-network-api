const { Thought, User } = require('../models');

const thoughtController = {
    //get all Thoughts
    getAllThoughts(req, res) {
      Thought.find({})      
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      });
  },
  //get one Thought by id
  getThoughtById({params}, res) {
      Thought.findOne({_id: params.id})      
      .then(dbThoughtData => {
          //if no thought is found, send 404
          if(!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id. '});
              return;
          }
          res.json(dbThoughtData);
      })
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      })
  }, 
    // Create a new thought
    createThought({params, body}, res) {
      Thought.create(body)
      .then(({_id}) => {
          return User.findOneAndUpdate(
            { _id: params.id}, 
            { $push: { thoughts: _id }}, 
            { new: true });
      })
      .then(dbThoughtData => {
          if(!dbThoughtData) {
              res.status(404).json({ message: 'No thought with this id' });
              return;
          }
          res.json(dbThoughtData)
      })
      .catch(err => res.json(err)); 
  },
      //updateThought
      updateThought({ params, body }, res) {    //destructure the params and body out of the req object
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true }) //if not set to true, the original data would be returned not the updated data
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
      //delete Thought
      deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
          .then(deletedThought => {
            if (!deletedThought) {
              return res.status(404).json({ message: 'No thought found with this id!' });
            }
            return User.findOneAndUpdate(
              { _id: params.thoughtId },
              { $pull: { thoughts: params.thoughtId } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
      //create reaction
      createReaction({params, body}, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
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
      //delete reaction
      deleteReaction({params}, res) {
        Thought.findOneAndDelete(
          { _id: params.thoughtId },
          { $pull: {reactions: {reactionId: params.reactionId } } },
          { new: true }
        )
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },
      
    };

module.exports = thoughtController;