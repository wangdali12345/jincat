import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin } from 'lucide-react';

const CatCard = ({ cat }) => {
  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('喜欢猫咪:', cat.name);
  };

  return (
    <Link to={`/cat/${cat.id}`} className="block">
      <div className="apple-card shadow-light">
        {/* 猫咪图片 */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <img 
            src={cat.images?.[0] || 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop'} 
            alt={cat.name}
            className="apple-image w-full h-full"
          />
          
          {/* 悬停时显示的操作按钮 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="text-white">
                <h3 className="text-xl font-semibold mb-1">{cat.name}</h3>
                <p className="text-sm opacity-90">{cat.breed}</p>
              </div>
              <button 
                onClick={handleLike}
                className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg"
              >
                <Heart size={20} className="text-red-500 fill-red-500" />
              </button>
            </div>
          </div>

          {/* 性别标签 */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-gray-800">{cat.gender}</span>
          </div>
        </div>

        {/* 猫咪信息 */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-1">{cat.name}</h3>
              <p className="apple-caption text-gray-600">{cat.breed} • {cat.age}</p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-gray-100 px-3 py-1 rounded-full">
                <span className="text-sm font-medium">{cat.weight || '待称重'}</span>
              </span>
            </div>
          </div>

          <p className="apple-body mb-4 line-clamp-2 min-h-[3em]">
            {cat.personality || '这是一只可爱的小猫咪，等待您的发现和了解。'}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin size={14} />
              <span>杭州 • 可探访</span>
            </div>
            <span className="apple-btn apple-btn-ghost text-sm">
              了解更多 →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CatCard;