# Guía de Uso - PokeShop

## Inicio Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar Firebase (Opcional)
Para usar checkout y guardar órdenes:
1. Copia `.env.example` a `.env.local`
2. Agrega tus credenciales de Firebase
3. Ver [FIREBASE_SETUP.md](FIREBASE_SETUP.md) para instrucciones detalladas

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

La app se abrirá en `http://localhost:5173`

## Navegación Principal

### 🏠 Página de Inicio (/)
- Bienvenida e introducción al proyecto
- Botón para ir a la tienda

### 🛍️ Tienda (/shop)
- Galería de todos los Pokémon
- Botón "Ver detalles" para más información
- Botón "+" para agregar rápidamente al carrito
- Carrito actualiza en tiempo real

### 📦 Detalle de Producto (/product/:id)
- Información completa del Pokémon
- Descripción extendida
- Selector de cantidad (1-99)
- Precio total inmediato
- Botones de navegación

### 🛒 Carrito (/cart)
- Lista de productos agregados
- Controles: +, -, ✕ (quitar)
- Total de compra
- Botón "Ir al Checkout"
- **Nuevo**: Botón "Vaciar Carrito"

### 💳 Checkout (/checkout)
- Formulario de datos de envío
- Información de pago (tarjeta)
- Resumen de orden
- Guardar orden en Firebase

### ✅ Confirmación (/order-confirmation/:orderId)
- Detalles de la orden
- ID único de orden
- Datos de envío
- Lista de productos
- Total pagado
- Opción de imprimir

## Características Principales

### CartContext
El carrito es gestionado globalmente con Context API. Acceso desde cualquier componente:

```javascript
import { useCart } from '@/context/CartContext'

function MiComponente() {
  const { 
    cartItems,        // Array de items en el carrito
    cartCount,        // Número total de unidades
    totalPrice,       // Precio total
    addToCart,        // Agregar producto
    incrementCartItem,     // Aumentar cantidad
    decrementCartItem,     // Disminuir cantidad
    removeFromCart,   // Quitar producto
    clearCart         // NUEVO: Vaciar carrito
  } = useCart()
  
  // ... usar en componente
}
```

### LocalStorage
El carrito se persiste automáticamente en `localStorage` bajo la clave `pokemonCart`.

### Firebase Integration
Las órdenes se guardan en Firestore automáticamente:
- Datos del cliente
- Items de la orden
- Total
- Timestamp
- Estado de la orden

## Productos Disponibles

| Pokémon | Tipo | Precio | ID |
|---------|------|--------|-----|
| Pikachu | Eléctrico | $890 | `pikachu` |
| Charmander | Fuego | $1090 | `charmander` |
| Bulbasaur | Planta | $950 | `bulbasaur` |
| Squirtle | Agua | $970 | `squirtle` |
| Gengar | Fantasma | $1190 | `gengar` |
| Eevee | Normal | $820 | `eevee` |
| Jigglypuff | Hada | $880 | `jigglypuff` |
| Meowth | Normal | $910 | `meowth` |
| Onix | Roca | $1040 | `onix` |
| Abra | Psíquico | $980 | `abra` |
| Snorlax | Normal | $1250 | `snorlax` |
| Dragonite | Dragón | $1490 | `dragonite` |

## Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

## Solución de Problemas

### El carrito se vacía al recargar la página
- Verifica que localStorage no está deshabilitado en el navegador
- Abre las DevTools y revisa: `localStorage.getItem('pokemonCart')`

### Checkout no funciona
- Asegúrate de tener Firebase configurado
- Verifica que `.env.local` tiene las credenciales correctas
- Revisa la consola del navegador para errores específicos

### Los productos no cargan
- Están hardcodeados en `src/utils/constants.js`
- Si necesitas cambiar precio/descripción, edita ese archivo

### Vaciar carrito no funciona
- Recarga la página, debe estar vacío
- Verifica localStorage: `localStorage.removeItem('pokemonCart')`

## Desarrollo

### Scripts disponibles
```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Build para producción
npm run lint     # Ejecuta ESLint
npm run preview  # Vista previa del build
npm run deploy   # Deploy a GitHub Pages
```

### Estructura de Componentes

**Presentacionales** (solo renderizar):
- `ShopProductList.jsx`
- `HomePage.jsx` (visualización)

**Contenedores** (lógica + datos):
- `ShopPage.jsx` (conecta ProductList con Context)
- `CartPage.jsx` (gestiona carrito)
- `CheckoutPage.jsx` (integración Firebase)
- `ProductDetailPage.jsx` (detalle y cantidad)

## Personalización

### Agregar más productos
Edita `src/utils/constants.js`:
```javascript
export const pokemons = [
  // ... productos existentes
  {
    id: 'mewtwo',
    name: 'Mewtwo',
    type: 'Psíquico',
    description: 'El Pokémon artificial más poderoso',
    price: 2000,
    fullDescription: 'Descripción completa...'
  }
]
```

### Cambiar colores de tipos
En `src/utils/constants.js`:
```javascript
export const typeColors = {
  'Psíquico': 'danger',  // Cambiar de 'info' a 'danger'
  // ...
}
```

### Modificar estilos
- CSS global: `src/estilos/Componentes.css`
- Decoración: `src/estilos/Decoracion.css`
- Responsive: `src/estilos/responsive.css`

## API Endpoints (Firebase)

**Colección**: `orders`

**Estructura de documento**:
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
  estado: string,
  createdAt: timestamp
}
```

## Contacto y Soporte

Para issues o preguntas, consulta la documentación:
- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Setup de Firebase
- [CAMBIOS_REALIZADOS.md](CAMBIOS_REALIZADOS.md) - Resumen técnico
