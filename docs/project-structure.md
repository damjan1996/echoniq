# Projektstruktur der echoniq Label-Website

Dieses Dokument beschreibt die Verzeichnis- und Dateistruktur der echoniq Label-Website. Es dient als Referenz für Entwickler, die an dem Projekt arbeiten und sich mit dem Aufbau vertraut machen möchten.

## Übersicht

Die echoniq Label-Website ist eine Next.js-Anwendung mit TypeScript, die auf folgenden Haupttechnologien basiert:

- **Next.js 14.1.0**: React-Framework für serverseitiges Rendering und statische Seitengenerierung
- **React 18.3.1**: JavaScript-Bibliothek für Benutzeroberflächen
- **TypeScript**: Typisierter JavaScript-Superset
- **Tailwind CSS**: Utility-first CSS-Framework
- **Supabase**: Backend-as-a-Service für Datenbank und Authentifizierung
- **Framer Motion**: Animationsbibliothek für React
- **Brevo**: E-Mail-Marketing-Integration
- **SWR**: React Hooks für Datenabruf

## Hauptverzeichnisse

```
Label/
├── .github/               # GitHub-spezifische Dateien (Actions, Workflows)
├── .vscode/               # VSCode-Konfigurationen
├── config/                # Konfigurationsdateien
├── docs/                  # Projektdokumentation
├── public/                # Statische Dateien (Bilder, Schriften, Audio)
├── scripts/               # Hilfsskripte
├── src/                   # Quellcode der Anwendung
│   ├── components/        # React-Komponenten
│   ├── hooks/             # Benutzerdefinierte React Hooks
│   ├── lib/               # Hilfsfunktionen und externe Integrationen
│   ├── pages/             # Next.js-Seiten
│   ├── styles/            # CSS-Dateien
│   └── types/             # TypeScript-Typdefinitionen
└── tests/                 # Testdateien
```

## Detaillierte Struktur

### `.github/`

Enthält GitHub-spezifische Dateien:
- `workflows/`: GitHub Actions für CI/CD
    - `main.yml`: Workflow für Tests und Deployments

### `.vscode/`

Visual Studio Code-Konfigurationen:
- `settings.json`: Projektspezifische Einstellungen
- `extensions.json`: Empfohlene Extensions
- `launch.json`: Debugging-Konfigurationen

### `config/`

Konfigurationsdateien für verschiedene Teile der Anwendung:
- `analytics.ts`: Google Analytics und Facebook Pixel
- `brevo.ts`: E-Mail-Marketing-Konfiguration
- `menu.ts`: Navigation und Menüstruktur
- `seo.ts`: SEO-Einstellungen und Metadaten
- `social.ts`: Social-Media-Links und Sharing
- `supabase.ts`: Supabase-Datenbankverbindung und Tabellen
- `theme.ts`: Farben, Typografie und andere Designeinstellungen

### `docs/`

Projektdokumentation:
- `content-management.md`: Anleitung zur Content-Verwaltung
- `deployment.md`: Deployment-Anweisungen
- `project-structure.md`: Diese Dokumentation

### `public/`

Statische Dateien, die direkt vom Webserver bereitgestellt werden:
- `images/`: Bilder und Grafiken
    - `artists/`: Künstlerbilder
    - `releases/`: Album-Cover
    - `logo/`: Logodateien
    - `studio/`: Studiobilder
    - `blog/`: Blog-Bilder
- `fonts/`: Webfonts
- `audio/`: Audiodateien für Vorschauen
- `favicon.ico`: Website-Favicon
- `robots.txt`: Anweisungen für Suchmaschinen-Crawler
- `sitemap.xml`: XML-Sitemap für Suchmaschinen

### `scripts/`

Hilfsskripte für Entwicklung und Deployment:
- `create_project.py`: Skript zur Erstellung der Projektstruktur
- `seed_database.js`: Befüllt die Datenbank mit Testdaten
- `optimize_images.js`: Bildoptimierung für die Produktion

### `src/`

Der Hauptquellcode der Anwendung:

#### `components/`

React-Komponenten, geordnet nach Funktionalität und Bereich:

