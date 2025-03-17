# Supa Chat Oasis

A modern chat application built with React, Vite, and Supabase.

## Features

- Real-time chat functionality
- User authentication with email and social providers
- Modern UI with Shadcn components
- Protected routes and user profiles
- Analytics dashboard
- Ad creation and management

## Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- A Supabase account and project
- A Vercel account (for deployment)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/supa-chat-oasis.git
   cd supa-chat-oasis
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file and add your Supabase credentials and other configuration values.

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment to Vercel

### Option 1: Deploy from Git

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to your [Vercel account](https://vercel.com)
3. Click "New Project"
4. Import your Git repository
5. Configure your project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add Environment Variables:
   - Add all variables from your `.env` file to Vercel's Environment Variables section
7. Click "Deploy"

### Option 2: Deploy with Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

## Environment Variables

Make sure to set up the following environment variables in your `.env` file and Vercel project settings:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_APP_NAME`: Application name (default: "Supa Chat Oasis")
- `VITE_APP_URL`: Your Vercel deployment URL (in production)
- `VITE_GOOGLE_CLIENT_ID`: (Optional) Google OAuth client ID
- `VITE_META_CLIENT_ID`: (Optional) Meta/Facebook OAuth client ID

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React context providers
├── hooks/         # Custom React hooks
├── integrations/  # External service integrations
├── lib/           # Utility functions and helpers
├── pages/         # Application pages/routes
└── types/         # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
