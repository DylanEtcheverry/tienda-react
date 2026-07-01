import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Reemplaza estas credenciales con las tuyas desde Firebase Console
// Ve a https://firebase.google.com/docs/web/setup
const firebaseConfig = {
  apiKey: 'AIzaSyAwLGLgJ7v4xkRLDDjO4nBlglbdam5RQo8',
  authDomain: 'tienda-pokemon-4e301.firebaseapp.com',
  projectId: 'tienda-pokemon-4e301',
  storageBucket: 'tienda-pokemon-4e301.firebasestorage.app',
  messagingSenderId: '639141460653',
  appId: '1:639141460653:web:6fff30da193a21aeade424',
  measurementId: 'G-1LQSBBYLGE',
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Inicializar Firestore
export const db = getFirestore(app)

export default app
