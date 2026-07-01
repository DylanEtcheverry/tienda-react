import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('pokemonCart')
    return savedCart ? JSON.parse(savedCart) : {}
  })

  // Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('pokemonCart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (pokemon) => {
    setCart((current) => {
      const existing = current[pokemon.id]
      const nextQuantity = existing ? Math.min(existing.quantity + 1, 99) : 1
      return {
        ...current,
        [pokemon.id]: {
          pokemon,
          quantity: nextQuantity,
        },
      }
    })
  }

  const incrementCartItem = (id) => {
    setCart((current) => {
      const item = current[id]
      if (!item || item.quantity >= 99) return current
      return {
        ...current,
        [id]: {
          ...item,
          quantity: item.quantity + 1,
        },
      }
    })
  }

  const decrementCartItem = (id) => {
    setCart((current) => {
      const item = current[id]
      if (!item || item.quantity <= 1) return current
      return {
        ...current,
        [id]: {
          ...item,
          quantity: item.quantity - 1,
        },
      }
    })
  }

  const removeFromCart = (id) => {
    setCart((current) => {
      const item = current[id]
      if (!item) return current
      if (item.quantity === 1) {
        const next = { ...current }
        delete next[id]
        return next
      }
      return {
        ...current,
        [id]: {
          ...item,
          quantity: item.quantity - 1,
        },
      }
    })
  }

  const clearCart = () => {
    setCart({})
  }

  const cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0)
  const cartItems = Object.values(cart)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.pokemon.price, 0)

  const value = {
    cart,
    cartCount,
    cartItems,
    totalPrice,
    addToCart,
    incrementCartItem,
    decrementCartItem,
    removeFromCart,
    clearCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider')
  }
  return context
}
