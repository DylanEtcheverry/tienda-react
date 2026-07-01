import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Col, Container, Form, Row, Alert, Spinner } from 'react-bootstrap'
import { useCart } from '../context/CartContext'
import { db } from '../config/firebaseConfig'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cartItems, totalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    numeroTarjeta: '',
    mesExpiracion: '',
    anioExpiracion: '',
    cvv: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let filteredValue = value

    // Solo letras para nombre y ciudad
    if (name === 'nombre') {
      filteredValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')
    }
    // Solo números para teléfono
    else if (name === 'telefono') {
      filteredValue = value.replace(/[^0-9]/g, '')
    }
    // Solo letras para ciudad
    else if (name === 'ciudad') {
      filteredValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')
    }
    // Solo números para campos de tarjeta
    else if (name === 'numeroTarjeta') {
      filteredValue = value.replace(/[^0-9\s]/g, '')
    } else if (name === 'mesExpiracion') {
      filteredValue = value.replace(/[^0-9]/g, '').slice(0, 2)
    } else if (name === 'anioExpiracion') {
      filteredValue = value.replace(/[^0-9]/g, '').slice(0, 2)
    } else if (name === 'cvv') {
      filteredValue = value.replace(/[^0-9]/g, '').slice(0, 4)
    }

    setFormData((prev) => ({
      ...prev,
      [name]: filteredValue,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validación básica
      if (!formData.nombre || !formData.email || !formData.direccion) {
        throw new Error('Por favor completa todos los campos requeridos')
      }

      // Crear objeto de orden
      const order = {
        customer: {
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          direccion: formData.direccion,
          ciudad: formData.ciudad,
          codigoPostal: formData.codigoPostal,
        },
        items: cartItems.map((item) => ({
          pokemonId: item.pokemon.id,
          nombre: item.pokemon.name,
          precio: item.pokemon.price,
          cantidad: item.quantity,
          subtotal: item.pokemon.price * item.quantity,
        })),
        total: totalPrice,
        estado: 'pendiente',
        createdAt: serverTimestamp(),
      }

      // Guardar en Firestore
      const docRef = await addDoc(collection(db, 'orders'), order)

      setSuccess(true)
      // Limpiar carrito después de orden exitosa
      clearCart()

      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate(`/order-confirmation/${docRef.id}`)
      }, 2000)
    } catch (err) {
      setError(err.message || 'Error al procesar la orden. Por favor intenta de nuevo.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <Container className="pokemon-store mt-5">
        <div className="text-center py-5">
          <h2>Carrito vacío</h2>
          <p>No hay productos para procesar.</p>
          <Button variant="primary" onClick={() => navigate('/shop')}>
            Ir a la tienda
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <Container className="pokemon-store mt-4 mb-5">
      <h2 className="mb-4">Checkout</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">
          ¡Orden procesada exitosamente! Redirigiendo...
        </Alert>
      )}

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <Card.Title>Información de envío</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="nombre">
                      <Form.Label>Nombre Completo *</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                        placeholder="Solo letras"
                        required
                      />
                      <Form.Text className="text-muted">Solo se permiten letras</Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="telefono">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control
                        type="text"
                        inputMode="numeric"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        pattern="[0-9]*"
                        placeholder="Solo números"
                      />
                      <Form.Text className="text-muted">Solo se permiten números</Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="codigoPostal">
                      <Form.Label>Código Postal</Form.Label>
                      <Form.Control
                        type="text"
                        name="codigoPostal"
                        value={formData.codigoPostal}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={8}>
                    <Form.Group controlId="direccion">
                      <Form.Label>Dirección *</Form.Label>
                      <Form.Control
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="ciudad">
                      <Form.Label>Ciudad</Form.Label>
                      <Form.Control
                        type="text"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleInputChange}
                        pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                        placeholder="Solo letras"
                      />
                      <Form.Text className="text-muted">Solo se permiten letras</Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Card className="mb-4 mt-4">
                  <Card.Header>
                    <Card.Title>Información de pago</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Row className="mb-3">
                      <Col md={12}>
                        <Form.Group controlId="numeroTarjeta">
                          <Form.Label>Número de Tarjeta</Form.Label>
                          <Form.Control
                            type="text"
                            inputMode="numeric"
                            name="numeroTarjeta"
                            placeholder="1234 5678 9012 3456"
                            value={formData.numeroTarjeta}
                            onChange={handleInputChange}
                            pattern="[0-9\s]*"
                            maxLength="19"
                          />
                          <Form.Text className="text-muted">Solo se permiten números</Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group controlId="expiracion">
                          <Form.Label>Mes de Expiración</Form.Label>
                          <Form.Control
                            type="text"
                            inputMode="numeric"
                            name="mesExpiracion"
                            placeholder="MM"
                            value={formData.mesExpiracion}
                            onChange={handleInputChange}
                            pattern="[0-9]*"
                            maxLength="2"
                          />
                          <Form.Text className="text-muted">Solo números (01-12)</Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group controlId="anioExpiracion">
                          <Form.Label>Año de Expiración</Form.Label>
                          <Form.Control
                            type="text"
                            inputMode="numeric"
                            name="anioExpiracion"
                            placeholder="YY"
                            value={formData.anioExpiracion}
                            onChange={handleInputChange}
                            pattern="[0-9]*"
                            maxLength="2"
                          />
                          <Form.Text className="text-muted">Solo números</Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group controlId="cvv">
                          <Form.Label>CVV</Form.Label>
                          <Form.Control
                            type="text"
                            inputMode="numeric"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            pattern="[0-9]*"
                            maxLength="4"
                          />
                          <Form.Text className="text-muted">Solo números (3-4 dígitos)</Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <div className="d-flex gap-2">
                  <Button
                    variant="success"
                    size="lg"
                    type="submit"
                    disabled={loading}
                    className="flex-grow-1"
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Procesando...
                      </>
                    ) : (
                      'Completar Compra'
                    )}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="lg"
                    onClick={() => navigate('/cart')}
                    disabled={loading}
                  >
                    Volver al carrito
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="position-sticky" style={{ top: '20px' }}>
            <Card.Header>
              <Card.Title>Resumen de orden</Card.Title>
            </Card.Header>
            <Card.Body>
              {cartItems.map((item) => (
                <div key={item.pokemon.id} className="d-flex justify-content-between mb-2">
                  <span>
                    {item.pokemon.name} x{item.quantity}
                  </span>
                  <span>${item.pokemon.price * item.quantity}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong className="h5">${totalPrice}</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
