export type Language = 'ky' | 'uz' | 'ru' | 'en';
export type Currency = 'KGS' | 'USD' | 'EUR';

export interface LocalizedString {
  ky: string;
  uz: string;
  ru: string;
  en: string;
}

export type CategoryId = 
  | 'all'
  | 'palov'
  | 'shashlik'
  | 'lagmon'
  | 'tandir'
  | 'shoʻrvalar'
  | 'salatlar'
  | 'ichimliklar'
  | 'shirinliklar';

export interface Category {
  id: CategoryId;
  name: LocalizedString;
  iconName: string;
}

export interface MenuItem {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number; // in KGS (Kyrgyz Som)
  category: CategoryId;
  image: string;
  weight: string; // e.g. "450 g"
  calories?: number;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  prepTimeMinutes: number;
  ingredients: LocalizedString;
  availableOptions?: {
    name: LocalizedString;
    price: number;
  }[];
}

export interface CartItemOption {
  name: string;
  price: number;
}

export interface CartItem {
  id: string; // unique cart line id
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: CartItemOption[];
  portionNote?: string;
  isRewardItem?: boolean;
  rewardPointsSpent?: number;
}

export interface RewardItem {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  pointsCost: number;
  image: string;
  category: string;
  originalPriceKgs: number;
  menuItemId?: string;
  badge?: LocalizedString;
}

export interface PointsTransaction {
  id: string;
  date: string;
  type: 'earned' | 'redeemed';
  points: number;
  description: LocalizedString;
  orderNumber?: string;
}

export type LoyaltyTierId = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface LoyaltyTier {
  id: LoyaltyTierId;
  name: LocalizedString;
  badge: string;
  cashbackPercent: number;
  minPointsRequired: number;
  perks: LocalizedString[];
  color: string;
  gradient: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'on_way' | 'delivered' | 'cancelled';

export type PaymentMethodType = 
  | 'mbank' 
  | 'optima' 
  | 'elsom' 
  | 'click' 
  | 'payme' 
  | 'card' 
  | 'cash';

export interface SavedAddress {
  id: string;
  title: string; // e.g. "Uy", "Ishxona"
  city: string; // e.g. "Өзгөн / Uzgen"
  street: string;
  house: string;
  apartment?: string;
  landmark?: string;
  isDefault?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatarUrl?: string;
  bonusPoints: number; // 1 point = 1 Som
  lifetimePointsEarned?: number;
  savedAddresses: SavedAddress[];
  favorites: string[]; // menuItem ids
  pointsHistory?: PointsTransaction[];
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  bonusUsed: number;
  total: number;
  status: OrderStatus;
  deliveryType: 'delivery' | 'pickup';
  address?: SavedAddress;
  customerName: string;
  customerPhone: string;
  customerNote?: string;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'paid' | 'pending';
  estimatedDeliveryMinutes: number;
  createdAt: number;
}
