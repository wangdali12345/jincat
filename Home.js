import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import CatCard from '../components/CatCard';
import { catManager } from '../data/catData';

const Home = () => {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const allCats = catManager.getAllCats();
    setCats(allCats);
    setFilteredCats(allCats);
  }, []);

  useEffect(() => {
    let result = [...cats];

    if (searchTerm) {
      result = result.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.personality.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterGender !== 'all') {
      result = result.filter(cat => cat.gender === filterGender);
    }

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.addedDate) - new Date(b.addedDate));
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
        break;
      case 'age':
        result.sort((a, b) => {
          const ageA = parseInt(a.age) || 0;
          const ageB = parseInt(b.age) || 0;
          return ageB - ageA;
        });
        break;
      default:
        break;
    }

    setFilteredCats(result);
  }, [cats, searchTerm, filterGender, sortBy]);

  return (
    <div>
      {/* 英雄区域 */}
      <section className="apple-hero">
        <div className="apple-fade-in max-w-4xl mx-auto">
          <h1 className="apple-headline-1 mb-8">
            杭州自家小猫咪
          </h1>
          <p className="apple-subhead mb-12 max-w-2xl mx-auto">
            精心培育的金渐层猫咪，每一只都是独一无二的珍贵宝贝。李先生的猫咪庄园，为您呈现最优雅的金渐层家族。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#cats" className="apple-btn apple-btn-primary">
              浏览猫咪
            </a>
            <a href="/add" className="apple-btn apple-btn-secondary">
              添加新猫咪
            </a>
          </div>
        </div>
      </section>

      {/* 统计区域 */}
      <section className="py-20 bg-gray-50">
        <div className="apple-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="apple-fade-in">
              <div className="text-5xl font-bold mb-2">{cats.length}</div>
              <div className="apple-body">只珍贵猫咪</div>
            </div>
            <div className="apple-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="apple-body">纯种金渐层</div>
            </div>
            <div className="apple-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="apple-body">精心照料</div>
            </div>
          </div>
        </div>
      </section>

      {/* 搜索和筛选区域 */}
      <section className="py-16">
        <div className="apple-container">
          <div className="max-w-3xl mx-auto">
            <div className="apple-card shadow-medium p-8">
              <h2 className="apple-headline-4 mb-6 text-center">寻找您心仪的猫咪</h2>
              
              <div className="space-y-6">
                {/* 搜索框 */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="搜索猫咪名字、品种或性格..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="apple-input pl-12 pr-4 py-4 text-lg"
                  />
                </div>

                {/* 筛选和排序 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    value={filterGender}
                    onChange={(e) => setFilterGender(e.target.value)}
                    className="apple-input"
                  >
                    <option value="all">所有性别</option>
                    <option value="公猫">公猫</option>
                    <option value="母猫">母猫</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="apple-input"
                  >
                    <option value="newest">最新添加</option>
                    <option value="oldest">最早添加</option>
                    <option value="name">按名字排序</option>
                    <option value="age">按年龄排序</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 猫咪展示区域 */}
      <section id="cats" className="py-16">
        <div className="apple-container">
          <div className="text-center mb-12">
            <h2 className="apple-headline-3 mb-4">精选猫咪</h2>
            <p className="apple-subhead">
              {filteredCats.length > 0 ? `共 ${filteredCats.length} 只猫咪` : '暂无猫咪'}
            </p>
            {searchTerm && (
              <p className="apple-caption mt-2">
                搜索词: "{searchTerm}"
              </p>
            )}
          </div>

          {filteredCats.length > 0 ? (
            <div className="apple-grid apple-grid-3">
              {filteredCats.map((cat, index) => (
                <div 
                  key={cat.id} 
                  className="apple-fade-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <CatCard cat={cat} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-8">🔍</div>
              <h3 className="apple-headline-4 mb-4">
                没有找到匹配的猫咪
              </h3>
              <p className="apple-body mb-8 max-w-md mx-auto">
                试试调整搜索条件，或者添加第一只猫咪开始您的收藏之旅。
              </p>
              <a 
                href="/add"
                className="apple-btn apple-btn-primary"
              >
                添加第一只猫咪
              </a>
            </div>
          )}
        </div>
      </section>

      {/* 底部CTA区域 */}
      <section className="py-20 bg-gray-50">
        <div className="apple-container text-center">
          <h2 className="apple-headline-3 mb-4">准备好迎接您的新伙伴了吗？</h2>
          <p className="apple-subhead mb-8 max-w-2xl mx-auto">
            每一只猫咪都经过精心照料，等待与您相遇。立即浏览我们的猫咪家族，找到您的心仪之选。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#cats" className="apple-btn apple-btn-primary">
              立即浏览
            </a>
            <a href="/add" className="apple-btn apple-btn-secondary">
              添加猫咪
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;