import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

function StoreLayout({
    activeView, onSection, cart, addToCart, incrementCartItem, decrementCartItem, removeFromCart, pokemons, typeColors, formData, handleInputChange, handleSubmit, formMessage, welcomeName, handleBuy,
}) {
    const cartItems = Object.values(cart)
    const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.pokemon.price, 0)
    const hasCartItem = cartItems.length > 0

    return (
        <Container className="pokemon-store">
            {activeView === 'shop' && (
                <>
                    <section className="welcome-section" id="bienvenida">
                        <span className="eyebrow">Tienda Pokémon</span>
                        <h1 className="welcome-title">Bienvenido a PokeShop</h1>
                        <p className="welcome-line reveal-text">Descubre criaturas únicas listas para acompañarte en cada batalla.</p>
                        <p className="welcome-line reveal-text">Agrega tus favoritos al carrito y completa tu equipo ideal.</p>
                        <p className="welcome-line reveal-text">Llena tu formulario y recibe un saludo personalizado en la tienda.</p>
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
                                            <Card.Text className="pokemon-description flex-grow-1">{pokemon.description}</Card.Text>
                                            <div className="card-footer mt-3">
                                                <strong>${pokemon.price}</strong>
                                                <Button variant="success" className="float-end" onClick={() => addToCart(pokemon)}>
                                                    Añadir al carrito
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </section>
                </>
            )}

            {activeView === 'cart' && (
                <section className="cart-section" id="carrito">
                    <div className="section-header">
                        <h2>Carrito de compras</h2>
                        <p>Revisa tus selecciones, modifica cantidades y continua al pago.</p>
                    </div>
                    <Card className="cart-card mb-4">
                        <Card.Body>
                            {hasCartItem ? (
                                <>
                                    {cartItems.map((item) => (
                                        <div key={item.pokemon.id} className="cart-item d-flex align-items-center justify-content-between mb-3">
                                            <div>
                                                <h6 className="mb-1">{item.pokemon.name}</h6>
                                                <small>${item.pokemon.price} c/u</small>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <Button
                                                    variant="outline-light"
                                                    size="sm"
                                                    disabled={item.quantity <= 1}
                                                    onClick={() => decrementCartItem(item.pokemon.id)}
                                                >
                                                    -
                                                </Button>
                                                <span className="cart-quantity px-3 py-1 border rounded">{item.quantity}</span>
                                                <Button
                                                    variant="outline-light"
                                                    size="sm"
                                                    disabled={item.quantity >= 99}
                                                    onClick={() => incrementCartItem(item.pokemon.id)}
                                                >
                                                    +
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => removeFromCart(item.pokemon.id)}
                                                    title="Quitar del carrito"
                                                >
                                                    ✕
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="cart-total d-flex justify-content-between mt-3 pt-2 border-top">
                                        <span>Total</span>
                                        <strong>${totalPrice}</strong>
                                    </div>
                                    <Button variant="success" className="mt-3" onClick={handleBuy}>
                                        Comprar
                                    </Button>
                                </>
                            ) : (
                                <div className="empty-cart-body text-center py-5">
                                    <div className="empty-cart-emoji" aria-hidden="true">😢</div>
                                    <h5>No hay nada para comprar</h5>
                                    <p className="mx-auto" style={{ maxWidth: '420px' }}>
                                        Tu carrito está vacío. Añade algunos Pokémon desde la tienda para continuar con la compra.
                                    </p>
                                    <Button variant="outline-light" onClick={() => onSection('shop')}>
                                        Volver al inicio
                                    </Button>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </section>
            )}

            {activeView === 'form' && (
                <section className="form-section" id="formulario">
                    <div className="section-header">
                        <h2>Formulario de compra</h2>
                        <p>Completa tus datos para finalizar el pedido.</p>
                    </div>

                    {welcomeName && <div className="welcome-card mb-4">Hola <strong>{welcomeName}</strong>, gracias por visitar nuestra tienda Pokémon.</div>}

                    <Card className="form-card">
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Form.Group controlId="nombre">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleInputChange}
                                                placeholder="Tu nombre"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="apellido">
                                            <Form.Label>Apellido</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="apellido"
                                                value={formData.apellido}
                                                onChange={handleInputChange}
                                                placeholder="Tu apellido"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="g-3 mt-3">
                                    <Col md={6}>
                                        <Form.Group controlId="email">
                                            <Form.Label>Correo</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="correo@ejemplo.com"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="confirmarEmail">
                                            <Form.Label>Confirmar correo</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="confirmarEmail"
                                                value={formData.confirmarEmail}
                                                onChange={handleInputChange}
                                                placeholder="repite tu correo"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {formMessage && <div className="form-message mt-3">{formMessage}</div>}
                                <Button variant="success" type="submit" className="mt-3">
                                    Enviar datos
                                </Button>
                            </Form>
                            <Button variant="outline-light" className="mt-3" onClick={() => onSection('cart')}>
                                Volver al carrito
                            </Button>
                        </Card.Body>
                    </Card>
                </section>
            )}
        </Container>
    )
}

export default StoreLayout
