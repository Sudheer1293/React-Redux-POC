import React, {  useState, useEffect } from 'react';
import {  withRouter, Redirect } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { createUser } from '../store/actions/userActions';
import { getUsersData } from '../store/actions/userActions';
import moment from 'moment';
import DatePicker from 'react-datepicker';
 
import "react-datepicker/dist/react-datepicker.css";

const UserCreation = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        email: '',
        regDate: ''
    });
    const [formErrors, setFormErrors] = useState({
        firstNameError: '',
        lastNameError: '',
        userNameError: '',
        passwordError: '',
        emailError: '',
        regDateError: ''
    });
    const [toHome, setToHome] = useState(false);

    const {firstName, lastName, userName, password, email, regDate} = formData;
    const {firstNameError, lastNameError, userNameError, passwordError, emailError, regDateError} = formErrors;
   
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsersData())
    }, []);
    const users = useSelector(state => state.user.users);

    const nameRegex = /^[a-zA-Z ]+$/;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function handleChange  (e)  {
        const { id, value } = e.target;
        setFormData({
          ...formData,
          [id]: value,
        });

        if(value.length === 0) {
            setFormErrors({
                ...formErrors,
                [id+"Error"] : `This field is required`
            });
        } else {
            setFormErrors({ ...formErrors, [id+"Error"]: ""});
        }

        const existingUser = users.filter((user) => user.userName === value);
        if(existingUser.length > 0) {
            setFormErrors({ ...formErrors, userNameError: "User name already exists" });
        } else {
            setFormErrors({ ...formErrors, userNameError: "" });
        }

        switch(id) {
            case "firstName":
            case "lastName":
                const error = nameRegex.test(value) ? "" : "Name should contain only alphabets and space";
                setFormErrors({ ...formErrors, [id+"Error"] : error });
                break;
            case "email":
                const emailError = emailRegex.test(String(email).toLowerCase()) ? "" : "Email address is invalid";
                setFormErrors({ ...formErrors, [id+"Error"] : emailError });
                break;
            case "regDate":
                console.log(moment(value).format("L"));
                console.log(new Date())
                console.log(Math.random().toString(36).slice(2))
                break;
            case "userName":
                
                break;
            default:
                break;
        }
    }

    function handleSubmit (e)  {
        e.preventDefault();
        dispatch(createUser(formData));
        setToHome(true);
       //User created - Navigate to home page
    }

    // function validate(){
    //     return lastName.length == 0;
    // }

    return (           
        <div className="container">
            { toHome ? <Redirect to="/login" /> : null };
            <h3>User Registration </h3>
        
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" className="form-control" onChange={handleChange} value={firstName} />
                    <span style={{ color: 'red'}}>{firstNameError}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" className="form-control" onChange={handleChange} value={lastName} required/>
                    <span style={{ color: 'red'}}>{lastNameError}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="userName">User Name</label>
                    <input type="text" id="userName" className="form-control" onChange={handleChange} value={userName} />
                    <span style={{ color: 'red'}}>{userNameError}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="form-control" onChange={handleChange} value={password} />
                    <span style={{ color: 'red'}}>{passwordError}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" className="form-control" onChange={handleChange} value={email} />
                    <span style={{ color: 'red'}}>{emailError}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="regDate">Registration Date</label>
                    {/* <DatePicker
              onChange={ handleChange }
              name="regDate" id="regDate"
              dateFormat="MM/dd/yyyy"
          />
          <button className="btn btn-primary">Show Date</button> */}
                    <input type="date" id="regDate" className="form-control" disabled={true} value={moment().format('YYYY-MM-DD')} max={moment().format('YYYY-MM-DD')} onChange={handleChange} />
                    <span style={{ color: 'red'}}>{regDateError}</span>
                </div>

                <input type="submit" disabled={formErrors.length > 0} className="btn btn-primary" value="Create User" />
            </form>
        </div>
        );   
    }

// UserCreation.propTypes ={
//     createUser: PropTypes.func.isRequired
// }

// export default connect( null, {createUser})(withRouter(UserCreation));
export default UserCreation