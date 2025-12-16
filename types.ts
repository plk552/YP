export enum Purpose {
  TikTok = 'TikTok',
  YouTube = 'YouTube',
  Wedding = 'Свадьба',
  Commercial = 'Реклама',
  Travel = 'Путешествие',
  Event = 'Мероприятие',
  Cinema = 'Кино'
}

export enum EquipmentCategory {
  Camera = 'Камеры',
  Lens = 'Объективы',
  Light = 'Свет',
  Audio = 'Звук',
  Stabilizer = 'Стабилизация',
  Drone = 'Дроны',
  Action = 'Экшн',
  Grip = 'Грип'
}

export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  pricePerDay: number;
  image: string;
  description?: string;
}

export interface Package {
  id: string;
  title: string;
  description: string;
  purpose: Purpose;
  items: string[]; // Array of Equipment IDs
  discountedPrice: number;
  features: string[];
  isPopular?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}