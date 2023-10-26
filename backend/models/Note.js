const mongoose = require('mongoose');

const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,    // this means objectId(id of user) of other model(Foreign Key).
        ref: 'user'                              // from which you want the id
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,

    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
    
});

module.exports = mongoose.model('notes', NotesSchema)