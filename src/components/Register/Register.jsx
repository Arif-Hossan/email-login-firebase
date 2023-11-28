
import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import app from '../../firebase/firebase.config';

const Register = () => {
    // auth for firebase
    const auth = getAuth(app);
    // email state
    const [email, setEmail] = useState('');
    // pass state
    const [pass, setPass] = useState('');
    // error state
    const [error,setError] = useState('');
    // onChange event for email field
    const handleEmail = (event) => {
        const email = event.target.email;
        setEmail(email);
    }
    // onBlur event for password field
    const handlePass = (e) => {
        const pass = e.target.value;
        setPass(pass);
    }
    // onSubmit event for form field
    const handleSubmit = (e) => {
        // if we click submit button then the page automatically reload for prevent this event we use preventDefault function
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;
        console.log(email,pass);
        // create user and authentication using firebase
        createUserWithEmailAndPassword(auth,email,pass)
        .then(userCredential =>{
            const loggedUser = userCredential.user;
            console.log(loggedUser);
            setError('');
            // after successfully register clear form data
            e.target.reset();
        })
        .catch(error =>{
            console.error(error.message)
            setError(error.message)
        })
    }
    

    return (
        <div className='w-50 mx-auto mt-5'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} action="">
                <input className='w-50 rounded ps-2 mb-2' required onChange={handleEmail} type="email" name="email" id="email" placeholder='Email' /><br />
                <input className='w-50 rounded ps-2 mb-2' required onBlur={handlePass} type="password" name="password" id="password" placeholder='Password' /><br />
                <input type="submit" value="Register" />
            </form>
        <p className='text-danger'>{error}</p>
        </div>
    );
};

export default Register;