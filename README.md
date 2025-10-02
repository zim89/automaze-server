# Automaze Server

Backend API for task management application, built with NestJS using Prisma ORM and PostgreSQL.

## 🚀 Key Features

- **RESTful API** for task and category management
- **Statistics API** with server-side calculations
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
├── stats/                 # Statistics module
│   ├── stats.controller.ts
│   ├── stats.service.ts
│   └── stats.module.ts
└── tasks/                 # Tasks module
    ├── tasks.controller.ts
    ├── tasks.service.ts
    ├── tasks.module.ts
    └── dto/               # Data Transfer Objects
```

## 📊 Data Model

### Task

- `id` - Unique identifier (CUID)
- `title` - Task title (required, trimmed)
- `description` - Description (optional, trimmed)
- `priority` - Priority (1-10, default: 5)
- `isDone` - Completion status (default: false)
- `dueDate` - Due date (optional)
- `categoryId` - Category relationship (optional)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Category

- `id` - Unique identifier (CUID)
- `name` - Category name (unique)
- `color` - Color for UI (optional)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

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
PORT=4040
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

API will be available at [http://localhost:4040](http://localhost:4040)

### Production

```bash
bun run build
bun run start:prod
```

## 🔧 Scripts

- `bun run build` - Build the project
- `bun run start` - Start the application
- `bun run start:dev` - Start in development mode with watch
- `bun run start:debug` - Start in debug mode
- `bun run start:prod` - Start production version
- `bun run lint` - Run code linting
- `bun run format` - Format code
- `bun run test` - Run tests
- `bun run test:watch` - Run tests in watch mode
- `bun run test:cov` - Run tests with coverage

## 🌐 API Endpoints

### Tasks

- `GET /tasks` - Get tasks list with filtering, sorting, and pagination
  - Query params: `search`, `status`, `category`, `sortField`, `sortBy`, `page`, `limit`
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PATCH /tasks/:id` - Update task
- `PATCH /tasks/:id/toggle` - Toggle task completion status
- `DELETE /tasks/:id` - Delete task

### Categories

- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create new category
- `PATCH /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Statistics

- `GET /stats` - Get tasks statistics
  - Returns: total tasks, completed, pending, overdue, completion rate, top categories

## 📝 DTO (Data Transfer Objects)

### CreateTaskDto

```typescript
{
  title: string;           // Required, will be trimmed
  description?: string;    // Optional, will be trimmed
  priority?: number;       // 1-10, default: 5
  dueDate?: string;       // ISO date string
  categoryId?: string;    // Category ID
}
```

### UpdateTaskDto

```typescript
{
  title?: string;          // Will be trimmed
  description?: string;    // Will be trimmed
  priority?: number;       // 1-10
  isDone?: boolean;
  dueDate?: string;       // ISO date string
  categoryId?: string;
}
```

### TaskQueryDto

```typescript
{
  search?: string;        // Search in title/description
  status?: 'done' | 'undone' | 'all';
  category?: string;      // Filter by category name
  sortField?: 'title' | 'category' | 'priority' | 'createdAt';
  sortBy?: 'asc' | 'desc';
  page?: number;          // Default: 1
  limit?: number;         // Default: 10
}
```

### CreateCategoryDto

```typescript
{
  name: string;           // Required, unique
  color?: string;         // Hex color code
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

# View database in browser
bunx prisma studio

# Generate Prisma client
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

- Validation of all incoming data with class-validator
- SQL injection protection through Prisma ORM
- Input sanitization (trimming whitespace)
- CORS configuration for cross-origin requests
- Type-safe database queries
- Ready for authentication and authorization

## 🚀 Deployment

### Recommended Platforms

1. **Railway.app** - Easy deployment with PostgreSQL
2. **Render.com** - Free tier with PostgreSQL support
3. **Fly.io** - Fast deployment with databases
4. **Vercel** - Serverless functions (with adaptations)

### Environment Variables

Required for production:

```env
DATABASE_URL="postgresql://..."
PORT=4040
NODE_ENV=production
```

### Deployment Steps

1. Set up PostgreSQL database
2. Configure environment variables
3. Run migrations: `bunx prisma migrate deploy`
4. Build: `bun run build`
5. Start: `bun run start:prod`

## 📈 Monitoring & Logging

- Built-in NestJS logging system
- Structured error handling
- Ready for APM integration (New Relic, Datadog, etc.)
- Health check endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and not intended for public use.
