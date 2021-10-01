import React, { useState } from 'react'
import { Button, Form, Card } from 'react-bootstrap';
import axios from 'axios';

function Login() {
    //State Email && password
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [showError, setShowError]=useState(false);
    const [errMessage, setErrMessage]=useState('');
    const [isLoading, setIsLoading]=useState(false);

    //handle Email
    const handleEmail=evt=>{
        setEmail(evt.target.value)
    }

    //handle password
    const handlePassword=evt=>{
        setPassword(evt.target.value);
    }

    //login function
    const checkLogin=()=>{
        try {
            setIsLoading(true);
            axios.post('http://localhost:5000/api/login', {email, password})
            .then(res=>{
                setIsLoading(false);
                window.location.href="/";
            }).catch(err=>{
                setIsLoading(false);
                setErrMessage(err.response.data.msg);
                setShowError(true);
                setTimeout(()=>{
                    setShowError(false);
                }, 3000);
                
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className="container py-lg-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <Card className="p-4">
                        { showError? (<p className="text-center alert alert-danger">{errMessage}</p>):null }
                        { isLoading? (<p className="text-center">Loading ...</p>):null }
                        <div className="text-center">
                            <img src="/icons/user.png" alt="Node Test" width="200" />
                        </div>
                        <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmail} />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={ checkLogin }>
                            Login
                        </Button>
                    </Form>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Login
