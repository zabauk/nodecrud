import axios from 'axios';
import React, { useState, useRef } from 'react'
import { Form, Card, Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cookies=new Cookies();

const CreatePost = (props) => {
    const [inputData, setFormData]=useState({
        title: '',
        description: ''
    });
    const [imageFile, setImageFile]=useState('');
    const [success, setSuccess]=useState(false);
    const [isLoading, setIsLoading]=useState(false);
    const [error, setError]=useState('');

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
                
                axios.post('http://localhost:5000/api/post', formData, 
                {headers: {
                    'Authorization':cookies.get('token'),
                    'Content-Type': 'application/json'
                }}).then(res=>{
                    setIsLoading(false);
                    setSuccess(true);
                    props.savedData(res.data);
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
                    console.log(err.response);
                    setError(err.response.data.msg)
                })
            } catch (error) {
                console.log(error.message);
            }
        }

    return (
        <React.Fragment>
            {success && <p className="text-center success">Post created successfully!</p>}
            {error && <p className="text-center custom-error">{error}</p>}
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
                            <Button type="button" variant="primary" onClick={handleSubmit}>Create post</Button>
                        </Form.Group>

                        </Form>
                        </Card>
        </React.Fragment>
    )
}

export default CreatePost
