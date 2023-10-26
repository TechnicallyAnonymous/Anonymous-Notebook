import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext";

const Signup = () => {

  const context = useContext(noteContext);
  const { showAlert } = context


  const [credentials, setCredentials] = useState({ name: "", email: "", signUpPassword: "", confirmSignUpPassword: "" })
  // useNavigate helps to redirect to any selected page.
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // helps to prevent the page from reloading.

    // ROUTE 1 :  Create a User using: POST "/api/auth/createuser". No login required
    // API Call ( fetch with header -- mdn docs )
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST", // GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.signUpPassword, confirmPassword: credentials.confirmSignUpPassword })
    });

    // if correct credentials are submitted json will contain (success = true and authtoken)
    const json = await response.json();
    console.log(json);

    if (json.success) {
      //Save the authtoken and redirect
      localStorage.setItem('token', json.authToken);
      navigate("/");
      showAlert("Account Created Successfully", "success")
    }
    else {
      showAlert(json.error, "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='container'>
      <h2 className='my-3'>Create an Accout - iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" minLength={1} required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="signUpPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="signUpPassword" name="signUpPassword" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmSignUpPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmSignUpPassword" name="confirmSignUpPassword" onChange={onChange} minLength={5} required />
        </div>
        {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div> */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup