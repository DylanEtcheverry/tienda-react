import { useCart } from '../context/CartContext'
import ShopProductList from '../componentes/presentacionales/ShopProductList'
import { pokemons, typeColors } from '../utils/constants'

export default function ShopPage() {
  const { addToCart } = useCart()

  return (
    <ShopProductList
      pokemons={pokemons}
      typeColors={typeColors}
      onAddToCart={addToCart}
    />
  )
}
