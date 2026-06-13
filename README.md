# 🌅 WrkZone

A creative, cheerful **classified ads marketplace** where handymen — plumbers,
AC technicians, pest control, cleaners, electricians and more — post their
services and get hired by local customers.

Built with a warm **"happy morning" sunrise palette** (amber / peach /
sunny-yellow with sky-blue accents).

## ✨ Features

- **Home page** — animated hero, category grid, fresh listings, banner ads, "how it works", CTA
- **Post an ad** — guarded form with category picker, pricing, location, contact & **local image upload**
- **Browse & search** — full-text search, city filter, category chips, sorting (newest / price / popularity)
- **Ad detail** — image, description, reviews, call / WhatsApp / email contact, related ads, view counter
- **Category pages** — one landing page per service
- **Auth** — email + password (NextAuth credentials) with `USER` / `ADMIN` roles
- **User dashboard** — stats (ads / live / views), manage & delete your ads, profile card
- **Admin console** — overview stats, moderate ads (approve / reject / feature / delete), manage users (role / delete), manage categories, manage **banner advertisements**

## 🧱 Stack

| Layer     | Tech                                |
| --------- | ----------------------------------- |
| Framework | Next.js 16 (App Router) + React 19  |
| Language  | TypeScript                          |
| Styling   | Tailwind CSS v4                     |
| Database  | SQLite via Prisma 6                 |
| Auth      | NextAuth v4 (JWT, credentials)      |
| Uploads   | Local filesystem (`/public/uploads`)|

## 🚀 Getting started

```bash
npm install
npx prisma migrate dev      # creates the SQLite db + tables
npm run db:seed             # categories, sample ads, banners, demo users
npm run dev                 # http://localhost:3000
```

### Demo accounts

| Role  | Email             | Password   |
| ----- | ----------------- | ---------- |
| Admin | admin@wrkzone.com | `admin123` |
| User  | rahul@wrkzone.com | `user123`  |

## 📂 Project structure

```
app/
  page.tsx                 Home
  ads/                     Listing + [id] detail
  category/[slug]/         Category landing
  post/                    Post-ad form (auth required)
  dashboard/               User dashboard
  login/  register/        Auth pages
  about/                   How it works
  admin/                   Admin console (ADMIN only)
  api/                     register, ads, upload, auth, admin/*
components/                Navbar, Footer, AdCard, SearchBar, forms, admin/*
lib/                       prisma.ts, auth.ts, utils.ts
prisma/                    schema.prisma, seed.ts, migrations
public/uploads/            Uploaded ad images
```

## 🔧 Useful scripts

```bash
npm run dev        # dev server
npm run build      # production build
npm run db:seed    # re-seed sample data
npm run db:reset   # wipe + re-migrate + re-seed
```

## 🔐 Notes for production

- Change `NEXTAUTH_SECRET` in `.env` to a strong random value.
- Swap SQLite for Postgres by editing `datasource` in `prisma/schema.prisma`.
- For real image hosting, move uploads to S3 / Cloudinary.
