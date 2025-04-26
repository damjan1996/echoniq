# Content Management für echoniq Label-Website

Dieses Dokument beschreibt die verschiedenen Möglichkeiten, Inhalte auf der echoniq Label-Website zu verwalten und zu aktualisieren.

## Inhaltsübersicht

1. [Supabase CMS](#supabase-cms)
2. [Künstlerverwaltung](#künstlerverwaltung)
3. [Musikverwaltung](#musikverwaltung)
4. [Blog-Management](#blog-management)
5. [Studio-Informationen](#studio-informationen)
6. [Mediendateien](#mediendateien)
7. [SEO & Metadaten](#seo--metadaten)
8. [Berechtigungen & Rollen](#berechtigungen--rollen)

## Supabase CMS

Die echoniq Label-Website verwendet Supabase als Backend und Content Management System. Alle Inhalte werden in der Supabase-Datenbank gespeichert und über die Supabase API abgerufen.

### Zugriff auf das Supabase Dashboard

1. Besuche [app.supabase.io](https://app.supabase.io) und melde dich mit deinen Zugangsdaten an
2. Wähle das "echoniq" Projekt aus der Projektliste
3. Du gelangst zum Projekt-Dashboard, von wo aus du alle Datenbanktabellen, Authentifizierungseinstellungen und Speicher-Buckets verwalten kannst

### Datenbanktabellen

Die folgenden Haupttabellen sind für die Content-Verwaltung relevant:

- `artists` - Künstlerprofile
- `releases` - Musik-Veröffentlichungen (Alben, EPs, Singles)
- `tracks` - Einzelne Tracks innerhalb einer Veröffentlichung
- `blog_posts` - Blog-Artikel
- `blog_categories` - Kategorien für Blog-Artikel
- `studio_services` - Studio-Dienstleistungen und Preise
- `studio_equipment` - Studiausrüstung und Geräteliste

## Künstlerverwaltung

### Neuen Künstler hinzufügen

1. Navigiere im Supabase Dashboard zur `artists` Tabelle
2. Klicke auf "Neuen Eintrag hinzufügen"
3. Fülle die folgenden Pflichtfelder aus:
    - `name`: Name des Künstlers
    - `slug`: URL-freundliche Version des Namens (z.B. "grey" für "Grey")
    - `bio`: Künstlerbiografie (unterstützt Markdown-Formatierung)
    - `image`: Pfad zum Künstlerbild im Storage (siehe [Mediendateien](#mediendateien))
4. Optionale Felder:
    - `featured`: Auf `true` setzen, um den Künstler auf der Startseite zu präsentieren
    - `social_links`: JSON-Objekt mit sozialen Medien Links, in diesem Format:
      ```json
      {
        "instagram": "https://instagram.com/kuenstlername",
        "spotify": "https://open.spotify.com/artist/...",
        "soundcloud": "https://soundcloud.com/kuenstlername"
      }
      ```
    - `genres`: Array von Genre-Tags, z.B. `["Techno", "House", "Ambient"]`

### Künstler bearbeiten oder löschen

1. Suche den entsprechenden Künstler in der `artists` Tabelle
2. Klicke auf die Zeile, um die Bearbeitungsansicht zu öffnen
3. Aktualisiere die gewünschten Felder
4. Klicke auf "Speichern", um die Änderungen zu übernehmen
5. Um einen Künstler zu löschen, klicke auf "Löschen" in der Bearbeitungsansicht

**Wichtig**: Das Löschen eines Künstlers entfernt auch alle zugehörigen Releases und Tracks!

## Musikverwaltung

### Neue Veröffentlichung (Release) hinzufügen

1. Navigiere zur `releases` Tabelle
2. Klicke auf "Neuen Eintrag hinzufügen"
3. Fülle die folgenden Pflichtfelder aus:
    - `title`: Titel der Veröffentlichung
    - `slug`: URL-freundliche Version des Titels
    - `artist_id`: ID des zugehörigen Künstlers (aus der `artists` Tabelle)
    - `release_date`: Veröffentlichungsdatum
    - `cover_image`: Pfad zum Cover-Bild im Storage
    - `type`: Art der Veröffentlichung (`album`, `ep` oder `single`)
4. Optionale Felder:
    - `featured`: Auf `true` setzen, um die Release auf der Startseite zu präsentieren
    - `streaming_links`: JSON-Objekt mit Links zu Streaming-Plattformen:
      ```json
      {
        "spotify": "https://open.spotify.com/album/...",
        "apple_music": "https://music.apple.com/album/...",
        "soundcloud": "https://soundcloud.com/echoniq/sets/..."
      }
      ```

### Tracks zu einer Veröffentlichung hinzufügen

1. Navigiere zur `tracks` Tabelle
2. Klicke auf "Neuen Eintrag hinzufügen"
3. Fülle die folgenden Pflichtfelder aus:
    - `title`: Titel des Tracks
    - `release_id`: ID der zugehörigen Veröffentlichung
    - `track_number`: Position des Tracks in der Veröffentlichung
    - `duration`: Länge des Tracks in Sekunden
4. Optionale Felder:
    - `audio_url`: Link zur Audiodatei im Storage für Vorschau oder vollständigen Track
    - `is_preview`: Auf `true` setzen, wenn es sich um eine kurze Vorschau handelt

### Veröffentlichungen und Tracks verwalten

- Um bestehende Veröffentlichungen oder Tracks zu bearbeiten, navigiere zur entsprechenden Tabelle und wähle den zu bearbeitenden Eintrag aus
- Aktualisiere die gewünschten Felder und speichere die Änderungen
- Zum Löschen klicke auf "Löschen" in der Bearbeitungsansicht

## Blog-Management

### Neuen Blog-Artikel erstellen

1. Navigiere zur `blog_posts` Tabelle
2. Klicke auf "Neuen Eintrag hinzufügen"
3. Fülle die folgenden Pflichtfelder aus:
    - `title`: Titel des Artikels
    - `slug`: URL-freundliche Version des Titels
    - `excerpt`: Kurze Zusammenfassung oder Teaser
    - `content`: Vollständiger Artikelinhalt (unterstützt Markdown-Formatierung)
    - `author_id`: ID des Autors (aus der `users` Tabelle)
    - `status`: Status des Artikels (`draft` oder `published`)
4. Optionale Felder:
    - `featured_image`: Pfad zum Hauptbild im Storage
    - `published_at`: Veröffentlichungsdatum und -zeit
    - `category_ids`: Array von Kategorie-IDs aus der `blog_categories` Tabelle
    - `tags`: Array von Tag-Strings, z.B. `["musik", "release", "interview"]`

### Blog-Kategorien verwalten

1. Navigiere zur `blog_categories` Tabelle
2. Füge neue Kategorien hinzu oder bearbeite bestehende Kategorien
3. Jede Kategorie benötigt:
    - `name`: Name der Kategorie
    - `slug`: URL-freundliche Version des Namens
    - `description`: Kurze Beschreibung der Kategorie (optional)

## Studio-Informationen

### Studio-Services verwalten

1. Navigiere zur `studio_services` Tabelle
2. Füge neue Dienstleistungen hinzu oder bearbeite bestehende
3. Jeder Service benötigt:
    - `name`: Name des Services (z.B. "Mixing & Mastering")
    - `description`: Detaillierte Beschreibung
    - `price`: Preis (kann ein Festpreis oder ein Preisbereich sein)
    - `duration`: Ungefähre Dauer (z.B. "2-3 Stunden" oder "1 Tag")
4. Optionales Feld:
    - `featured`: Auf `true` setzen, um den Service hervorzuheben

### Studioausrüstung verwalten

1. Navigiere zur `studio_equipment` Tabelle
2. Füge neue Ausrüstungsgegenstände hinzu oder bearbeite bestehende
3. Jedes Equipment-Item benötigt:
    - `name`: Name des Geräts
    - `category`: Kategorie (z.B. "Mikrofone", "Instrumente", "Software")
    - `description`: Detaillierte Beschreibung oder technische Spezifikationen
4. Optionales Feld:
    - `image`: Pfad zum Bild der Ausrüstung im Storage

## Mediendateien

Alle Mediendateien (Bilder, Audio, etc.) werden in Supabase Storage Buckets gespeichert.

### Mediendateien hochladen

1. Navigiere im Supabase Dashboard zum "Storage" Bereich
2. Wähle den entsprechenden Bucket aus:
    - `artist-images`: Künstlerfotos
    - `release-covers`: Cover-Artwork für Releases
    - `audio-files`: Vorschau- und vollständige Audio-Tracks
    - `blog-images`: Bilder für Blog-Artikel
    - `studio-images`: Bilder des Studios und der Ausrüstung
    - `gallery-images`: Allgemeine Galeriebilder
3. Klicke auf "Upload" und wähle die hochzuladenden Dateien aus
4. Nach dem Upload kannst du die Dateipfade kopieren und in den entsprechenden Datenbanktabellen verwenden

### Dateiformate und Größen

- **Bilder**: Verwende JPG oder PNG mit optimaler Kompression
    - Künstlerbilder: 800x800px (quadratisch)
    - Release-Covers: 1400x1400px (quadratisch)
    - Blog-Bilder: 1200x630px (16:9 Verhältnis)
    - Studio-Bilder: Bis zu 1920px breit, Höhe variabel
- **Audio**:
    - Vorschau-Tracks: MP3, 128kbps, max. 30 Sekunden
    - Vollständige Tracks: MP3, 320kbps

## SEO & Metadaten

Die SEO-Einstellungen für die Website werden in der Datei `config/seo.ts` definiert und können direkt im Code bearbeitet werden.

Für individuelle Seiten werden die SEO-Metadaten aus den entsprechenden Datenbanktabellen gelesen:

- Künstlerseiten: Verwende das `name` und `bio` Feld aus der `artists` Tabelle
- Release-Seiten: Verwende das `title` Feld aus der `releases` Tabelle
- Blog-Artikel: Verwende das `title` und `excerpt` Feld aus der `blog_posts` Tabelle

## Berechtigungen & Rollen

Die Website verwendet Supabase Auth für die Authentifizierung und Autorisierung. Es gibt drei Hauptrollen:

1. **Administrator**: Vollständiger Zugriff auf alle Inhalte und Einstellungen
2. **Künstler**: Kann eigene Künstlerprofile und zugehörige Releases verwalten
3. **Redakteur**: Kann Blog-Artikel erstellen und bearbeiten

### Benutzer und Rollen verwalten

1. Navigiere im Supabase Dashboard zum "Authentication" Bereich
2. Unter "Users" findest du alle registrierten Benutzer
3. Klicke auf einen Benutzer, um Details anzuzeigen oder zu bearbeiten
4. Die Rolle eines Benutzers ist im `role` Feld in der `users` Tabelle gespeichert

### Neue Benutzer hinzufügen

1. Gehe zu "Authentication" > "Users" und klicke auf "Invite User"
2. Gib die E-Mail-Adresse des neuen Benutzers ein
3. Nach der Registrierung kannst du in der `users` Tabelle die entsprechende Rolle zuweisen

---

Bei Fragen zur Content-Verwaltung oder bei Problemen kontaktiere bitte das Entwicklungsteam oder konsultiere die API-Dokumentation für weitere Details zu den Datenstrukturen.