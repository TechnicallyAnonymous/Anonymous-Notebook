// rafce --> react arrow function component export
import React, {useContext, useState} from 'react';
import noteContext from "../context/notes/noteContext";

const AddNote = () => {

    // importing function from context
    const context = useContext(noteContext);
    const {addNote, showAlert } = context;

    
    const [note, setNote] = useState({title: "", description: "", tag: "default"})
    
    // When submit(add note) button is clicked
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: "default"});
        
        showAlert("Note Added Successfully", "success");
    }


    const onChange = (e)=>{
        // console.log({...note})
        setNote({...note, [e.target.name]: e.target.value})
    }
    
    // console.log(note)
    
    return (
        <div>
            <div className="container my-3">
                <h1>Add a Note</h1>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={1} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={1} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag==="default"?"":note.tag} onChange={onChange} />
                    </div>
                    <button disabled={note.description.length<1 || note.title.length<1} type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote