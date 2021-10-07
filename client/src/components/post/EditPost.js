import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react'
import { Form, Card, Button, Container } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';

const cookies=new Cookies();

const EditPost = (props) => {
    let {pid}=useParams();
    const [inputData, setFormData]=useState({
        title: '',
        description: ''
    });
    const [imageFile, setImageFile]=useState('');
    const [success, setSuccess]=useState(false);
    const [isLoading, setIsLoading]=useState(false);
    const [post, setPost]=useState([]);
    const [errors, setErrors]=useState([]);

    //useEffect
    useEffect(()=>{
        setIsLoading(true);
        axios.get(`http://localhost:5000/api/post/${pid}/edit`, {
            headers: {
                'Authorization': cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
        .then(res=>{
            setIsLoading(false);
            setFormData({
                title: res.data.title,
                description: res.data.description
            })
        })
        .catch(err=>{
            console.log(err.message);
        })
    }, []);

    //handle change input
        const handleChange=(e)=>{
            setFormData({
                ...inputData, [e.target.name]: e.target.value
            })
        }
    //handle file change
    const handleFileChange=(e)=>{
        setImageFile(e.target.files[0]);
    }

    //clear input file
    const ref=useRef();

    //handle Submit
        const handleSubmit=(e)=>{
            setIsLoading(true);
            const formData=new FormData();
                formData.append('file', imageFile);
                const {title, description}=inputData;
                formData.append('title', title);
                formData.append('description', description);
            try {
                
                axios.put(`http://localhost:5000/api/post/${pid}`, formData, 
                {headers: {
                    'Authorization':cookies.get('token')
                }}).then(res=>{
                    setIsLoading(false);
                    setSuccess(true);
                    setFormData({
                        title:'',
                        description:''
                    });
                    //clear input file
                    ref.current.value='';
                    setImageFile('');

                    setTimeout(()=>{
                        setSuccess(false);
                    }, 3000);
                }).catch(err=>{
                    setIsLoading(false);
                    console.log(err.response.data);
                })
            } catch (error) {
                console.log(error.message);
            }
        }

    return (
        <React.Fragment>
            <Container className="mt-3">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                    {success && <p className="text-center success">Post updated successfully!</p>}
            {isLoading && <div className="text-center mb-3"><FontAwesomeIcon icon={faSpinner} spin size="lg" /></div>}
                        <Card className="p-3">
                            <p>{props.name}</p>
                        <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Post title</Form.Label>
                            <Form.Control type="text" placeholder="Enter post title" name="title" value={inputData.title} onChange={handleChange} />
                            <Form.Text className="custom-error">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Post description</Form.Label>
                            <Form.Control as="textarea" rows={5} placeholder="Enter description" name="description" value={inputData.description} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Post cover</Form.Label>
                            <Form.Control type="file" name="file" onChange={handleFileChange} ref={ref} />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Button type="button" variant="primary" onClick={handleSubmit}>Update</Button>
                        </Form.Group>

                        </Form>
                        </Card>
                    </div>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default EditPost
