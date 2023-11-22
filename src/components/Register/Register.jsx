// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const Register = () => {
    // email state
    const [email, setEmail] = useState('');
    // pass state
    const [pass, setPass] = useState('');
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
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;
        console.log(email,pass);
        
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} action="">
                <input onChange={handleEmail} type="email" name="email" id="email" placeholder='Email' /><br />
                <input onBlur={handlePass} type="password" name="password" id="password" placeholder='Password' /><br />
                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;