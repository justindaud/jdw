# Jakal Design Week (JDW) Website

A modern, responsive website for Jakal Design Week built with Next.js 16, React 19, and Tailwind CSS 4.

## 🏗️ Project Structure

This is a **monorepo** using npm workspaces:

```
webjdw/
├── apps/
│   └── web/          # Next.js web application
├── packages/         # Shared packages (future)
├── docs/            # Documentation
├── node_modules/    # Root workspace dependencies
└── package.json     # Workspace configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ (recommended)
- npm 10+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/justindaud/jdw.git
   cd jdw
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will install dependencies for all workspaces (root + apps/web)

3. **Run development server**
   ```bash
   cd apps/web
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📦 Available Scripts

### Root Level
```bash
npm install              # Install all workspace dependencies
```

### Web App (`apps/web/`)
```bash
npm run dev             # Start development server
npm run build           # Build for production
npm run start           # Start production server
npx tsc --noEmit        # Type check without building
```

## 🛠️ Tech Stack

- **Framework:** Next.js 16.1.4
- **UI Library:** React 19.2.3
- **Styling:** Tailwind CSS 4.1.18
- **Language:** TypeScript 5
- **Compiler:** React Compiler (Babel Plugin)

## 📁 Key Directories

```
apps/web/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── ProgramsCarousel.tsx
│   │   ├── RightSidebar.tsx
│   │   ├── LeftSidebar.tsx
│   │   └── footer.tsx
│   └── contexts/         # React contexts
├── public/
│   └── assets/          # Images, logos, icons
└── tailwind.config.ts   # Tailwind configuration
```

## 🎨 Features

- ✅ Responsive design (mobile-first)
- ✅ Programs carousel with modal view
- ✅ Mobile-optimized sidebar navigation
- ✅ Search functionality
- ✅ Dark/light theme support
- ✅ Optimized images with Next.js Image component

## 🔧 Development

### Adding New Dependencies

For the web app:
```bash
cd apps/web
npm install <package-name>
```

For shared dependencies (root):
```bash
npm install <package-name> -w root
```

### Type Checking

```bash
cd apps/web
npx tsc --noEmit
```

### Building for Production

```bash
cd apps/web
npm run build
npm run start
```

## 📝 Monorepo Structure

This project uses **npm workspaces** for monorepo management:

- **Root `package.json`**: Defines workspaces (`apps/*`, `packages/*`)
- **Root `node_modules`**: Shared dependencies across all workspaces
- **App-specific `node_modules`**: Dependencies unique to each app

### Why Two `package.json` Files?

1. **Root `/package.json`**: Workspace configuration
2. **`/apps/web/package.json`**: Next.js app dependencies

Both are necessary for the monorepo structure to work correctly.

## 🚢 Deployment

### Docker (Recommended)

The application is containerized using Docker for consistent deployment across environments.

#### Prerequisites

- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed (included with Docker Desktop)

#### Quick Start

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```
   
   Your app will be available at `http://localhost:3000`

2. **Stop the container**
   ```bash
   docker-compose down
   ```

#### Manual Docker Build

```bash
# Build the image
docker build -t jdw-website .

# Run the container
docker run -p 3000:3000 jdw-website
```

#### Production Deployment

For production with HTTPS and custom domain:

1. **Build the Docker image**
   ```bash
   docker build -t jdw-website:latest .
   ```

2. **Set up reverse proxy (nginx/Caddy)**
   
   Example nginx configuration:
   ```nginx
   server {
       listen 80;
       server_name jakaldesignweek.com;
       
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

3. **Enable HTTPS with Let's Encrypt**
   ```bash
   # Using Certbot
   sudo certbot --nginx -d jakaldesignweek.com
   ```

4. **Run with docker-compose in production**
   ```bash
   docker-compose up -d
   ```

#### Environment Variables

Create `.env.local` file in `apps/web/` for environment-specific variables:

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.example.com
```

Update `docker-compose.yml` to include env file:
```yaml
services:
  web:
    env_file:
      - apps/web/.env.local
```

#### Docker Image Optimization

The Dockerfile uses multi-stage builds:
- **Stage 1 (deps):** Production dependencies only
- **Stage 2 (builder):** Build the Next.js app
- **Stage 3 (runner):** Minimal runtime image (~150MB)

#### Health Checks

The container includes health checks:
```bash
# Check container health
docker ps

# View logs
docker-compose logs -f web
```

#### Updating the Application

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose up -d --build
```

### Alternative: Manual Deployment

If not using Docker:

```bash
cd apps/web
npm run build
npm run start
```

Then set up nginx/Caddy as reverse proxy for HTTPS.

## 📄 License

Private project for Jakal Design Week.

## 🤝 Contributing

This is a private project. For questions or contributions, contact the development team.

---

**Built with ❤️ for Jakal Design Week**