```
components/
├── common/               # Allgemeine Komponenten
│   ├── audio-player.tsx
│   ├── cta-button.tsx
│   ├── error-message.tsx
│   ├── image-with-fallback.tsx
│   ├── loading-spinner.tsx
│   ├── page-transition.tsx
│   ├── scroll-context.tsx
│   ├── section-title.tsx
│   └── seo.tsx
├── layout/               # Layout-Komponenten
│   ├── cookie-banner.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   ├── logo.tsx
│   ├── mega-menu.tsx
│   ├── mobile-navigation.tsx
│   └── navigation.tsx
├── artists/              # Künstler-bezogene Komponenten
│   ├── ArtistCard.tsx
│   ├── ArtistBio.tsx
│   ├── ArtistGallery.tsx
│   ├── ArtistReleases.tsx
│   └── FeaturedArtist.tsx
├── music/                # Musik-bezogene Komponenten
│   ├── AlbumCard.tsx
│   ├── ReleaseDetails.tsx
│   ├── TrackList.tsx
│   ├── MusicPlayer.tsx
│   └── StreamingLinks.tsx
├── studio/               # Studio-bezogene Komponenten
│   ├── ServiceCTA.tsx
│   ├── StudioGallery.tsx
│   ├── PricingTable.tsx
│   └── BookingForm.tsx
├── providers/            # Context-Provider
│   ├── AuthProvider.tsx
│   ├── AnalyticsProvider.tsx
│   └── AudioProvider.tsx
├── ui/                   # UI-Basiskomponenten
│   ├── alert.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── checkbox.tsx
│   ├── container.tsx
│   ├── dropdown.tsx
│   ├── form.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── modal.tsx
│   ├── select.tsx
│   ├── tabs.tsx
│   └── textarea.tsx
└── AuthWrapper.tsx       # Authentifizierungs-Wrapper
```

#### `hooks/`

Benutzerdefinierte React Hooks:

```
hooks/
├── use-analytics.ts       # Für Analytics-Tracking
├── use-form.ts            # Formularvalidierung und -verarbeitung
├── use-media-query.ts     # Responsive Design Helfer
├── use-scroll.ts          # Scroll-Position und -Events
├── use-supabase.ts        # Supabase-Client und -Abfragen
├── use-audio-player.ts    # Audio-Player-Funktionalität
└── use-social-share.ts    # Social-Media-Sharing
```

#### `lib/`

Hilfsfunktionen, Utilities und externe Integrationen:

```
lib/
├── brevo/                 # Brevo E-Mail-Marketing
│   ├── client.ts
│   └── types.ts
├── supabase/              # Supabase-Integration
│   ├── admin.ts
│   ├── client.ts
│   ├── server.ts
│   └── types.ts
├── analytics/             # Analytics-Integration
│   ├── google.ts
│   ├── facebook.ts
│   └── index.ts
├── social/                # Social-Media-Integration
│   ├── meta.ts
│   └── share.ts
├── analytics.ts           # Analytics-Hauptdatei
├── api.ts                 # API-Hilfsfunktionen
├── constants.ts           # Anwendungskonstanten
├── utils.ts               # Allgemeine Hilfsfunktionen
└── validation.ts          # Validierungsfunktionen
```

#### `pages/`

Next.js-Seitenkomponenten, die dem Dateibasiertes Routing von Next.js folgen:

