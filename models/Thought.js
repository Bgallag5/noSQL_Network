// const { ObjectId } = require('bson');
const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: val => dateFormat(val)
    }
},
{
    toJSON: {
        getters: true,
        virtuals: true,
    }
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: val => dateFormat(val)
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    reactions: [reactionSchema]
    // reactions: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'thought'
    // }]
},
{
    toJSON: {
        getters: true,
        virtuals: true,
    }
});

thoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema)

module.exports = Thought;