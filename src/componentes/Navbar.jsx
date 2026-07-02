import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { typeColors } from '../utils/constants'
import logotipo from '../assets/Logotipo.png'

function NavBar({ cartCount: legacyCartCount, onSection }) {
  const cart = useCart()
  const cartCount = cart?.cartCount || legacyCartCount || 0
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Mantener compatibilidad con navegación antigua si se pasa onSection
  const handleNavigate = (view) => {
    if (onSection) {
      onSection(view)
    }
  }

  const handleCategoryFilter = (category) => {
    navigate(`/shop?category=${category}`)
  }

  const categories = Object.keys(typeColors)

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
            <NavDropdown title="Categorías" id="categories-dropdown">
              {categories.map((category) => (
                <NavDropdown.Item key={category} onClick={() => handleCategoryFilter(category)}>
                  {category}
                </NavDropdown.Item>
              ))}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigate('/shop')}>
                Ver todos
              </NavDropdown.Item>
            </NavDropdown>
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