```
pages/
├── api/                   # API-Endpunkte
│   ├── contact/           # Kontaktformular-Endpunkte
│   │   └── index.ts
│   ├── newsletter/        # Newsletter-Anmeldung
│   │   └── index.ts
│   ├── artists/           # Künstler-API
│   │   └── index.ts
│   └── music/             # Musik-API
│       └── index.ts
├── home/                  # Homepage-Komponenten
│   ├── components/
│   │   ├── Benefits.tsx
│   │   ├── FeaturedArtists.tsx
│   │   ├── CTAForm.tsx
│   │   ├── Hero.tsx
│   │   ├── index.tsx
│   │   ├── LatestReleases.tsx
│   │   └── StudioIntro.tsx
│   └── index.tsx
├── artists/               # Künstlerseiten
│   ├── components/
│   │   ├── ArtistList.tsx
│   │   ├── Categories.tsx
│   │   ├── Hero.tsx
│   │   ├── index.tsx
│   │   └── Filters.tsx
│   ├── [slug]/            # Dynamische Künstlerseiten
│   │   └── index.tsx
│   └── index.tsx
├── music/                 # Musikseiten
│   ├── components/
│   │   ├── ReleaseList.tsx
│   │   ├── Genres.tsx
│   │   ├── Hero.tsx
│   │   ├── index.tsx
│   │   └── Filters.tsx
│   ├── [slug]/            # Dynamische Release-Seiten
│   │   └── index.tsx
│   └── index.tsx
├── studio/                # Studioseiten
│   ├── components/
│   │   ├── Equipment.tsx
│   │   ├── Hero.tsx
│   │   ├── index.tsx
│   │   ├── Pricing.tsx
│   │   └── Services.tsx
│   └── index.tsx
├── blog/                  # Blogseiten
│   ├── components/
│   │   ├── BlogList.tsx
│   │   ├── Categories.tsx
│   │   ├── Hero.tsx
│   │   ├── index.tsx
│   │   ├── Pagination.tsx
│   │   ├── PostCard.tsx
│   │   ├── Search.tsx
│   │   └── Sidebar.tsx
│   ├── [slug]/            # Dynamische Blog-Post-Seiten
│   │   └── index.tsx
│   ├── post/              # Blog-Post-Komponenten
│   │   ├── index.tsx
│   │   ├── PostComments.tsx
│   │   ├── PostContent.tsx
│   │   ├── PostHeader.tsx
│   │   ├── PostSidebar.tsx
│   │   └── RelatedPosts.tsx
│   └── index.tsx
├── kontakt/               # Kontaktseite
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── index.tsx
│   │   ├── ContactForm.tsx
│   │   └── StudioLocation.tsx
│   └── index.tsx
├── ueber-uns/             # Über-uns-Seite
│   ├── components/
│   │   ├── LabelHistory.tsx
│   │   ├── Hero.tsx
│   │   ├── index.tsx
│   │   ├── Mission.tsx
│   │   ├── TeamMembers.tsx
│   │   └── Vision.tsx
│   └── index.tsx
├── datenschutz/           # Datenschutzseite
│   └── index.tsx
├── impressum/             # Impressumsseite
│   └── index.tsx
├── 404.tsx                # 404-Fehlerseite
├── 500.tsx                # 500-Fehlerseite
├── _app.tsx               # Next.js App-Komponente
├── _document.tsx          # Next.js Document-Komponente
└── index.tsx              # Hauptindex-Seite (Redirect zu /home)
```

#### `styles/`

CSS-Dateien:

```
styles/
├── globals.css           # Globale Stile
└── tailwind.css          # Tailwind-Stile und -Konfiguration
```

#### `types/`

TypeScript-Typdefinitionen, gegliedert nach Funktionsbereichen:

```
types/
├── artists.ts            # Künstler-Typen
├── blog.ts               # Blog-Typen
├── common.ts             # Allgemeine Typen
├── forms.ts              # Formular-Typen
├── index.ts              # Export aller Typen
├── music.ts              # Musik- und Release-Typen
└── studio.ts             # Studio-bezogene Typen
```

### `tests/`

Testdateien:

```
tests/
├── components/           # Komponententests
├── hooks/                # Hook-Tests
├── pages/                # Seitentests
├── api/                  # API-Tests
├── e2e/                  # End-to-End-Tests
├── unit/                 # Unit-Tests
├── integration/          # Integrationstests
├── mocks/                # Mock-Daten für Tests
└── setup.ts              # Test-Setup-Datei
```

## Konfigurationsdateien im Root-Verzeichnis

```
Label/
├── .eslintrc.js          # ESLint-Konfiguration
├── .gitignore            # Git-Ignore-Datei
├── .prettierrc           # Prettier-Konfiguration
├── next.config.js        # Next.js-Konfiguration
├── package.json          # NPM-Paketdatei
├── pnpm-lock.yaml        # PNPM-Lockdatei
├── postcss.config.js     # PostCSS-Konfiguration
├── README.md             # Projekt-README
├── tailwind.config.js    # Tailwind-Konfiguration
└── tsconfig.json         # TypeScript-Konfiguration
```

