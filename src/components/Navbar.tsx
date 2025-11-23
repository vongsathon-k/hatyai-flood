import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Flood Rescue</Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/report">Report Flood</Link>
                </li>
                <li>
                    <Link to="/rescuer-dashboard">Rescuer Dashboard</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;