# ChainSolutions

Plateforme FinTech pour les marchés financiers africains (zone UEMOA) — analyse BRVM, OPCVM, simulateur d'épargne, éducation financière.

## Déploiement VPS (Ionos)

### Prérequis

- Docker et Docker Compose installés sur le serveur
- Domaine `www.chainsolutions.fr` pointant vers l'IP du VPS
- Un reverse proxy (Nginx ou Caddy) pour le SSL/HTTPS

### Installation

**1. Cloner le dépôt sur le VPS**

```bash
git clone <url-du-repo> /opt/chainsolutions
cd /opt/chainsolutions
```

**2. Créer le fichier `.env`**

```bash
cp .env.example .env
```

Remplir les valeurs dans `.env` :

```env
DATABASE_URL="file:/app/data/chainsolutions.db"
NEXTAUTH_SECRET="<générer avec : openssl rand -base64 32>"
NEXTAUTH_URL="https://www.chainsolutions.fr"
NEXT_PUBLIC_SITE_URL="https://www.chainsolutions.fr"
ADMIN_EMAIL="contact@chainsolutions.fr"
RESEND_API_KEY="re_..."
```

**3. Construire et démarrer**

```bash
docker compose up -d --build
```

L'application démarre sur le port **3000**. La base de données SQLite est automatiquement initialisée au premier démarrage.

**4. Créer le compte administrateur**

```bash
docker compose exec app node scripts/seed-admin.ts
```

Ou via l'endpoint de setup (première fois uniquement) :
```
https://www.chainsolutions.fr/api/setup
```

### Nginx — Configuration reverse proxy

```nginx
server {
    listen 80;
    server_name www.chainsolutions.fr;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name www.chainsolutions.fr;

    ssl_certificate /etc/letsencrypt/live/www.chainsolutions.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.chainsolutions.fr/privkey.pem;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Certificat SSL avec Let's Encrypt :
```bash
certbot --nginx -d www.chainsolutions.fr
```

### Commandes utiles

```bash
# Voir les logs
docker compose logs -f app

# Redémarrer
docker compose restart app

# Mettre à jour l'application
git pull
docker compose up -d --build

# Sauvegarder la base de données
docker compose exec app cp /app/data/chainsolutions.db /app/data/backup-$(date +%Y%m%d).db
```

## Développement local

**Prérequis :** Node.js 20+

```bash
# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env.local
# Modifier DATABASE_URL en : file:./prisma/dev.db

# Démarrer (initialise automatiquement la DB)
npm run dev
```

## Stack technique

- **Framework :** Next.js 15 (App Router, mode standalone)
- **Base de données :** SQLite via Prisma ORM
- **Auth :** NextAuth v4 (credentials)
- **Emails :** Resend
- **UI :** TailwindCSS, Radix UI, TipTap, Motion
- **Déploiement :** Docker + VPS Ionos
