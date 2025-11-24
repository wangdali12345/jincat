import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X, Camera } from 'lucide-react';
import { catManager } from '../data/catData';

const EditCat = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    breed: '金渐层',
    personality: '',
    description: '',
    gender: '公猫',
    weight: '',
    color: '',
    vaccinated: true,
    neutered: true,
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const catData = catManager.getCatById(id);
    if (catData) {
      setFormData(catData);
    } else {
      alert('猫咪信息未找到');
      navigate('/');
    }
    setLoading(false);
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, event.target.result]
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 基本验证
      if (!formData.name || !formData.age) {
        alert('请填写猫咪的名字和年龄');
        setIsSubmitting(false);
        return;
      }

      // 如果没有图片，使用默认图片
      if (formData.images.length === 0) {
        formData.images = ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop'];
      }

      // 更新猫咪数据
      const updatedCat = catManager.updateCat(id, formData);
      
      if (updatedCat) {
        alert('猫咪信息更新成功！');
        navigate(`/cat/${updatedCat.id}`);
      } else {
        alert('更新失败，请重试');
      }
    } catch (error) {
      console.error('更新猫咪失败:', error);
      alert('更新失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="text-4xl mb-4">🐱</div>
          <p className="text-secondary">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(`/cat/${id}`)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <ArrowLeft size={20} className="text-secondary" />
          </button>
          <h1 className="text-3xl font-bold text-primary">编辑猫咪信息</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 照片上传 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">猫咪照片</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group">
                <img 
                  src={image} 
                  alt={`猫咪照片 ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            
            {formData.images.length < 4 && (
              <label className="border-2 border-dashed border-border-color rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                <Camera size={24} className="text-light mb-2" />
                <span className="text-sm text-secondary">添加照片</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          
          <p className="text-light text-sm">
            可上传最多4张照片，第一张将作为封面图
          </p>
        </div>

        {/* 基本信息 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">基本信息</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                名字 *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="请输入猫咪的名字"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                年龄 *
              </label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="如：2岁"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                品种
              </label>
              <select
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="金渐层">金渐层</option>
                <option value="银渐层">银渐层</option>
                <option value="金吉拉">金吉拉</option>
                <option value="英国短毛猫">英国短毛猫</option>
                <option value="其他">其他</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                性别
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="公猫">公猫</option>
                <option value="母猫">母猫</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                体重
              </label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="如：4.5kg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                毛色
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="如：金色渐变"
              />
            </div>
          </div>
        </div>

        {/* 性格和描述 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">性格特点</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                性格描述
              </label>
              <input
                type="text"
                name="personality"
                value={formData.personality}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="如：活泼好动，喜欢玩耍"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                详细介绍
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="请详细介绍一下这只猫咪..."
              />
            </div>
          </div>
        </div>

        {/* 健康信息 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">健康信息</h2>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="vaccinated"
                checked={formData.vaccinated}
                onChange={handleInputChange}
                className="w-5 h-5 text-primary rounded focus:ring-primary"
              />
              <span className="text-secondary">已完成疫苗接种</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="neutered"
                checked={formData.neutered}
                onChange={handleInputChange}
                className="w-5 h-5 text-primary rounded focus:ring-primary"
              />
              <span className="text-secondary">已完成绝育手术</span>
            </label>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('确定要删除这只猫咪吗？此操作无法撤销。')) {
                catManager.deleteCat(id);
                alert('猫咪已删除');
                navigate('/');
              }
            }}
            className="btn bg-red-500 text-white hover:bg-red-600"
          >
            删除猫咪
          </button>
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(`/cat/${id}`)}
              className="btn btn-secondary"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary disabled:opacity-50"
            >
              {isSubmitting ? '保存中...' : '保存修改'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCat;