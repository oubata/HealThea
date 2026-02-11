# HealThEA Deployment Guide

## Architecture

```
healthea.ca (Storefront) → port 3000
api.healthea.ca (Medusa)  → port 9000
PostgreSQL 15             → port 5432 (internal)
Redis 7                   → port 6379 (internal)
MeiliSearch               → port 7700 (internal)
```

All services run as Docker containers on a Hetzner VPS, managed via Coolify.

---

## Prerequisites

- Hetzner VPS with Coolify installed
- Domain `healthea.ca` pointed to the VPS IP
- GitHub repository (private)

---

## 1. DNS Configuration

Add these records at your DNS provider:

| Record | Type  | Value             |
|--------|-------|-------------------|
| `healthea.ca`     | A     | `<Hetzner VPS IP>` |
| `www.healthea.ca` | CNAME | `healthea.ca`      |
| `api.healthea.ca` | A     | `<Hetzner VPS IP>` |

---

## 2. Generate Secrets

Run on your server or local machine:

```bash
# JWT Secret
openssl rand -hex 32

# Cookie Secret
openssl rand -hex 32

# MeiliSearch Master Key
openssl rand -hex 16
```

---

## 3. Coolify Setup

### Option A: Docker Compose (Recommended)

1. In Coolify, create a new **Docker Compose** project
2. Connect your GitHub repository
3. Set the compose file to `docker-compose.prod.yml`
4. Add environment variables from `.env.production.example` with real values
5. Set domains:
   - Storefront service: `healthea.ca` → port 3000
   - Backend service: `api.healthea.ca` → port 9000
6. Enable auto-deploy on push to `main`

### Option B: Individual Services

Create each service separately in Coolify:

**Infrastructure (create first):**
- PostgreSQL 15 (use Coolify's built-in database service)
- Redis 7 (use Coolify's built-in service)
- MeiliSearch (Docker image: `getmeili/meilisearch:latest`)

**Applications (create after infrastructure):**
- **Medusa Backend**: Dockerfile build from `backend/` directory
  - Domain: `api.healthea.ca`
  - Port: 9000
  - Add all backend env vars

- **Next.js Storefront**: Dockerfile build from `storefront/` directory
  - Domain: `healthea.ca`
  - Port: 3000
  - Add storefront env vars as build args

---

## 4. First Deploy

After deploying all services:

```bash
# SSH into the Coolify server, then exec into the backend container:

# Run database migrations
docker exec healthea-backend npx medusa db:migrate

# Seed with initial data
docker exec healthea-backend npm run seed

# Create an admin user
docker exec healthea-backend npx medusa user -e admin@healthea.ca -p your-admin-password
```

---

## 5. SSL

Coolify auto-provisions SSL certificates via Let's Encrypt. Verify both domains show the padlock icon after DNS propagation.

---

## 6. Backups

### PostgreSQL (Daily)
In Coolify, navigate to the PostgreSQL service → Backups:
- Enable scheduled backups
- Schedule: daily at 3:00 AM
- Retention: 7 days

### Full Server (Weekly)
In Hetzner Cloud Console:
- Enable automatic snapshots
- Schedule: weekly

---

## 7. Post-Deploy Checklist

- [ ] `healthea.ca` loads the storefront
- [ ] `api.healthea.ca/health` returns OK
- [ ] SSL certificates active on both domains
- [ ] Products visible in the shop
- [ ] Add to cart and checkout flow works
- [ ] Customer registration and login works
- [ ] Admin panel accessible at `api.healthea.ca/app`
- [ ] GitHub auto-deploy webhook configured
- [ ] Database backups scheduled
- [ ] Hetzner snapshots enabled

---

## Local Development

```bash
# Start infrastructure services
docker compose up -d

# Start backend (in backend/ directory)
npm run dev

# Start storefront (in storefront/ directory)
npm run dev
```

Storefront: http://localhost:3000
Backend: http://localhost:9000
MeiliSearch: http://localhost:7700
