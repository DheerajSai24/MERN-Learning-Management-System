# 🎓 MERN Learning Management System

![LMS Banner](https://placehold.co/1200x400/5c6bc0/ffffff?text=MERN+Learning+Management+System&font=montserrat)

<div align="center">
  
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0.0-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Vite](https://img.shields.io/badge/Vite-4.5.14-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Clerk Auth](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=for-the-badge)](https://clerk.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

</div>

## 📋 Table of Contents

- [🚀 Live Demo](#-live-demo)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📊 System Architecture](#-system-architecture)
- [🖼️ Screenshots](#️-screenshots)
- [🚀 Getting Started](#-getting-started-1)
- [👥 User Roles & Permissions](#-user-roles--permissions)
- [📱 Responsive Design](#-responsive-design)
- [🔒 Security Features](#-security-features)
- [🌐 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [🔮 Future Roadmap](#-future-roadmap)
- [👨‍💻 About Me](#-about-me)
- [📄 License](#-license)

## 🚀 Live Demo

Experience the application live: [MERN Learning Management System](https://dheerajsai24.github.io/MERN-Learning-Management-System/)

### Demo Credentials
- **Teacher**: teacher@example.com / teacher123
- **Student**: student@example.com / student123

## ✨ Features

### 🎯 Core Functionality
- **Dual Role System**: Separate interfaces and permissions for students and instructors
- **Dynamic Dashboard**: Personalized overview showing courses, assignments, and progress
- **Course Management**: Browse, join, and interact with courses and their materials
- **Assignment System**: Submit, track, and grade assignments with detailed feedback
- **Notes & Resources**: Create personal study notes and access shared resources
- **Discussion Forums**: Participate in course-specific discussions and Q&A
- **Progress Tracking**: Visual indicators of course completion and grades
- **Responsive Design**: Optimized experience across desktop, tablet, and mobile devices

### 👨‍🎓 For Students
- **Learning Dashboard**: At-a-glance view of enrolled courses, upcoming deadlines, and progress
- **Course Explorer**: Discover and enroll in available courses with detailed descriptions
- **Assignment Manager**: View, filter, and submit assignments with file uploads
- **Personal Notes**: Create, tag, and organize study notes for each course
- **Resource Library**: Access and download course materials and readings
- **Progress Reports**: Track grades and completion status across all courses
- **Discussion Participation**: Ask questions and participate in course discussions

### 👨‍🏫 For Teachers
- **Instructor Dashboard**: Monitor student activity, course engagement, and pending tasks
- **Course Creator**: Build and publish comprehensive courses with multi-media content
- **Assignment Designer**: Create, schedule, and manage assignments with custom rubrics
- **Grading Center**: Review submissions, provide feedback, and assign grades
- **Student Progress**: Track individual and class-wide performance metrics
- **Resource Management**: Upload and organize course materials and readings
- **Discussion Moderation**: Guide and moderate course-specific discussions

## 🛠️ Tech Stack

### Frontend Architecture
- **React 18** with functional components and hooks for efficient UI rendering
- **Vite** for lightning-fast development and optimized production builds
- **React Router v6** for seamless navigation and protected routes
- **Clerk Authentication** for secure, feature-rich user management
- **Modern CSS** with responsive design principles and custom animations
- **Font Awesome** icons for consistent and accessible visual elements

### Backend Infrastructure
- **Node.js** runtime environment for scalable server-side applications
- **Express.js** framework for robust API development with middleware support
- **MongoDB** NoSQL database for flexible data storage and retrieval
- **Mongoose ODM** for data modeling, validation, and relationship management
- **JWT Authentication** for secure API access and role-based permissions
- **RESTful API** design with consistent endpoints and response formats

### DevOps & Deployment
- **GitHub Actions** for CI/CD pipeline automation
- **GitHub Pages** for frontend hosting with automatic deployment
- **Environment Variables** for secure configuration management
- **Cross-Origin Resource Sharing (CORS)** for secure cross-domain requests

## 📊 System Architecture

The MERN Learning Management System follows a robust three-tier architecture:

![System Architecture](https://placehold.co/1200x600/f6f9fc/5c6bc0?text=LMS+System+Architecture&font=montserrat)

### Database Schema

The application uses MongoDB with the following collections:

#### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  role: String (teacher/student),
  profileInfo: {
    avatar: String,
    bio: String,
    phone: String
  },
  settings: {
    twoFactorEnabled: Boolean,
    connectedAccounts: {
      google: Boolean,
      github: Boolean
    },
    notifications: {
      courseUpdates: Boolean,
      assignmentReminders: Boolean,
      discussionReplies: Boolean,
      promotionalEmails: Boolean
    },
    display: {
      theme: String,
      fontSize: String
    },
    language: String
  },
  enrolledCourses: [ObjectId],
  progress: [
    {
      course: ObjectId,
      completedUnits: [String],
      lastAccessed: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

#### Courses Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  teacherId: ObjectId,
  resources: [
    {
      title: String,
      type: String,
      url: String,
      uploadDate: Date
    }
  ],
  students: [ObjectId],
  syllabus: [
    {
      week: Number,
      title: String,
      description: String,
      units: [
        {
          title: String,
          content: String,
          resources: [ObjectId]
        }
      ]
    }
  ],
  startDate: Date,
  endDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Assignments Collection
```javascript
{
  _id: ObjectId,
  courseId: ObjectId,
  title: String,
  description: String,
  deadline: Date,
  totalPoints: Number,
  submissions: [
    {
      studentId: ObjectId,
      submissionDate: Date,
      files: [String],
      grade: Number,
      feedback: String,
      status: String
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

#### Notes Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  courseId: ObjectId,
  title: String,
  content: String,
  tags: [String],
  lastEdited: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Discussions Collection
```javascript
{
  _id: ObjectId,
  courseId: ObjectId,
  title: String,
  content: String,
  createdBy: ObjectId,
  replies: [
    {
      userId: ObjectId,
      content: String,
      timestamp: Date
    }
  ],
  isPinned: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Installation

#### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/dheerajsai24/MERN-Learning-Management-System.git
   cd MERN-Learning-Management-System
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

#### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install server dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000`

### Database Seeding
To populate the database with initial test data:

```bash
cd server
node scripts/seedDatabase.js
```

This will create sample users, courses, assignments, and other data for testing.

## 📱 User Interface

The LMS features a clean, intuitive interface designed for optimal user experience across all devices.

### Dashboard View
![Dashboard](https://placehold.co/1200x600/f6f9fc/5c6bc0?text=Dashboard+Screenshot&font=montserrat)

### Course Page
![Course Page](https://placehold.co/1200x600/f6f9fc/5c6bc0?text=Course+Page+Screenshot&font=montserrat)

### Assignment Submission
![Assignment Submission](https://placehold.co/1200x600/f6f9fc/5c6bc0?text=Assignment+Submission+Screenshot&font=montserrat)

## 🔑 Authentication (Clerk)

This LMS uses [Clerk](https://clerk.com/) for secure user authentication. Users must sign in to access dashboard features. Clerk handles sign-in, sign-up, and user profile management.

### Clerk Integration Highlights
- Clerk authentication is enabled for all dashboard routes.
- Sign-in and sign-up pages are available at `/sign-in` and `/sign-up`.
- User profile and sign-out options are available via the Clerk UserButton in the dashboard.

### Setup Steps
1. Install Clerk React SDK:
  ```bash
  npm install @clerk/clerk-react
  ```
2. Add your Clerk publishable key to a `.env` file in the project root:
  ```env
  VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
  ```
3. The app is wrapped with `<ClerkProvider>` in `src/main.jsx`:
  ```jsx
  import { ClerkProvider } from '@clerk/clerk-react';
  // ...existing code...
  <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
  // ...existing code...
  ```
4. Protected routes use Clerk's `<SignedIn>`, `<SignedOut>`, and `<RedirectToSignIn />` components in `src/App.jsx`.
5. User profile and sign-out are available via `<UserButton />` in the dashboard layout.

## 🔍 Backend API Reference

### Authentication Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| POST | `/api/auth/register` | Register a new user | `{name, email, password, role}` | `{user, token}` |
| POST | `/api/auth/login` | Login existing user | `{email, password}` | `{user, token}` |
| GET | `/api/auth/profile` | Get current user profile | N/A | `{user}` |
| PUT | `/api/auth/profile` | Update user profile | `{name, bio, avatar}` | `{user}` |
| PUT | `/api/auth/password` | Update user password | `{currentPassword, newPassword}` | `{success}` |
| PUT | `/api/auth/settings` | Update user settings | `{settings: {...}}` | `{user}` |
| GET | `/api/auth/export` | Export user data | N/A | User data JSON |
| DELETE | `/api/auth/delete` | Delete user account | `{password}` | `{success}` |

### Course Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| GET | `/api/courses` | Get all courses | N/A | `[courses]` |
| GET | `/api/courses/:id` | Get course details | N/A | `{course}` |
| POST | `/api/courses` | Create new course | `{title, description, ...}` | `{course}` |
| PUT | `/api/courses/:id` | Update course | `{title, description, ...}` | `{course}` |
| DELETE | `/api/courses/:id` | Delete course | N/A | `{success}` |
| POST | `/api/courses/:id/enroll` | Enroll in course | N/A | `{success}` |

### Assignment Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| GET | `/api/assignments` | Get all assignments | N/A | `[assignments]` |
| GET | `/api/assignments/:id` | Get assignment details | N/A | `{assignment}` |
| POST | `/api/assignments` | Create new assignment | `{title, description, ...}` | `{assignment}` |
| PUT | `/api/assignments/:id` | Update assignment | `{title, description, ...}` | `{assignment}` |
| DELETE | `/api/assignments/:id` | Delete assignment | N/A | `{success}` |
| POST | `/api/assignments/:id/submit` | Submit assignment | `{files, comment}` | `{submission}` |
| PUT | `/api/assignments/:id/grade/:submissionId` | Grade submission | `{grade, feedback}` | `{submission}` |

### Additional Endpoints

Notes, Discussions, and Resources endpoints follow similar RESTful patterns. For complete API documentation, refer to the server-side code or run the backend with Swagger documentation enabled.

## 🔒 Security Features

- **JWT Authentication**: Secure API access with expiring tokens
- **Password Hashing**: Bcrypt for secure password storage
- **Input Validation**: Comprehensive server-side validation of all user inputs
- **Role-Based Access Control**: Teacher/Student permission separation
- **Two-Factor Authentication**: Optional enhanced login security
- **CORS Protection**: Configured for secure cross-origin requests
- **Environment Variables**: Secure storage of sensitive configuration
- **Rate Limiting**: Protection against brute force and DoS attacks

## 🔄 Deployment

### GitHub Pages (Frontend)

The frontend is configured for deployment to GitHub Pages:

1. Make sure your changes are committed and pushed to the main branch
2. Run the deployment command:
   ```bash
   npm run deploy
   ```
3. Your site will be deployed to: https://dheerajsai24.github.io/MERN-Learning-Management-System/

### Backend Deployment Options

#### Heroku
1. Create a Heroku account and install the Heroku CLI
2. Create a new app: `heroku create your-lms-backend`
3. Add MongoDB URI to Heroku config: `heroku config:set MONGODB_URI=your_mongodb_uri`
4. Add JWT secret: `heroku config:set JWT_SECRET=your_jwt_secret`
5. Deploy: `git subtree push --prefix server heroku main`

#### Render
1. Create a new Web Service in Render dashboard
2. Connect your GitHub repository
3. Specify the build command: `npm install`
4. Specify the start command: `npm start`
5. Add environment variables in the Render dashboard
6. Deploy

## 📚 Code Structure

```
/
├── public/                  # Static files and resources
│   ├── resources/           # Course materials and resources
│   │   ├── assignments/     # Assignment PDFs and materials
│   │   ├── course-materials/# Course content and downloads
│   │   └── reading-materials/# Additional reading resources
├── server/                  # Backend Node.js application
│   ├── controllers/         # API route controllers
│   ├── middleware/          # Express middleware (auth, validation)
│   ├── models/              # Mongoose data models
│   ├── routes/              # API route definitions
│   ├── scripts/             # Database and utility scripts
│   ├── package.json         # Server dependencies
│   └── server.js            # Entry point for the backend
├── src/                     # Frontend React application
│   ├── assets/              # Images, icons, and static assets
│   ├── components/          # Reusable UI components
│   ├── context/             # React context providers
│   ├── pages/               # Main application views
│   ├── services/            # API service integrations
│   ├── styles/              # Global CSS and style utilities
│   ├── App.jsx              # Root component with routing
│   └── main.jsx             # Application entry point
├── .env.example             # Example environment variables
├── package.json             # Frontend dependencies
├── vite.config.js           # Vite configuration
└── README.md                # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please ensure your code follows the project's style guidelines and includes appropriate tests.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- React.js and the entire MERN stack community
- Clerk for their authentication solutions
- Font Awesome for UI icons
- All contributors and testers who helped improve this project

---

Developed with ❤️ by [Dheeraj Sai](https://github.com/dheerajsai24)

## 🚀 Features

### For Students
- **Dashboard Overview**
  - Quick view of ongoing courses
  - Upcoming assignments and deadlines
  - Course progress tracking
  - Recent activities

- **Assignment Management**
  - View all assignments with status (Pending/In Progress/Done)
  - Filter assignments by course and status
  - Search functionality
  - Submit assignments with file upload
  - Track submission status and grades

- **Course Access**
  - Browse enrolled courses
  - Access course materials
  - Track course progress
  - View course-specific assignments

### For Teachers
- **Course Management**
  - Create and manage courses
  - Add/remove students
  - Post course materials
  - Track student progress

- **Assignment Control**
  - Create and schedule assignments
  - Set due dates and points
  - Grade submissions
  - Provide feedback

## 🛠️ Tech Stack

### Frontend
- React (with Vite)
- Clerk authentication
- React Router v6 for navigation
- Modern CSS with module support

### Backend
- Node.js with Express.js
- MongoDB database with Mongoose ODM
- JWT authentication
- RESTful API design

## 📊 Database Structure

The LMS uses MongoDB with the following collections:

### Users
- **Fields**: name, email, password (hashed), role (teacher/student), profileInfo, enrolledCourses, progress
- **Purpose**: Stores user account information and tracks course enrollment and progress
- **Relationships**: Links to courses through enrolledCourses and progress arrays

### Courses
- **Fields**: title, description, teacherId, resources, students, syllabus, startDate, endDate
- **Purpose**: Stores course information including content structure and enrolled students
- **Relationships**: Links to teacher (User) and enrolled students (Users)

### Assignments
- **Fields**: courseId, title, description, deadline, totalPoints, submissions
- **Purpose**: Stores assignment details and student submissions
- **Relationships**: Links to course and student submissions

### Discussions
- **Fields**: courseId, userId, title, content, comments, tags
- **Purpose**: Stores discussion threads and comments for course-related discussions
- **Relationships**: Links to course and users (original poster and commenters)

### Notes
- **Fields**: studentId, courseId, title, content, tags, attachments
- **Purpose**: Stores personal notes created by students for specific courses
- **Relationships**: Links to student (User) and course

## 👥 User Roles and Permissions

The LMS implements strict role-based access control to ensure that users can only access features appropriate for their role:

### Teacher Role
Teachers have full control over courses they create:
- Create and manage courses
- Add learning materials and resources
- Create, update, and delete assignments
- Grade student submissions
- View all student information related to their courses

### Student Role
Students can access learning materials and participate in courses:
- Browse and enroll in available courses
- Access course materials and resources
- Submit assignments before deadlines
- View their own grades and feedback
- Create and manage personal notes
- Participate in discussions

### Role Enforcement
Role-based access control is implemented at multiple levels:
1. **API Routes**: Protected by middleware that checks user roles
2. **Controllers**: Additional validation to ensure proper access permissions
3. **Frontend**: UI elements are conditionally rendered based on user role

## 🔐 Authentication Flow

1. **Registration**: Users register with name, email, password, and select a role (teacher/student)
2. **Login**: Users login with email and password to receive a JWT token
3. **API Access**: Token is included in Authorization header for all protected requests
4. **Role Verification**: Server verifies both authentication and appropriate role access for each request

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB installed locally or access to MongoDB Atlas

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/DheerajSai24/mern-learning-management-system.git
   cd mern-learning-management-system
   ```

2. Install dependencies for both client and server:
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the server directory with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/lms
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   ```

4. Seed the database with sample data:
   ```bash
   cd server
   npm run seed
   ```
   This creates sample users, courses, and assignments to help you get started.

5. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev
   
   # In another terminal, start frontend
   cd ..
   npm run dev
   ```

### Sample Login Credentials
The seed script creates the following users:

- **Teacher Account**:
  - Email: teacher@example.com
  - Password: teacher123

- **Student Accounts**:
  - Email: alice@example.com
  - Password: student123
  - Email: bob@example.com
  - Password: student123
- Font Awesome for icons
- Responsive design for all devices

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ORM
- JWT for authentication
- Bcrypt for password hashing
- CORS enabled
- Role-based access control

## 📦 Project Structure

```
lms/
├── src/                   # Frontend source code
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── context/          # React context
│   ├── assets/           # Static assets
│   └── styles/           # CSS modules
│
└── server/               # Backend source code
    ├── models/           # Database models
    ├── routes/           # API routes
    ├── controllers/      # Business logic
    ├── middleware/       # Custom middleware
    └── config/           # Configuration files
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd lms
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Set up Environment Variables**
   Create a .env file in the server directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/lms_db
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. **Start the Development Servers**

   Frontend:
   ```bash
   npm run dev
   ```

   Backend:
   ```bash
   cd server
   npm run dev
   ```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Clerk Authentication
- `/sign-in` - Clerk sign-in page
- `/sign-up` - Clerk sign-up page

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `GET /api/courses/:id` - Get course details
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Assignments
- `GET /api/assignments` - Get all assignments
- `POST /api/assignments` - Create new assignment
- `GET /api/assignments/:id` - Get assignment details
- `PUT /api/assignments/:id` - Update assignment
- `DELETE /api/assignments/:id` - Delete assignment
- `POST /api/assignments/:id/submit` - Submit assignment
- `PUT /api/assignments/:id/grade` - Grade assignment

## 🎨 UI Features

- Clean and modern design
- Responsive layout
- Card-based UI components
- Interactive dashboard
- Progress visualization
- Status indicators
- Search and filter capabilities
- User-friendly forms
- Loading states and animations

## 🔐 Security Features

- JWT Authentication
- Password hashing
- Role-based access control
- Protected routes
- Input validation
- Error handling
- Session management
- Clerk authentication for frontend routes

## 🎯 Future Enhancements

- [ ] Real-time notifications
- [ ] Video conferencing integration
- [ ] Discussion forums
- [ ] Quiz/exam module
- [ ] File storage integration
- [ ] Analytics dashboard
- [ ] Mobile app version
- [ ] Email notifications

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📥 How to Clone and Run This Project

1. **Clone the repository from GitHub**
  ```bash
  git clone https://github.com/dheerajsai24/MERN-Learning-Management-System.git
  cd mern-learning-management-system
  ```

2. **Install frontend dependencies**
  ```bash
  npm install
  ```

3. **Install backend dependencies**
  ```bash
  cd server
  npm install
  cd ..
  ```

4. **Set up environment variables**
  - For frontend: create a `.env` file in the root and add your Clerk publishable key:
    ```env
    VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    ```
  - For backend: create a `.env` file in the `server` folder and add your MongoDB URI, JWT secret, and port:
    ```env
    MONGODB_URI=mongodb://localhost:27017/lms_db
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```

5. **Start the development servers**
  - Frontend:
    ```bash
    npm run dev
    ```
  - Backend:
    ```bash
    cd server
    npm run dev
    ```

## ✅ Required Actions After Cloning

- Add your Clerk publishable key to the frontend `.env` file.
- Add your MongoDB URI and JWT secret to the backend `.env` file.
- Install all dependencies with `npm install` in both root and `server` folders.
- Start both frontend and backend servers as described above.
- Visit `http://localhost:5173` (or the port shown in your terminal) to access the LMS frontend.

---
