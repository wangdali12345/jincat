import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Plus, Heart } from 'lucide-react';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* 移动端菜单按钮 */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 移动端导航菜单 */}
      <div className={`md:hidden fixed inset-0 z-40 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* 背景遮罩 */}
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={closeMenu}
        />
        
        {/* 菜单内容 */}
        <nav className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-primary">导航菜单</h2>
              <button
                onClick={closeMenu}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X size={20} className="text-secondary" />
              </button>
            </div>

            <div className="space-y-4">
              <Link
                to="/"
                onClick={closeMenu}
                className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                  isActive('/') ? 'bg-primary text-white' : 'hover:bg-secondary text-secondary'
                }`}
              >
                <Home size={20} />
                <span className="font-medium">首页</span>
              </Link>

              <Link
                to="/add"
                onClick={closeMenu}
                className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                  isActive('/add') ? 'bg-primary text-white' : 'hover:bg-secondary text-secondary'
                }`}
              >
                <Plus size={20} />
                <span className="font-medium">添加猫咪</span>
              </Link>

              <div className="border-t pt-4 mt-4">
                <div className="text-sm text-light mb-2">快速操作</div>
                <button className="flex items-center gap-3 p-4 rounded-lg hover:bg-secondary text-secondary w-full text-left">
                  <Heart size={20} />
                  <span className="font-medium">我喜欢的猫咪</span>
                </button>
              </div>
            </div>

            {/* 页脚信息 */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-center text-sm text-light">
                <p>🐱 金渐层猫咪展示</p>
                <p className="mt-2">发现和分享可爱的猫咪</p>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileNav;