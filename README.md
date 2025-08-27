# 📋 Task Management System - MERN Stack

> **Company Technical Assessment Project**

A full-stack task management application built with **MySQL**, **Express.js**, **React**, and **Node.js** (MERN Stack). This project demonstrates modern web development practices, authentication, CRUD operations, and cloud deployment.

## 🌐 Live Demo

- **Frontend (Deployed)**: [https://merntaskfront.netlify.app/](https://merntaskfront.netlify.app/)
- **Backend**: Hosted on Railway
- **Database**: MySQL on Clever Cloud
- **Repository**: [https://github.com/Nagesh0137/MERN-STACK](https://github.com/Nagesh0137/MERN-STACK)

## 🚀 Project Overview

This project was developed as a **company technical assessment** to demonstrate proficiency in:

- Full-stack web development with MERN stack
- Modern React patterns and hooks
- RESTful API design and implementation
- Database design and relationships
- Authentication and authorization
- Cloud deployment and DevOps
- Code organization and best practices

## ✨ Features

### 🎯 Core Functionality

- **User Authentication**: Secure registration and login with JWT
- **Task Management**: Complete CRUD operations for tasks
- **Task Organization**: Status tracking (Pending, In Progress, Completed)
- **Priority System**: Low, Medium, High priority levels
- **Due Date Management**: Set and track task deadlines
- **Advanced Filtering**: Filter by status, priority, and due dates
- **Real-time Updates**: Dynamic task statistics and counters

### 🛡️ Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes and middleware
- Input validation and sanitization
- CORS configuration

### 📱 User Experience

- Responsive design for all devices
- Intuitive dashboard with statistics
- Modern UI with Bootstrap
- Loading states and error handling
- Form validation with real-time feedback

## 🏗️ Technical Architecture

### Frontend (React)

- **Framework**: React 19.1.1 with Vite
- **Routing**: React Router DOM v7
- **State Management**: Context API + useReducer
- **HTTP Client**: Axios for API communication
- **Styling**: Bootstrap 5.3.8 + Bootstrap Icons
- **Testing**: Vitest + React Testing Library
- **Build Tool**: Vite for fast development and building

### Backend (Node.js + Express)

- **Runtime**: Node.js with Express.js framework
- **Authentication**: JWT with bcryptjs for password hashing
- **Database**: MySQL with mysql2 driver
- **Validation**: express-validator for input validation
- **Security**: CORS middleware for cross-origin requests
- **Environment**: dotenv for configuration management

### Database Schema (MySQL)

```sql
-- Users table for authentication
users: id, username, email, password, created_at, updated_at

-- Tasks table with relationships
tasks: id, title, description, status, priority, due_date, user_id, created_at, updated_at
```

## 🛠️ Installation & Local Development

### Prerequisites

- Node.js (v16 or higher)
- MySQL Server
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Nagesh0137/MERN-STACK.git
cd MERN-STACK
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd backend
npm install
```

#### Database Setup

1. Create a MySQL database
2. Import the schema:

```bash
mysql -u root -p your_database_name < database/schema.sql
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
DB_NAME=your_database_name
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

The project includes comprehensive tests for:

- Component rendering and functionality
- Form validation
- User authentication flows
- Task CRUD operations

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

## 🎨 UI/UX Features

### Design System

- Modern Bootstrap 5 design
- Responsive layout for all devices
- Consistent color scheme and typography
- Intuitive navigation and user flow

### Interactive Elements

- Dynamic task statistics dashboard
- Real-time task filtering and sorting
- Modal-based task creation/editing
- Smooth transitions and animations

## 🏗️ Project Structure

```
MERN-STACK/
├── backend/
│   ├── config/           # Database and app configuration
│   ├── database/         # SQL schema and setup files
│   ├── middleware/       # Authentication and validation
│   ├── routes/          # API route definitions
│   ├── public/          # Static files
│   ├── index.js         # Server entry point
│   └── package.json     # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # React Context for state management
│   │   ├── utils/       # Helper functions and validation
│   │   ├── tests/       # Unit tests
│   │   └── assets/      # Static assets
│   ├── public/          # Public assets
│   └── package.json     # Frontend dependencies
└── README.md            # Project documentation
```

## 🔒 Security Implementation

- **JWT Authentication**: Secure token-based authentication
- **Password Security**: bcrypt hashing with salt rounds
- **Input Validation**: Comprehensive server-side validation
- **SQL Protection**: Prepared statements to prevent injection
- **CORS Configuration**: Proper cross-origin resource sharing
- **Protected Routes**: Middleware-based route protection

## 🌐 Deployment Details

### Production Environment

- **Frontend**: Deployed on Netlify ([https://merntaskfront.netlify.app/](https://merntaskfront.netlify.app/))
- **Backend**: Hosted on Railway with auto-deployment
- **Database**: MySQL database on Clever Cloud
- **CI/CD**: Automated deployment pipeline from GitHub

### Deployment Features

- Environment-based configuration
- Automatic SSL certificates
- CDN integration for static assets
- Database connection pooling
- Error monitoring and logging

## 📈 Performance Optimizations

- **Frontend**: Vite build optimization, code splitting
- **Backend**: Efficient database queries, response caching
- **Database**: Indexed columns for faster queries
- **Network**: Compressed responses, optimized API calls

## 🎯 Company Assessment Criteria Addressed

This project demonstrates:

1. **Technical Proficiency**: Full-stack development with modern technologies
2. **Code Quality**: Clean, maintainable, and well-documented code
3. **Database Design**: Proper schema design and relationships
4. **Security**: Implementation of authentication and data protection
5. **Testing**: Unit tests and validation testing
6. **Deployment**: Cloud deployment with production-ready configuration
7. **Documentation**: Comprehensive project documentation
8. **Best Practices**: Following industry standards and conventions

## � Future Enhancements

- Real-time notifications with WebSockets
- File attachment support for tasks
- Team collaboration features
- Advanced reporting and analytics
- Mobile app development
- Integration with third-party services

## 👨‍� Developer

**Nagesh** - Full Stack Developer

- GitHub: [https://github.com/Nagesh0137](https://github.com/Nagesh0137)
- Project Repository: [https://github.com/Nagesh0137/MERN-STACK](https://github.com/Nagesh0137/MERN-STACK)

## 📄 License

This project is developed as a technical assessment and is available for educational purposes.

---

**Note**: This project was created as part of a company technical assessment to demonstrate full-stack development capabilities using the MERN stack with modern deployment practices.

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
