import { useEffect, useState } from 'react'
import StoreLayout from './StoreLayout'

const pokemons = [
  {
    id: 'pikachu',
    name: 'Pikachu',
    type: 'Eléctrico',
    description: 'Un amigo energético que ilumina cualquier compra con chispa y velocidad.',
    price: 890,
  },
  {
    id: 'charmander',
    name: 'Charmander',
    type: 'Fuego',
    description: 'Perfecto para añadir calor a tu colección con fuego y actitud.',
    price: 1090,
  },
  {
    id: 'bulbasaur',
    name: 'Bulbasaur',
    type: 'Planta',
    description: 'Una opción fresca y natural, ideal para los entrenadores más equilibrados.',
    price: 950,
  },
  {
    id: 'squirtle',
    name: 'Squirtle',
    type: 'Agua',
    description: 'Refrescante y confiable, trae movimiento a tu carrito con estilo acuático.',
    price: 970,
  },
  {
    id: 'gengar',
    name: 'Gengar',
    type: 'Fantasma',
    description: 'Misterioso y poderoso, el complemento perfecto para las noches de batalla.',
    price: 1190,
  },
  {
    id: 'eevee',
    name: 'Eevee',
    type: 'Normal',
    description: 'Versátil y amigable, siempre listo para evolucionar tu experiencia de compra.',
    price: 820,
  },
  {
    id: 'jigglypuff',
    name: 'Jigglypuff',
    type: 'Hada',
    description: 'Dulce y sorprendente, ideal para quien busca un toque suave y encantador.',
    price: 880,
  },
  {
    id: 'meowth',
    name: 'Meowth',
    type: 'Normal',
    description: 'Travieso y astuto, perfecto para entrenadores que quieren algo con estilo.',
    price: 910,
  },
  {
    id: 'onix',
    name: 'Onix',
    type: 'Roca',
    description: 'Robusto y sólido, un guardián ideal para fortalecer tu equipo defensivo.',
    price: 1040,
  },
  {
    id: 'abra',
    name: 'Abra',
    type: 'Psíquico',
    description: 'Misterioso y ágil, un aliado perfecto para los combates mentales.',
    price: 980,
  },
  {
    id: 'snorlax',
    name: 'Snorlax',
    type: 'Normal',
    description: 'Grande y poderoso, con una resistencia que te ayuda a ganar en los momentos difíciles.',
    price: 1250,
  },
  {
    id: 'dragonite',
    name: 'Dragonite',
    type: 'Dragón',
    description: 'Una leyenda voladora que trae fuerza y velocidad a tu equipo.',
    price: 1490,
  },
]

const typeColors = {
  Eléctrico: 'warning',
  Fuego: 'danger',
  Agua: 'primary',
  Planta: 'success',
  Fantasma: 'dark',
  Normal: 'secondary',
  Hada: 'pink',
  Roca: 'secondary',
  Psíquico: 'info',
  Dragón: 'danger',
}

function PokemonStore({ activeView, onSection, cart, addToCart, removeFromCart, incrementCartItem, decrementCartItem }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    confirmarEmail: '',
  })
  const [formMessage, setFormMessage] = useState('')
  const [welcomeName, setWelcomeName] = useState('')

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-text')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (activeView === 'form') {
      setFormData({ nombre: '', apellido: '', email: '', confirmarEmail: '' })
    }
  }, [activeView])

  const cartItems = Object.values(cart)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.pokemon.price, 0)
  const hasCartItem = totalItems > 0

  const handleInputChange = (event) => {
    const { name, value } = event.target
    const filteredValue = ['nombre', 'apellido'].includes(name)
      ? value.replace(/[^A-Za-zÀ-ÿ\s]/g, '')
      : value
    setFormData((prev) => ({ ...prev, [name]: filteredValue }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.confirmarEmail) {
      setFormMessage('Por favor completa todos los campos.')
      return
    }
    if (formData.email !== formData.confirmarEmail) {
      setFormMessage('Los correos no coinciden. Revísalos, por favor.')
      return
    }
    setWelcomeName(`${formData.nombre} ${formData.apellido}`)
    setFormMessage('¡Perfecto! Tu pedido está en camino y pronto recibirás noticias por correo.')
    setFormData({ nombre: '', apellido: '', email: '', confirmarEmail: '' })
  }

  const handleBuy = () => {
    if (!hasCartItem) {
      setFormMessage('Añade al menos un Pokémon para poder comprar.')
      return
    }
    setFormMessage('')
    onSection('form')
  }

  return (
    <StoreLayout
      activeView={activeView}
      onSection={onSection}
      cart={cart}
      addToCart={addToCart}
      incrementCartItem={incrementCartItem}
      decrementCartItem={decrementCartItem}
      pokemons={pokemons}
      typeColors={typeColors}
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      formMessage={formMessage}
      welcomeName={welcomeName}
      handleBuy={handleBuy}
    />
  )
}

export default PokemonStore
