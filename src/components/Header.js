import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions';

const Header = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    function logoutUser(e) {
        e.preventDefault();
        dispatch(logout());
        history.push("/login");
    }

    function navigateToAddMember(e) {
        e.preventDefault();
        history.push("/add-member");
    }

    return (
        <nav>
            <div className="nav-wrapper">
                <a className="brand-logo">Logo</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {/* <li><Link to="/add-member">Add Member</Link></li> */}
                    <li><a onClick={navigateToAddMember}>Add Member</a></li>
                    <li><a onClick={logoutUser}>Logout</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;