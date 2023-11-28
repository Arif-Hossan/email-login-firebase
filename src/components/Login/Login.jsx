import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const Login = () => {

    // error state
    const [error,setError] = useState('');
    // success state
    const [success,setSuccess] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        setError('');
        setSuccess('');
        // validation (for recap purpose)
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError('Please at least two uppercase');
            return;
        }
        else if(!/(?=.*?[#?!@$%^&*-])/.test(password)){
            setError('please add a special character');
            return;
        }

        console.log(email,password);
    }
    return (
        <div className='w-50 mx-auto mt-5'>
            <h4 className='text-primary'>Login</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required/>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p className='text-success'>{success}</p>
            <p className='text-danger'>{error}</p>
        </div>
    );
};

export default Login;