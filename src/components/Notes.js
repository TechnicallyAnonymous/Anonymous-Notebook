// rafce --> react arrow function component export
import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {

    const context = useContext(noteContext);
    const { notes, getNotes, editNote, showAlert } = context;
    const navigate = useNavigate();       

    // This will fetch all notes and display at client side
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])

    
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({id: "",etitle: "", edescription: "", etag: "default"});


    // when update note icon is clicked in NoteItem then this function will run
    const updateNote = (currentNote) => {
    
        // current is pointing the button in which ref is used
        // this means when {edit icon} is clicked then {launch modal button} is clicked
        ref.current.click();
        
        setNote({id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }
    
    
    // When submit(save changes) button is clicked
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        showAlert("Note Edited Successfully", "success")
    }


    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
        {/* This is a form for adding a new note */}
            <AddNote />


        {/* This is button will automaticlly clicked when {edit button} is clicked */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


        {/* This is a form(modal) which appears when {above button} is clicked */}
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={1} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={1} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.edescription.length<1 || note.etitle.length<1} type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* This is will display the notes card */}
            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className="container mx-1">
                {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note, index) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} index={index} />
                })}
            </div>
        </>
    )
}

export default Notes