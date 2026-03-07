# 🎮 GameZone - Portal de Juegos HTML5

Portal de juegos HTML5 construido con Next.js 14, TailwindCSS y SQLite/PostgreSQL. Optimizado para alto tráfico, SEO y monetización con publicidad.

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# 3. Inicializar base de datos
npx prisma db push

# 4. Poblar con datos de ejemplo
npm run db:seed

# 5. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 📁 Estructura del Proyecto

```
gameportal/
├── prisma/
│   └── schema.prisma          # Esquema de base de datos
├── scripts/
│   └── seed.js                # Script de datos iniciales
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── page.tsx           # Home /
│   │   ├── layout.tsx         # Layout raíz
│   │   ├── globals.css        # Estilos globales
│   │   ├── sitemap.ts         # Sitemap SEO automático
│   │   ├── robots.ts          # Robots.txt
│   │   ├── not-found.tsx      # Página 404
│   │   ├── juegos/
│   │   │   └── [categoria]/
│   │   │       └── page.tsx   # /juegos/accion, /juegos/puzzle...
│   │   ├── juego/
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # /juego/tetris-clasico
│   │   ├── tag/
│   │   │   └── [tag]/
│   │   │       └── page.tsx   # /tag/puzzle
│   │   ├── buscar/
│   │   │   └── page.tsx       # /buscar?q=mario
│   │   └── api/
│   │       ├── games/route.ts        # GET /api/games
│   │       ├── categories/route.ts   # GET /api/categories
│   │       └── import/route.ts       # POST /api/import
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx     # Cabecera con nav y búsqueda
│   │   │   └── Footer.tsx     # Pie de página con categorías
│   │   ├── game/
│   │   │   ├── GameCard.tsx   # Tarjeta de juego individual
│   │   │   ├── GameGrid.tsx   # Grid de juegos
│   │   │   └── GamePlayer.tsx # Reproductor iframe con fullscreen
│   │   ├── ui/
│   │   │   ├── SearchBar.tsx      # Buscador
│   │   │   ├── CategoryMenu.tsx   # Menú de categorías
│   │   │   ├── Pagination.tsx     # Paginación
│   │   │   └── SectionHeader.tsx  # Cabeceras de sección
│   │   └── ads/
│   │       └── AdBanner.tsx   # Banners de publicidad
│   ├── lib/
│   │   ├── db.ts              # Cliente Prisma
│   │   ├── games.ts           # Funciones de acceso a datos
│   │   └── utils.ts           # Utilidades y constantes
│   └── types/
│       └── index.ts           # TypeScript types
└── public/                    # Assets estáticos
```

---

## 🗄️ Base de Datos

### Esquema

**Tabla `games`**
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Int | ID autoincremental |
| title | String | Nombre del juego |
| slug | String (único) | URL amigable |
| description | String | Descripción larga |
| instructions | String? | Instrucciones de juego |
| category | String | Categoría del juego |
| thumbnail | String | URL de la miniatura |
| gameUrl | String | URL del iframe HTML5 |
| tags | String | JSON array de etiquetas |
| views | Int | Contador de partidas |
| rating | Float | Valoración (0-5) |
| featured | Boolean | Juego destacado |
| isNew | Boolean | Juego nuevo |
| width | Int | Ancho del iframe |
| height | Int | Alto del iframe |
| developer | String? | Nombre del desarrollador |
| createdAt | DateTime | Fecha de creación |
| updatedAt | DateTime | Última actualización |

**Tabla `categories`**
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Int | ID autoincremental |
| name | String (único) | Nombre (ej: "Acción") |
| slug | String (único) | URL (ej: "accion") |
| icon | String | Emoji de icono |
| description | String | Descripción SEO |
| color | String | Color hex de la categoría |
| gameCount | Int | Número de juegos |

**Tabla `tags`**
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Int | ID autoincremental |
| name | String (único) | Nombre de la etiqueta |
| slug | String (único) | URL de la etiqueta |
| gameCount | Int | Número de juegos |

### Cambiar a PostgreSQL (producción)

En `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

En `.env`:
```
DATABASE_URL="postgresql://user:password@host:5432/gameportal"
```

---

## 💰 Monetización (Google AdSense)

Espacios de publicidad en `src/components/ads/AdBanner.tsx`.

Para activar AdSense, reemplaza el placeholder en `AdBanner.tsx`:

```jsx
<ins
  className="adsbygoogle"
  style={{ display: 'block' }}
  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"
  data-full-width-responsive="true"
/>
```

### Ubicaciones de anuncios
- **Header**: Leaderboard 728×90 (encima del nav)
- **Antes del juego**: Leaderboard 728×90
- **Lateral**: Skyscraper 160×600 + Rectangle 300×250
- **Entre relacionados**: Rectangle 300×250
- **Footer**: Leaderboard 728×90

---

## 🔍 SEO

- ✅ Meta titles y descriptions automáticos por página
- ✅ Open Graph y Twitter Cards
- ✅ Structured data (JSON-LD) en todas las páginas
- ✅ Sitemap.xml automático
- ✅ Robots.txt
- ✅ URLs amigables con slugs
- ✅ Texto SEO en páginas de categoría
- ✅ Breadcrumbs en páginas de juego
- ✅ Canonical URLs
- ✅ Revalidación incremental (ISR)

---

## 📦 API REST

```bash
# Listar juegos
GET /api/games?category=accion&sort=views&page=1&limit=24

# Parámetros disponibles:
# q=texto        - Búsqueda por texto
# category=slug  - Filtrar por categoría
# sort=views|rating|createdAt
# page=1         - Número de página
# limit=24       - Juegos por página (máx 100)

# Categorías
GET /api/categories

# Importar desde API externa (requiere x-api-key header)
POST /api/import
Body: { "apiUrl": "https://api.external.com/games" }
```

---

## 🔌 Importación de Juegos

Para importar juegos desde una API externa:

```bash
curl -X POST https://tuportal.com/api/import \
  -H "Content-Type: application/json" \
  -H "x-api-key: tu-clave-secreta" \
  -d '{"apiUrl": "https://api.juegos.com/games"}'
```

El JSON de la API debe tener este formato:
```json
[
  {
    "title": "Mi Juego",
    "slug": "mi-juego",
    "description": "Descripción...",
    "category": "accion",
    "thumbnail": "https://...",
    "gameUrl": "https://...",
    "tags": ["accion", "aventura"],
    "featured": false,
    "isNew": true
  }
]
```

---

## 🎨 Personalización

### Colores (tailwind.config.js)
```js
colors: {
  background: '#0f172a',  // Fondo principal
  surface: '#1e293b',     // Tarjetas
  'surface-2': '#263347', // Hover states
  accent: '#22c55e',      // Color principal (verde)
  muted: '#64748b',       // Texto secundario
  border: '#334155',      // Bordes
}
```

### Cambiar nombre del sitio (src/lib/utils.ts)
```ts
export const SITE_NAME = 'GameZone';
export const SITE_URL = 'https://tudominio.com';
```

---

## 🚀 Despliegue

### Vercel (recomendado)
```bash
npm i -g vercel
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## ⚡ Optimizaciones de Rendimiento

- **ISR** (Incremental Static Regeneration) en todas las páginas
- **Lazy loading** de imágenes con `next/image`
- **Skeleton loaders** en GamePlayer
- **Prefetch** automático de rutas en Next.js
- **Cache headers** en rutas de API
- **Background grid** con CSS puro (sin JavaScript)
- **Animaciones** con CSS `transition` y `animation`

---

## 📄 Licencia

MIT - Usa y modifica libremente.
