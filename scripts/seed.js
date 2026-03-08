// scripts/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  { name: 'Acción', slug: 'accion', icon: '⚔️', description: 'Juegos de acción frenética con combates y aventuras.', color: '#ef4444' },
  { name: 'Puzzle', slug: 'puzzle', icon: '🧩', description: 'Desafía tu mente con los mejores juegos de puzzle y lógica.', color: '#8b5cf6' },
  { name: 'Aventura', slug: 'aventura', icon: '🗺️', description: 'Vive épicas aventuras en mundos fantásticos.', color: '#f59e0b' },
  { name: 'Deportes', slug: 'deportes', icon: '⚽', description: 'Los mejores juegos deportivos online.', color: '#3b82f6' },
  { name: 'Carreras', slug: 'carreras', icon: '🏎️', description: 'Velocidad máxima con los mejores juegos de carreras.', color: '#f97316' },
  { name: 'Estrategia', slug: 'estrategia', icon: '♟️', description: 'Piensa, planifica y conquista con juegos de estrategia.', color: '#22c55e' },
  { name: 'Disparos', slug: 'disparos', icon: '🎯', description: 'Juegos de disparos y shooter para los más hábiles.', color: '#ec4899' },
  { name: 'Arcade', slug: 'arcade', icon: '👾', description: 'Clásicos del arcade y juegos retro.', color: '#06b6d4' },
];

const tags = [
  'multijugador', 'aventura', 'puzzle', 'accion', 'plataformas',
  'disparos', 'estrategia', 'carreras', 'deportes', 'arcade',
  'rpg', 'tower-defense', 'clicker', 'casual', 'retro',
  'fisica', 'zombies', '2d', '3d', 'pixel-art',
];

