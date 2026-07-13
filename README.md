# Linktree Clone API

Backend built with **NestJS**, **Prisma**, and **PostgreSQL**. Provides user authentication, profile management, link CRUD, analytics, themes, social links, and image hosting.

## Features

- **Authentication**: JWT-based registration and login (supports email or username)
- **User Profiles**: Profile management, avatar upload (Cloudinary)
- **Link Management**: Full CRUD with drag-drop ordering, click tracking, and analytics
- **Themes**: Custom gradients, button styles, and font families per user
- **Social Links**: Manage Instagram, YouTube, GitHub, etc. per profile
- **Rate Limiting**: 10 requests/minute per IP
- **API Docs**: Swagger UI at `/api`

## Tech Stack

- [NestJS 11](https://nestjs.com/)
- [Prisma 7](https://www.prisma.io/) + PostgreSQL
- [Passport JWT](http://www.passportjs.org/)
- [Cloudinary](https://cloudinary.com/) for image uploads
- [@nestjs/throttler](https://github.com/nestjs/throttler) for rate limiting

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL (local or Docker)
- Cloudinary account

### 1. Install

```bash
git clone https://github.com/RicardoBravo92/linktree-nest
cd linktree
npm install
```

### 2. Environment

Copy `.env.template` to `.env` and fill in your values:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/LinktreeDB"
JWT_SECRET="your_secret"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
PORT=3000
```

### 3. Database

```bash
npx prisma generate
npx prisma db push
# or for migrations:
npx prisma migrate dev
```

### 4. Run

```bash
npm run start:dev
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login (email or username) |
| POST | `/auth/avatar` | Upload avatar (auth required) |
| PATCH | `/auth/profile` | Update profile info |
| PATCH | `/auth/theme` | Update theme settings |
| POST | `/auth/social-links` | Update social links |

### Links
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/links/my-links` | Get current user's links (auth required) |
| POST | `/links` | Create a link (auth required) |
| PATCH | `/links/:id` | Update a link (auth required) |
| DELETE | `/links/:id` | Delete a link (auth required) |
| POST | `/links/reorder` | Reorder links (auth required) |
| PATCH | `/links/:id/click` | Track a click |
| GET | `/links/analytics` | Get click analytics (auth required) |
| GET | `/links/user/:username` | Get public profile + links |

### Swagger

Available at [http://localhost:3000/api](http://localhost:3000/api) when the server is running.

## Project Structure

```
src/
├── auth/           # Authentication, guards, decorators, DTOs
├── links/          # Link CRUD, reorder, analytics, social links
├── prisma/         # Prisma service and module
├── cloudinary/     # Image upload integration
└── main.ts         # App entry point (CORS enabled)
```

## License

MIT
