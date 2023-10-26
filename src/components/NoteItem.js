// rafce --> react arrow function component export
import React, { useContext } from 'react';
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {

    const context = useContext(noteContext);
    const { deleteNote, showAlert } = context;
    const { note, updateNote } = props;


    // this code is for animation of edit and delte icon
    const handleHover = async (e) => {
        const className = await e.target.className;
        e.target.className = className + " fa-shake";

        if (e.target.id === "edit-icon") {
            setTimeout(() => {
                e.target.className = "fa-solid fa-pen-to-square mx-2";
            }, 500);
        }

        else {
            setTimeout(() => {
                e.target.className = "fa-solid fa-trash mx-2";
            }, 500);
        }

    }

    return (
        <div className='col-md-3 my-3'>
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    {/* <p className="card-text"><b>{note.tag}</b></p> */}
                    <i className={`fa-solid fa-pen-to-square mx-2`} onClick={() => { updateNote(note) }} onMouseOver={handleHover} id={`edit-icon`}></i>
                    <i className={`fa-solid fa-trash mx-2`} onClick={() => {deleteNote(note._id); showAlert("Note Deleted Successfully", "success")}} onMouseOver={handleHover} id={`delete-icon`}></i>
                    {/* <i className="fa-solid fa-trash fa-shake"></i> */}
                </div>
            </div>
        </div>
    )
}

export default NoteItem