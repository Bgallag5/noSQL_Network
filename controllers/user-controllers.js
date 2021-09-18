// const { builtinModules } = require('module');
const {User, Thought} = require('../models');

const userController = {

//GET all users
getAllUsers(req, res){
    User.find({})
    // .populate({
    //     path: 'thoughts',
    //     select: '-__v',
    // })
    .select('-__v')
    .then(dbData => res.json(dbData))
    .catch(err => res.status(400).json(err))
},

//GET single user
getOneUser({params}, res){
    User.findOne({_id: params.id})
    // .populate({
    //     path: 'thoughts',
    //     select: '-__v'
    // })
    .select('-__v')
    .then(dbData => res.json(dbData))
},

//POST new user
postNewUser({body}, res){
    User.create(body).then(dbData => {
        res.json(dbData)
        .catch(err => res.status(400).json(err))
    })
},

//PUT-UPDATE user
updateUser({params, body}, res){
    User.findOneAndUpdate({_id: params.id}, body, {new: true})
    .then(dbData => {
        if (!dbData){
            res.status(404).json({message: 'No such user found'})
        }
        res.json(dbData)
    }).catch(err => res.status(400).json(err))
},

//DELETE user
deleteUser({params}, res){
    User.findOneAndDelete({_id: params.id})
    .then(dbData => {
        if (!dbData){
            res.status(404).json({message: 'No such user found'})
        }
        res.json(dbData)
    }).catch(err => res.status(400).json(err))
},


//POST new friend to user
addFriend({params}, res){
    console.log(params.userId);
    User.findOneAndUpdate(
        {_id: params.userId},
        {$addToSet: {
            friends: params.friendId,
        }
    },
    {new: true, runValidators: true}
    ).then(dbData => {
        if (!dbData){
            res.status(404).json({message: "One or both of these people do not exist"})
        }
        res.json(dbData)
    }).catch(err => res.status(400).json(err))
},


//DELETE friend from user 
deleteFriend({params}, res){
    User.findOneAndUpdate(
        {_id: params.userId},
        { $pull: {friends: params.friendId}},
        {new: true, runValidators: true}
        )
    .then(dbData => {
        if (!dbData){
            res.status(404).json({message: "No such user found"})
        }
        res.json(dbData)
    }).catch(err => res.status(400).json(err))
},

}

module.exports = userController; 