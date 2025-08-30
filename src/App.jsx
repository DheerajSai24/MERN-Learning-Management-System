import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { SignedIn, SignedOut, RedirectToSignIn } from './components/ClerkAuth';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import { RecordingsProvider } from './context/RecordingsContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Assignments from './pages/Assignments';
import Notes from './pages/Notes';
import Schedule from './pages/Schedule';
import Recordings from './pages/Recordings';
import Discussions from './pages/Discussions';
import Resources from './pages/Resources';
import Downloads from './pages/Downloads';
import Classes from './pages/Classes';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Settings from './pages/Settings';
import './App.css';

const App = () => {
  // State for responsive sidebar toggle
  const [sidebarOpen, setSidebarOpen] = React.useState(window.innerWidth > 768);
  
  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  // Listen for window resize to auto-adjust sidebar on desktop
  React.useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Layout component for pages that need Sidebar and Topbar
  const DashboardLayout = ({ children }) => (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Topbar toggleSidebar={toggleSidebar} />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <RecordingsProvider>
        <div className="app">
          <Routes>
            {/* Clerk authentication routes */}
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />

            {/* Home page with its own layout */}
            <Route path="/" element={<Home />} />

            {/* Protected dashboard routes */}
            <Route path="/dashboard" element={
              <>
                <SignedIn>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } />
            <Route path="/assignments" element={
              <>
                <SignedIn>
                  <DashboardLayout>
                    <Assignments />
                  </DashboardLayout>
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } />
            <Route path="/notes" element={
              <>
                <SignedIn>
                  <DashboardLayout>
                    <Notes />
                  </DashboardLayout>
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } />
            <Route path="/downloads" element={
              <>
                <SignedIn>
                  <DashboardLayout>
                    <Downloads />
                  </DashboardLayout>
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } />
            <Route path="/classes" element={
              <>
                <SignedIn>
                  <DashboardLayout>
                    <Classes />
                  </DashboardLayout>
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } />
            <Route path="/courses" element={
              <>
                <SignedIn>
                  <DashboardLayout>
                    <Courses />
                  </DashboardLayout>
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } />
            <Route path="/courses/:id" element={
              <>
                <SignedIn>
                  <DashboardLayout>
                    <CourseDetail />
                  </DashboardLayout>
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } />
            <Route path="/settings" element={
              <>
                <SignedIn>
                  <DashboardLayout>
                    <Settings />
                  </DashboardLayout>
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } />
            <Route path="/schedule" element={
              <>
                <SignedIn>
                  <DashboardLayout>
                    <Schedule />
                  </DashboardLayout>
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } />
            <Route path="/recordings" element={
              <>
                <SignedIn>
                  <DashboardLayout>
                    <Recordings />
                  </DashboardLayout>
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } />
            <Route path="/discussions" element={
              <>
                <SignedIn>
                  <DashboardLayout>
                    <Discussions />
                  </DashboardLayout>
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } />
            <Route path="/resources" element={
              <>
                <SignedIn>
                  <DashboardLayout>
                    <Resources />
                  </DashboardLayout>
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } />
          </Routes>
        </div>
      </RecordingsProvider>
    </Router>
  );
};

export default App;
