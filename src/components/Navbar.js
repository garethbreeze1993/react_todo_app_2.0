import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.min.css';

function NavComponent() {
  return (
    <>
        <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/">Todoo App</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/about">About</Nav.Link>
      <Nav.Link href="#">Create</Nav.Link>
    </Nav>
      <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Signed in as: <a href="#login">gareth.breeze@hypaship.com</a>
      </Navbar.Text>
    </Navbar.Collapse>
    </Container>
  </Navbar>
        {/*<Link to="/">Home</Link>*/}
        {/*<Link to="/about">About</Link>*/}
    </>
  );
}

export default NavComponent;