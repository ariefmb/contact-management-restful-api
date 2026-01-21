<div align='center'>

# 📇 Contact Management RESTful API

A modern, production-ready RESTful API built with Node.js for managing users, contacts, and their addresses. This project demonstrates best practices in API development including authentication, validation, error handling, and database management.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs) ![Express.js](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express) ![Prisma](https://img.shields.io/badge/Prisma-7.2-2D3748?style=for-the-badge&logo=prisma) ![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql)

</div>

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based authentication with bcrypt password hashing
- 👤 **User Management** - Create, read, and update user profiles
- 📞 **Contact Management** - Full CRUD operations for managing contacts
- 🏠 **Address Management** - Manage multiple addresses per contact
- 🔍 **Advanced Search** - Search and filter contacts with pagination
- ✅ **Input Validation** - Comprehensive data validation using Joi
- 📊 **Database ORM** - Prisma ORM with MySQL integration
- 🚀 **Hot Reload** - Nodemon for development with automatic restart
- 🧪 **Testing** - Jest configuration for unit and integration testing
- 📝 **Structured Logging** - Pino logger for production-grade logging
- 🌍 **CORS Support** - Cross-Origin Resource Sharing enabled
- 🔄 **Migration System** - Prisma migrations for database versioning

## 📋 Table of Contents

1. [Prerequisites](#-prerequisites)
2. [Installation](#-installation)
3. [Nodemon Configuration](#-nodemon-configuration)
4. [API Endpoints](#-api-endpoints)
5. [Database Schema](#-database-schema)
6. [Authentication](#-authentication)
7. [Error Handling](#-error-handling)
8. [Running the Project](#-running-the-project)
9. [Technologies Used](#-technologies-used)
10. [Author](#-author)

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MySQL** (v8.0 or higher)
- **Git**
- **Postman** (API testing tool)
- **MySQL Cloud Service** (optional, for scalable and managed database solutions on prod level)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd belajar-nodejs-restful-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Generate Prisma Client

```bash
npm run prisma:generate
```

### 4. Setup Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL="mysql://user:password@host:port/db_name"
DATABASE_PORT=port_number
DATABASE_HOST="host"
DATABASE_USER="user"
DATABASE_PASSWORD="pass"
DATABASE_NAME="db_name"

# JWT Configuration
JWT_PRIVATE_KEY="your-private-key-here"
JWT_PUBLIC_KEY="your-public-key-here"

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 5. Run Database Migrations

```bash
npm run prisma:push
```

## ⚙️ Nodemon Configuration

Development server auto-reload is configured in `nodemon.json`. The server watches for changes in the `src/` directory.

```json
{
    "watch": ["src"],
    "ext": "js,json",
    "exec": "node src/api/index.js",
    "ignore": ["node_modules", "dist"],
    "delay": 500
}
```

## 🔌 API Endpoints

#### Authentication & User Management (`/api/users`)

| Method | Endpoint                     | Description               | Auth Required |
| ------ | ---------------------------- | ------------------------- | ------------- |
| POST   | `/api/users`                 | Register a new user       | ❌            |
| POST   | `/api/users/login`           | Login user and get tokens | ❌            |
| POST   | `/api/users/current/refresh` | Refresh access token      | ❌            |
| GET    | `/api/users/current`         | Get current user profile  | ✅            |
| PATCH  | `/api/users/current/update`  | Update user profile       | ✅            |
| POST   | `/api/users/logout`          | Logout user               | ✅            |

**📖 Detailed Documentation:** [User API Specification](docs/user.md)

#### Contact Management (`/api/contacts`)

| Method | Endpoint                          | Description                  | Auth Required |
| ------ | --------------------------------- | ---------------------------- | ------------- |
| POST   | `/api/contacts/create`            | Create a new contact         | ✅            |
| GET    | `/api/contacts/:contactId`        | Get contact details          | ✅            |
| POST   | `/api/contacts`                   | Search contacts with filters | ✅            |
| PUT    | `/api/contacts/:contactId/update` | Update contact information   | ✅            |
| DELETE | `/api/contacts/:contactId/remove` | Delete a contact             | ✅            |

**📖 Detailed Documentation:** [Contact API Specification](docs/contact.md)

#### Address Management (`/api/contacts/:contactId/addresses`)

| Method | Endpoint                                               | Description                    | Auth Required |
| ------ | ------------------------------------------------------ | ------------------------------ | ------------- |
| POST   | `/api/contacts/:contactId/addresses/create`            | Add new address to contact     | ✅            |
| GET    | `/api/contacts/:contactId/addresses/:addressId`        | Get specific address details   | ✅            |
| GET    | `/api/contacts/:contactId/addresses`                   | List all addresses for contact | ✅            |
| PUT    | `/api/contacts/:contactId/addresses/:addressId/update` | Update address information     | ✅            |
| DELETE | `/api/contacts/:contactId/addresses/:addressId/remove` | Delete an address              | ✅            |

**📖 Detailed Documentation:** [Address API Specification](docs/address.md)

## 💾 Database Schema

### User Model

| Field          | Type          | Constraints      |
| -------------- | ------------- | ---------------- |
| `id`           | String (UUID) | Primary Key      |
| `username`     | String(100)   | Unique, Required |
| `password`     | String(100)   | Required, Hashed |
| `name`         | String(100)   | Required         |
| `tokenVersion` | Int           | Default: 0       |
| `contacts`     | Relation      | One-to-Many      |

### Contact Model

| Field        | Type          | Constraints        |
| ------------ | ------------- | ------------------ |
| `id`         | String (UUID) | Primary Key        |
| `first_name` | String(100)   | Required           |
| `last_name`  | String(100)   | Optional           |
| `email`      | String(200)   | Optional           |
| `phone`      | String(20)    | Optional           |
| `user_id`    | String        | Foreign Key (User) |
| `addresses`  | Relation      | One-to-Many        |

### Address Model

| Field         | Type          | Constraints           |
| ------------- | ------------- | --------------------- |
| `id`          | String (UUID) | Primary Key           |
| `title`       | String(100)   | Required              |
| `street`      | String(255)   | Optional              |
| `city`        | String(100)   | Optional              |
| `province`    | String(100)   | Optional              |
| `country`     | String(100)   | Required              |
| `postal_code` | String(10)    | Required              |
| `contact_id`  | String        | Foreign Key (Contact) |

## 🔐 Authentication

This API uses **JWT (JSON Web Token)** based authentication.

### How It Works

1. **User Registration/Login** - User credentials are validated and a JWT token is generated
2. **Token Storage** - Client stores the token (usually in localStorage or secure cookies)
3. **Protected Requests** - Client includes token in `Authorization` header: `Bearer <token>`
4. **Verification** - Server verifies token signature and expiration
5. **Access Control** - If valid, request proceeds; if invalid, returns 401 Unauthorized

### Token Refresh

Tokens can be invalidated by incrementing the `tokenVersion` field in the User model, forcing users to re-authenticate.

## ❌ Error Handling

The API returns standardized error responses:

### Error Response Format

```json
{
    "errors": "Error message describing what went wrong"
}
```

### Common Error Codes

| Status | Code                  | Description                       |
| ------ | --------------------- | --------------------------------- |
| 400    | Bad Request           | Invalid input validation          |
| 401    | Unauthorized          | Missing or invalid authentication |
| 403    | Forbidden             | Insufficient permissions          |
| 404    | Not Found             | Resource not found                |
| 500    | Internal Server Error | Server-side error                 |

## 🏃 Running the Project

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000` and automatically reload on file changes.

### Production Mode

```bash
npm start
```

### Available Scripts

```bash
# Start the production server
npm start

# Start development server with hot reload
npm run dev

# Generate Prisma Client
npm run prisma:generate

# Push schema changes to database
npm run prisma:push

# Run tests
npm test

# Generate Prisma Client and install dependencies
npm postinstall
```

## 📚 Technologies Used

| Category                    | Technology                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core Framework**          | ![Express.js](https://img.shields.io/badge/Express.js-5.2.1-000000?style=flat-square&logo=express) ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs)                                                                                                                                                                |
| **Database & ORM**          | ![Prisma](https://img.shields.io/badge/Prisma-7.2.0-2D3748?style=flat-square&logo=prisma) ![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=flat-square&logo=mysql) ![MariaDB](https://img.shields.io/badge/MariaDB-Adapter-003545?style=flat-square&logo=mariadb)                                                                                 |
| **Security**                | ![bcrypt](https://img.shields.io/badge/bcrypt-6.0.0-000000?style=flat-square) ![JWT](https://img.shields.io/badge/JWT-9.0.3-000000?style=flat-square&logo=jsonwebtokens) ![dotenv](https://img.shields.io/badge/dotenv-17.2.3-ECD53F?style=flat-square)                                                                                                        |
| **Validation & Middleware** | ![Joi](https://img.shields.io/badge/Joi-18.0.2-0085CA?style=flat-square) ![CORS](https://img.shields.io/badge/CORS-2.8.5-000000?style=flat-square) ![Cookie Parser](https://img.shields.io/badge/Cookie--Parser-1.4.7-000000?style=flat-square) ![Body Parser](https://img.shields.io/badge/Body--Parser-2.2.2-000000?style=flat-square)                       |
| **Utilities**               | ![UUID](https://img.shields.io/badge/UUID-13.0.0-000000?style=flat-square) ![Moment](https://img.shields.io/badge/Moment-2.30.1-00AA6F?style=flat-square)                                                                                                                                                                                                      |
| **Logging**                 | ![Pino](https://img.shields.io/badge/Pino-10.2.0-000000?style=flat-square) ![Pino Pretty](https://img.shields.io/badge/Pino--Pretty-13.1.3-000000?style=flat-square)                                                                                                                                                                                           |
| **Development**             | ![Nodemon](https://img.shields.io/badge/Nodemon-3.1.11-76D04B?style=flat-square&logo=nodemon) ![Babel](https://img.shields.io/badge/Babel-7.28.5-F9DC3E?style=flat-square&logo=babel) ![Jest](https://img.shields.io/badge/Jest-30.2.0-C21325?style=flat-square&logo=jest) ![Supertest](https://img.shields.io/badge/Supertest-7.2.2-000000?style=flat-square) |

## 👨‍💻 Author

<p style="font-family: Papyrus, Impact; font-size: 20px;">built with <b>Passion</b> by ariefmb</p>
