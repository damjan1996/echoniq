/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    poweredByHeader: false,

    // Configure image domains for next/image
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.echoniq.de',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: '**.supabase.co',
            },
        ],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60,
    },

    // Configure redirects
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ];
    },

    // Configure headers
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
            {
                source: '/api/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store, max-age=0',
                    },
                ],
            },
            {
                source: '/_next/static/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/fonts/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },

    // Webpack configuration
    webpack(config) {
        // SVG optimization
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },

    // Internationalization
    i18n: {
        locales: ['de', 'en'],
        defaultLocale: 'de',
    },

    // Enable experimental features
    experimental: {
        // Server Actions sind standardmäßig verfügbar, Option entfernt
    },

    // Diese Pfade aus dem Export ausschließen
    exportPathMap: async function(
      defaultPathMap,
      { dev, dir, outDir, distDir, buildId }
    ) {
        if (dev) {
            return defaultPathMap;
        }

        const paths = { ...defaultPathMap };

        // Entferne problematische Komponenten-Pfade
        const pathsToExclude = [
            '/blog/components',
            '/blog/components/Categories',
            '/blog/components/PostCard',
            '/blog/post',
            '/blog/post/PostSidebar',
            '/blog/post/editors/PostMetaEditor',
            '/music/components/ReleaseList',
            '/artists/components/Categories',
            '/home/components',
            '/kontakt/components',
            '/music/components',
            '/studio/components',
            '/ueber-uns/components',
            '/artists/components'
        ];

        // Alle problematischen Pfade entfernen
        for (const path of pathsToExclude) {
            if (paths[path]) delete paths[path];
            if (paths[`/de${path}`]) delete paths[`/de${path}`];
            if (paths[`/en${path}`]) delete paths[`/en${path}`];
        }

        return paths;
    },
};

module.exports = nextConfig;