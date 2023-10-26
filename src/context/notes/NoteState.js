import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    // eslint-disable-next-line

    const host = "http://localhost:5000"

    const initialNotes = []

    const [notes, setNotes] = useState(initialNotes);


    // ROUTE 1 :  Get All the notes using: GET "/api/notes/fetchallnotes". Login required
    const getNotes = async () => {

        // API Call ( fetch with header -- mdn docs )
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", // GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });

        // json will contain the response that we get when we called above api
        const json = await response.json();
        setNotes(json);
    }


    // ROUTE 2 :  Add a new note using : POST "/api/notes/addnote". Login required
    const addNote = async (title, description, tag) => {

        // API Call ( fetch with header -- mdn docs )
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST", // GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        // response.json contains the note that we just added
        const json = await response.json();

        // Logic to edit a note in client
        setNotes(notes.concat(json));
    }


    // ROUTE 3 :  Update an existing Note using : PUT "/api/notes/updatenote". Login required
    const editNote = async (id, title, description, tag) => {

        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", // GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));

        // Logic to edit a note in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }


    // ROUTE 4 :  Delete an existing Note using : DELETE "/api/notes/deletenote". Login required
    const deleteNote = async (id) => {

        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", // GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });

        const json = await response.json();
        console.log(json);

        // Logic to edit a note in client
        const newNotes = notes.filter((note) => { return note._id !== id });  // it will return the new array in which deleted note will note be present. 
        setNotes(newNotes);
    }


    // Show Alert Functions
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) => {
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
        setAlert(null)
      }, 2000);
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, getNotes, addNote, deleteNote, editNote, alert, showAlert }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;