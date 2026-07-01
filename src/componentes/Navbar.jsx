import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import logotipo from '../assets/Logotipo.png'

function NavBar({ cartCount: legacyCartCount, onSection }) {
  const cart = useCart()
  const cartCount = cart?.cartCount || legacyCartCount || 0

  // Mantener compatibilidad con navegación antigua si se pasa onSection
  const handleNavigate = (view) => {
    if (onSection) {
      onSection(view)
    }
  }

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={logotipo} alt="Logo" className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/shop">
              Tienda
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center">
            <Link to="/cart" className="nav-link">
              <span className="navbar-cart-icon">
                <FaShoppingCart />
                Carrito
                {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
              </span>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar