import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './componentes/Navbar'
import PokemonStore from './componentes/PokemonStore'

function App() {
  const [activeView, setActiveView] = useState('shop')
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

  const cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onSection={setActiveView}
      />
      <main className="app-content">
        <PokemonStore
          activeView={activeView}
          onSection={setActiveView}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          incrementCartItem={incrementCartItem}
          decrementCartItem={decrementCartItem}
        />
      </main>
    </>
  )
}

export default App
