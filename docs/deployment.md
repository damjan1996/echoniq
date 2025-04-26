# Deployment Guide für die echoniq Label-Website

Dieses Dokument beschreibt den Deployment-Prozess für die echoniq Label-Website, einschließlich der Einrichtung der Entwicklungsumgebung, der CI/CD-Pipeline und der Produktionsumgebung.

## Inhaltsverzeichnis

1. [Entwicklungsumgebung](#entwicklungsumgebung)
2. [Vorbereitung für das Deployment](#vorbereitung-für-das-deployment)
3. [Deployment-Optionen](#deployment-optionen)
    - [Vercel Deployment](#vercel-deployment)
    - [Netlify Deployment](#netlify-deployment)
    - [Self-Hosted Deployment](#self-hosted-deployment)
4. [Umgebungsvariablen](#umgebungsvariablen)
5. [CI/CD-Pipeline](#cicd-pipeline)
6. [Monitoring und Analytics](#monitoring-und-analytics)
7. [Backup und Disaster Recovery](#backup-und-disaster-recovery)
8. [SSL-Zertifikate](#ssl-zertifikate)
9. [Performance-Optimierung](#performance-optimierung)
10. [Troubleshooting](#troubleshooting)

## Entwicklungsumgebung

### Systemanforderungen

- Node.js v18.17.0 oder höher
- pnpm v8.6.0 oder höher
- Git

### Lokale Einrichtung

1. Repository klonen:
   ```bash
   git clone https://github.com/echoniq/label-website.git
   cd label-website
   ```

2. Abhängigkeiten installieren:
   ```bash
   pnpm install
   ```

3. Umgebungsvariablen einrichten:
    - Kopiere `.env.example` zu `.env.local`
    - Fülle die erforderlichen Umgebungsvariablen aus (siehe [Umgebungsvariablen](#umgebungsvariablen))

4. Entwicklungsserver starten:
   ```bash
   pnpm dev
   ```

5. Die Website ist nun unter `http://localhost:3000` erreichbar

### Builds erstellen und testen

Vor dem Deployment sollte ein Produktionsbuild erstellt und getestet werden:

```bash
pnpm build
pnpm start
```

## Vorbereitung für das Deployment

### Checkliste vor dem Deployment

1. Alle Tests durchführen:
   ```bash
   pnpm test
   ```

2. Lighthouse-Audit für Performance, Accessibility, SEO:
    - Öffne Chrome DevTools
    - Navigiere zum Lighthouse-Tab
    - Führe einen vollständigen Audit durch

3. Überprüfe Cross-Browser-Kompatibilität:
    - Chrome
    - Firefox
    - Safari
    - Edge

4. Mobile Responsiveness testen:
    - iPhone (verschiedene Größen)
    - Android-Geräte (verschiedene Größen)
    - Tablets

5. Überprüfe alle Umgebungsvariablen für die Produktionsumgebung

6. Überprüfe DNS-Einstellungen und SSL-Zertifikate

## Deployment-Optionen

### Vercel Deployment

Vercel ist die empfohlene Deployment-Plattform für die echoniq Label-Website.

#### Initiales Deployment mit Vercel

1. Erstelle ein Konto auf [vercel.com](https://vercel.com) (falls noch nicht vorhanden)
2. Installiere die Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Logge dich ein:
   ```bash
   vercel login
   ```
4. Führe das Deployment aus dem Projektverzeichnis aus:
   ```bash
   vercel
   ```
5. Folge den Anweisungen des Assistenten:
    - Wähle das entsprechende Team/Konto
    - Bestätige den Projektnamen
    - Gib an, ob es sich um eine Next.js-Anwendung handelt (Ja)
    - Lege den Build-Befehl fest (`pnpm build`)
    - Definiere den Output-Ordner (`.next`)

#### Konfiguration des Produktions-Deployments

1. Richte ein Git-Repository ein (GitHub, GitLab oder Bitbucket)
2. Verbinde das Repository mit deinem Vercel-Projekt
3. Konfiguriere die Deployment-Einstellungen:
    - Produktions-Branch (z.B. `main`)
    - Preview-Deployments für Pull Requests
    - Umgebungsvariablen

4. Domain-Konfiguration:
    - Füge die benutzerdefinierte Domain `echoniq.de` hinzu
    - Konfiguriere DNS-Einträge gemäß Vercel-Anweisungen
    - Aktiviere automatische SSL-Zertifikate

5. Team-Einstellungen:
    - Füge Team-Mitglieder hinzu
    - Setze Berechtigungen (Admin, Mitglied, etc.)

### Netlify Deployment

Alternativ kann die Website auch auf Netlify gehostet werden.

1. Erstelle ein Konto auf [netlify.com](https://netlify.com)
2. Klicke auf "New site from Git"
3. Wähle das Git-Repository aus
4. Konfiguriere die Build-Einstellungen:
    - Build-Befehl: `pnpm build`
    - Publish-Verzeichnis: `.next`
5. Konfiguriere die Umgebungsvariablen
6. Klicke auf "Deploy site"

### Self-Hosted Deployment

Für ein Self-Hosted-Deployment wird ein Linux-Server mit Node.js empfohlen.

#### Server-Voraussetzungen

- Ubuntu 20.04 LTS oder höher
- Node.js v18.17.0 oder höher
- Nginx als Reverse Proxy
- PM2 für Prozess-Management

#### Deployment-Schritte

1. Aktualisiere den Server:
   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

2. Installiere Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

3. Installiere PNPM:
   ```bash
   curl -fsSL https://get.pnpm.io/install.sh | sh -
   ```

4. Installiere PM2:
   ```bash
   npm install -g pm2
   ```

5. Klone das Repository:
   ```bash
   git clone https://github.com/echoniq/label-website.git /var/www/echoniq
   cd /var/www/echoniq
   ```

6. Installiere die Abhängigkeiten und erstelle den Build:
   ```bash
   pnpm install
   pnpm build
   ```

7. Konfiguriere PM2:
   Erstelle eine `ecosystem.config.js` Datei:
   ```javascript
   module.exports = {
     apps: [{
       name: "echoniq",
       script: "node_modules/next/dist/bin/next",
       args: "start",
       env: {
         NODE_ENV: "production",
         PORT: 3000
       }
     }]
   };
   ```

8. Starte die Anwendung mit PM2:
   ```bash
   pm2 start ecosystem.config.js
   ```

9. Konfiguriere Nginx als Reverse Proxy:
   ```nginx
   server {
       listen 80;
       server_name echoniq.de www.echoniq.de;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

10. Installiere Let's Encrypt für SSL:
    ```bash
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d echoniq.de -d www.echoniq.de
    ```

11. Automatische Deployment-Updates einrichten:
    ```bash
    # Erstelle ein Deployment-Skript
    cat > /var/www/deploy.sh << 'EOL'
    #!/bin/bash
    cd /var/www/echoniq
    git pull
    pnpm install
    pnpm build
    pm2 restart all
    EOL

    chmod +x /var/www/deploy.sh
    ```

## Umgebungsvariablen

Die folgenden Umgebungsvariablen müssen für das Deployment konfiguriert werden:

### Allgemeine Konfiguration
```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://echoniq.de
```

### Supabase Konfiguration
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### E-Mail und Newsletter (Brevo)
```
BREVO_API_KEY=your-brevo-api-key
BREVO_GENERAL_LIST_ID=your-general-list-id
BREVO_ARTIST_LIST_ID=your-artist-list-id
BREVO_RELEASES_LIST_ID=your-releases-list-id
BREVO_STUDIO_LIST_ID=your-studio-list-id
BREVO_WELCOME_TEMPLATE_ID=your-welcome-template-id
BREVO_CONTACT_TEMPLATE_ID=your-contact-template-id
BREVO_BOOKING_TEMPLATE_ID=your-booking-template-id
BREVO_RELEASE_TEMPLATE_ID=your-release-template-id
BREVO_DOUBLE_OPTIN_TEMPLATE_ID=your-double-optin-template-id
```

### Analytics und Tracking
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXX
```

### Soziale Medien
```
INSTAGRAM_USER_ID=your-instagram-user-id
INSTAGRAM_ACCESS_TOKEN=your-instagram-access-token
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
```

### Sicherheit und Verifizierung
```
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-google-verification-code
NEXT_PUBLIC_BING_VERIFICATION=your-bing-verification-code
NEXT_PUBLIC_FACEBOOK_VERIFICATION=your-facebook-verification-code
```

## CI/CD-Pipeline

### GitHub Actions

Eine CI/CD-Pipeline kann mit GitHub Actions eingerichtet werden. Erstelle eine Datei `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - uses: pnpm/action-setup@v2
        name: Install pnpm
        with:
          version: 8
          run_install: false
      
      - name: Get pnpm store directory
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV
      
      - uses: actions/cache@v3
        name: Setup pnpm cache
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run tests
        run: pnpm test
      
      - name: Build
        run: pnpm build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID}}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID}}
          working-directory: ./
          vercel-args: '--prod'
```

### Secrets konfigurieren

In den Repository-Einstellungen unter "Secrets and variables" > "Actions" die folgenden Secrets hinzufügen:

- `VERCEL_TOKEN`: API-Token von Vercel
- `VERCEL_ORG_ID`: Organisations-ID von Vercel
- `VERCEL_PROJECT_ID`: Projekt-ID von Vercel

## Monitoring und Analytics

### Uptime-Monitoring

Es wird empfohlen, einen Uptime-Monitoring-Dienst wie UptimeRobot oder Pingdom einzurichten, um die Verfügbarkeit der Website zu überwachen.

1. Erstelle ein Konto bei [UptimeRobot](https://uptimerobot.com/)
2. Füge einen neuen Monitor hinzu:
    - Monitor-Typ: HTTP(s)
    - Freundlicher Name: echoniq Website
    - URL: https://echoniq.de
    - Monitoring-Intervall: 5 Minuten
3. Konfiguriere Benachrichtigungen für Ausfälle

### Error-Tracking

Für das Error-Tracking wird Sentry empfohlen:

1. Registriere dich bei [Sentry](https://sentry.io/)
2. Erstelle ein neues Projekt für Next.js
3. Installiere Sentry in deinem Projekt:
   ```bash
   pnpm add @sentry/nextjs
   ```
4. Konfiguriere Sentry gemäß der Dokumentation in deiner Next.js-Anwendung

### Performance-Monitoring

Google Analytics und Vercel Analytics können für Performance-Monitoring verwendet werden:

1. Google Analytics ist bereits in der Website integriert
2. Aktiviere Vercel Analytics im Vercel-Dashboard:
    - Navigiere zu deinem Projekt
    - Gehe zu "Settings" > "Analytics"
    - Aktiviere "Vercel Analytics"

## Backup und Disaster Recovery

### Supabase Backups

Supabase erstellt automatisch tägliche Backups. Zusätzlich sollten manuelle Backups der Datenbank erstellt werden:

1. Navigiere zum Supabase-Dashboard
2. Gehe zu "Project Settings" > "Database"
3. Klicke auf "Backups" und dann auf "Create Backup"
4. Exportiere regelmäßig Daten im JSON-Format für wichtige Tabellen

### Code-Backup

Der Code wird in Git versioniert und ist sowohl auf GitHub als auch auf den lokalen Entwicklungsumgebungen gespeichert.

### Wiederherstellungsplan

Bei einem schwerwiegenden Ausfall:

1. Stelle die letzte funktionierende Version der Website wieder her:
   ```bash
   git checkout [last-working-commit]
   pnpm build
   vercel deploy --prod
   ```

2. Stelle bei Datenverlust die Supabase-Datenbank wieder her:
    - Navigiere zum Supabase-Dashboard
    - Gehe zu "Project Settings" > "Database" > "Backups"
    - Wähle das letzte funktionierende Backup und stelle es wieder her

## SSL-Zertifikate

### Vercel und Netlify

Vercel und Netlify stellen automatisch Let's Encrypt SSL-Zertifikate für deine Domains aus und erneuern diese automatisch.

### Self-Hosted (Certbot/Let's Encrypt)

Für self-hosted Deployments:

1. SSL-Zertifikate erneuern:
   ```bash
   sudo certbot renew
   ```

2. Automatische Erneuerung einrichten:
   ```bash
   echo "0 0,12 * * * root python -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew -q" | sudo tee -a /etc/crontab > /dev/null
   ```

## Performance-Optimierung

### Caching-Strategie

Die Website verwendet verschiedene Caching-Strategien:

1. **Browser-Caching**: Statische Assets werden mit entsprechenden Cache-Control-Headern versehen
2. **CDN-Caching**: Bei Vercel ist ein globales CDN integriert
3. **API-Caching**: Supabase-Abfragen werden mit SWR oder React Query clientseitig gecached
4. **Image-Optimierung**: Verwendung von Next.js Image-Komponente für optimierte Bildauslieferung

### Content-Delivery-Network (CDN)

Vercel bietet ein integriertes CDN. Bei Self-Hosted-Deployments sollte ein CDN wie Cloudflare oder AWS CloudFront hinzugefügt werden.

### Image-Optimierung

Für die manuelle Optimierung von Bildern vor dem Upload:

1. Verwende [TinyPNG](https://tinypng.com/) oder [Squoosh](https://squoosh.app/) für Bildkompression
2. Lade Bilder in den richtigen Dimensionen hoch (siehe Content-Management-Dokumentation)
3. Nutze moderne Formate wie WebP, wo möglich

## Troubleshooting

### Häufige Probleme

1. **Build-Fehler**:
    - Überprüfe die Commit-History auf kürzlich vorgenommene Änderungen
    - Überprüfe die Umgebungsvariablen auf Vollständigkeit
    - Überprüfe die Build-Logs auf spezifische Fehlermeldungen

2. **API-Verbindungsprobleme**:
    - Stelle sicher, dass die Supabase-Umgebungsvariablen korrekt sind
    - Überprüfe den Status von Supabase im [Statusportal](https://status.supabase.com/)
    - Überprüfe die RLS-Policies in der Supabase-Datenbank

3. **Darstellungsprobleme**:
    - Führe einen Hard-Refresh im Browser durch (Ctrl+F5)
    - Leere den Browser-Cache
    - Überprüfe die Konsole auf JavaScript-Fehler

### Support-Kontakte

Bei Problemen, die nicht selbst gelöst werden können, kontaktiere:

- **Technischer Support**: tech@echoniq.de
- **Supabase-Support**: support@supabase.io
- **Vercel-Support**: https://vercel.com/support

---

Bei Fragen oder Anpassungen an diesem Deployment-Guide kontaktiere das Entwicklungsteam.