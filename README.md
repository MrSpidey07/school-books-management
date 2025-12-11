# School Management System

A full-stack application for managing school books, academic years, boards, classes, mediums, and book sets.

## Project Structure

```
├── backend/              # Node.js backend server
│   ├── src/
│   │   ├── server.js    # Express server entry point
│   │   ├── config/      # Configuration files
│   │   ├── controllers/ # Business logic controllers
│   │   ├── models/      # Database models
│   │   └── routes/      # API routes
│   ├── .env            # Backend environment variables
│   └── package.json    # Backend dependencies
│
└── frontend/            # React frontend application
    ├── src/
    │   ├── App.jsx     # Main React component
    │   ├── main.jsx    # React entry point
    │   ├── components/ # Reusable UI components
    │   ├── lib/        # Utility functions
    │   ├── pages/      # Page components
    │   └── store/      # State management
    ├── .env           # Frontend environment variables
    └── package.json   # Frontend dependencies
```

## Tech Stack

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Package Manager:** pnpm
- **Database:** (configured in [backend/src/config/database.js](backend/src/config/database.js))

### Frontend

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Package Manager:** pnpm

## Features

- **Academic Year Management** - Track and manage academic years
- **Board Management** - Handle different educational boards
- **Book Management** - Catalog and organize books
- **Book Set Management** - Group books into sets
- **Class Management** - Manage class information
- **Medium Management** - Handle different language mediums

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- pnpm installed globally (`npm install -g pnpm`)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install backend dependencies:

```bash
cd backend
pnpm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
pnpm install
```

### Configuration

1. Create a `.env` file in the [backend](backend) directory with necessary environment variables
2. Create a `.env` file in the [frontend](frontend) directory with necessary environment variables

### Running the Application

#### Development Mode

1. Start the backend server:

```bash
cd backend
pnpm dev
```

2. Start the frontend development server (in a new terminal):

```bash
cd frontend
pnpm dev
```

#### Production Mode

1. Build the frontend:

```bash
cd frontend
pnpm build
```

2. Start the backend server:

```bash
cd backend
pnpm start
```

## API Endpoints

The backend provides the following API endpoints:

- `/api/academic-years` - Academic year operations
- `/api/boards` - Board management
- `/api/books` - Book catalog
- `/api/book-sets` - Book set management
- `/api/classes` - Class information
- `/api/mediums` - Medium management

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request
