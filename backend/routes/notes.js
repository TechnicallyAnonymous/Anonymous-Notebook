const express = require("express");
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Note");
const { body, validationResult } = require('express-validator');


// ROUTE 1 :  Get All the notes using: GET "/api/notes/fetchallnotes". Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        // this will give all the notes which contain userId
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 2 :  Add a new note using : POST "/api/notes/addnote". Login required

router.post('/addnote', fetchuser, [

    body('title', 'Enter a valid title').isLength({ min: 1 }),
    body('description', 'Description must be atleast 1 characters').isLength({ min: 1 }),

], async (req, res) => {

    try {

        const { title, description, tag } = req.body; // object destructuring of data that we entered in request(body).

        // If there are errors, return bad request and the errors 
        // validationResult(req) gives errors which we get if above given properties are not fulfilled.
        const ErrResult = validationResult(req);

        if (!ErrResult.isEmpty()) {
            return res.status(400).json({ errors: ErrResult.array() })
        };

        // Creating a new note, here Note is model.
        const note = new Note({
            title, description, tag, user: req.user.id
        });

        // saving a note to mongo db
        const savedNote = await note.save();

        res.json(savedNote);

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3 :  Update an existing Note using : PUT "/api/notes/updatenote". Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body; // object destructuring of data that we entered in request(body).
    
    try{
    
    // Create a new note Object
    const newNote = {};

    if (title) { newNote.title = title };   // if the user enters a value then it will be updated.
    if (description) { newNote.description = description };   // if the user enters a value then it will be updated.
    if (tag) { newNote.tag = tag };   // if the user enters a value then it will be updated.

    // Find the Note to be updated and update it.
    let note = await Note.findById(req.params.id);

    if (!note) { return res.status(404).send("Not Found") }; // If Note does not exist that a user want to update.

    // note.user is an ObjectId so toString is used
    if (note.user.toString() != req.user.id) {
        return res.status(401).send("Not Allowed");
    };

    // Note is Updated
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

    res.json({ note });

} catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error");
}

})


// ROUTE 4 :  Delete an existing Note using : DELETE "/api/notes/deletenote". Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    
    // const { title, description, tag } = req.body; // object destructuring of data that we entered in request(body).
    
    try{

    // Find the Note to be deleted and delete it.
    let note = await Note.findById(req.params.id);

    if (!note) { return res.status(404).send("Not Found") }; // If Note does not exist that a user want to update.

    // note.user is an ObjectId so toString is used.
    // allow this deletion only if user owns this note.
    if (note.user.toString() != req.user.id) {
        return res.status(401).send("Not Allowed");
    };

    // Note is Updated
    note = await Note.findByIdAndDelete(req.params.id);

    res.json({"Success": "Note has been deleted", note: note});

} catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error");
}

})


module.exports = router;