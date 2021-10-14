import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Card} from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cookies=new Cookies();
function Show() {
    let {pid}=useParams();
    const [post, setPost]=useState();
    const [isLoading, setLoading]=useState(true);
    //featch data
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/post/${pid}`, {headers:{
            'Authorization':cookies.get('token'),
            'accept': 'application/json'
        }}).then(res=>{
            setPost(res.data);
            setLoading(false);
        }).catch(err=>{
            console.log(err);
        })
    }, [])
    return (
        <React.Fragment>
            <div className="container pb-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        {
                            isLoading? <div className="text-center mt-3">
                                <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                            </div> : (
                                <Card className="mt-3">
                                <div className="image-container">
                                    <Card.Img className="showImage" variant="top" src={`http://localhost:5000/uploads/${post.image}`} />
                                </div>
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>
                                    {post.description}
                                    </Card.Text>
                                </Card.Body>
                                </Card>
                            )
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Show
