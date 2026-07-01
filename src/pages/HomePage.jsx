import { Link } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap'

export default function HomePage() {
  return (
    <Container className="pokemon-store">
      <section className="welcome-section" id="bienvenida">
        <span className="eyebrow">Tienda Pokémon</span>
        <h1 className="welcome-title">Bienvenido a PokeShop</h1>
        <p className="welcome-line reveal-text">Descubre criaturas únicas listas para acompañarte en cada batalla.</p>
        <p className="welcome-line reveal-text">Agrega tus favoritos al carrito y completa tu equipo ideal.</p>
        <p className="welcome-line reveal-text">Llena tu formulario y recibe un saludo personalizado en la tienda.</p>
        
        <div className="mt-4">
          <Link to="/shop">
            <Button variant="success" size="lg">
              Ir a la Tienda
            </Button>
          </Link>
        </div>
      </section>
    </Container>
  )
}