## Wichtige Konventionen

### Namenskonventionen

- **Komponenten**: PascalCase (z.B. `ArtistCard.tsx`)
- **Utilities und Hooks**: camelCase (z.B. `useAudioPlayer.ts`)
- **Seiten**: kebab-case für URLs, aber Dateien in camelCase oder PascalCase
- **CSS-Klassen**: kebab-case gemäß Tailwind-Konventionen

### Importkonventionen

- Absolute Imports werden über die `tsconfig.json` konfiguriert:
  ```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      }
    }
  }
  ```

Beispiel:
```typescript
// Absoluter Import
import { Button } from '@/components/ui/button';

// Relativer Import (für enge Kopplung)
import { ArtistBio } from './ArtistBio';
```

### Komponenten-Struktur

Für größere Komponenten wird folgende Struktur empfohlen:

```typescript
// Imports
import React from 'react';
import { SomeComponent } from '@/components/ui/some-component';

// Types
interface ComponentProps {
  // Props definition
}

// Komponente
export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Hooks, State, etc.
  
  // Helper functions
  
  // JSX
  return (
    <div>
      {/* Component content */}
    </div>
  );
};

// Optional: Standardwerte
ComponentName.defaultProps = {
  // Default props
};
```

## Datenfluss

Die Anwendung verwendet folgende Strategien für den Datenfluss:

1. **Server-Side Rendering (SSR)**: Für SEO-relevante Seiten mit `getServerSideProps`
2. **Static Site Generation (SSG)**: Für statische Seiten mit `getStaticProps` und `getStaticPaths`
3. **Client-Side Fetching**: Für dynamische Daten mit SWR oder React Query
4. **Context API**: Für globalen Zustand wie Auth, Analytics und Audio-Player

Typisches Datenflussmuster:

```
API/Supabase → getServerSideProps/getStaticProps → Page Component → Child Components
```

Oder für clientseitige Daten:

```
API/Supabase ← SWR/React Query ← React Component
```

## Entwicklungsprozess

### Neue Komponente erstellen

1. Identifiziere die richtige Kategorie im `components/`-Verzeichnis
2. Erstelle die Komponente mit TypeScript-Typen und JSX
3. Exportiere die Komponente als benannte Export oder Default-Export
4. Implementiere Styling mit Tailwind-CSS-Klassen
5. Erstelle bei Bedarf Tests in `tests/components/`

### Neue Seite erstellen

1. Erstelle eine neue Datei im `pages/`-Verzeichnis gemäß Next.js-Routing
2. Implementiere die erforderlichen Datenabruf-Methoden (`getServerSideProps`, `getStaticProps`)
3. Erstelle bei Bedarf Unterkomponenten im `components/`-Verzeichnis
4. Füge SEO-Metadaten mit der `SEO`-Komponente hinzu
5. Aktualisiere bei Bedarf die Sitemap und Navigation

### Supabase-Integration

Die Anwendung verwendet Supabase für:
- Datenbank (PostgreSQL)
- Authentifizierung
- Speicher für Mediendateien

Der Zugriff erfolgt über:
- `lib/supabase/client.ts`: Client-Side Zugriff
- `lib/supabase/server.ts`: Server-Side Zugriff
- `lib/supabase/admin.ts`: Admin-Zugriff für privilegierte Operationen

## Deployment

Siehe die ausführliche Dokumentation in `docs/deployment.md` für Informationen zum Deployment-Prozess.

## Weitere Ressourcen

- [Next.js Dokumentation](https://nextjs.org/docs)
- [Supabase Dokumentation](https://supabase.io/docs)
- [Tailwind CSS Dokumentation](https://tailwindcss.com/docs)
- [TypeScript Dokumentation](https://www.typescriptlang.org/docs)
- [Framer Motion Dokumentation](https://www.framer.com/motion/)
- [Brevo Dokumentation](https://developers.brevo.com/)

---

Bei Fragen zur Projektstruktur wende dich an das Entwicklungsteam oder konsultiere die entsprechenden Dokumentationen der verwendeten Technologien.