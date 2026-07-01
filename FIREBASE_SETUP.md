# Guía de Configuración de Firebase

## Instrucciones para configurar Firebase en el proyecto

### 1. Crear un proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear Proyecto"
3. Nombre tu proyecto (ej: "PokeShop")
4. Completa la configuración del proyecto

### 2. Obtener las credenciales de Firebase

1. En la consola de Firebase, ve a **Configuración del proyecto** (⚙️)
2. En la pestaña **General**, desplázate hacia abajo hasta **"Tus aplicaciones"**
3. Haz clic en el icono de `</>` para agregar una aplicación web
4. Registra la aplicación
5. Copia las credenciales proporcionadas

Las credenciales lucirán así:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "projeto.firebaseapp.com",
  projectId: "proyecto-id",
  storageBucket: "proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef..."
};
```

### 3. Configurar variables de entorno

1. Copia el archivo `.env.example` y renómbralo a `.env.local`
2. Reemplaza los valores `YOUR_...` con tus credenciales reales

```bash
cp .env.example .env.local
```

**Contenido de `.env.local`:**
```
VITE_FIREBASE_API_KEY=tu_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain_aqui
VITE_FIREBASE_PROJECT_ID=tu_project_id_aqui
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket_aqui
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id_aqui
VITE_FIREBASE_APP_ID=tu_app_id_aqui
```

### 4. Crear base de datos Firestore

1. En la consola de Firebase, ve a **Firestore Database**
2. Haz clic en **Crear base de datos**
3. Selecciona **Comenzar en modo de prueba** (para desarrollo)
4. Elige la región más cercana
5. Confirma

### 5. Crear colecciones

El proyecto ya está configurado para guardar las órdenes en Firestore. Las órdenes se guardarán en una colección llamada `orders` con la siguiente estructura:

```javascript
{
  customer: {
    nombre: "string",
    email: "string",
    telefono: "string",
    direccion: "string",
    ciudad: "string",
    codigoPostal: "string"
  },
  items: [
    {
      pokemonId: "string",
      nombre: "string",
      precio: "number",
      cantidad: "number",
      subtotal: "number"
    }
  ],
  total: "number",
  estado: "string",
  createdAt: "timestamp"
}
```

### 6. Configurar reglas de seguridad (Firestore)

Para desarrollo, puedes usar estas reglas permisivas. **No las uses en producción:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Para producción, usa reglas más restrictivas como:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if false;
    }
  }
}
```

### 7. Verificar la configuración

1. Ejecuta `npm run dev` para iniciar el servidor de desarrollo
2. Ve a `/checkout` y prueba crear una orden
3. Verifica en la consola de Firebase que las órdenes se guardan correctamente

## Solución de problemas

**Error: "No se pudo conectar a Firebase"**
- Asegúrate de que `.env.local` existe y tiene las credenciales correctas
- Reinicia el servidor de desarrollo después de cambiar variables de entorno

**Error: "La colección orders no existe"**
- Firestore crea automáticamente colecciones cuando guardas el primer documento
- Crea una orden de prueba para que se cree la colección

**Error: "Permiso denegado para crear documentos"**
- Verifica que has configurado correctamente las reglas de seguridad en Firestore
- O que estás usando modo de prueba
