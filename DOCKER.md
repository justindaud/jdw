# Docker Deployment Quick Reference

## Quick Commands

```bash
# Development
docker-compose up -d          # Start container
docker-compose down           # Stop container
docker-compose logs -f web    # View logs

# Production
docker build -t jdw-website:latest .
docker run -p 3000:3000 jdw-website:latest

# Update
git pull origin main
docker-compose up -d --build
```

## HTTPS Setup (Production)

### Option 1: Nginx Reverse Proxy

1. Install nginx and certbot:
```bash
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx
```

2. Create nginx config `/etc/nginx/sites-available/jdw`:
```nginx
server {
    listen 80;
    server_name jakaldesignweek.com www.jakaldesignweek.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

3. Enable site and get SSL:
```bash
sudo ln -s /etc/nginx/sites-available/jdw /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d jakaldesignweek.com -d www.jakaldesignweek.com
```

### Option 2: Caddy (Automatic HTTPS)

1. Install Caddy:
```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

2. Create Caddyfile:
```
jakaldesignweek.com {
    reverse_proxy localhost:3000
}
```

3. Start Caddy:
```bash
sudo caddy run --config Caddyfile
```

## Environment Variables

Create `apps/web/.env.local`:
```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://jakaldesignweek.com
```

Update `docker-compose.yml`:
```yaml
services:
  web:
    env_file:
      - apps/web/.env.local
```

## Troubleshooting

### Container won't start
```bash
docker-compose logs web
docker ps -a
```

### Port already in use
```bash
# Find process using port 3000
sudo lsof -i :3000
# Kill it
sudo kill -9 <PID>
```

### Rebuild from scratch
```bash
docker-compose down
docker system prune -a
docker-compose up -d --build
```
