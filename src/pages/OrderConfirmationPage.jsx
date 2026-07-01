import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button, Card, Container, Spinner, Alert } from 'react-bootstrap'
import { db } from '../config/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

export default function OrderConfirmationPage() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, 'orders', orderId)
        const orderSnap = await getDoc(orderRef)

        if (orderSnap.exists()) {
          setOrder(orderSnap.data())
        } else {
          setError('Orden no encontrada')
        }
      } catch (err) {
        setError('Error al cargar la orden: ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  if (loading) {
    return (
      <Container className="pokemon-store mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="pokemon-store mt-5">
        <Alert variant="danger">{error}</Alert>
        <Link to="/shop">
          <Button>Volver a la tienda</Button>
        </Link>
      </Container>
    )
  }

  if (!order) {
    return (
      <Container className="pokemon-store mt-5">
        <Alert variant="warning">Orden no encontrada</Alert>
      </Container>
    )
  }

  return (
    <Container className="pokemon-store mt-4 mb-5">
      <div className="text-center mb-4">
        <h1 className="mb-3">✓ ¡Orden Confirmada!</h1>
        <p className="lead">Gracias por tu compra, {order.customer?.nombre}</p>
      </div>

      <Card className="mb-4">
        <Card.Header>
          <Card.Title>Información de la Orden</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-6 mb-3">
              <h6>ID de Orden:</h6>
              <p className="monospace text-break">{orderId}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h6>Estado:</h6>
              <p>
                <span className="badge bg-warning">PENDIENTE</span>
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>
          <Card.Title>Datos de envío</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>
            <strong>{order.customer?.nombre}</strong>
          </p>
          <p>{order.customer?.direccion}</p>
          <p>
            {order.customer?.ciudad} {order.customer?.codigoPostal}
          </p>
          <p>
            <strong>Email:</strong> {order.customer?.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {order.customer?.telefono || 'No proporcionado'}
          </p>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>
          <Card.Title>Productos</Card.Title>
        </Card.Header>
        <Card.Body>
          {order.items?.map((item, idx) => (
            <div key={idx} className="d-flex justify-content-between mb-2 pb-2 border-bottom">
              <div>
                <p className="mb-0">{item.nombre}</p>
                <small className="text-muted">Cantidad: {item.cantidad}</small>
              </div>
              <div className="text-end">
                <p className="mb-0">${item.subtotal}</p>
                <small className="text-muted">${item.precio} c/u</small>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-between mt-3 pt-3 border-top">
            <strong>Total:</strong>
            <strong className="h5">${order.total}</strong>
          </div>
        </Card.Body>
      </Card>

      <div className="text-center mb-4">
        <Alert variant="info">
          Recibirás un correo de confirmación en {order.customer?.email}
        </Alert>
      </div>

      <div className="d-flex gap-2 justify-content-center">
        <Link to="/shop">
          <Button variant="primary">Continuar comprando</Button>
        </Link>
        <Button variant="outline-secondary" onClick={() => window.print()}>
          Imprimir orden
        </Button>
      </div>
    </Container>
  )
}
