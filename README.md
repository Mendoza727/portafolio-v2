# Ecliptic Horizon — Portfolio Personal · Juan Camilo Mendoza

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js)
![GSAP](https://img.shields.io/badge/GSAP_3-88CE02?style=for-the-badge&logo=greensock&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer](https://img.shields.io/badge/Framer_Motion-EF0078?style=for-the-badge&logo=framer&logoColor=white)

**Portafolio personal de desarrollo web Full-Stack con experiencias inmersivas 3D, animaciones GSAP avanzadas e integración dinámica con la GitHub API.**

[🌐 Ver en vivo](#) · [📬 Contacto](mailto:juancamilomendozavillegas14@gmail.com) · [💼 LinkedIn](https://www.linkedin.com/in/juancamilomendoza-dev/)

</div>

---

## 📋 Tabla de Contenido

- [Vista General](#-vista-general)
- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Secciones](#-secciones)
- [Animaciones y Efectos](#-animaciones-y-efectos)
- [Internacionalización](#-internacionalización-i18n)
- [GitHub API Integration](#-github-api-integration)
- [SEO y Performance](#-seo-y-performance)
- [Instalación y Desarrollo](#-instalación-y-desarrollo)
- [Scripts Disponibles](#-scripts-disponibles)
- [Variables de Entorno](#-variables-de-entorno)
- [Deployment](#-deployment)

---

## 🌌 Vista General

**Ecliptic Horizon** es un portafolio personal de alta gama construido con Next.js 16 y Turbopack. El nombre hace referencia al horizonte eclíptico — el plano donde los mundos se intersectan — como metáfora de la intersección entre ingeniería de software, diseño visual e inteligencia artificial.

El sitio está diseñado para funcionar como una **experiencia interactiva**, no solo como una página estática. Cada sección tiene comportamientos reactivos al scroll, animaciones 3D, y micro-interacciones que crean la sensación de un producto de software premium.

```
Stack principal:   Next.js 16 + TypeScript + TailwindCSS v4
3D:                Three.js + React Three Fiber + Drei
Animaciones:       GSAP 3 + ScrollTrigger + Framer Motion
Smooth scroll:     Lenis
Estado global:     Zustand
i18n:              next-intl (ES / EN)
Formularios:       React Hook Form + Zod + Formspree
Iconos:            Lucide React
```

---

## ✨ Características

| Característica | Descripción |
|---|---|
| 🖥️ **CLI Loader** | Pantalla de carga tipo terminal que simula comandos reales antes de mostrar el sitio |
| 🌐 **3D Hero Canvas** | Escena Three.js reactiva en el hero con partículas y geometría interactiva |
| 📜 **Scroll-driven animations** | Animaciones GSAP ancladas al scroll (scrub) en todo el sitio |
| 🔀 **Horizontal scroll** | Sección de habilidades con carrusel horizontal pinned por GSAP |
| 🗺️ **Timeline 3D** | Historial laboral con cards alternadas izquierda/derecha y animaciones rotateY |
| 🐙 **GitHub live data** | Repos y gráfico de contribuciones cargados en tiempo real desde la API pública |
| 🌍 **Bilingüe ES/EN** | Traducción completa de todo el contenido con `next-intl` |
| 📬 **Formulario Formspree** | Formulario de contacto validado (Zod) con envío a Formspree, sin backend propio |
| 🎯 **Floating Action Button** | Botón flotante para volver al inicio, visible tras hacer scroll |
| 🔢 **Contadores animados** | Cifras estadísticas con animación counter-up al entrar en viewport |
| 🎨 **Design system** | Variables CSS personalizadas (HSL) para colores, superficies y tipografía |
| 📱 **Responsive** | Diseño adaptado a mobile, tablet y desktop |
| 🔍 **SEO completo** | Meta tags, Open Graph, Twitter Cards y JSON-LD estructurado |
| 🖼️ **Favicon SVG** | Ícono de pestaña con gradiente y símbolo `</>` |

---

## 🛠️ Stack Tecnológico

### Core
| Tecnología | Versión | Uso |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.x | Framework React con App Router y Server Components |
| [React](https://react.dev/) | 19.x | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.9 | Tipado estático |
| [TailwindCSS](https://tailwindcss.com/) | 4.x | Utilidades de CSS |
| [pnpm](https://pnpm.io/) | — | Gestor de paquetes |
| [Turbopack](https://turbo.build/pack) | — | Bundler ultra-rápido para desarrollo |

### Animación y 3D
| Tecnología | Versión | Uso |
|---|---|---|
| [GSAP](https://gsap.com/) | 3.14 | Animaciones complejas y scroll-driven |
| [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | (plugin GSAP) | Anclaje de animaciones al scroll |
| [Framer Motion](https://www.framer.com/motion/) | 12.x | Animaciones declarativas en componentes |
| [Three.js](https://threejs.org/) | 0.183 | Motor 3D WebGL |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | 9.x | Wrapper React para Three.js |
| [Drei](https://github.com/pmndrs/drei) | 10.x | Helpers para React Three Fiber |
| [Lenis](https://lenis.darkroom.engineering/) | 1.3 | Smooth scrolling nativo |

### UI y Forms
| Tecnología | Versión | Uso |
|---|---|---|
| [Lucide React](https://lucide.dev/) | 0.577 | Librería de íconos SVG |
| [React Hook Form](https://react-hook-form.com/) | 7.x | Manejo de formularios |
| [Zod](https://zod.dev/) | 4.x | Validación de esquemas |
| [Zustand](https://zustand-demo.pmnd.rs/) | 5.x | Estado global (menú, preferencias) |
| [next-intl](https://next-intl.dev/) | 4.x | Internacionalización ES/EN |

---

## 🏗️ Arquitectura del Proyecto

```
ecliptic-horizon/
├── messages/                   # Traducciones i18n
│   ├── en.json                 # Inglés
│   └── es.json                 # Español
├── public/                     # Assets estáticos
│   ├── favicon.svg             # Favicon personalizado
│   └── manifest.json           # PWA manifest
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── layout.tsx          # Root layout + metadata SEO
│   │   ├── page.tsx            # Página principal con CliLoader
│   │   └── api/                # API routes
│   ├── components/
│   │   ├── 3d/
│   │   │   └── HeroCanvas.tsx          # Escena Three.js del hero
│   │   ├── animations/
│   │   │   ├── CliLoader.tsx           # Loader tipo terminal (pantalla completa)
│   │   │   ├── CustomCursor.tsx        # Cursor personalizado
│   │   │   ├── LenisProvider.tsx       # Smooth scroll global
│   │   │   └── ScrollAnimations.tsx    # Sistema global GSAP + ScrollTrigger
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx         # Hero con 3D canvas y contadores
│   │   │   ├── AboutSection.tsx        # Sobre mí con word-reveal scrubbed
│   │   │   ├── SkillsSection.tsx       # Expertise técnico (scroll horizontal)
│   │   │   ├── ServicesSection.tsx     # Servicios (accordion i18n)
│   │   │   ├── ProjectsSection.tsx     # Proyectos GitHub (CLI loader)
│   │   │   ├── ExperienceSection.tsx   # Timeline laboral 3D alternado
│   │   │   ├── EducationSection.tsx    # Formación académica (scroll reveal)
│   │   │   ├── GithubSection.tsx       # Contribuciones + repos en tiempo real
│   │   │   └── ContactSection.tsx      # Formulario → Formspree
│   │   └── ui/
│   │       ├── Navigation.tsx          # Nav fija, responsive, con i18n
│   │       ├── Footer.tsx              # Footer con links sociales
│   │       └── FloatingActionButton.tsx # Botón scroll-to-top
│   ├── i18n/
│   │   └── I18nProvider.tsx    # Context provider de traducciones
│   ├── lib/
│   │   └── data.ts             # Datos estáticos (experiencias, educación, skills)
│   ├── store/
│   │   └── useAppStore.ts      # Zustand store (menú, locale)
│   ├── styles/
│   │   └── globals.css         # Design tokens + utilidades globales
│   └── types/
│       └── index.ts            # Tipos TypeScript compartidos
└── package.json
```

---

## 📄 Secciones

### 🚀 Hero
- Escena 3D WebGL con `Three.js` (geometría icosaédrica wireframe animada)
- Texto de nombre con clip-reveal GSAP desde abajo
- Badge de disponibilidad con pulso animado
- Contadores estadísticos (años de experiencia, proyectos, satisfacción) con animación counter-up
- Efecto de scroll que desplaza y desvanece el contenido hero al hacer scroll

### 👤 About
- Word-reveal scrubbed: cada palabra del bio aparece conforme el usuario hace scroll
- Grid de info personal (ubicación, disponibilidad, timezone)
- Chips de core expertise
- Links a GitHub y descarga de CV

### ⚡ Skills (Expertise Técnico)
- Carrusel horizontal controlado por GSAP `pin` + `scrub`
- 6 categorías: Frontend, Backend, Mobile, DevOps/Cloud, Databases, Tools & AI
- Cards de altura uniforme (`alignItems: stretch`)
- Chips de tecnologías individuales con iconos de color

### 🛎️ Services
- 5 servicios expandibles (accordion con Framer Motion AnimatePresence)
- Completamente i18n: título, descripción y lista de features traducidos
- Iconos dinámicos con colores de acento por servicio

### 📁 Projects
- Loader CLI tipo terminal mientras se cargan los repos de GitHub
- Fetch dinámico desde `api.github.com/users/:user/repos`
- Tags de lenguaje, estrellas, forks
- Filtro por variedad de stacks (web, mobile, backend, cloud)

### 💼 Experience (Historial Laboral)
- Timeline centrado con spine vertical animado (GSAP scrub)
- Cards alternadas izquierda/derecha con animación 3D (`rotateY`, `scale`, `translateX`)
- Puntos de timeline con animación `back.out`
- Todo el contenido traducible por i18n: rol, empresa, descripción, logros y tecnologías

### 🎓 Education
- Cards con GSAP scroll-reveal (fade + slide up + scale)
- Hover con efecto lift (`translateY`)
- Badge "Presente" animado (pulse) para la carrera en curso

### 🐙 GitHub Activity
- Perfil en tiempo real: repos públicos, seguidores, siguiendo
- Gráfico de contribuciones de 2024, 2025 y 2026 via `github-contributions-api.jogruber.de`
- Paleta de verdes idéntica a la de GitHub (`#0e4429 → #39d353`)
- Ocupación de ancho completo del viewport (full-bleed)
- Repos en grid con hover effects

### 📬 Contact
- Formulario validado con React Hook Form + Zod
- Envío a **Formspree** (`/f/xgonjnqk`) sin necesidad de backend propio
- Info de contacto: email, teléfono, GitHub, LinkedIn, ubicación
- Badge de disponibilidad activa

---

## 🎬 Animaciones y Efectos

### Sistema GSAP Global (`ScrollAnimations.tsx`)
El sistema registra 11 categorías de animaciones en un único contexto GSAP:

1. **Hero parallax** — el contenido sube y se desvanece al hacer scroll
2. **Section reveals** — elementos vuelan desde abajo al entrar en viewport
3. **Title clip-reveal** — títulos grandes emergen desde abajo con `yPercent`
4. **Stagger containers** — hijos aparecen en secuencia
5. **Parallax backgrounds** — orbes de fondo se mueven a diferentes velocidades
6. **Horizontal scroll** — la sección de Skills se desplaza lateralmente (pin)
7. **Word reveal** — cada palabra del About aparece con el scroll (scrub)
8. **Project cards 3D** — las cards entran con `rotationX` y profundidad
9. **Counter animation** — números cuentan hasta su valor objetivo
10. **Experience timeline** — la línea vertical crece con el scroll
11. **Floating decorations** — parallax continuo en orbes de fondo

### CliLoader
Splash screen fullscreen estilo terminal que:
- Muestra 12 comandos secuenciales con delays crecientes (~6 seg de texto)
- Rellena una barra de progreso en 3.2 segundos (40 pasos × 80ms)
- Barra CSS con gradiente `#006d32 → #39d353` y glow en el extremo
- Se desvanece con `opacity 0` + fade out suave antes de mostrar el sitio

### Smooth Scroll
[Lenis](https://lenis.darkroom.engineering/) proporciona easing física en el scroll nativo, integrado como `LenisProvider` global.

---

## 🌍 Internacionalización (i18n)

El proyecto soporta **Español** e **Inglés** mediante `next-intl` con un provider de contexto customizado (`I18nProvider.tsx`).

### Alcance de traducciones
```
nav          → Navegación y botón CTA
hero         → Badge, subtítulo, tagline, CTAs, labels estadísticas
about        → Label, headings, bio completo, labels de info
skills       → Label, headings, scroll hint
services     → Label, headings + titulo/desc/features de los 5 servicios
projects     → Label, headings, labels
experience   → Label, headings + rol/descripción/logros de los 5 empleos
education    → Label, headings, badge "Present"/"Presente"
contact      → Label, headings, descripción, labels de campos del formulario
footer       → Derechos, créditos
```

### Cambio de idioma
El botón `ES / EN` en la navegación llama a `setLocale()` del context. No requiere recarga de página — los textos se actualizan reactivamente en todos los componentes.

---

## 🐙 GitHub API Integration

```typescript
// src/components/sections/GithubSection.tsx

// API pública de GitHub (sin autenticación, límite 60 req/h)
GET https://api.github.com/users/Mendoza727
GET https://api.github.com/users/Mendoza727/repos?sort=updated&per_page=6

// API de contribuciones (sin autenticación, datos históricos)
GET https://github-contributions-api.jogruber.de/v4/Mendoza727?y=2024
GET https://github-contributions-api.jogruber.de/v4/Mendoza727?y=2025
GET https://github-contributions-api.jogruber.de/v4/Mendoza727?y=2026
```

El gráfico de contribuciones agrupa los días en semanas (columnas Dom→Sáb) y colorea cada celda según el nivel de actividad (`0-4`) con la misma paleta de GitHub.

---

## 🔍 SEO y Performance

### Metadata (`layout.tsx`)
```typescript
export const metadata: Metadata = {
  title: "Juan Camilo Mendoza | Full-Stack Developer",
  description: "...",
  keywords: ["fullstack developer colombia", "desarrollador web colombia", ...],
  openGraph: { type: "website", images: [...] },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
}
```

### JSON-LD Structured Data
El layout incluye un bloque `<script type="application/ld+json">` con datos de persona (Person schema) para mejorar el posicionamiento en Google.

### Performance
- **Turbopack** para HMR ultra-rápido en desarrollo
- **Dynamic import con `ssr: false`** para `HeroCanvas` (no ejecuta Three.js en servidor)
- **`once: true`** en ScrollTrigger para animaciones que solo se ejecutan una vez
- **Passive scroll listeners** en el FloatingActionButton

---

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js `>= 18`
- pnpm `>= 8`

```bash
# Clonar el repositorio
git clone https://github.com/Mendoza727/portafolio-v2.git
cd portafolio-v2

# Instalar dependencias
pnpm install

# Iniciar el servidor de desarrollo con Turbopack
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📜 Scripts Disponibles

| Script | Descripción |
|---|---|
| `pnpm dev` | Inicia el servidor de desarrollo con Turbopack |
| `pnpm build` | Genera el build de producción optimizado |
| `pnpm start` | Inicia el servidor de producción |
| `pnpm lint` | Ejecuta ESLint |
| `pnpm type-check` | Verifica tipos TypeScript sin compilar |

---

## 🔐 Variables de Entorno

Copia `.env.example` → `.env.local` y rellena tus valores:

```bash
cp .env.example .env.local
```

| Variable | Requerida | Descripción |
|---|---|---|
| `NEXT_PUBLIC_FORMSPREE_URL` | ✅ | Endpoint de Formspree para el formulario de contacto |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | ✅ | Site key de Google reCAPTCHA v2 |
| `NEXT_PUBLIC_GITHUB_USERNAME` | ✅ | Username de GitHub (para API de repos y contribuciones) |
| `NEXT_PUBLIC_GITHUB_CONTRIBUTIONS_API` | ⬜ | Base URL de la API de contribuciones (default: jogruber.de) |
| `NEXT_PUBLIC_OWNER_NAME` | ⬜ | Tu nombre completo |
| `NEXT_PUBLIC_OWNER_EMAIL` | ⬜ | Tu email de contacto |
| `NEXT_PUBLIC_OWNER_PHONE` | ⬜ | Teléfono en formato legible |
| `NEXT_PUBLIC_OWNER_PHONE_E164` | ⬜ | Teléfono en formato E.164 (`+57...`) |
| `NEXT_PUBLIC_OWNER_LOCATION` | ⬜ | Tu ciudad / país |
| `NEXT_PUBLIC_SOCIAL_GITHUB` | ⬜ | URL completa de tu perfil GitHub |
| `NEXT_PUBLIC_SOCIAL_LINKEDIN` | ⬜ | URL completa de tu perfil LinkedIn |
| `NEXT_PUBLIC_SOCIAL_TWITTER` | ⬜ | URL completa de tu perfil Twitter/X |

> [!NOTE]
> Todas las variables usan el prefijo `NEXT_PUBLIC_` porque son accedidas en el cliente (browser). `.env.local` está en `.gitignore` y **nunca se sube al repositorio**.

> [!CAUTION]
> La reCAPTCHA **secret key** (diferente al site key) NO debe ir aquí. Si en el futuro implementas verificación server-side, agrégala sin el prefijo `NEXT_PUBLIC_` en una API Route.

---

## 🌐 Deployment

### Vercel (recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

El proyecto está optimizado para Vercel con Next.js App Router. No se requiere configuración adicional.

### Docker (alternativo)

```bash
# Build
docker build -t portfolio .

# Run
docker run -p 3000:3000 portfolio
```

---

## 📁 Datos del Desarrollador

| Campo | Valor |
|---|---|
| **Nombre** | Juan Camilo Mendoza Villegas |
| **Alias** | Mendoza727 |
| **Rol** | Full-Stack Developer · AI & Automation |
| **Ubicación** | Colombia 🇨🇴 |
| **Email** | juancamilomendozavillegas14@gmail.com |
| **LinkedIn** | [juancamilomendoza-dev](https://www.linkedin.com/in/juancamilomendoza-dev/) |
| **GitHub** | [Mendoza727](https://github.com/Mendoza727) |

---

## 📄 Licencia

Este proyecto es de uso personal. El código fuente puede servir como referencia educativa, pero no está licenciado para uso comercial ni redistribución directa.

---

<div align="center">

Construido con ❤️ en Colombia 🇨🇴 · **Next.js · Three.js · GSAP · TypeScript**

</div>
