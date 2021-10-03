import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Row, Card, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Register() {

    const [showError, setShowError]=useState(false);
    const [errMessage, setErrMessage]=useState('');
    const [success, setSuccess]=useState(false)
    const [isLoading, setIsLoading]=useState(false);
    
    //useState to access values
    const [allValues, setAllValues]=useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    })

    //handle input
    const changeHandler=e=>{
        setAllValues({
            ...allValues, [e.target.name]:e.target.value
        })
    }

    //handleSubmit
    const handleSubmit=()=>{
        const {name, email, password, confirmpassword}=allValues;
        try {
            setIsLoading(true);
            axios.post('http://localhost:5000/api/user', {name, email, password, confirmpassword})
            .then(res=>{
                setIsLoading(false);
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                }, 3000);
                setAllValues({
                    name:'',
                    email:'',
                    password:'',
                    confirmpassword:''
                })
            })
            .catch(err=>{
                setIsLoading(false);
                setShowError(true);
                setErrMessage(err.response.data.msg);
                setTimeout(()=>{
                    setShowError(false);
                }, 2000);
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Container>
            <Row className="justify-content-center mt-lg-5">
                <div className="col-md-5">
                    {showError && <p className="custom-error text-center">{errMessage}</p>}
                    {success && <p className="text-center success">Registered successfully! Login</p>}
                    { isLoading? (<div className="text-center"><FontAwesomeIcon icon={ faSpinner } spin size="2x" /></div>):null }
                    <Card className="p-3">
                        <div className="text-center">
                        <Image src="/icons/user.png" width="150" />
                        </div>
                    <Form>

                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Full name</Form.Label>
                            <Form.Control type="text" placeholder="Enter full name" name="name" value={allValues.name} onChange={ changeHandler } />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={allValues.email} onChange={ changeHandler } />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>New password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name="password" value={allValues.password} onChange={ changeHandler } />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm password" name="confirmpassword" value={allValues.confirmpassword} onChange={ changeHandler } />
                        </Form.Group>


                        <Button variant="primary" type="button" onClick={handleSubmit}>
                            Register
                        </Button>
                        </Form>
                        <Link to="/login" className="mt-3">Already has account?</Link>
                    </Card>
                </div>
            </Row>
        </Container>
    )
}

export default Register
