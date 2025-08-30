# Learning Management System (LMS)

A modern, responsive Learning Management System built with React and Node.js. This system provides a comprehensive platform for managing courses, assignments, and student progress.

## � Deployment to GitHub Pages

This project is configured for deployment to GitHub Pages using GitHub Actions.

### Manual Deployment Steps
1. Make sure your changes are committed and pushed to the main branch
2. Run the deployment command:
   ```bash
   npm run deploy
   ```
3. Your site will be deployed to: https://dheerajsai24.github.io/MERN-Learning-Management-System/

### Automatic Deployment
The project is configured with GitHub Actions. When you push to the main branch, it will automatically:
1. Build the project
2. Deploy to GitHub Pages

### Deployment Configuration
- The base URL is set in `vite.config.js` with `base: "/MERN-Learning-Management-System/"`
- HashRouter is used in `App.jsx` for proper routing in GitHub Pages
- GitHub Actions workflow is in `.github/workflows/deploy.yml`

## �🔑 Authentication (Clerk)

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

![LMS Dashboard](./src/assets/dashboard-preview.png)

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
