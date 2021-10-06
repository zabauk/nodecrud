import React, {useState, useEffect} from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import CreatePost from './CreatePost';

const cookies=new Cookies();

function AllPosts(props) {
    const [posts, setPosts]=useState([]);
    const [isLoading, setIsLoading]=useState(false);

    const savedData=(post)=>{
      try {
        const newPosts=[post, ...posts];
        setPosts(newPosts);
      } catch (error) {
        console.log(error.message);
      }
    }
    
    useEffect(()=>{
        setIsLoading(true);
        axios.get('http://localhost:5000/api/posts', {
            headers:{
                'Authorization':cookies.get('token')
            }
        }).then(res=>{
            setIsLoading(false);
            setPosts(res.data);
            console.log(props.newPost);
        }).catch(err=>{
            console.log(err.message);
        });
    }, [])

    return (
        <React.Fragment>
            {/* saved data component */}
            <CreatePost savedData={savedData} />

            {isLoading?<div className="mt-5 text-center"><FontAwesomeIcon icon={faSpinner} spin size="3x" /></div>:
                <div>
                    {posts.map((post, key)=>{
                        return(
                            <Card className="mt-3" key={key}>
                            <div className="image-container">
                                <Card.Img className="showImage" variant="top" src={`http://localhost:5000/${post.image}`} />
                            </div>
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>
                                {post.description.substring(0, 150)+ ' . . .'}
                                </Card.Text>
                                <Link to={`/show/${post._id}`} >Read more</Link>
                            </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            }
        </React.Fragment>
    )
}

export default AllPosts
