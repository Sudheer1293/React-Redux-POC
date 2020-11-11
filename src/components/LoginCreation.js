import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { loginUser, currentUser } from '../store/actions/authActions';
import { getUsersData } from '../store/actions/userActions';

const LoginCreation = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [formErrors, setFormErrors] = useState({
        emailError: '',
        passwordError: ''
    });

    const [toHome, setToHome] = useState(false);
    const [authError, setAuthError] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    const { email, password } = formData;
    const { emailError, passwordError } = formErrors;

    function handleChange(e) {
        const { id, name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        if(value.length === 0) {
            setFormErrors({
                ...formErrors,
                [name+"Error"]: "This field is required"
            });
        } else {
            setFormErrors({
                ...formErrors,
                [name+"Error"]: ""
            });
        }
    }

    async function handleSubmit(e) {
        console.log(e)
        e.preventDefault();
        const userLoggedIn = await (dispatch(loginUser(formData)));
        if(userLoggedIn.code) {
            setAuthError(userLoggedIn.message);          
        } else {
            dispatch(currentUser(formData));
            history.push("/home");
        }   
    }

        return (            
            <div className="container" style={{ paddingTop: '20px'}}>
                <span style={{ color: 'red'}}>{authError}</span>
                <form className="col s12" onSubmit={handleSubmit}>
                    <div className="input-field col-6 s6" style={{margin: 'auto'}}>
                        <i className="material-icons prefix">account_circle</i>
                        <input type="text" id="icon_prefix" placeholder="Email" name="email" className="validate" onChange={handleChange} value={email} />
                        <span style={{ color: 'red'}}>{emailError}</span>
                    </div>
                    <div className="input-field col-6 s6" style={{margin: 'auto'}}>
                        <i className="material-icons prefix">account_circle</i>
                        <input type="password" id="icon_prefix" name="password" placeholder="Password" className="validate" onChange={handleChange} value={password} />
                        <span style={{ color: 'red'}}>{passwordError}</span>
                    </div>
                    <input style={{margin: 'auto', display: 'block'}} type="submit" className="btn btn-primary" value="Login" />
                </form>
                <div>
                    <Link to="/register-user" style={{ marginTop: "10px",display: "block", marginLeft: "auto", marginRight: "auto", width: "50%" }} className="btn btn-secondary">Create User</Link>
                </div>
            </div>
        );
}

export default LoginCreation;
