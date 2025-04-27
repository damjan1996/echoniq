#!/usr/bin/env python3
import os
import shutil
from pathlib import Path

# Hauptverzeichnis für das Projekt
PROJECT_DIR = r"C:\Users\damja\Development\Label"

# Definieren der Verzeichnisse und Dateien
def create_project_structure():
    # Hauptverzeichnis erstellen, falls es nicht existiert
    Path(PROJECT_DIR).mkdir(parents=True, exist_ok=True)

    # Verzeichnisse erstellen
    directories = [
        # Root-Verzeichnisse
        ".idea",
        "config",
        "docs",
        "public",
        "public/images",
        "public/fonts",
        "public/audio",
        "scripts",
        "src",
        "src/components",
        "src/components/common",
        "src/components/layout",
        "src/components/artists",
        "src/components/music",
        "src/components/studio",
        "src/components/providers",
        "src/components/ui",
        "src/hooks",
        "src/lib",
        "src/lib/brevo",
        "src/lib/supabase",
        "src/lib/analytics",
        "src/lib/social",
        "src/pages",
        "src/pages/api",
        "src/pages/api/contact",
        "src/pages/api/newsletter",
        "src/pages/api/artists",
        "src/pages/api/music",
        "src/pages/home",
        "src/pages/home/components",
        "src/pages/artists",
        "src/pages/artists/components",
        "src/pages/artists/[slug]",
        "src/pages/music",
        "src/pages/music/components",
        "src/pages/music/[slug]",
        "src/pages/studio",
        "src/pages/studio/components",
        "src/pages/blog",
        "src/pages/blog/components",
        "src/pages/blog/[slug]",
        "src/pages/blog/post",
        "src/pages/kontakt",
        "src/pages/kontakt/components",
        "src/pages/datenschutz",
        "src/pages/impressum",
        "src/pages/ueber-uns",
        "src/pages/ueber-uns/components",
        "src/styles",
        "src/types",
        "tests",
    ]

    # Dateien erstellen (ohne Inhalt)
    files = [
        # Root-Dateien
        ".eslintrc.js",
        ".gitignore",
        ".prettierrc",
        "next.config.js",
        "package.json",
        "pnpm-lock.yaml",
        "postcss.config.js",
        "README.md",
        "tailwind.config.js",
        "tsconfig.json",

        # Konfigurations-Dateien
        "config/analytics.ts",
        "config/brevo.ts",
        "config/menu.ts",
        "config/seo.ts",
        "config/supabase.ts",
        "config/theme.ts",
        "config/social.ts",

        # Dokumentationsdateien
        "docs/content-management.md",
        "docs/deployment.md",
        "docs/project-structure.md",

        # Public-Dateien
        "public/favicon.ico",
        "public/robots.txt",
        "public/sitemap.xml",

        # Script-Dateien
        "scripts/create_project.py",

        # Komponenten: Common
        "src/components/common/audio-player.tsx",
        "src/components/common/cta-button.tsx",
        "src/components/common/error-message.tsx",
        "src/components/common/image-with-fallback.tsx",
        "src/components/common/loading-spinner.tsx",
        "src/components/common/page-transition.tsx",
        "src/components/common/scroll-context.tsx",
        "src/components/common/section-title.tsx",
        "src/components/common/seo.tsx",

        # Komponenten: Layout
        "src/components/layout/cookie-banner.tsx",
        "src/components/layout/footer.tsx",
        "src/components/layout/header.tsx",
        "src/components/layout/logo.tsx",
        "src/components/layout/mega-menu.tsx",
        "src/components/layout/mobile-navigation.tsx",
        "src/components/layout/navigation.tsx",

        # Komponenten: Artists
        "src/components/artists/ArtistCard.tsx",
        "src/components/artists/ArtistBio.tsx",
        "src/components/artists/ArtistGallery.tsx",
        "src/components/artists/ArtistReleases.tsx",
        "src/components/artists/FeaturedArtist.tsx",

        # Komponenten: Music
        "src/components/music/AlbumCard.tsx",
        "src/components/music/ReleaseDetails.tsx",
        "src/components/music/TrackList.tsx",
        "src/components/music/MusicPlayer.tsx",
        "src/components/music/StreamingLinks.tsx",

        # Komponenten: Studio
        "src/components/studio/ServiceCTA.tsx",
        "src/components/studio/StudioGallery.tsx",
        "src/components/studio/PricingTable.tsx",
        "src/components/studio/BookingForm.tsx",

        # Komponenten: Providers
        "src/components/providers/AuthProvider.tsx",
        "src/components/providers/AnalyticsProvider.tsx",
        "src/components/providers/AudioProvider.tsx",

        # Komponenten: UI
        "src/components/ui/alert.tsx",
        "src/components/ui/badge.tsx",
        "src/components/ui/button.tsx",
        "src/components/ui/card.tsx",
        "src/components/ui/checkbox.tsx",
        "src/components/ui/container.tsx",
        "src/components/ui/dropdown.tsx",
        "src/components/ui/form.tsx",
        "src/components/ui/input.tsx",
        "src/components/ui/label.tsx",
        "src/components/ui/modal.tsx",
        "src/components/ui/select.tsx",
        "src/components/ui/tabs.tsx",
        "src/components/ui/textarea.tsx",

        # Komponenten: Root
        "src/components/AuthWrapper.tsx",

        # Hooks
        "src/hooks/use-analytics.ts",
        "src/hooks/use-form.ts",
        "src/hooks/use-media-query.ts",
        "src/hooks/use-scroll.ts",
        "src/hooks/use-supabase.ts",
        "src/hooks/use-audio-player.ts",
        "src/hooks/use-social-share.ts",

        # Lib: Brevo
        "src/lib/brevo/client.ts",
        "src/lib/brevo/types.ts",

        # Lib: Supabase
        "src/lib/supabase/admin.ts",
        "src/lib/supabase/client.ts",
        "src/lib/supabase/server.ts",
        "src/lib/supabase/types.ts",

        # Lib: Analytics
        "src/lib/analytics/google.ts",
        "src/lib/analytics/facebook.ts",
        "src/lib/analytics/index.ts",

        # Lib: Social
        "src/lib/social/meta.ts",
        "src/lib/social/share.ts",

        # Lib: Root
        "src/lib/analytics.ts",
        "src/lib/api.ts",
        "src/lib/constants.ts",
        "src/lib/utils.ts",
        "src/lib/validation.ts",

        # Pages: API
        "src/pages/api/contact/index.ts",
        "src/pages/api/newsletter/index.ts",
        "src/pages/api/artists/index.ts",
        "src/pages/api/music/index.ts",

        # Pages: Home
        "src/pages/home/components/Benefits.tsx",
        "src/pages/home/components/FeaturedArtists.tsx",
        "src/pages/home/components/CTAForm.tsx",
        "src/pages/home/components/Hero.tsx",
        "src/pages/home/components/index.page.tsx",
        "src/pages/home/components/LatestReleases.tsx",
        "src/pages/home/components/StudioIntro.tsx",
        "src/pages/home/index.page.tsx",

        # Pages: Artists
        "src/pages/artists/components/ArtistList.tsx",
        "src/pages/artists/components/Categories.tsx",
        "src/pages/artists/components/Hero.tsx",
        "src/pages/artists/components/index.page.tsx",
        "src/pages/artists/components/Filters.tsx",
        "src/pages/artists/[slug]/index.page.tsx",
        "src/pages/artists/index.page.tsx",

        # Pages: Music
        "src/pages/music/components/ReleaseList.tsx",
        "src/pages/music/components/Genres.tsx",
        "src/pages/music/components/Hero.tsx",
        "src/pages/music/components/index.page.tsx",
        "src/pages/music/components/Filters.tsx",
        "src/pages/music/[slug]/index.page.tsx",
        "src/pages/music/index.page.tsx",

        # Pages: Studio
        "src/pages/studio/components/Equipment.tsx",
        "src/pages/studio/components/Hero.tsx",
        "src/pages/studio/components/index.page.tsx",
        "src/pages/studio/components/Pricing.tsx",
        "src/pages/studio/components/Services.tsx",
        "src/pages/studio/index.page.tsx",

        # Pages: Blog
        "src/pages/blog/[slug]/index.page.tsx",
        "src/pages/blog/components/BlogList.tsx",
        "src/pages/blog/components/Categories.tsx",
        "src/pages/blog/components/Hero.tsx",
        "src/pages/blog/components/index.page.tsx",
        "src/pages/blog/components/Pagination.tsx",
        "src/pages/blog/components/PostCard.tsx",
        "src/pages/blog/components/Search.tsx",
        "src/pages/blog/components/Sidebar.tsx",
        "src/pages/blog/post/index.page.tsx",
        "src/pages/blog/post/PostComments.tsx",
        "src/pages/blog/post/PostContent.tsx",
        "src/pages/blog/post/PostHeader.tsx",
        "src/pages/blog/post/PostSidebar.tsx",
        "src/pages/blog/post/RelatedPosts.tsx",
        "src/pages/blog/index.page.tsx",

        # Pages: Kontakt
        "src/pages/kontakt/components/Hero.tsx",
        "src/pages/kontakt/components/index.page.tsx",
        "src/pages/kontakt/components/ContactForm.tsx",
        "src/pages/kontakt/components/StudioLocation.tsx",
        "src/pages/kontakt/index.page.tsx",

        # Pages: Über Uns
        "src/pages/ueber-uns/components/LabelHistory.tsx",
        "src/pages/ueber-uns/components/Hero.tsx",
        "src/pages/ueber-uns/components/index.page.tsx",
        "src/pages/ueber-uns/components/Mission.tsx",
        "src/pages/ueber-uns/components/TeamMembers.tsx",
        "src/pages/ueber-uns/components/Vision.tsx",
        "src/pages/ueber-uns/index.page.tsx",

        # Pages: Rechtliches
        "src/pages/datenschutz/index.page.tsx",
        "src/pages/impressum/index.page.tsx",

        # Pages: Root
        "src/pages/404.tsx",
        "src/pages/500.tsx",
        "src/pages/_app.tsx",
        "src/pages/_document.tsx",
        "src/pages/index.page.tsx",

        # Styles
        "src/styles/globals.css",
        "src/styles/tailwind.css",

        # Types
        "src/types/artists.ts",
        "src/types/blog.ts",
        "src/types/common.ts",
        "src/types/forms.ts",
        "src/types/index.ts",
        "src/types/music.ts",
        "src/types/studio.ts",

        # Tests
        "tests/setup.ts",
    ]

    # Erstellen der Verzeichnisse
    for directory in directories:
        os.makedirs(os.path.join(PROJECT_DIR, directory), exist_ok=True)
        print(f"Verzeichnis erstellt: {os.path.join(PROJECT_DIR, directory)}")

    # Erstellen der Dateien
    for file in files:
        Path(os.path.join(PROJECT_DIR, file)).touch()
        print(f"Datei erstellt: {os.path.join(PROJECT_DIR, file)}")

    # package.json mit echoniq-spezifischen Inhalten erstellen
    package_json = {
        "name": "echoniq-label-website",
        "version": "1.0.0",
        "private": True,
        "author": "echoniq",
        "description": "Website des echoniq Musik-Labels",
        "scripts": {
            "dev": "next dev",
            "build": "next build",
            "start": "next start",
            "lint": "next lint",
            "lint:fix": "next lint --fix",
            "format": "prettier --write .",
            "type-check": "tsc --noEmit",
            "prepare": "husky install",
            "test": "jest",
            "test:watch": "jest --watch",
            "analyze": "ANALYZE=true next build"
        },
        "dependencies": {
            "@hookform/resolvers": "^3.10.0",
            "@radix-ui/react-accordion": "^1.2.7",
            "@radix-ui/react-checkbox": "^1.2.2",
            "@radix-ui/react-dialog": "^1.1.10",
            "@radix-ui/react-dropdown-menu": "^2.1.10",
            "@radix-ui/react-label": "^2.1.4",
            "@radix-ui/react-navigation-menu": "^1.2.9",
            "@radix-ui/react-select": "^2.2.2",
            "@radix-ui/react-slot": "^1.2.0",
            "@radix-ui/react-tabs": "^1.1.7",
            "@radix-ui/react-toast": "^1.2.10",
            "@supabase/supabase-js": "^2.49.4",
            "class-variance-authority": "^0.7.1",
            "clsx": "^2.1.1",
            "framer-motion": "^11.18.2",
            "lucide-react": "^0.323.0",
            "next": "14.1.0",
            "next-seo": "^6.6.0",
            "react": "^18.3.1",
            "react-checkbox": "^0.1.3",
            "react-dom": "^18.3.1",
            "react-hook-form": "^7.55.0",
            "react-audio-player": "^0.17.0",
            "react-h5-audio-player": "^3.9.1",
            "wavesurfer.js": "^7.8.0",
            "tailwind-merge": "^2.6.0",
            "tailwindcss-animate": "^1.0.7",
            "zod": "^3.24.3"
        },
        "devDependencies": {
            "@commitlint/cli": "^18.6.1",
            "@commitlint/config-conventional": "^18.6.3",
            "@svgr/webpack": "^8.1.0",
            "@testing-library/jest-dom": "^6.6.3",
            "@testing-library/react": "^14.3.1",
            "@types/jest": "^29.5.14",
            "@types/node": "^20.17.30",
            "@types/react": "^18.3.20",
            "@types/react-dom": "^18.3.6",
            "@typescript-eslint/eslint-plugin": "^6.21.0",
            "@typescript-eslint/parser": "^6.21.0",
            "autoprefixer": "^10.4.21",
            "cssnano": "^7.0.6",
            "eslint": "^8.57.1",
            "eslint-config-next": "14.1.0",
            "eslint-config-prettier": "^9.1.0",
            "eslint-plugin-import": "^2.31.0",
            "eslint-plugin-jsx-a11y": "^6.10.2",
            "eslint-plugin-prettier": "^5.2.6",
            "eslint-plugin-react": "^7.37.5",
            "eslint-plugin-react-hooks": "^4.6.2",
            "husky": "^9.1.7",
            "jest": "^29.7.0",
            "jest-environment-jsdom": "^29.7.0",
            "lint-staged": "^15.5.1",
            "postcss": "^8.5.3",
            "prettier": "^3.5.3",
            "prettier-plugin-tailwindcss": "^0.5.14",
            "tailwindcss": "^3.4.17",
            "typescript": "^5.8.3"
        },
        "lint-staged": {
            "*.{js,jsx,ts,tsx}": [
                "eslint --fix",
                "prettier --write"
            ],
            "*.{json,css,md}": [
                "prettier --write"
            ]
        },
        "commitlint": {
            "extends": [
                "@commitlint/config-conventional"
            ]
        },
        "engines": {
            "node": ">=18.0.0",
            "pnpm": ">=8.0.0"
        }
    }

    import json
    with open(os.path.join(PROJECT_DIR, "package.json"), "w", encoding="utf-8") as f:
        json.dump(package_json, f, indent=4)

    print(f"package.json mit echoniq-spezifischen Inhalten erstellt")

if __name__ == "__main__":
    print(f"Erstelle Projektstruktur für echoniq Label-Website in {PROJECT_DIR}")
    create_project_structure()
    print("Projektstruktur erfolgreich erstellt!")