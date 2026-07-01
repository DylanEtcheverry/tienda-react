import { Link } from 'react-router-dom'
import { Button, Badge, Card, Container } from 'react-bootstrap'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const {
    cartItems,
    totalPrice,
    incrementCartItem,
    decrementCartItem,
    removeFromCart,
    clearCart,
  } = useCart()

  const hasCartItem = cartItems.length > 0

  return (
    <Container className="pokemon-store">
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
                <div className="d-flex gap-2 mt-3">
                  <Link to="/checkout" className="flex-grow-1">
                    <Button variant="success" className="w-100">
                      Ir al Checkout
                    </Button>
                  </Link>
                  <Button variant="outline-danger" onClick={clearCart}>
                    Vaciar Carrito
                  </Button>
                </div>
              </>
            ) : (
              <div className="empty-cart-body text-center py-5">
                <div className="empty-cart-emoji" aria-hidden="true">😢</div>
                <h5>No hay nada para comprar</h5>
                <p className="mx-auto" style={{ maxWidth: '420px' }}>
                  Tu carrito está vacío. Añade algunos Pokémon desde la tienda para continuar con la compra.
                </p>
                <Link to="/shop">
                  <Button variant="outline-light">
                    Volver a la Tienda
                  </Button>
                </Link>
              </div>
            )}
          </Card.Body>
        </Card>
      </section>
    </Container>
  )
}
