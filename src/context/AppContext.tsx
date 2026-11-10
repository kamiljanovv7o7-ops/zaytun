import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  Currency,
  CartItem, 
  MenuItem, 
  CartItemOption, 
  UserProfile, 
  Order, 
  SavedAddress, 
  CategoryId,
  PaymentMethodType,
  RewardItem,
  PointsTransaction,
  LoyaltyTier 
} from '../types';
import { sounds } from '../utils/audio';
import { formatCurrencyPrice } from '../utils/currency';
import { LOYALTY_TIERS, INITIAL_POINTS_TRANSACTIONS } from '../data/rewards';

interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amountInKgs: number) => string;
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  addToCart: (item: MenuItem, options?: CartItemOption[], note?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;

  user: UserProfile;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  addSavedAddress: (address: Omit<SavedAddress, 'id'>) => void;
  removeSavedAddress: (addressId: string) => void;
  toggleFavorite: (dishId: string) => void;

  orders: Order[];
  placeOrder: (params: {
    deliveryType: 'delivery' | 'pickup';
    address?: SavedAddress;
    customerName: string;
    customerPhone: string;
    customerNote?: string;
    paymentMethod: PaymentMethodType;
    useBonus?: boolean;
  }) => Order;
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;

  activeDishModal: MenuItem | null;
  setActiveDishModal: (dish: MenuItem | null) => void;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isCabinetOpen: boolean;
  setIsCabinetOpen: (open: boolean) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  isQrModalOpen: boolean;
  setIsQrModalOpen: (open: boolean) => void;
  isRewardsModalOpen: boolean;
  setIsRewardsModalOpen: (open: boolean) => void;

  pointsHistory: PointsTransaction[];
  redeemReward: (reward: RewardItem) => boolean;
  currentLoyaltyTier: LoyaltyTier;
  nextLoyaltyTier: LoyaltyTier | null;
  pointsToNextTier: number;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;

  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const defaultUser: UserProfile = {
  id: 'usr-zaytun-1',
  name: 'Бексултан Аманов',
  phone: '+996 555 77-88-99',
  email: 'beksultan.uzgen@gmail.com',
  bonusPoints: 240, // 240 Som bonus points
  savedAddresses: [
    {
      id: 'addr-1',
      title: 'Үй (Дом)',
      city: 'Өзгөн шаары',
      street: 'Манас көчөсү',
      house: '12-үй',
      apartment: '4-батир',
      landmark: 'Борбордук мечиттин жанында',
      isDefault: true,
    },
    {
      id: 'addr-2',
      title: 'Жумуш (Работа)',
      city: 'Өзгөн шаары',
      street: 'Ленин көчөсү',
      house: '88-үй',
      apartment: '2-кабат, Офис 14',
      isDefault: false,
    },
  ],
  favorites: ['uzgen-devzira-plov', 'uzgen-tandir-somsa', 'kuzu-shashlik'],
};

const initialOrders: Order[] = [
  {
    id: 'ord-10492',
    orderNumber: 'ZTN-10492',
    date: '2026-11-08 13:20',
    items: [
      {
        id: 'ci-prev-1',
        menuItem: {
          id: 'uzgen-devzira-plov',
          name: {
            ky: 'Падышалык Өзгөн Девзира ашы',
            uz: 'Shohona Oʻzgan Devzira palovi',
            ru: 'Царский узгенский плов из Девзиры',
            en: 'Royal Uzgen Devzira Pilaf',
          },
          description: { ky: '', uz: '', ru: '', en: '' },
          price: 320,
          category: 'palov',
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop',
          weight: '450 г',
          prepTimeMinutes: 20,
          ingredients: { ky: '', uz: '', ru: '', en: '' },
        },
        quantity: 2,
        selectedOptions: [],
      },
      {
        id: 'ci-prev-2',
        menuItem: {
          id: 'uzgen-tandir-somsa',
          name: {
            ky: 'Өзгөн тандыр самсасы (Чопо тандыр)',
            uz: 'Oʻzgan loy tandir somsasi',
            ru: 'Узгенская самса из глиняного тандыра',
            en: 'Uzgen Clay Tandoor Samsa',
          },
          description: { ky: '', uz: '', ru: '', en: '' },
          price: 85,
          category: 'tandir',
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop',
          weight: '160 г',
          prepTimeMinutes: 5,
          ingredients: { ky: '', uz: '', ru: '', en: '' },
        },
        quantity: 4,
        selectedOptions: [],
      },
      {
        id: 'ci-prev-3',
        menuItem: {
          id: 'achichuk-salad',
          name: {
            ky: 'Ачуу-чүчүк / Шакароб салаты',
            uz: 'Achchiq-chuchuk / Shakarob salati',
            ru: 'Салат Ачик-чучук / Шакароб',
            en: 'Achichuk Fresh Tomato Salad',
          },
          description: { ky: '', uz: '', ru: '', en: '' },
          price: 90,
          category: 'salatlar',
          image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1000&auto=format&fit=crop',
          weight: '200 г',
          prepTimeMinutes: 5,
          ingredients: { ky: '', uz: '', ru: '', en: '' },
        },
        quantity: 1,
        selectedOptions: [],
      },
    ],
    subtotal: 1070,
    deliveryFee: 100,
    bonusUsed: 50,
    total: 1120,
    status: 'delivered',
    deliveryType: 'delivery',
    address: defaultUser.savedAddresses[0],
    customerName: defaultUser.name,
    customerPhone: defaultUser.phone,
    paymentMethod: 'mbank',
    paymentStatus: 'paid',
    estimatedDeliveryMinutes: 0,
    createdAt: Date.now() - 86400000,
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Kyrgyz by default as requested, customizable to uz/ru/en
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('zaytun_lang');
    if (saved === 'ky' || saved === 'uz' || saved === 'ru' || saved === 'en') {
      return saved as Language;
    }
    return 'ky';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('zaytun_lang', newLang);
  };

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('zaytun_currency');
    if (saved === 'KGS' || saved === 'USD' || saved === 'EUR') {
      return saved as Currency;
    }
    return 'KGS';
  });

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('zaytun_currency', newCurrency);
  };

  const formatPrice = (amountInKgs: number): string => {
    return formatCurrencyPrice(amountInKgs, currency);
  };

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('zaytun_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('zaytun_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultUser;
      }
    }
    return defaultUser;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('zaytun_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialOrders;
      }
    }
    return initialOrders;
  });

  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);
  const [activeDishModal, setActiveDishModal] = useState<MenuItem | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCabinetOpen, setIsCabinetOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);

  const [pointsHistory, setPointsHistory] = useState<PointsTransaction[]>(() => {
    const saved = localStorage.getItem('zaytun_points_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_POINTS_TRANSACTIONS;
      }
    }
    return INITIAL_POINTS_TRANSACTIONS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    localStorage.setItem('zaytun_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('zaytun_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('zaytun_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('zaytun_points_history', JSON.stringify(pointsHistory));
  }, [pointsHistory]);

  // Dynamic loyalty tiers based on user points
  const currentLoyaltyTier: LoyaltyTier = React.useMemo(() => {
    const pts = user.bonusPoints;
    if (pts >= 1500) return LOYALTY_TIERS[3];
    if (pts >= 800) return LOYALTY_TIERS[2];
    if (pts >= 300) return LOYALTY_TIERS[1];
    return LOYALTY_TIERS[0];
  }, [user.bonusPoints]);

  const nextLoyaltyTier: LoyaltyTier | null = React.useMemo(() => {
    const pts = user.bonusPoints;
    if (pts >= 1500) return null;
    if (pts >= 800) return LOYALTY_TIERS[3];
    if (pts >= 300) return LOYALTY_TIERS[2];
    return LOYALTY_TIERS[1];
  }, [user.bonusPoints]);

  const pointsToNextTier = nextLoyaltyTier ? Math.max(0, nextLoyaltyTier.minPointsRequired - user.bonusPoints) : 0;

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => {
    const basePrice = item.isRewardItem ? 0 : item.menuItem.price;
    const optionsCost = item.selectedOptions.reduce((optSum, opt) => optSum + opt.price, 0);
    return sum + (basePrice + optionsCost) * item.quantity;
  }, 0);

  const addToCart = (item: MenuItem, options: CartItemOption[] = [], note?: string) => {
    sounds.playAddCart();
    setCart((prevCart) => {
      // Check if same item with identical options already exists
      const existingIdx = prevCart.findIndex(
        (ci) =>
          ci.menuItem.id === item.id &&
          ci.portionNote === note &&
          !ci.isRewardItem &&
          JSON.stringify(ci.selectedOptions) === JSON.stringify(options)
      );

      if (existingIdx >= 0) {
        const next = [...prevCart];
        next[existingIdx].quantity += 1;
        return next;
      } else {
        const newItem: CartItem = {
          id: 'cart-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
          menuItem: item,
          quantity: 1,
          selectedOptions: options,
          portionNote: note,
        };
        return [...prevCart, newItem];
      }
    });

    const localizedName = item.name[lang] || item.name.ky;
    const addedText = 
      lang === 'ky' ? `"${localizedName}" себетке кошулду!` :
      lang === 'uz' ? `"${localizedName}" savatga qoʻshildi!` :
      lang === 'ru' ? `"${localizedName}" добавлено в корзину!` :
      `"${localizedName}" added to cart!`;
    showToast(addedText, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    const itemToRemove = cart.find((c) => c.id === cartItemId);
    if (itemToRemove?.isRewardItem && itemToRemove.rewardPointsSpent) {
      // Refund points if reward item removed from cart
      setUser((prev) => ({
        ...prev,
        bonusPoints: prev.bonusPoints + itemToRemove.rewardPointsSpent!,
      }));

      const dateStr = new Date().toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
      const refundTx: PointsTransaction = {
        id: 'pt-ref-' + Date.now(),
        date: dateStr,
        type: 'earned',
        points: itemToRemove.rewardPointsSpent!,
        description: {
          ky: `Сыйлык себеттен өчүрүлдү: +${itemToRemove.rewardPointsSpent} упай кайтарылды`,
          uz: `Sovgʻa savatdan olib tashlandi: +${itemToRemove.rewardPointsSpent} ball qaytarildi`,
          ru: `Возврат +${itemToRemove.rewardPointsSpent} баллов за отмененную награду`,
          en: `Refund of +${itemToRemove.rewardPointsSpent} points for removed reward`,
        },
      };
      setPointsHistory((prev) => [refundTx, ...prev]);

      const refundMsg = 
        lang === 'ky' ? `Сыйлык үчүн ${itemToRemove.rewardPointsSpent} упай кайтарылды` :
        lang === 'uz' ? `Sovgʻa uchun ${itemToRemove.rewardPointsSpent} ball qaytarildi` :
        `Баллы за награду (${itemToRemove.rewardPointsSpent}) возвращены`;
      showToast(refundMsg, 'info');
    }
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const redeemReward = (reward: RewardItem): boolean => {
    if (user.bonusPoints < reward.pointsCost) {
      const errText = 
        lang === 'ky' ? `Упайыңыз жетпейт. Сизде: ${user.bonusPoints} упай, керек: ${reward.pointsCost} упай` :
        lang === 'uz' ? `Ballar yetarli emas. Sizda: ${user.bonusPoints} ball, kerak: ${reward.pointsCost} ball` :
        lang === 'ru' ? `Недостаточно баллов. У вас: ${user.bonusPoints}, требуется: ${reward.pointsCost}` :
        `Not enough points. You have: ${user.bonusPoints}, needed: ${reward.pointsCost}`;
      showToast(errText, 'error');
      return false;
    }

    // Deduct points
    setUser((prev) => ({
      ...prev,
      bonusPoints: prev.bonusPoints - reward.pointsCost,
    }));

    // Record transaction
    const dateStr = new Date().toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    const rewardName = reward.name[lang] || reward.name.ky;
    const newTx: PointsTransaction = {
      id: 'pt-rdm-' + Date.now(),
      date: dateStr,
      type: 'redeemed',
      points: reward.pointsCost,
      description: {
        ky: `«${reward.name.ky}» акысыз сыйлыгына алмаштырылды`,
        uz: `«${reward.name.uz}» bepul sovgʻasiga almashtirildi`,
        ru: `Обмен на бесплатное блюдо «${reward.name.ru}»`,
        en: `Redeemed for free «${reward.name.en}»`,
      },
    };
    setPointsHistory((prev) => [newTx, ...prev]);

    // Create free reward cart item
    const rewardDishMenuItem: MenuItem = {
      id: 'reward-dish-' + reward.id,
      name: reward.name,
      description: reward.description,
      price: 0,
      category: reward.category as any,
      image: reward.image,
      weight: 'Бекер сыйлык / Free Reward',
      prepTimeMinutes: 10,
      ingredients: {
        ky: 'Zaytun Rewards адал сыйлыгы',
        uz: 'Zaytun Rewards halol sovgʻasi',
        ru: 'Награда по программе лояльности Zaytun Rewards',
        en: 'Zaytun Rewards loyalty item',
      },
    };

    const newCartItem: CartItem = {
      id: 'cart-reward-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
      menuItem: rewardDishMenuItem,
      quantity: 1,
      selectedOptions: [],
      portionNote: '🎁 Zaytun Rewards',
      isRewardItem: true,
      rewardPointsSpent: reward.pointsCost,
    };

    setCart((prev) => [...prev, newCartItem]);
    sounds.playSuccess();

    const successText = 
      lang === 'ky' ? `🎉 «${rewardName}» сыйлыгы себетке кошулду!` :
      lang === 'uz' ? `🎉 «${rewardName}» sovgʻasi savatga qoʻshildi!` :
      lang === 'ru' ? `🎉 Награда «${rewardName}» добавлена в корзину!` :
      `🎉 Reward «${rewardName}» added to cart!`;
    showToast(successText, 'success');
    return true;
  };

  const updateQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...data }));
    const text = 
      lang === 'ky' ? 'Маалыматтар ийгиликтүү сакталды' :
      lang === 'uz' ? 'Maʼlumotlar saqlandi' :
      lang === 'ru' ? 'Данные успешно обновлены' :
      'Profile updated successfully';
    showToast(text, 'success');
  };

  const addSavedAddress = (addressData: Omit<SavedAddress, 'id'>) => {
    const newAddr: SavedAddress = {
      ...addressData,
      id: 'addr-' + Date.now(),
    };
    setUser((prev) => ({
      ...prev,
      savedAddresses: [...prev.savedAddresses, newAddr],
    }));
    const text = 
      lang === 'ky' ? 'Жаңы дарек сакталды' :
      lang === 'uz' ? 'Yangi manzil saqlandi' :
      lang === 'ru' ? 'Адрес сохранен' :
      'Address saved';
    showToast(text, 'success');
  };

  const removeSavedAddress = (addressId: string) => {
    setUser((prev) => ({
      ...prev,
      savedAddresses: prev.savedAddresses.filter((a) => a.id !== addressId),
    }));
  };

  const toggleFavorite = (dishId: string) => {
    setUser((prev) => {
      const isFav = prev.favorites.includes(dishId);
      const nextFavorites = isFav
        ? prev.favorites.filter((id) => id !== dishId)
        : [...prev.favorites, dishId];
      return { ...prev, favorites: nextFavorites };
    });
  };

  const placeOrder = (params: {
    deliveryType: 'delivery' | 'pickup';
    address?: SavedAddress;
    customerName: string;
    customerPhone: string;
    customerNote?: string;
    paymentMethod: PaymentMethodType;
    useBonus?: boolean;
  }): Order => {
    const deliveryFee = params.deliveryType === 'delivery' ? (cartSubtotal >= 1500 ? 0 : 100) : 0;
    const bonusToUse = params.useBonus ? Math.min(user.bonusPoints, Math.floor(cartSubtotal * 0.3)) : 0;
    const finalTotal = Math.max(0, cartSubtotal + deliveryFee - bonusToUse);
    const earnedBonus = Math.floor(cartSubtotal * (currentLoyaltyTier.cashbackPercent / 100));

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const dateStr = new Date().toLocaleString();
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: `ZTN-${randomNum}`,
      date: dateStr,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee,
      bonusUsed: bonusToUse,
      total: finalTotal,
      status: 'pending',
      deliveryType: params.deliveryType,
      address: params.address,
      customerName: params.customerName,
      customerPhone: params.customerPhone,
      customerNote: params.customerNote,
      paymentMethod: params.paymentMethod,
      paymentStatus: params.paymentMethod === 'cash' ? 'pending' : 'paid',
      estimatedDeliveryMinutes: params.deliveryType === 'delivery' ? 35 : 20,
      createdAt: Date.now(),
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update user bonus points
    setUser((prev) => ({
      ...prev,
      bonusPoints: prev.bonusPoints - bonusToUse + earnedBonus,
      lifetimePointsEarned: (prev.lifetimePointsEarned || prev.bonusPoints) + earnedBonus,
    }));

    // Record bonus points transactions
    const txDate = new Date().toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    const newTransactions: PointsTransaction[] = [];

    if (bonusToUse > 0) {
      newTransactions.push({
        id: 'pt-use-' + Date.now(),
        date: txDate,
        type: 'redeemed',
        points: bonusToUse,
        description: {
          ky: `${newOrder.orderNumber} буйрутмасы үчүн арзандатууга колдонулду`,
          uz: `${newOrder.orderNumber} buyurtmasi uchun chegirmaga sarflandi`,
          ru: `Списание на скидку к заказу ${newOrder.orderNumber}`,
          en: `Used as discount for order ${newOrder.orderNumber}`,
        },
        orderNumber: newOrder.orderNumber,
      });
    }

    if (earnedBonus > 0) {
      newTransactions.push({
        id: 'pt-earn-' + Date.now(),
        date: txDate,
        type: 'earned',
        points: earnedBonus,
        description: {
          ky: `${newOrder.orderNumber} буйрутмасынан ${currentLoyaltyTier.cashbackPercent}% кэшбэк (${currentLoyaltyTier.name.ky})`,
          uz: `${newOrder.orderNumber} buyurtmasidan ${currentLoyaltyTier.cashbackPercent}% keshbek (${currentLoyaltyTier.name.uz})`,
          ru: `${currentLoyaltyTier.cashbackPercent}% кешбэк с заказа ${newOrder.orderNumber} (${currentLoyaltyTier.name.ru})`,
          en: `${currentLoyaltyTier.cashbackPercent}% cashback from order ${newOrder.orderNumber} (${currentLoyaltyTier.name.en})`,
        },
        orderNumber: newOrder.orderNumber,
      });
    }

    if (newTransactions.length > 0) {
      setPointsHistory((prev) => [...newTransactions, ...prev]);
    }

    clearCart();
    setActiveTrackingOrder(newOrder);
    sounds.playSuccess();

    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        currency,
        setCurrency,
        formatPrice,
        cart,
        cartCount,
        cartSubtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        user,
        updateUserProfile,
        addSavedAddress,
        removeSavedAddress,
        toggleFavorite,
        orders,
        placeOrder,
        activeTrackingOrder,
        setActiveTrackingOrder,
        activeDishModal,
        setActiveDishModal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isCabinetOpen,
        setIsCabinetOpen,
        isReservationOpen,
        setIsReservationOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        isQrModalOpen,
        setIsQrModalOpen,
        isRewardsModalOpen,
        setIsRewardsModalOpen,
        pointsHistory,
        redeemReward,
        currentLoyaltyTier,
        nextLoyaltyTier,
        pointsToNextTier,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
