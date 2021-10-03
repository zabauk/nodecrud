import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSpinner } from '@fortawesome/free-solid-svg-icons'

const cookies=new Cookies();

const Logout=(e)=>{
    try {
      cookies.remove('token');
      cookies.remove('user_id');
      window.location.href="/login";
    } catch (error) {
      console.log(error.message);
    }
  }

function NavBar() {
    const [userData, setUserData]=useState([]);
    const [isLoading, setIsLoading]=useState(false);

    //get login user data
    useEffect(()=>{
      setIsLoading(true);
        const userId=cookies.get('user_id');
        axios.get(`http://localhost:5000/api/user/${userId}`, {headers:{
          'Authorization':cookies.get('token')
        }}).then(res=>{
          setIsLoading(false);
          setUserData(res.data);
        }).catch(err=>{
          console.log(err.message);
        })
      }, []);

      //show user 

    return (
        <div>
            <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/"><FontAwesomeIcon icon={faHome} /></Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    {isLoading ? (<FontAwesomeIcon className="isLoadingNav" icon={faSpinner} spin size="md" />):(
                      <NavDropdown title={userData.name} id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                      </NavDropdown>
                    )}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </div>
    )
}

export default NavBar
