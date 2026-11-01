# ⚡ NAVEEN KUMAR | SENIOR FULL STACK DEVELOPER & ARCHITECT

> **Engineering Scalable, Production-Grade Digital Experiences with Modern Full-Stack Technologies**  
> 🚀 React.js | Next.js | Node.js | Angular 21 | TypeScript | WebGL/OGL | Scalable Cloud Systems

---

## 🌌 PORTFOLIO OVERVIEW

A **production-grade portfolio** showcasing advanced full-stack engineering, combining modular architecture, interactive WebGL2 graphics, fluid typography, and sub-second load times.

- **Framework:** Modern **Angular 21** standalone component architecture with fine-grained reactivity (Signals)
- **Visual & 3D Engineering:** Custom WebGL2 shaders via **OGL**, fluid particles, and **GSAP** timelines
- **Performance:** `@defer` block lazy loading, optimized bundle splitting, and SSR compatibility
- **Design System:** Custom glassmorphism, responsive Tailwind CSS v4, dark/light theme persistence
- **Privacy & Security:** Complete GDPR cookie consent workflow and hCaptcha integration

---

## 🏛️ COMPONENT ARCHITECTURE & INVENTORY

Below is the complete inventory of components in the codebase, detailing which components are actively in use, where they mount, and which components are currently dormant or kept for reference.

### 🟢 Active Components (In Production Use)

| Component | Selector | File Location | Mounted In | Description & Features |
|:---|:---|:---|:---|:---|
| **`HeroComponent`** | `app-hero` | `src/app/components/hero.component.ts` | `HomePageComponent` | Above-the-fold hero with typewriter matrix, cycling roles, call-to-action buttons, and the 3D crystalized ball. |
| **`CrystalizedBallComponent`** | `app-crystalized-ball` | `src/app/components/crystalized-ball.component.ts` | `HeroComponent` | High-performance WebGL2 crystalized energy ball powered by OGL. Features 18,000 rising particles, electric braided strands, interactive cursor heat/swirl, click shockwaves, and theme adaptation. Default preset: `aurora` (`#5CFFC8`). |
| **`GalaxyComponent`** | `app-galaxy` | `src/app/components/Gallaxy.component.ts` | `HeroComponent` | Ambient WebGL particle starfield canvas acting as the spatial background of the Hero section. |
| **`StorylineComponent`** | `app-storyline` | `src/app/components/storyline.component.ts` | `HeroComponent` | Background narrative vector SVG line connecting the hero section to down-page content. |
| **`NavbarComponent`** | `app-navbar` | `src/app/components/navbar.component.ts` | `HomePageComponent` | Floating frosted-glass navigation bar with smooth anchor links and theme toggle. |
| **`AboutComponent`** | `app-about` | `src/app/components/about.component.ts` | `HomePageComponent` | Core engineering biography, technical credentials, metrics, and architecture principles. Deferred on idle/viewport. |
| **`SkillsComponent`** | `app-skills` | `src/app/components/skills.component.ts` | `HomePageComponent` | Categorized technical competencies: Frontend, Backend, Databases, Cloud & DevOps, and Tools. |
| **`ProjectsComponent`** | `app-projects` | `src/app/components/projects.component.ts` | `HomePageComponent` | Production-grade MERN & Next.js project cards with live demos, tech stack tags, and GitHub repo links. |
| **`ExperienceComponent`** | `app-experience` | `src/app/components/experience.component.ts` | `HomePageComponent` | Career timeline detailing roles, quantifiable achievements, and an interactive ASCII ripple wave background. |
| **`AsciiRippleComponent`** | `app-ascii-ripple` | `src/app/components/ascii-ripple.component.ts` | `ExperienceComponent` | Canvas-based wave simulation rendering dynamic ASCII glyph ripples under cursor motion. |
| **`AcademicActivityComponent`** | `app-academic-activity` | `src/app/components/academic-activity.component.ts` | `HomePageComponent` | Education background, certifications, and academic achievements. |
| **`ContactComponent`** | `app-contact` | `src/app/components/contact.component.ts` | `HomePageComponent` | Contact channels with hCaptcha-verified form, direct email, WhatsApp links, and toast notifications. |
| **`FooterComponent`** | `app-footer` | `src/app/components/footer.component.ts` | `HomePageComponent` | Footer with legal notices, quick navigation, social links, and live indicator. |
| **`DownloadResumeBtnComponent`** | `app-download-resume` | `src/app/components/download-resume.component.ts` | `HeroComponent` | Resume download button with link tracking and analytics telemetry. |
| **`CursorComponent`** | `app-cursor` | `src/app/components/cursor.component.ts` | `App` (`main.ts`) | Custom fluid animated cursor with magnetic attraction physics. |
| **`LoaderComponent`** | `app-loader` | `src/app/components/loader.component.ts` | `App` (`main.ts`) | Initial loading screen with smooth GSAP reveal animation. |
| **`BackToTopComponent`** | `app-back-to-top` | `src/app/components/back-to-top.component.ts` | `App` (`main.ts`) | Floating button tracking scroll depth to return to the top smoothly. |
| **`CookieBannerComponent`** | `app-cookie-banner` | `src/app/components/cookie-banner.component.ts` | `App` (`main.ts`) | GDPR-compliant cookie consent notification banner. |
| **`CookiePreferencesModalComponent`** | `app-cookie-preferences-modal` | `src/app/components/cookie-preferences-modal.component.ts` | `App` (`main.ts`) | Granular cookie consent category preferences dialog. |
| **`CookieSettingsButtonComponent`** | `app-cookie-settings-button` | `src/app/components/cookie-settings-button.component.ts` | `App` (`main.ts`) | Persistent lower-corner gear icon to reopen privacy preferences. |

