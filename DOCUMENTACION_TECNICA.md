# Documentación Técnica - PokeShop

## Arquitectura de la Aplicación

### Stack Tecnológico
- **Frontend**: React 19.2.6 + Vite
- **Routing**: React Router v6
- **Estado Global**: Context API (CartContext)
- **Backend**: Firebase Firestore
- **Estilos**: Bootstrap 5 + CSS personalizado
- **Iconos**: React Icons

### Flujo de Datos

```
┌─────────────────────────────────────────────┐
│         App (RouterProvider)                │
├─────────────────────────────────────────────┤
│         CartProvider (Context)              │
├─────────────────────────────────────────────┤
│              NavBar                         │
│   ┌─────────────────────────────────┐       │
│   │         Routes                  │       │
│   │  ┌───────────────────────────┐  │       │
│   │  │ HomePage / ShopPage etc    │  │       │
│   │  │ └──────→ useCart()        │  │       │
│   │  │         └──→ CartContext  │  │       │
│   │  └───────────────────────────┘  │       │
│   └─────────────────────────────────┘       │
└─────────────────────────────────────────────┘
              │
              ↓
        ┌──────────────┐
        │  localStorage│
        │  Firestore   │
        └──────────────┘
```

## Módulos Principales

### 1. CartContext (`src/context/CartContext.jsx`)

**Responsabilidades**:
- Mantiene el estado global del carrito
- Proporciona acciones para manipular el carrito
- Persiste datos en localStorage

**Métodos**:
```javascript
{
  addToCart(pokemon),              // Agrega o incrementa un producto
  incrementCartItem(id),           // Aumenta cantidad de 1
  decrementCartItem(id),           // Disminuye cantidad de 1
  removeFromCart(id),              // Decrementa o elimina
  clearCart()                       // Vacía todo el carrito
}
```

**Estado**:
```javascript
{
  cart,           // Objeto { [pokemonId]: { pokemon, quantity } }
  cartCount,      // Total de unidades
  cartItems,      // Array de items
  totalPrice      // Suma de todos los subtotales
}
```

### 2. Firebase Config (`src/config/firebaseConfig.js`)

**Responsabilidades**:
- Inicializa Firebase
- Exporta instancia de Firestore para usar en otros módulos

**Uso**:
```javascript
import { db } from '@/config/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

// Agregar documento
await addDoc(collection(db, 'orders'), orderData)
```

### 3. Componentes de Página (`src/pages/`)

#### HomePage
- Pantalla de bienvenida
- Sin lógica compleja
- Link a ShopPage

#### ShopPage
- **Contenedor**: Conecta ProductList con CartContext
- Obtiene datos de `constants.js`
- Pasa `addToCart` como prop a ShopProductList

#### ProductDetailPage
- **Contenedor**: Lógica de cantidad y carrito
- Obtiene Pokémon por ID de la URL
- Permite seleccionar múltiples unidades antes de agregar

#### CartPage
- **Contenedor**: Gestiona visualización del carrito
- Usa todas las acciones de CartContext
- Mantiene estado de cantidad local

#### CheckoutPage
- **Contenedor**: Integración con Firebase
- Validación de formulario
- Guardado de órdenes en Firestore
- Manejo de errores y loading

#### OrderConfirmationPage
- **Contenedor**: Recupera orden de Firebase
- Muestra información completa
- Funcionalidad de impresión

### 4. Componentes Presentacionales (`src/componentes/presentacionales/`)

#### ShopProductList
- **Puro**: Solo recibe props, no mantiene estado
- Renderiza grid de productos
- Botones de acciones disparan handlers de props

### 5. Utilidades (`src/utils/`)

#### constants.js
- Datos de Pokémon centralizados
- Array `pokemons` con toda la info
- Mapeo de colores por tipo
- Funciones helper: `getPokemonById()`, `formatCurrency()`

## Flow de Casos de Uso

### Agregar producto al carrito
```
ShopPage 
  → ShopProductList (clic en "+")
    → onAddToCart(pokemon)
      → CartContext.addToCart()
        → setCart (actualiza estado global)
          → localStorage (persiste automáticamente)
            → NavBar se actualiza con cartCount
```

### Ir a detalle de producto
```
ShopProductList (clic "Ver detalles")
  → navigate(`/product/${pokemon.id}`)
    → ProductDetailPage (carga con useParams)
      → Muestra fullDescription
```

### Realizar compra
```
CartPage
  → "Ir al Checkout"
    → CheckoutPage
      → Llena formulario
        → "Completar Compra"
          → Valida datos
            → addDoc(collection(db, 'orders'), order)
              → Firebase guarda
                → Limpia carrito con clearCart()
                  → Redirige a OrderConfirmationPage
```

## Estructura de Datos

