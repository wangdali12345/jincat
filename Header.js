import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const Header = () => {
  return (
    <nav className="apple-nav">
      <div className="apple-container">
        <div className="flex items-center justify-between h-12 md:h-14">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-lg md:text-xl font-semibold text-black hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl">🐱</span>
            <span className="hidden sm:inline">杭州自家小猫咪-李先生</span>
            <span className="sm:hidden">杭州小猫咪</span>
          </Link>
          
          {/* Navigation */}
          <div className="flex items-center gap-4 md:gap-8">
            <Link 
              to="/" 
              className="apple-nav-item"
            >
              概览
            </Link>
            <Link 
              to="/add" 
              className="apple-btn apple-btn-primary text-sm"
            >
              <Plus size={16} className="mr-1" />
              添加猫咪
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;