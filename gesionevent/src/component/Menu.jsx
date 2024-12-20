import {Nav, Navbar,Container,Form,FormControl,Button} from 'react-bootstrap';
import {Link } from 'react-router-dom'
const Menu = () => { 
return ( 
    <Navbar bg="primary" data-bs-theme="light">
    <Container> 
    <Navbar.Brand ><i class="fa-regular fa-calendar-check"></i>&nbsp;Gestion Evénement</Navbar.Brand>
 <Nav className="me-auto"> 
<Nav.Link as={Link} to="/events">Events</Nav.Link> 
 </Nav>
</Container>
 </Navbar> 
 )
 }
  export default Menu