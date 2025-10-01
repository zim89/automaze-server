# Automaze Server

Backend API for task management application, built with NestJS using Prisma ORM and PostgreSQL.

## 🚀 Key Features

- **RESTful API** for task and category management
- **CRUD Operations** for tasks and categories
- **Data Validation** with class-validator
- **Automatic API Documentation**
- **TypeScript** type safety
- **PostgreSQL** database with Prisma ORM
- **Database Migrations**

## 🛠 Technology Stack

### Core Technologies

- **NestJS 11** - Progressive Node.js framework
- **TypeScript** - Typed JavaScript
- **Prisma** - Modern ORM for TypeScript and Node.js
- **PostgreSQL** - Relational database

### Validation & Transformation

- **class-validator** - DTO validation
- **class-transformer** - Object transformation
- **class-transformer-validator** - Validation integration

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Bun** - JavaScript runtime and package manager

## 🏗 Architecture

The project follows NestJS modular architecture principles:

```
src/
├── app.module.ts           # Root module
├── main.ts                 # Application entry point
├── prisma.service.ts       # Prisma service
├── categories/             # Categories module
│   ├── categories.controller.ts
│   ├── categories.service.ts
│   ├── categories.module.ts
│   └── dto/               # Data Transfer Objects
└── tasks/                 # Tasks module
    ├── tasks.controller.ts
    ├── tasks.service.ts
    ├── tasks.module.ts
    └── dto/               # Data Transfer Objects
```

## 📊 Data Model

### Task

- `id` - Unique identifier
- `title` - Task title
- `description` - Description (optional)
- `priority` - Priority (1-10)
- `isDone` - Completion status
- `dueDate` - Due date (optional)
- `categoryId` - Category relationship
- `createdAt` - Creation date
- `updatedAt` - Update date

### Category

- `id` - Unique identifier
- `name` - Category name
- `color` - Color for UI (optional)
- `createdAt` - Creation date
- `updatedAt` - Update date

## 📦 Installation & Setup

### Prerequisites

- **Bun** ^1.0.0
- **Node.js** ^18.0.0
- **PostgreSQL** ^14.0.0

### Install Dependencies

```bash
bun install
```

### Database Setup

1. Create a PostgreSQL database
2. Create `.env` file in the project root:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/automaze"
```

### Run Migrations

```bash
bunx prisma migrate dev
```

### Generate Prisma Client

```bash
bunx prisma generate
```

### Development

```bash
bun run start:dev
```

API will be available at [http://localhost:3001](http://localhost:3001)

### Production

```bash
bun run build
bun run start:prod
```

## 🔧 Scripts

- `bun run build` - Build the project
- `bun run start` - Start the application
- `bun run start:dev` - Start in development mode
- `bun run start:debug` - Start in debug mode
- `bun run start:prod` - Start production version
- `bun run lint` - Run code linting
- `bun run format` - Format code
- `bun run test` - Run tests
- `bun run test:watch` - Run tests in watch mode
- `bun run test:cov` - Run tests with coverage

## 🌐 API Endpoints

### Tasks

- `GET /tasks` - Get tasks list
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Categories

- `GET /categories` - Get categories list
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create new category
- `PATCH /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

## 📝 DTO (Data Transfer Objects)

### CreateTaskDto

```typescript
{
  title: string;
  description?: string;
  priority?: number;
  dueDate?: Date;
  categoryId?: string;
}
```

### UpdateTaskDto

```typescript
{
  title?: string;
  description?: string;
  priority?: number;
  isDone?: boolean;
  dueDate?: Date;
  categoryId?: string;
}
```

### CreateCategoryDto

```typescript
{
  name: string;
  color?: string;
}
```

### UpdateCategoryDto

```typescript
{
  name?: string;
  color?: string;
}
```

## 🗄 Database Management

### Prisma CLI Commands

```bash
# Create new migration
bunx prisma migrate dev --name migration_name

# Apply migrations
bunx prisma migrate deploy

# Reset database
bunx prisma migrate reset

# View database
bunx prisma studio

# Generate client
bunx prisma generate
```

## 🧪 Testing

The project is configured for testing with Jest:

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with coverage
bun run test:cov

# E2E tests
bun run test:e2e
```

## 🔒 Security

- Validation of all incoming data
- SQL injection protection through Prisma
- CORS configuration
- Ready for authentication and authorization

## 📈 Monitoring & Logging

- Built-in NestJS logging
- Ready for monitoring system integration
- Health check endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and not intended for public use.