---

### 🟡 / 🔵 Dormant & Reference Components (Not in Active View Hierarchy)

| File | Status | Notes |
|:---|:---|:---|
| **`src/app/components/orb.component.ts`** (`OrbComponent`, `<app-orb>`) | 🟡 **Superseded / Dormant** | Previous WebGL iridescent sphere originally used in the Hero section. Superseded by `CrystalizedBallComponent` for richer particle physics and interactivity. Retained in the codebase as an alternate shader demonstration. |
| **`src/app/components/CrystalizedBall.tsx`** | 🔵 **Reference (React)** | Cross-framework source file of the React Bits component for reference. The production build in this application runs the native Angular standalone component [crystalized-ball.component.ts](file:///d:/Web%20Development/Resume/Naveen%20Portfolio/Real%20Portfolio%20Website%28Live%29/src/app/components/crystalized-ball.component.ts). |

---

## 🗺️ PAGES & DIRECTIVES

### Pages (`src/app/pages/`)
- **`HomePageComponent` (`src/app/pages/home-page.component.ts`)**: Main portfolio single-page application at route `/`. Uses Angular `@defer` blocks to asynchronously load below-the-fold sections on viewport entry.
- **`LocalLandingPageComponent` (`src/app/pages/local-landing-page.component.ts`)**: Dynamic programmatic SEO landing page for targeted local queries (`/hire/:slug`).

### Directives (`src/app/directives/`)
- **`MagneticDirective` (`src/app/directives/magnetic.directive.ts` — `appMagnetic`)**: Applies magnetic spring cursor physics to interactive buttons and icon elements.

### Services (`src/app/services/`)
- **`ThemeService`**: Manages light/dark mode signals and local storage persistence.
- **`SeoService`**: Injects meta tags, canonical URLs, and OpenGraph descriptors dynamically.
- **`CookieConsentService`**: Handles privacy categories (essential, analytics, marketing) and consent state streams.
- **`LinkTrackingService`**: Tracks outbound clicks, social link interactions, and resume downloads.
- **`OffPageSeoService`**: Manages JSON-LD schema markup, BreadcrumbList, and Person identity graphs.
- **`ScriptLoaderService`**: Dynamically loads third-party scripts (e.g. Google Analytics) conditioned on user consent.

---

## 🛠️ TECHNOLOGICAL ARSENAL

### Core & Framework
- **Angular 21** — Standalone Components, Signal-based reactivity, `@defer` template blocks
- **TypeScript 5.9** — Type-safe architecture across shaders, components, and data models
- **RxJS 7.8** — Reactive state streams

### 3D & Creative Coding
- **OGL 1.0** — High-performance, lightweight WebGL2 rendering library for `CrystalizedBall` and `Galaxy` shaders
- **GSAP 3.15** — Scroll-triggered entrances, typewriter sequencers, and parallax transforms
- **Lenis 1.3** — Smooth momentum scrolling with hardware-accelerated inertia

### Styling & UI
- **Tailwind CSS v4** — Utility-first styling with custom glassmorphism and keyframe animations
- **Angular Material 21** — Accessible iconography and form elements

---

## 💻 LOCAL DEVELOPMENT

### Prerequisites
- Node.js v18+ 
- npm or yarn

### Quick Start
```bash
# Clone the repository
git clone https://github.com/Naveen-Kumar48/Naveen-Kumar-Portfolio.git
cd "Naveen-Kumar-Portfolio"

# Install dependencies
npm install

# Start development server
npm run dev
# Running on http://localhost:3000
```

### Production Build & Verification
```bash
# Production bundle build
npm run build

# Run linter
npm run lint

# Run Playwright E2E smoke tests
cd e2e-playwright
npm run test
```

---

## 🚀 LIVE DEPLOYMENT

- **Live URL:** [naveenweb.site](https://naveenweb.site/)
- **Repository:** [GitHub: Naveen-Kumar48](https://github.com/Naveen-Kumar48)

---

## 📜 LICENSE

Open source for educational and portfolio reference purposes.

-------------------------------------------------------------------------------------------
Made With ❤️ By **Naveen Kumar**
