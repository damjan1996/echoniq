# echoniq Label Website

Official website for echoniq, a music label and studio focused on electronic, ambient, and fusion music.

## 🚀 Features

- Modern, responsive design with dark theme
- Dynamic artist and music release pages
- Integrated audio player for music previews
- Studio booking functionality
- Blog and news section
- Contact forms and newsletter subscription
- SEO optimization

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Supabase](https://supabase.io/)
- **Email**: [Brevo (formerly Sendinblue)](https://www.brevo.com/)
- **Audio**: [wavesurfer.js](https://wavesurfer-js.org/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://github.com/colinhacks/zod)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## 📋 Getting Started

### Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [PNPM 8+](https://pnpm.io/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/echoniq-label.git
   cd echoniq-label
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Then edit .env.local with your credentials
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

The following environment variables are required:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Brevo (Email)
BREVO_API_KEY=your-brevo-api-key

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## 📂 Project Structure

```
echoniq-label/
├── config/             # Configuration files
├── docs/               # Documentation 
├── public/             # Static assets
├── scripts/            # Build and setup scripts
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and libraries
│   ├── pages/          # Next.js pages
│   ├── styles/         # Global styles and Tailwind config
│   └── types/          # TypeScript types
├── tests/              # Test files
├── .env.example        # Example environment variables
├── next.config.js      # Next.js configuration
└── package.json        # Project dependencies and scripts
```

## 💻 Development

### Commands

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run tests

### Code Style

This project uses:
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io/) for code formatting
- [Husky](https://typicode.github.io/husky) for Git hooks
- [lint-staged](https://github.com/okonet/lint-staged) for staged file linting

## 🚢 Deployment

The website is deployed on Vercel. Every push to the `main` branch triggers a new deployment.

## 📚 Documentation

Additional documentation:

- [Content Management](./docs/content-management.md)
- [Deployment](./docs/deployment.md)
- [Project Structure](./docs/project-structure.md)

## 📝 License

This project is proprietary. All rights reserved.

## 📬 Contact

For questions or feedback, please contact us at:
- Email: tech@echoniq.de
- Website: [www.echoniq.de](https://www.echoniq.de)