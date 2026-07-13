# Linktree Clone API 🚀

A powerful and scalable Linktree clone backend built with **NestJS**, **Prisma**, and **PostgreSQL**. This API allows users to create a personal profile and manage a collection of social and custom links.

## ✨ Features

- **Authentication**: Secure JWT-based registration and login.
- **User Profiles**: Manage profile information and upload custom avatars.
- **Link Management**: Full CRUD operations for personal links (URL, title, description, and images).
- **Rate Limiting**: Integrated protection against brute-force and DDoS attacks (10 requests/minute per IP).
- **Image Hosting**: Cloudinary integration for professional image handling and storage.
- **API Documentation**: Interactive Swagger UI provided.
- **Database**: Prisma ORM with PostgreSQL for reliable data management.
- **Modern Tech**: Built with Prisma 7 and NestJS 11.

---

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [Prisma 7](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: [Passport JWT](http://www.passportjs.org/)
- **File Storage**: [Cloudinary](https://cloudinary.com/)
- **Documentation**: [Swagger / OpenAPI](https://swagger.io/)
- **Rate Limiting**: [@nestjs/throttler](https://github.com/nestjs/throttler)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- Docker (for database) or a local PostgreSQL instance
- Cloudinary Account (for image uploads)

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone git@github.com:RicardoBravo92/linktree-nest.git
cd linktree-clone
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory and fill in the required variables (see `.env.template` for reference):

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/LinktreeDB"

# JWT
JWT_SECRET="your_very_secret_key"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Server
PORT=3000
```

### 3. Database Setup

Using Prisma to sync your database schema:

```bash
npx prisma generate
npx prisma db push
```

### 4. Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

---

## 📖 API Documentation

Once the server is running, you can access the interactive Swagger documentation at:

🔗 [http://localhost:3000/api](http://localhost:3000/api)

Here you can test all endpoints, including authentication and file uploads, directly from your browser.

---

## 🔒 Rate Limiting

To ensure stability and security, the API implements a global rate limit:
- **Default limit**: 10 requests every 60 seconds per IP address.
- If exceeded, the API will return a `429 Too Many Requests` error.

---

## 📂 Project Structure

```text
src/
├── auth/           # Authentication logic, guards, and decorators
├── links/          # Link CRUD management
├── prisma/         # Prisma service and module
├── cloudinary/     # Image upload integration logic
└── main.ts         # Application entry point
```

---

## 📄 License

This project is [MIT licensed](LICENSE).