### Producto (Pokemon)
```javascript
{
  id: string,                  // ID único (usado en URL)
  name: string,                // Nombre del Pokémon
  type: string,                // Tipo (Eléctrico, Fuego, etc)
  description: string,         // Descripción corta (lista)
  price: number,               // Precio en pesos
  fullDescription: string      // Descripción completa (detalle)
}
```

### Carrito (en Context)
```javascript
{
  [pokemonId]: {
    pokemon: Pokemon,          // Objeto del producto
    quantity: number           // Cantidad (1-99)
  }
}
```

### Orden (en Firebase)
```javascript
{
  customer: {
    nombre: string,
    email: string,
    telefono: string,
    direccion: string,
    ciudad: string,
    codigoPostal: string
  },
  items: Array<{
    pokemonId: string,
    nombre: string,
    precio: number,
    cantidad: number,
    subtotal: number
  }>,
  total: number,
  estado: string,                // "pendiente", "enviado", etc
  createdAt: Timestamp           // Timestamp de Firebase
}
```

## Hooks Personalizados

### useCart()
```javascript
const {
  cart,                    // objeto del carrito
  cartCount,              // número total de items
  cartItems,              // array de items
  totalPrice,             // precio total
  addToCart,              // función
  incrementCartItem,      // función
  decrementCartItem,      // función
  removeFromCart,         // función
  clearCart               // función
} = useCart()
```

**Uso**:
```javascript
import { useCart } from '@/context/CartContext'

export default function MiComponente() {
  const { cartCount, addToCart } = useCart()
  // ...
}
```

## CSS Imports

El archivo `src/App.css` centraliza todos los imports:
```css
@import './estilos/Componentes.css';
@import './estilos/Decoracion.css';
@import './estilos/Responsive.css';
```

Esto evita que se rompan los imports si se borran archivos CSS individuales.

## Variables de Entorno

Archivo: `.env.local` (no versionado)

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Acceso en código:
```javascript
import.meta.env.VITE_FIREBASE_API_KEY
```

## Rutas

| Ruta | Componente | Propósito |
|------|-----------|----------|
| `/` | HomePage | Bienvenida |
| `/shop` | ShopPage | Listado de productos |
| `/product/:id` | ProductDetailPage | Detalle individual |
| `/cart` | CartPage | Carrito de compras |
| `/checkout` | CheckoutPage | Formulario y pago |
| `/order-confirmation/:orderId` | OrderConfirmationPage | Confirmación |
| `/*` | Navigate to `/` | Catch-all |

## Performance

### Optimizaciones Aplicadas
1. **Context API**: Evita prop drilling excesivo
2. **Componentes funcionales**: Sintaxis moderna de React
3. **localStorage**: Caché local del carrito
4. **Lazy imports**: React Router maneja code-splitting automáticamente

### Posibles Mejoras
1. **Code splitting**: Usar `React.lazy()` para componentes de página
2. **Memoización**: `useMemo()`, `useCallback()` donde sea necesario
3. **Image optimization**: Comprimir y optimizar imágenes
4. **Virtual scrolling**: Para listas muy largas

## Testing

### Componentes a Probar
- CartContext: Agregar, eliminar, vaciar
- CheckoutPage: Validación de formulario
- ProductDetailPage: Carga de producto correcto
- OrderConfirmationPage: Recuperación de Firebase

### Ejemplo de test
```javascript
import { render, screen } from '@testing-library/react'
import { CartProvider } from '@/context/CartContext'

test('clearCart vacía el carrito', () => {
  // Test implementation
})
```

## Debugging

### Verificar estado del carrito
```javascript
// En DevTools console
localStorage.getItem('pokemonCart')
JSON.parse(localStorage.getItem('pokemonCart'))
```

### Verificar Firebase
```javascript
// En Firebase Console
// Collections → orders → ver documentos guardados
```

### Logs útiles
```javascript
import { useCart } from '@/context/CartContext'

function Debug() {
  const { cartItems, totalPrice } = useCart()
  console.log('Items:', cartItems)
  console.log('Total:', totalPrice)
  return null
}
```

## Seguridad

⚠️ **Importante**: 
- No commitear `.env.local` a Git
- Usar `.env.example` como plantilla
- Firebase Config está expuesto al cliente (es intencional, es público)
- Usar Firestore Rules para proteger datos sensibles

## Deployment

### Antes de hacer deploy
1. Cambiar Firestore Rules a producción
2. Crear `.env.local` con credenciales reales
3. Ejecutar `npm run build` para validar
4. Verificar que no hay console.log() de debug

### Deploy a GitHub Pages
```bash
npm run deploy
```

Requiere `gh-pages` instalado (ya está en package.json)

## Referencias

- [React Router Docs](https://reactrouter.com/)
- [Context API](https://react.dev/reference/react/createContext)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Bootstrap React](https://react-bootstrap.github.io/)
- [React Icons](https://react-icons.github.io/react-icons/)
