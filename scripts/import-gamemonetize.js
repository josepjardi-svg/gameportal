// scripts/import-gamemonetize.js
// Importa juegos automáticamente desde GameMonetize API
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Mapeo de categorías de GameMonetize a las nuestras
const categoryMap = {
  'Action': 'accion',
  'Adventure': 'aventura',
  'Puzzle': 'puzzle',
  'Racing': 'carreras',
  'Sports': 'deportes',
  'Shooting': 'disparos',
  'Arcade': 'arcade',
  'Multiplayer': 'accion',
  '2 Player': 'accion',
  '3D': 'accion',
  '.IO': 'arcade',
  'Clicker': 'arcade',
  'Hypercasual': 'arcade',
  'Soccer': 'deportes',
  'Stickman': 'accion',
};

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 80);
}

function mapCategory(gmCategory) {
  if (!gmCategory) return 'arcade';
  const firstCat = gmCategory.split(',')[0].trim();
  return categoryMap[firstCat] || 'arcade';
}

async function importFromGameMonetize(options = {}) {
  const {
    amount = 100,
    category = 'All',
    type = 'html5',
    popularity = 'Newest',
  } = options;

  const feedUrl = `https://rss.gamemonetize.com/rssfeed.php?format=json&category=${encodeURIComponent(category)}&type=${type}&popularity=${encodeURIComponent(popularity)}&company=All&amount=${amount}`;

  console.log(`📡 Fetching from: ${feedUrl}`);

  let games;
  try {
    const res = await fetch(feedUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    games = await res.json();
  } catch (err) {
    console.error('❌ Error fetching feed:', err.message);
    process.exit(1);
  }

  if (!Array.isArray(games)) {
    console.error('❌ Unexpected response format');
    process.exit(1);
  }

  console.log(`🎮 Found ${games.length} games, importing...`);

  let imported = 0;
  let updated = 0;
  let errors = 0;

  for (const g of games) {
    try {
      const slug = slugify(g.title || g.name || `game-${g.id}`);
      if (!slug) continue;

      const tags = [];
      if (g.tags) tags.push(...g.tags.split(',').map(t => t.trim()).filter(Boolean));
      if (g.category) tags.push(...g.category.split(',').map(t => t.trim().toLowerCase()).filter(Boolean));

      const gameData = {
        title: g.title || g.name,
        slug,
        description: g.description || `Juega a ${g.title} online gratis.`,
        instructions: g.instructions || 'Usa el ratón o las teclas para jugar.',
        category: mapCategory(g.category),
        thumbnail: g.thumb || g.thumbnail || '',
        gameUrl: g.url || g.gameUrl || '',
        tags: JSON.stringify([...new Set(tags)].slice(0, 10)),
        views: 0,
        rating: parseFloat(g.rating) || 0,
        featured: false,
        isNew: true,
        width: parseInt(g.width) || 800,
        height: parseInt(g.height) || 600,
        developer: g.company || g.developer || null,
      };

      // Salta juegos sin URL
      if (!gameData.gameUrl || !gameData.thumbnail) continue;

      const existing = await prisma.game.findUnique({ where: { slug } });

      if (existing) {
        await prisma.game.update({ where: { slug }, data: gameData });
        updated++;
      } else {
        await prisma.game.create({ data: gameData });
        imported++;
      }

    } catch (err) {
      errors++;
      console.error(`  ⚠️  Error with game "${g.title}":`, err.message);
    }
  }

  // Actualizar contadores de categorías
  await updateCategoryCounts();

  console.log(`\n✅ Import complete!`);
  console.log(`   Nuevos: ${imported}`);
  console.log(`   Actualizados: ${updated}`);
  console.log(`   Errores: ${errors}`);
}

async function updateCategoryCounts() {
  const categories = await prisma.category.findMany();
  for (const cat of categories) {
    const count = await prisma.game.count({ where: { category: cat.slug } });
    await prisma.category.update({ where: { id: cat.id }, data: { gameCount: count } });
  }
}

// Configuración de importación
const options = {
  amount: 200,      // Número de juegos a importar (max 1000)
  category: 'All', // All, Action, Puzzle, Racing, Sports, Shooting, Arcade, Adventure...
  type: 'html5',   // html5 o mobile
  popularity: 'mostplayed', // Newest, Most Popular, Hot Games, Best Games
};

importFromGameMonetize(options)
  .catch(console.error)
  .finally(() => prisma.$disconnect());
