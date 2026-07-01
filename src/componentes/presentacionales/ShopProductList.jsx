import { Link } from 'react-router-dom'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'

export default function ShopProductList({ pokemons, typeColors, onAddToCart }) {
  return (
    <Container className="pokemon-store">
      <section className="welcome-section" id="bienvenida">
        <span className="eyebrow">Tienda Pokémon</span>
        <h1 className="welcome-title">Bienvenido a PokeShop</h1>
        <p className="welcome-line reveal-text">
          Descubre criaturas únicas listas para acompañarte en cada batalla.
        </p>
        <p className="welcome-line reveal-text">
          Agrega tus favoritos al carrito y completa tu equipo ideal.
        </p>
        <p className="welcome-line reveal-text">
          O explora nuestros productos en detalle para elegir el perfecto.
        </p>
      </section>

      <section className="shop-section" id="tienda">
        <div className="section-header">
          <h2>Explora nuestros Pokémon</h2>
          <p>Todos los Pokémon juntos, uno al lado del otro, para elegir rápido.</p>
        </div>

        <Row xs={1} md={2} lg={3} className="g-4">
          {pokemons.map((pokemon) => (
            <Col key={pokemon.id} className="mb-4">
              <Card className="pokemon-card h-100">
                <Card.Body className="d-flex flex-column">
                  <div className="card-top">
                    <Card.Title>{pokemon.name}</Card.Title>
                    <Badge bg={typeColors[pokemon.type] || 'secondary'} className="pokemon-type-badge">
                      {pokemon.type}
                    </Badge>
                  </div>
                  <Card.Text className="pokemon-description flex-grow-1">
                    {pokemon.description}
                  </Card.Text>
                  <div className="card-footer mt-3">
                    <strong>${pokemon.price}</strong>
                    <div className="d-flex gap-2 mt-2">
                      <Link to={`/product/${pokemon.id}`} className="flex-grow-1">
                        <Button variant="outline-info" className="w-100">
                          Ver detalles
                        </Button>
                      </Link>
                      <Button
                        variant="success"
                        onClick={() => onAddToCart(pokemon)}
                        title="Añadir al carrito"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  )
}
