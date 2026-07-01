import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { Button, Card, Container, Badge, Row, Col } from 'react-bootstrap'
import { useCart } from '../context/CartContext'
import { pokemons, typeColors } from '../utils/constants'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const pokemon = pokemons.find((p) => p.id === id)

  if (!pokemon) {
    return (
      <Container className="pokemon-store mt-5">
        <div className="text-center py-5">
          <h2>Pokémon no encontrado</h2>
          <p>Lo sentimos, no pudimos encontrar este Pokémon.</p>
          <Link to="/shop">
            <Button variant="primary">Volver a la tienda</Button>
          </Link>
        </div>
      </Container>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(pokemon)
    }
    setQuantity(1)
  }

  return (
    <Container className="pokemon-store mt-4">
      <Link to="/shop" className="mb-3 d-inline-block">
        <Button variant="outline-light">← Volver a la tienda</Button>
      </Link>

      <Row className="mt-4">
        <Col md={6}>
          <Card className="pokemon-card">
            <Card.Body className="d-flex flex-column">
              <div className="card-top">
                <Card.Title className="h2">{pokemon.name}</Card.Title>
                <Badge bg={typeColors[pokemon.type] || 'secondary'} className="pokemon-type-badge">
                  {pokemon.type}
                </Badge>
              </div>
              <Card.Text className="pokemon-description flex-grow-1 mt-3">
                {pokemon.fullDescription}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="pokemon-card">
            <Card.Body>
              <div className="mb-4">
                <h3 className="mb-3">Detalles</h3>
                <div className="mb-3">
                  <h5>Precio</h5>
                  <p className="h4 text-white">${pokemon.price}</p>
                </div>
                <div className="mb-3">
                  <h5>Tipo</h5>
                  <p className="text-white">{pokemon.type}</p>
                </div>
              </div>

              <div className="mb-4">
                <h5>Cantidad</h5>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="px-3 py-1 border rounded">{quantity}</span>
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={() => setQuantity(Math.min(99, quantity + 1))}
                    disabled={quantity >= 99}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-white">
                  Total: <strong className="text-white">${pokemon.price * quantity}</strong>
                </p>
              </div>

              <Button
                variant="success"
                size="lg"
                className="w-100 mb-2"
                onClick={handleAddToCart}
              >
                Añadir al carrito
              </Button>

              <Link to="/shop" className="d-block">
                <Button variant="outline-light" className="w-100">
                  Explorar más
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
