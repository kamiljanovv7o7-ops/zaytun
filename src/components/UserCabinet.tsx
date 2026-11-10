import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../data/translations';
import { menuItems } from '../data/menu';
import { 
  X, 
  User, 
  ShoppingBag, 
  MapPin, 
  Coins, 
  Heart, 
  Plus, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Award,
  Sparkles,
  Phone,
  Mail,
  Repeat,
  Gift
} from 'lucide-react';

export const UserCabinet: React.FC = () => {
  const {
    isCabinetOpen,
    setIsCabinetOpen,
    setIsRewardsModalOpen,
    user,
    updateUserProfile,
    addSavedAddress,
    removeSavedAddress,
    orders,
    addToCart,
    setIsTrackingOpen,
    setActiveTrackingOrder,
    lang,
    showToast,
    formatPrice,
    currentLoyaltyTier,
    nextLoyaltyTier,
    pointsToNextTier,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'bonus' | 'favorites'>('profile');

  // Edit profile state
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  // New address state
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newHouse, setNewHouse] = useState('');
  const [newApt, setNewApt] = useState('');

  if (!isCabinetOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, phone, email });
  };

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newStreet.trim()) return;

    addSavedAddress({
      title: newTitle,
      city: 'Өзгөн шаары',
      street: newStreet,
      house: newHouse,
      apartment: newApt,
      isDefault: user.savedAddresses.length === 0,
    });

    setIsAddingAddress(false);
    setNewTitle('');
    setNewStreet('');
    setNewHouse('');
    setNewApt('');
  };

  const favoriteDishes = menuItems.filter((dish) => user.favorites.includes(dish.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsCabinetOpen(false)}
      />

      <div className="relative w-full max-w-3xl bg-[#0b170e] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-6 text-stone-100 flex flex-col max-h-[90vh]">
        
        {/* Cabinet Header */}
        <div className="p-5 border-b border-amber-900/30 flex items-center justify-between bg-[#08120a]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-stone-950 flex items-center justify-center font-black text-lg shadow-lg border border-amber-400">
              {user.name ? user.name[0] : 'Z'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                  {user.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30 flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  VIP Guest
                </span>
              </div>
              <p className="text-xs text-stone-400">{user.phone} • {user.email}</p>
            </div>
          </div>

          <button
            onClick={() => setIsCabinetOpen(false)}
            className="p-2 rounded-xl bg-stone-900/80 text-stone-400 hover:text-white border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-2 bg-[#08140a] border-b border-white/5 overflow-x-auto no-scrollbar text-xs font-semibold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'profile'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{getTranslation('tabProfile', lang)}</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'orders'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{getTranslation('tabOrders', lang)}</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-stone-900/40 text-[10px]">
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'addresses'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{getTranslation('tabAddresses', lang)}</span>
          </button>

          <button
            onClick={() => setActiveTab('bonus')}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'bonus'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>{getTranslation('tabBonus', lang)}</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-400 text-black font-mono text-[10px]">
              {user.bonusPoints}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'favorites'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>{getTranslation('tabFavorites', lang)}</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-stone-900/40 text-[10px]">
              {user.favorites.length}
            </span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: Profile Details Form */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
              <div>
                <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5 mb-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>{getTranslation('fullName', lang)}</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5 mb-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{getTranslation('phoneNumber', lang)}</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5 mb-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
                >
                  {getTranslation('saveChanges', lang)}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Orders History */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-stone-400 text-sm">
                  {getTranslation('noOrdersYet', lang)}
                </div>
              ) : (
                orders.map((ord) => {
                  const isDelivered = ord.status === 'delivered';

                  return (
                    <div
                      key={ord.id}
                      className="p-4 rounded-2xl bg-[#08150c] border border-amber-900/30 hover:border-amber-500/40 transition-colors space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-400 text-sm">
                            {ord.orderNumber}
                          </span>
                          <span className="text-xs text-stone-400">• {ord.date}</span>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            isDelivered
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-950 text-amber-300 border border-amber-500/30 animate-pulse'
                          }`}
                        >
                          {isDelivered ? getTranslation('statusDelivered', lang) : getTranslation('statusPreparing', lang)}
                        </span>
                      </div>

                      {/* Items row */}
                      <div className="space-y-1.5 text-xs text-stone-300">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <span>
                              {item.quantity} × {item.menuItem.name[lang] || item.menuItem.name.ky}
                            </span>
                            <span className="font-mono text-stone-400">
                              {formatPrice(item.menuItem.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer & Actions */}
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                        <div className="font-bold text-white">
                          <span>{getTranslation('total', lang)}: </span>
                          <span className="text-amber-400 font-mono text-sm">{formatPrice(ord.total)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {!isDelivered && (
                            <button
                              onClick={() => {
                                setActiveTrackingOrder(ord);
                                setIsCabinetOpen(false);
                                setIsTrackingOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
                            >
                              <Clock className="w-3.5 h-3.5" />
                              <span>{getTranslation('trackOrderBtn', lang)}</span>
                            </button>
                          )}
                          <button
                            onClick={() => {
                              ord.items.forEach((item) => addToCart(item.menuItem, item.selectedOptions));
                              showToast(lang === 'ky' ? 'Тамактар кайра себетке кошулду!' : 'Taomlar savatga qoʻshildi!', 'success');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1 border border-white/10"
                          >
                            <Repeat className="w-3.5 h-3.5" />
                            <span>{getTranslation('reorderBtn', lang)}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB 3: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400">
                  {lang === 'ky' ? 'Жеткирүү даректериңизди башкарыңыз:' : 'Yetkazish manzillaringiz:'}
                </span>
                <button
                  onClick={() => setIsAddingAddress(!isAddingAddress)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500/30 transition-colors"
                >
                  {getTranslation('addNewAddress', lang)}
                </button>
              </div>

              {/* Add address form */}
              {isAddingAddress && (
                <form
                  onSubmit={handleAddNewAddress}
                  className="p-4 rounded-2xl bg-stone-900/90 border border-amber-500/30 space-y-3 animate-in fade-in"
                >
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {lang === 'ky' ? 'Жаңы дарек кошуу' : 'Yangi manzil qoʻshish'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Аталышы (Үй, Жумуш, Ата-энем)"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-stone-950 border border-white/10 text-xs text-white placeholder:text-stone-500"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Көчөсү (мис: Манас көчөсү)"
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-stone-950 border border-white/10 text-xs text-white placeholder:text-stone-500"
                    />
                    <input
                      type="text"
                      placeholder="Үй номери"
                      value={newHouse}
                      onChange={(e) => setNewHouse(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-stone-950 border border-white/10 text-xs text-white placeholder:text-stone-500"
                    />
                    <input
                      type="text"
                      placeholder="Батир / Кабат"
                      value={newApt}
                      onChange={(e) => setNewApt(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-stone-950 border border-white/10 text-xs text-white placeholder:text-stone-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs"
                    >
                      {getTranslation('saveChanges', lang)}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs"
                    >
                      Жокко чыгаруу
                    </button>
                  </div>
                </form>
              )}

              {/* Address cards list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {user.savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-4 rounded-2xl bg-[#08150c] border border-white/10 flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          <span>{addr.title}</span>
                          {addr.isDefault && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                              Негизги
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-stone-300 mt-0.5">
                          {addr.street}, {addr.house} {addr.apartment && `(${addr.apartment})`}
                        </div>
                        <div className="text-[11px] text-amber-400/80">{addr.city}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeSavedAddress(addr.id)}
                      className="text-stone-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Bonus & Cashback */}
          {activeTab === 'bonus' && (
            <div className="space-y-6">
              {/* Gold balance card */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 shadow-xl relative overflow-hidden">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10">
                  <Coins className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider block opacity-80">
                      {getTranslation('bonusBalance', lang)}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/25 text-[11px] font-bold">
                      {currentLoyaltyTier.badge} {currentLoyaltyTier.name[lang] || currentLoyaltyTier.name.ky}
                    </span>
                  </div>
                  <div className="text-4xl sm:text-5xl font-black font-mono my-2">
                    {user.bonusPoints} <span className="text-xl font-normal opacity-85">{lang === 'ky' ? 'упай' : lang === 'uz' ? 'ball' : lang === 'ru' ? 'баллов' : 'pts'}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 text-stone-950 text-xs font-bold backdrop-blur-sm">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{currentLoyaltyTier.cashbackPercent}% {lang === 'ky' ? 'ар буйрутмадан кэшбэк' : lang === 'uz' ? 'har buyurtmadan keshbek' : lang === 'ru' ? 'кешбэк с каждого заказа' : 'cashback per order'}</span>
                    </div>
                    {nextLoyaltyTier && (
                      <span className="text-[11px] font-medium opacity-80">
                        {lang === 'ky' ? `${nextLoyaltyTier.name.ky} деңгээлине чейин: ${pointsToNextTier} упай` :
                         lang === 'uz' ? `${nextLoyaltyTier.name.uz} darajasigacha: ${pointsToNextTier} ball` :
                         lang === 'ru' ? `До уровня ${nextLoyaltyTier.name.ru}: ${pointsToNextTier} б.` :
                         `To ${nextLoyaltyTier.name.en}: ${pointsToNextTier} pts`}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Zaytun Rewards Catalog CTA Button */}
              <button
                type="button"
                onClick={() => {
                  setIsCabinetOpen(false);
                  setIsRewardsModalOpen(true);
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all cursor-pointer"
              >
                <Gift className="w-5 h-5 text-stone-950" />
                <span>
                  {lang === 'ky' ? '🎁 Zaytun Rewards: Бекер тамактар каталогу' :
                   lang === 'uz' ? '🎁 Zaytun Rewards: Bepul taomlar katalogi' :
                   lang === 'ru' ? '🎁 Zaytun Rewards: Каталог бесплатных блюд' :
                   '🎁 Zaytun Rewards: Free Items Catalog'}
                </span>
              </button>

              {/* Bonus rules */}
              <div className="p-4 rounded-2xl bg-stone-900/60 border border-white/5 text-xs text-stone-300 leading-relaxed">
                <h4 className="font-bold text-amber-300 uppercase tracking-wider mb-1">
                  {lang === 'ky' ? 'Зайтун Бонус жана Rewards системасы кандай иштейт?' :
                   lang === 'uz' ? 'Zaytun Bonus va Rewards tizimi qanday ishlaydi?' :
                   lang === 'ru' ? 'Как работает программа Zaytun Rewards?' :
                   'How does Zaytun Rewards work?'}
                </h4>
                <p>{getTranslation('bonusExplanation', lang)}</p>
              </div>
            </div>
          )}

          {/* TAB 5: Favorites */}
          {activeTab === 'favorites' && (
            <div>
              {favoriteDishes.length === 0 ? (
                <div className="text-center py-12 text-stone-400 text-sm">
                  {lang === 'ky' ? 'Сүйүктүү тамактар азырынча жок' : 'Sevimli taomlar hali qoʻshilmagan'}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {favoriteDishes.map((dish) => (
                    <div
                      key={dish.id}
                      className="p-3 rounded-2xl bg-[#08150c] border border-white/5 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={dish.image}
                          alt={dish.name[lang] || dish.name.ky}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                            {dish.name[lang] || dish.name.ky}
                          </h4>
                          <span className="text-amber-400 font-mono font-bold text-xs">
                            {formatPrice(dish.price)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(dish)}
                        className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
                      >
                        + {getTranslation('addToCart', lang)}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
