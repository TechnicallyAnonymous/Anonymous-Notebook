import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Alert from './Alert';

const Navbar = () => {
    let location = useLocation();
    const navigate = useNavigate();
    
    // This button will only show when user is logged In.
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        // this will redirect user to login page.
        navigate("/login");
    }

    // useEffect(() => {
    //     console.log(location.pathname);
    // }, [location]);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {/* If localStorage(token) is empty then it will show login and signup button otherwise it will show Logout */}
                        {!localStorage.getItem('token')?<form className="d-flex" role="search">
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                        </form>:<button className="btn btn-primary mx-1" onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </nav>
            <Alert message="This is amazing React Course"/>
            <div className="container">
                <Outlet />
            </div>
        </>
    )
}

export default Navbar