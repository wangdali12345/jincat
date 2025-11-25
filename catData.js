// 初始猫咪数据 - 杭州自家小猫咪
const initialCats = [
  {
    id: 1,
    name: '小王子',
    age: '1岁8个月',
    breed: '英国金渐层',
    personality: '温顺高贵，喜欢与人亲近',
    description: '小王子是一只血统纯正的英国金渐层，拥有华丽的金色被毛和绿色眼睛。性格温顺亲人，非常适合家庭饲养。已完成所有疫苗接种，身体健康活泼。',
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=600&fit=crop'
    ],
    gender: '公猫',
    weight: '4.8kg',
    color: '12色金渐层',
    vaccinated: true,
    neutered: true,
    addedDate: '2024-01-15'
  },
  {
    id: 2,
    name: '小公主',
    age: '1岁6个月',
    breed: '英国金渐层',
    personality: '活泼可爱，喜欢撒娇卖萌',
    description: '小公主是李先生家的小仙女，拥有完美的圆脸和胖胖的身体。特别喜欢被抱抱，会主动蹭人的手寻求关注。毛色纯正，眼睛明亮，是理想的家庭宠物。',
    images: [
      'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&h=600&fit=crop'
    ],
    gender: '母猫',
    weight: '4.2kg',
    color: '11色金渐层',
    vaccinated: true,
    neutered: true,
    addedDate: '2024-02-20'
  },
  {
    id: 3,
    name: '胖虎',
    age: '2岁3个月',
    breed: '英国金渐层',
    personality: '憨厚老实，吃嘛嘛香',
    description: '胖虎是家里的老大，体型健壮，性格沉稳。虽然有点胖，但动作敏捷，喜欢在家里巡视。对小朋友特别有耐心，是很好的陪伴猫咪。',
    images: [
      'https://images.unsplash.com/photo-1511044568932-288e707ed384?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=800&h=600&fit=crop'
    ],
    gender: '公猫',
    weight: '6.5kg',
    color: '12色金渐层',
    vaccinated: true,
    neutered: true,
    addedDate: '2024-03-10'
  },
  {
    id: 4,
    name: '小雪',
    age: '10个月',
    breed: '英国金渐层',
    personality: '聪明伶俐，学习能力强',
    description: '小雪是家里的小宝贝，虽然年纪小但很懂事。已经学会了使用猫砂和各种小技巧。毛色纯白带金，特别漂亮，是李先生精心培育的优质猫咪。',
    images: [
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800&h=600&fit=crop'
    ],
    gender: '母猫',
    weight: '3.5kg',
    color: '11色金渐层',
    vaccinated: true,
    neutered: false,
    addedDate: '2024-05-15'
  },
  {
    id: 5,
    name: '小金毛',
    age: '1岁10个月',
    breed: '英国金渐层',
    personality: '粘人可爱，喜欢睡觉',
    description: '小金毛是家里的睡眠冠军，一天大部分时间都在睡觉，但醒来后特别粘人。毛色金黄发亮，手感柔软，抱起来特别舒服。',
    images: [
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=600&fit=crop'
    ],
    gender: '公猫',
    weight: '4.6kg',
    color: '12色金渐层',
    vaccinated: true,
    neutered: true,
    addedDate: '2024-06-20'
  }
];

// 猫咪数据管理类
class CatDataManager {
  constructor() {
    this.storageKey = 'golden_cats_data';
    this.cats = initialCats; // 直接使用内存数据
  }

  getAllCats() {
    return this.cats;
  }

  getCatById(id) {
    const cats = this.getAllCats();
    return cats.find(cat => cat.id === parseInt(id));
  }

  addCat(cat) {
    const newCat = {
      ...cat,
      id: Date.now(), // 简单的ID生成
      addedDate: new Date().toISOString().split('T')[0]
    };
    this.cats.push(newCat);
    return newCat;
  }

  updateCat(id, updatedCat) {
    const index = this.cats.findIndex(cat => cat.id === parseInt(id));
    if (index !== -1) {
      this.cats[index] = { ...this.cats[index], ...updatedCat };
      return this.cats[index];
    }
    return null;
  }

  deleteCat(id) {
    const originalLength = this.cats.length;
    this.cats = this.cats.filter(cat => cat.id !== parseInt(id));
    return this.cats.length < originalLength;
  }
}

export const catManager = new CatDataManager();
export default catManager;