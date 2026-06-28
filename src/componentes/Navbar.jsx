import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart } from 'react-icons/fa';
import logotipo from '../assets/Logotipo.png';

function NavScrollExample({ cartCount, onSection }) {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src={logotipo}
            alt="Logo"
            className="navbar-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
          >
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); onSection('shop') }}>
              Tienda
            </Nav.Link>
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); onSection('cart') }}>
              <span className="navbar-cart-icon">
                <FaShoppingCart />
                Carrito
                {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
              </span>
            </Nav.Link>
          </Nav>
          <Form className="search-form d-flex" role="search">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;