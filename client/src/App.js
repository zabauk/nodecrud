import './App.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Cookies from 'universal-cookie';

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

function App() {
  return (
    <div className="App">
          <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
      </Navbar>
    </div>
  );
}

export default App;