const games = [

  {
  title: 'Bola y laberinto',
  slug: 'bola-y-laberinto',
  description: 'Bola y Laberinto Puzzle es un desafío juego de laberinto. Desliza la bola para moverla y recoger estrellas. Reúne todas las estrellas y avanza al siguiente nivel. ¡Únete a esta competencia desafío ahora mismo! Si disfrutaste el juego, no olvides calificarlo.',
  instructions: 'Desliza la bola para moverla y recoger estrellas ',
  category: 'puzzle', // debe coincidir con una categoría
  thumbnail: 'https://url-de-la-imagen.jpg',
  gameUrl: 'https://html5.gamemonetize.co/zstd5764fo8lqve11xk5nizwy6kzjx8x/',
  tags: JSON.stringify(['puzzle', 'clásico', 'retro', 'arcade']),
  views: 0, rating: 0, featured: false, isNew: true,
  width: 720, height: 1280,
},
  {
    title: 'Tetris Clásico',
    slug: 'tetris-clasico',
    description: 'El legendario juego de puzzle Tetris. Encaja las piezas para completar filas y supera tu récord.',
    instructions: 'Flechas: Mover y rotar piezas\nFlecha Abajo: Bajar rápido\nEspacio: Caída instantánea',
    category: 'puzzle',
    thumbnail: 'https://picsum.photos/seed/tetris/460/345',
    gameUrl: 'https://tetris.com/embed',
    tags: JSON.stringify(['puzzle', 'clásico', 'retro', 'arcade']),
    views: 98230, rating: 4.8, featured: true, isNew: false,
    width: 480, height: 640,
  },
  {
    title: '2048',
    slug: '2048',
    description: 'El adictivo juego de números 2048. Desliza los bloques y combínalos para llegar al número 2048.',
    instructions: 'Desliza con el teclado o el dedo para mover los bloques.\nCombina bloques iguales para crear números más altos.',
    category: 'puzzle',
    thumbnail: 'https://picsum.photos/seed/2048/460/345',
    gameUrl: 'https://play2048.co',
    tags: JSON.stringify(['puzzle', 'numeros', 'casual', 'logica']),
    views: 76890, rating: 4.5, featured: true, isNew: false,
    width: 500, height: 600,
  },
  {
    title: 'Zombie Shooter',
    slug: 'zombie-shooter',
    description: 'Sobrevive a las hordas de zombies en este intenso juego de disparos. Usa diferentes armas y defiende tu posición.',
    instructions: 'WASD: Moverse\nRatón: Apuntar y disparar\n1-4: Cambiar arma\nR: Recargar',
    category: 'disparos',
    thumbnail: 'https://picsum.photos/seed/zombie/460/345',
    gameUrl: 'https://example.com/zombie-shooter',
    tags: JSON.stringify(['disparos', 'zombies', 'survival', 'accion']),
    views: 54320, rating: 4.3, featured: true, isNew: true,
    width: 800, height: 600,
  },
  {
    title: 'Racing Thunder',
    slug: 'racing-thunder',
    description: 'Conduce a toda velocidad en este juego de carreras. Compite en diferentes circuitos y desbloquea coches.',
    instructions: 'Flechas o WASD: Conducir\nEspacio: Freno de mano\nN: Nitro',
    category: 'carreras',
    thumbnail: 'https://picsum.photos/seed/racing/460/345',
    gameUrl: 'https://example.com/racing-thunder',
    tags: JSON.stringify(['carreras', 'velocidad', 'coches', 'competicion']),
    views: 43100, rating: 4.2, featured: false, isNew: true,
    width: 800, height: 480,
  },
  {
    title: 'Minecraft Classic',
    slug: 'minecraft-classic',
    description: 'La versión clásica de Minecraft directamente en tu navegador. Construye y explora en este mundo de bloques.',
    instructions: 'WASD: Moverse\nMouse: Mirar\nClic izquierdo: Destruir\nClic derecho: Colocar bloque\nE: Inventario',
    category: 'aventura',
    thumbnail: 'https://picsum.photos/seed/minecraft/460/345',
    gameUrl: 'https://classic.minecraft.net',
    tags: JSON.stringify(['aventura', 'construccion', '3d', 'sandbox']),
    views: 234500, rating: 4.9, featured: true, isNew: false,
    width: 854, height: 480,
  },
  {
    title: 'Flappy Bird',
    slug: 'flappy-bird',
    description: 'El famoso Flappy Bird de vuelta. Toca para volar y evita los tubos. ¿Cuánto puedes aguantar?',
    instructions: 'Clic / Espacio / Tap: Volar\nEvita los tubos\nConsigue la mayor puntuación',
    category: 'arcade',
    thumbnail: 'https://picsum.photos/seed/flappy/460/345',
    gameUrl: 'https://example.com/flappy-bird',
    tags: JSON.stringify(['arcade', 'casual', 'dificil', 'one-tap']),
    views: 189000, rating: 4.0, featured: false, isNew: false,
    width: 400, height: 600,
  },
  {
    title: 'Soccer Stars',
    slug: 'soccer-stars',
    description: 'Juega al fútbol en este divertido juego de mesa. Golpea las fichas para marcar goles.',
    instructions: 'Arrastra y lanza tu ficha hacia el balón.\nMarca más goles que el rival para ganar.',
    category: 'deportes',
    thumbnail: 'https://picsum.photos/seed/soccer/460/345',
    gameUrl: 'https://example.com/soccer-stars',
    tags: JSON.stringify(['deportes', 'futbol', 'multijugador', 'casual']),
    views: 32100, rating: 4.1, featured: false, isNew: true,
    width: 800, height: 600,
  },
  {
    title: 'Tower Defense Pro',
    slug: 'tower-defense-pro',
    description: 'Coloca torres y defiende tu base de las oleadas de enemigos. Múltiples tipos de torres y habilidades.',
    instructions: 'Clic: Colocar torres\nDerecho: Vender torre\nU: Mejorar torre\nBarra espaciadora: Acelerar',
    category: 'estrategia',
    thumbnail: 'https://picsum.photos/seed/tower/460/345',
    gameUrl: 'https://example.com/tower-defense',
    tags: JSON.stringify(['estrategia', 'tower-defense', 'defensa', 'tactico']),
    views: 67800, rating: 4.6, featured: true, isNew: false,
    width: 800, height: 600,
  },
  {
    title: 'Angry Birds Online',
    slug: 'angry-birds-online',
    description: 'El famoso juego de física Angry Birds. Lanza pájaros con el tirachinas y destruye las estructuras de los cerdos.',
    instructions: 'Arrastra el tirachinas para apuntar.\nSuelta para lanzar el pájaro.\nDestruye todas las estructuras.',
    category: 'accion',
    thumbnail: 'https://picsum.photos/seed/birds/460/345',
    gameUrl: 'https://example.com/angry-birds',
    tags: JSON.stringify(['accion', 'fisica', 'puzzle', 'estrategia']),
    views: 145600, rating: 4.7, featured: true, isNew: false,
    width: 800, height: 450,
  },
];

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Seed categories
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }
  console.log(`✅ ${categories.length} categorías creadas`);

  // Seed tags
  for (const tagName of tags) {
    const slug = tagName.toLowerCase().replace(/\s+/g, '-');
    await prisma.tag.upsert({
      where: { slug },
      update: { name: tagName, slug },
      create: { name: tagName, slug },
    });
  }
  console.log(`✅ ${tags.length} tags creados`);

  // Seed games
  for (const game of games) {
    await prisma.game.upsert({
      where: { slug: game.slug },
      update: game,
      create: game,
    });
  }
  console.log(`✅ ${games.length} juegos creados`);

  console.log('🎮 Seed completado!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
