import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.config';

const Login = () => {
    // auth for firebase
    const auth = getAuth(app);
    // error state
    const [error, setError] = useState('');
    // success state
    const [success, setSuccess] = useState('');

    // useRef using for creating a instance of email for send email for forget password
    const emailRef = useRef('');

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        setError('');
        setSuccess('');
        // clear the input field
        e.target.reset();
        // validation (for recap purpose)
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Please at least two uppercase');
            return;
        }
        else if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
            setError('please add a special character');
            return;
        }

        console.log(email, password);
        // login with user email and password using firebase
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const loggedUser = userCredential.user;
                console.log(loggedUser);
                if(!loggedUser.emailVerified){
                    alert('Please Verify your email first');
                    return;
                }
                setSuccess('Logged in successfully');
            })
            .catch(error => {
                const errorMessage = error.message;
                setError(errorMessage);
            })

    }

    // send reset password email
    const handleResetPassword = event => {
        event.preventDefault();
        setError('');
        
        const email = emailRef.current?.value;
        if(!email){
            alert("Please provide your email to reset password");
        }
        
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert("Check your email")
        })
        .catch(error => {
            setError(error.message);
        })
      
        
    }
    return (
        <div className='w-50 mx-auto mt-5'>
            <h4 className='text-primary'>Login</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" ref={emailRef} name="email" placeholder="Enter email" required />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p className='small'>Forget Password ? <Link onClick={handleResetPassword}>Reset Password</Link></p>
            <p className='small'>Are you new to this Website ? <Link to='/register'>Register</Link></p>
            <p className='text-success'>{success}</p>
            <p className='text-danger'>{error}</p>
        </div>
    );
};

export default Login;