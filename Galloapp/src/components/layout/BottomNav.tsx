import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Clock, User } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();
  
  // Don't show bottom nav on login or register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
      <div className="grid grid-cols-4 h-16">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center ${
            location.pathname === '/' ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Inicio</span>
        </Link>
        
        <Link
          to="/team"
          className={`flex flex-col items-center justify-center ${
            location.pathname === '/team' ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          <Users size={20} />
          <span className="text-xs mt-1">Equipo</span>
        </Link>
        
        <Link
          to="/history"
          className={`flex flex-col items-center justify-center ${
            location.pathname === '/history' ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          <Clock size={20} />
          <span className="text-xs mt-1">Historial</span>
        </Link>
        
        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center ${
            location.pathname === '/profile' ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          <User size={20} />
          <span className="text-xs mt-1">Perfil</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;