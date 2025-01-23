import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../UserContext";
import "./Navbar.css"


const Navbar =()=>{
    const {setMessage} = useUserContext(); 

    const handleNavigation=()=>{
        setMessage(""); 
    }

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <Link to="/" onClick={handleNavigation}>Home</Link>
                </li>
                <li>
                    <Link to="/save" onClick={handleNavigation}>Save</Link>
                </li>
                <li>
                    <Link to="/fetch" onClick={handleNavigation}>Fetch</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar; 