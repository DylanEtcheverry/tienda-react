// Utilidades para el carrito y productos

export const pokemons = [
  {
    id: 'pikachu',
    name: 'Pikachu',
    type: 'Eléctrico',
    description: 'Un amigo energético que ilumina cualquier compra con chispa y velocidad.',
    price: 890,
    fullDescription: 'Pikachu es el Pokémon más icónico de todos. Con su poder eléctrico, puede generar descargas de hasta 100,000 voltios. Es rápido, ágil y siempre está listo para la acción. Perfecto para entrenadores que buscan velocidad y potencia.',
  },
  {
    id: 'charmander',
    name: 'Charmander',
    type: 'Fuego',
    description: 'Perfecto para añadir calor a tu colección con fuego y actitud.',
    price: 1090,
    fullDescription: 'Charmander es un pequeño dragón que controla el fuego. A medida que crece, se vuelve más poderoso. Su llama nunca se apaga, simbolizando su espíritu indomable.',
  },
  {
    id: 'bulbasaur',
    name: 'Bulbasaur',
    type: 'Planta',
    description: 'Una opción fresca y natural, ideal para los entrenadores más equilibrados.',
    price: 950,
    fullDescription: 'Bulbasaur es un Pokémon versátil que combina los poderes de la planta y el veneno. Es fuerte defensivamente y puede restaurar su salud con el tiempo.',
  },
  {
    id: 'squirtle',
    name: 'Squirtle',
    type: 'Agua',
    description: 'Refrescante y confiable, trae movimiento a tu carrito con estilo acuático.',
    price: 970,
    fullDescription: 'Squirtle es un maestro del agua, con un caparazón protector que lo hace muy resistente. Es estratégico y cauteloso, perfecto para defensas.',
  },
  {
    id: 'gengar',
    name: 'Gengar',
    type: 'Fantasma',
    description: 'Misterioso y poderoso, el complemento perfecto para las noches de batalla.',
    price: 1190,
    fullDescription: 'Gengar es un espíritu poderoso que puede atravesar paredes y atacar desde las sombras. Su velocidad y poder especial lo hacen un rival formidable.',
  },
  {
    id: 'eevee',
    name: 'Eevee',
    type: 'Normal',
    description: 'Versátil y amigable, siempre listo para evolucionar tu experiencia de compra.',
    price: 820,
    fullDescription: 'Eevee es especial porque puede evolucionar de múltiples formas dependiendo de los métodos entrenamiento. Es adorable y extremadamente versátil.',
  },
  {
    id: 'jigglypuff',
    name: 'Jigglypuff',
    type: 'Hada',
    description: 'Dulce y sorprendente, ideal para quien busca un toque suave y encantador.',
    price: 880,
    fullDescription: 'Jigglypuff es conocido por su canción hipnotizante que pone a dormir a sus enemigos. Es adorable pero sorprendentemente efectivo en batalla.',
  },
  {
    id: 'meowth',
    name: 'Meowth',
    type: 'Normal',
    description: 'Travieso y astuto, perfecto para entrenadores que quieren algo con estilo.',
    price: 910,
    fullDescription: 'Meowth es un gato felino astuto que ama el dinero y los objetos brillantes. Es rápido y puede atacar con afiladas garras.',
  },
  {
    id: 'onix',
    name: 'Onix',
    type: 'Roca',
    description: 'Robusto y sólido, un guardián ideal para fortalecer tu equipo defensivo.',
    price: 1040,
    fullDescription: 'Onix es una serpiente de roca masiva y extremadamente fuerte. Su defensa es casi inquebrantable, lo que lo hace perfecto para bloquear ataques.',
  },
  {
    id: 'abra',
    name: 'Abra',
    type: 'Psíquico',
    description: 'Misterioso y ágil, un aliado perfecto para los combates mentales.',
    price: 980,
    fullDescription: 'Abra es un maestro psíquico que puede teletransportarse instantáneamente. Su velocidad y poderes mentales lo hacen muy peligroso en batalla.',
  },
  {
    id: 'snorlax',
    name: 'Snorlax',
    type: 'Normal',
    description: 'Grande y poderoso, con una resistencia que te ayuda a ganar en los momentos difíciles.',
    price: 1250,
    fullDescription: 'Snorlax es un gigante adorable con una resistencia increíble. Puede soportar grandes cantidades de daño y contraatacar con fuerza devastadora.',
  },
  {
    id: 'dragonite',
    name: 'Dragonite',
    type: 'Dragón',
    description: 'Una leyenda voladora que trae fuerza y velocidad a tu equipo.',
    price: 1490,
    fullDescription: 'Dragonite es un dragón legendario con poderes aéreos y de agua. Es uno de los Pokémon más poderosos, combinando fuerza, velocidad e inteligencia.',
  },
]

export const typeColors = {
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

export function getPokemonById(id) {
  return pokemons.find((p) => p.id === id)
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(amount)
}
