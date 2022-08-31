import Alert from 'react-bootstrap/Alert';
import Nav from "./Navbar"


function LogOut() {
    localStorage.removeItem('userToken')
  return (
    <main>
        <Nav />
        <Alert variant={"success"}>Successfully logged out</Alert>
    </main>
  );
}

export default LogOut;