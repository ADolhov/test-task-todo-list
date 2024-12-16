## Development Setup
- Next.js 14
- Rails 7

### Prerequisites
- Ruby 3.x
- Node.js 18+
- PostgreSQL
- pnpm

### Getting Started

1. Clone the repository

```bash
git clone git@github.com:ADolhov/test-task-todo-list.git
cd test-task-todo-list
```

2. Run the setup script inside the root folder

```bash
bin/setup
```

3. Start the development servers (it will start both frontend and backend)

```bash
bin/dev
```

The application will be available at:
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000

### Development Commands

- `bin/setup` - Set up the project for development
- `bin/dev` - Start development servers
- `cd backend && rails c` - Start Rails console
- `cd frontend && pnpm test` - Run frontend tests
