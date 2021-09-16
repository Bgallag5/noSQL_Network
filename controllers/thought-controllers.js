const {User, Thought} = require('../models');


const thoughtController = {

//GET ALL thoughts
getAllThoughts(req, res){
    Thought.find({})
    .then(dbData => {
        if (!dbData) {
            res.status(404).json({message: "No thoughts found"})
        }
        res.json(dbData)
    }).catch(err => res.status(400).json(err))
},

//GET ONE thought
getOneThought({params}, res){
    Thought.findOne({_id: params.id})
    .then(dbData => {
        if (!dbData) {
            res.status(404).json({message: "No thoughts found"})
        }
        res.json(dbData)
    }).catch(err => res.status(400).json(err))
},

//POST thought
postThought({body}, res){
    const {thoughtText, username, userId} = body;
    console.log(thoughtText, username, userId);

    Thought.create({thoughtText: thoughtText, username: username})
    .then(dbThought => {
        console.log('====dbTHOUGHT====');
        console.log(dbThought);
         User.findOneAndUpdate(
            { _id: userId},
            {$push: {thoughts: dbThought._id} },
            {new: true, runValidators: true}
        );
    }).then(dbData => {
        console.log('===DBDATA====');
        console.log(dbData);
        if (!dbData){
            res.status(404).json({message: 'User doesnt exist'})
        }
        res.json(dbData)
    })
    .catch(err => res.status(400).json(err))
},

//PUT-UPDATE thought by id
updateThought({body}, res){
    Thought.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true})
    .then(dbData => {
        if (!dbData) {
            res.status(404).json({message: "No thoughts found"})
        }
        res.json(dbData)
    }).catch(err => res.status(400).json(err))
},

//DELETE though 
deleteThought({params}, res){
    Thought.find({ _id: params.id })
    .then(dbData => {
        if (!dbData) {
            res.status(404).json({message: "No thoughts found"})
        }
        res.json(dbData)
    }).catch(err => res.status(400).json(err))
},

//POST reactions
addReaction({params, body}, res){
    Thought.findOneAndUpdate(
        { _id: params.thoughtId},
        {$addToSet:{ reactionBody: body }},
        {new: true, runValidators: true}
    ).then(dbData => {
        if (!dbData){
            res.status(404).json({message: "No reaction found"})
        }
        res.json(dbData)
    }).catch(err => res.status(400).json(err))
},

//DELETE reactions
deleteReaction({params}, res){
    Thought.findOneAndUpdate(
        { _id: params.thoughtId},
        {$pull:{ reactions: params.reactionId }},
        {new: true, runValidators: true}
    ).then(dbData => {
        if (!dbData){
            res.status(404).json({message: "No reaction found"})
        }
        res.json(dbData)
    }).catch(err => res.status(400).json(err))
},

};


module.exports = thoughtController;