import { useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ShopProductList from '../componentes/presentacionales/ShopProductList'
import { pokemons, typeColors } from '../utils/constants'

export default function ShopPage() {
  const { addToCart } = useCart()
  const [searchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category')

  // Filtrar pokémon por categoría si está especificada
  const filteredPokemons = selectedCategory
    ? pokemons.filter((pokemon) => pokemon.type === selectedCategory)
    : pokemons

  return (
    <ShopProductList
      pokemons={filteredPokemons}
      typeColors={typeColors}
      onAddToCart={addToCart}
      selectedCategory={selectedCategory}
    />
  )
}
