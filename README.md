# Task Management System - MERN Stack

A full-stack task management application built with **MongoDB/MySQL**, **Express.js**, **React**, and **Node.js**.

## 🚀 Features

### Frontend (React)

- ✅ User Registration & Login with form validation
- ✅ Protected Routes with JWT authentication
- ✅ Responsive Dashboard with task statistics
- ✅ Complete CRUD operations for tasks
- ✅ Task filtering and sorting (status, priority, date)
- ✅ React Router for navigation
- ✅ Context API for state management
- ✅ Axios for API communication
- ✅ Modern UI with Tailwind CSS
- ✅ Unit tests with Vitest and React Testing Library

### Backend (Node.js + Express)

- ✅ RESTful API endpoints
- ✅ JWT Authentication with bcrypt password hashing
- ✅ MySQL database with proper relationships
- ✅ Input validation and error handling
- ✅ CORS enabled for frontend communication
- ✅ Environment variables for configuration

### Task Features

- ✅ Create, Read, Update, Delete tasks
- ✅ Task status: Pending, In Progress, Completed
- ✅ Priority levels: Low, Medium, High
- ✅ Due dates with overdue detection
- ✅ Task filtering and sorting capabilities

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- Git

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd mern-task-management
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd backend
npm install
```

#### Database Setup

1. Create a MySQL database named `mern_task_db`
2. Import the schema:

```bash
mysql -u root -p mern_task_db < database/schema.sql
```

#### Environment Configuration

Create a `.env` file in the backend directory:

```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=mern_task_db
```

#### Start the Backend Server

```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies

```bash
cd frontend
npm install
```

#### Start the Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🧪 Testing

### Run Frontend Tests

```bash
cd frontend
npm test
```

### Test Coverage

The project includes unit tests for:

- Component rendering
- Form validation functions
- User interactions

## 📊 API Endpoints

### Authentication

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/profile` - Get user profile (protected)

### Tasks

- `GET /api/tasks` - Get user's tasks with filtering/sorting
- `POST /api/tasks` - Create new task (protected)
- `GET /api/tasks/:id` - Get specific task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

### Query Parameters for Tasks

- `status` - Filter by status (pending, in_progress, completed)
- `priority` - Filter by priority (low, medium, high)
- `sortBy` - Sort field (created_at, due_date, title, priority)
- `order` - Sort order (ASC, DESC)

## 🎨 UI Features

### Responsive Design

- Mobile-first approach
- Tailwind CSS for styling
- Accessible design patterns

### Interactive Elements

- Real-time task status updates
- Drag-and-drop task completion
- Contextual task statistics
- Advanced filtering and sorting

## 📱 Pages

1. **Register Page** - User registration with validation
2. **Login Page** - User authentication
3. **Dashboard** - Main interface with:
   - Task statistics cards
   - Task list with filters
   - Task creation modal
   - User profile dropdown

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation and sanitization
- CORS configuration
- SQL injection prevention

## 🚀 Deployment Options

### Free Deployment Platforms

- **Frontend**: Vercel, Netlify
- **Backend**: Render, Railway, Heroku
- **Database**: PlanetScale, Aiven, Railway

### Environment Variables for Production

Update the backend `.env` file with production values:

```env
NODE_ENV=production
JWT_SECRET=production-jwt-secret-very-long-and-secure
DB_HOST=your-production-db-host
DB_USER=your-production-db-user
DB_PASSWORD=your-production-db-password
```

## 📈 Performance Features

- Optimized API queries
- Efficient state management
- Lazy loading where applicable
- Responsive caching strategies

## 🔧 Development Scripts

### Backend

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Frontend

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm test           # Run tests
npm run lint       # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Bonus Features Implemented

- ✅ **State Management**: Context API with useReducer
- ✅ **Advanced Filtering**: Multiple filter options
- ✅ **Sorting**: Multiple sort criteria
- ✅ **Unit Tests**: React Testing Library + Vitest
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Modern UI**: Tailwind CSS with custom components
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Loading States**: User feedback during operations

## 📞 Support

For any questions or issues, please open an issue in the repository or contact the development team.

---

**Happy Task Managing! 🎉**
