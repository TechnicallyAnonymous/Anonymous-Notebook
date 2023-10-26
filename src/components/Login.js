import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext";


const Login = () => {

    const context = useContext(noteContext);
    const {showAlert} = context;  

    const [credentials, setCredentials] = useState({email:"", password:""})

    // useNavigate helps to redirect to any selected page.
    let navigate = useNavigate();

    const handleSubmit = async (e)=>{
        
        e.preventDefault(); // helps to prevent the page from reloading.

        // ROUTE 2(auth.js) :  Authenticate a User using: POST "/api/auth/login".
        // API Call ( fetch with header -- mdn docs )
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST", // GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password })
        });

        // if correct credentials are submitted json will contain success = true and authtoken
        const json = await response.json();
        console.log(json);

        if(json.success){
            //Save the authtoken and redirect
            localStorage.setItem('token', json.authToken);
            // helps user to redirect to home page where he/she can see his/her note.
            navigate("/");

            showAlert("Logged In Successfully", "success")
        }
        else{
            showAlert("Invalid details", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h2 className='my-3'>Login - iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login