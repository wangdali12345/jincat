import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin, Weight, Syringe, Scissors, Share2, Calendar } from 'lucide-react';
import { catManager } from '../data/catData';

const CatDetail = () => {
  const { id } = useParams();
  const [cat, setCat] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const catData = catManager.getCatById(id);
    if (catData) {
      setCat(catData);
    }
  }, [id]);

  const handlePreviousImage = () => {
    if (cat.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? cat.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (cat.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === cat.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cat.name} - 杭州自家小猫咪`,
          text: `来看看${cat.name}，一只${cat.age}的${cat.breed}！${cat.personality}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('分享失败:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('链接已复制到剪贴板！');
    }
  };

  if (!cat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-8">😿</div>
          <h2 className="apple-headline-3 mb-4">猫咪信息未找到</h2>
          <p className="apple-body mb-8 max-w-md">
            该猫咪可能已被删除或不存在
          </p>
          <Link to="/" className="apple-btn apple-btn-primary">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* 返回和操作按钮 */}
      <div className="apple-container py-8">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 apple-nav-item hover:text-black"
          >
            <ArrowLeft size={18} />
            返回概览
          </Link>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleShare}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Share2 size={20} className="text-gray-600" />
            </button>
            
            <button
              onClick={handleLike}
              className={`p-3 rounded-full transition-colors ${
                isLiked ? 'bg-red-50' : 'hover:bg-gray-100'
              }`}
            >
              <Heart 
                size={20} 
                className={isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'} 
              />
            </button>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <section className="pb-20">
        <div className="apple-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* 左侧：图片区域 */}
            <div>
              <div className="apple-fade-in">
                <div className="relative rounded-2xl overflow-hidden shadow-heavy">
                  {/* 主图片 */}
                  <div className="relative aspect-[4/3]">
                    <img 
                      src={cat.images[currentImageIndex] || 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop'} 
                      alt={cat.name}
                      className="apple-image w-full h-full"
                    />
                    
                    {/* 图片导航 */}
                    {cat.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePreviousImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all hover:scale-110 shadow-lg"
                        >
                          <ArrowLeft size={20} />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all hover:scale-110 shadow-lg"
                        >
                          <ArrowLeft size={20} className="rotate-180" />
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* 缩略图 */}
                  {cat.images.length > 1 && (
                    <div className="flex gap-3 p-6 bg-gray-50">
                      {cat.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                            index === currentImageIndex 
                              ? 'border-blue-500 shadow-lg scale-105' 
                              : 'border-transparent hover:border-gray-300'
                          }`}
                        >
                          <img 
                            src={image} 
                            alt={`${cat.name} ${index + 1}`}
                            className="apple-image w-full h-full"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 右侧：信息区域 */}
            <div className="space-y-8">
              {/* 标题区域 */}
              <div className="apple-fade-in" style={{animationDelay: '0.1s'}}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="apple-headline-2 mb-3">{cat.name}</h1>
                    <p className="apple-subhead">{cat.breed}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full font-semibold text-lg">
                      {cat.age}
                    </span>
                  </div>
                </div>

                <p className="apple-body leading-relaxed mb-8">
                  {cat.description || `这是一只可爱的${cat.breed}，性格${cat.personality}。经过精心照料，健康活泼，等待与您相遇。`}
                </p>

                {/* 性格特点 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">性格特点</h3>
                  <p className="apple-body">{cat.personality || '温顺可爱，亲人友善'}</p>
                </div>
              </div>

              {/* 详细信息网格 */}
              <div className="apple-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-light p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <MapPin size={22} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="apple-caption text-gray-600 mb-1">所在地</p>
                        <p className="font-semibold text-lg">杭州 • 可探访</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-light p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Weight size={22} className="text-green-600" />
                      </div>
                      <div>
                        <p className="apple-caption text-gray-600 mb-1">体重</p>
                        <p className="font-semibold text-lg">{cat.weight || '待测量'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-light p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Syringe size={22} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="apple-caption text-gray-600 mb-1">疫苗接种</p>
                        <p className="font-semibold text-lg">
                          {cat.vaccinated ? '已完成' : '未完成'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-light p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Scissors size={22} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="apple-caption text-gray-600 mb-1">绝育状态</p>
                        <p className="font-semibold text-lg">
                          {cat.neutered ? '已绝育' : '未绝育'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA按钮区域 */}
              <div className="apple-fade-in" style={{animationDelay: '0.3s'}}>
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button className="apple-btn apple-btn-primary flex-1">
                    预约探访
                  </button>
                  <Link 
                    to="/"
                    className="apple-btn apple-btn-secondary flex-1"
                  >
                    继续浏览
                  </Link>
                </div>
              </div>

              {/* 元信息 */}
              <div className="apple-fade-in" style={{animationDelay: '0.4s'}}>
                <div className="flex items-center gap-2 text-gray-500 pt-4">
                  <Calendar size={16} />
                  <span className="apple-caption">
                    添加于 {cat.addedDate || '未知'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CatDetail;