import React from "react";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.min.css';

function NavComponent() {
  const axios = require('axios').default;
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const userToken = localStorage.getItem('userToken');
  const config = {
    headers: { Authorization: `Bearer ${userToken}` }
};

  React.useEffect(() => {
    if(userToken){
    axios.get(`http://localhost:8000/users/get_user_data`, config)
        .then((response) => {
            setLoggedIn(true)
            console.log(response)
            setUserEmail(response.data.email)
          })
        .catch(err => {
          setLoggedIn(false)
        })
    }
  }, [axios])

  return (
    <>
        <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/">Todoo App</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/about">About</Nav.Link>
      <Nav.Link href="/create">Create</Nav.Link>
    </Nav>
      <Navbar.Collapse className="justify-content-end">
        {!loggedIn ?
            <>
              <Nav.Link href="/login">Log in</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </>
            :
            <>
              <Navbar.Text>
                Signed in as: {userEmail}
              </Navbar.Text>
                      <Nav.Link href="/logout">Log Out</Nav.Link>
            </>
        }
    </Navbar.Collapse>
    </Container>
  </Navbar>
        {/*<Link to="/">Home</Link>*/}
        {/*<Link to="/about">About</Link>*/}
    </>
  );
}

export default NavComponent;