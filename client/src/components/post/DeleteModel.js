import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies=new Cookies();

function DeleteModel(props) {
    const handleClose = () => props.closeModel(!props.model);

    //delete post
    const deletePost=()=>{
        try {
            axios.delete(`http://localhost:5000/api/post/${props.postId}`, {
                headers: {
                    'Authorization':cookies.get('token'),
                    'Content-Type': 'application/json'
                }
            }).then(res=>{
                props.closeModel(!props.model);
                props.removeId(res.data);
            }).catch(err=>{
                console.log(err.message);
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <React.Fragment>
            <Modal show={props.model} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Delete warning!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure to delete?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="danger" onClick={deletePost}>
                Confirm
            </Button>
            </Modal.Footer>
        </Modal>
        </React.Fragment>
    )
}

export default DeleteModel
