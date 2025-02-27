import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useRegisterSW } from 'virtual:pwa-register/react';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Team from './pages/Team';
import History from './pages/History';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';

// Store
import { useAuthStore } from './store/authStore';
import { useNotificationsStore } from './store/notificationsStore';

function App() {
  const { isAuthenticated, user } = useAuthStore();
  const { fetchNotifications } = useNotificationsStore();
  
  // Register service worker for PWA
  const { updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered:', r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    }
  });
  
  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        useAuthStore.setState({ 
          user: parsedUser, 
          isAuthenticated: true 
        });
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
  }, []);
  
  useEffect(() => {
    // Fetch notifications when user is authenticated
    if (isAuthenticated && user) {
      fetchNotifications();
    }
  }, [isAuthenticated, user, fetchNotifications]);
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/team" element={isAuthenticated ? <Team /> : <Navigate to="/login" />} />
        <Route path="/history" element={isAuthenticated ? <History /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={isAuthenticated ? <Notifications /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;