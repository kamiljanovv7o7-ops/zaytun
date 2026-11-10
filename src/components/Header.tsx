import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ZaytunLogo } from './ZaytunLogo';
import { getTranslation } from '../data/translations';
import { Language, Currency } from '../types';
import { 
  ShoppingBag, 
  User, 
  CalendarClock, 
  Menu as MenuIcon, 
  X, 
  Globe, 
  PhoneCall, 
  Sparkles,
  MapPin,
  Clock,
  Coins,
  Gift
} from 'lucide-react';

const languageOptions: { code: Language; label: string; flag: string; short: string }[] = [
  { code: 'ky', label: 'Кыргызча', flag: '🇰🇬', short: 'KG' },
  { code: 'uz', label: "O'zbekcha", flag: '🇺🇿', short: 'UZ' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺', short: 'RU' },
  { code: 'en', label: 'English', flag: '🇬🇧', short: 'EN' },
];

const currencyOptions: { code: Currency; symbol: string; flag: string; label: { ky: string; uz: string; ru: string; en: string } }[] = [
  { code: 'KGS', symbol: 'сом', flag: '🇰🇬', label: { ky: 'Кыргыз сому (сом)', uz: 'Qirgʻiz soʻmi (som)', ru: 'Кыргызский сом (сом)', en: 'Kyrgyz Som (KGS)' } },
  { code: 'USD', symbol: '$', flag: '🇺🇸', label: { ky: 'АКШ доллары ($)', uz: 'AQSH dollari ($)', ru: 'Доллар США ($)', en: 'US Dollar ($)' } },
  { code: 'EUR', symbol: '€', flag: '🇪🇺', label: { ky: 'Евро (€)', uz: 'Yevro (€)', ru: 'Евро (€)', en: 'Euro (€)' } },
];

export const Header: React.FC = () => {
  const {
    lang,
    setLang,
    currency,
    setCurrency,
    formatPrice,
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    setIsCabinetOpen,
    setIsReservationOpen,
    setIsTrackingOpen,
    setIsRewardsModalOpen,
    orders,
    user,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const activeOrdersCount = orders.filter(
    (o) => o.status !== 'delivered' && o.status !== 'cancelled'
  ).length;

  const currentLangObj = languageOptions.find((l) => l.code === lang) || languageOptions[0];
  const currentCurrencyObj = currencyOptions.find((c) => c.code === currency) || currencyOptions[0];

  const handleNavClick = (anchorId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#09130c]/90 border-b border-amber-900/30 transition-all">
      {/* Top micro-bar with delivery notification & contact in Uzgen */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#122416] to-amber-950/70 border-b border-emerald-900/40 text-[11px] sm:text-xs text-amber-200/90 py-1.5 px-4 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-6 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {lang === 'ky'
                  ? 'Өзгөн ш., Манас көчөсү 247А'
                  : lang === 'uz'
                  ? 'Oʻzgan sh., Manas koʻchasi 247A'
                  : lang === 'ru'
                  ? 'г. Узген, ул. Манаса 247А'
                  : '247A Manas St, Uzgen'}
              </span>
            </span>
            <span className="text-emerald-500">•</span>
            <span className="flex items-center gap-1.5 text-stone-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>09:00 - 23:00</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-amber-300/90 flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {lang === 'ky'
                ? `${formatPrice(1500)} жогору буйрутмаларга жеткирүү акысыз!`
                : lang === 'uz'
                ? `${formatPrice(1500)} dan ortiq buyurtmalarga yetkazish bepul!`
                : lang === 'ru'
                ? `Бесплатная доставка от ${formatPrice(1500)}!`
                : `Free delivery on orders over ${formatPrice(1500)}!`}
            </span>
            <a
              href="tel:+996555123456"
              className="hover:text-amber-300 transition-colors flex items-center gap-1 font-semibold text-emerald-400"
            >
              <PhoneCall className="w-3 h-3" />
              +996 (555) 12-34-56
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer transition-transform active:scale-95"
        >
          <ZaytunLogo size="md" />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-300">
          <button
            onClick={() => handleNavClick('menu-section')}
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            {getTranslation('navMenu', lang)}
          </button>
          <button
            onClick={() => handleNavClick('delivery-section')}
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            {getTranslation('navDelivery', lang)}
          </button>
          <button
            onClick={() => handleNavClick('about-section')}
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            {getTranslation('navAbout', lang)}
          </button>
          <button
            onClick={() => setIsReservationOpen(true)}
            className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5 text-amber-300/90 py-1"
          >
            <CalendarClock className="w-4 h-4 text-amber-400" />
            {getTranslation('navReservations', lang)}
          </button>
          <button
            onClick={() => handleNavClick('map-section')}
            className="hover:text-amber-400 transition-colors cursor-pointer py-1 flex items-center gap-1 text-emerald-400 font-semibold"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{lang === 'ky' ? 'Карта' : lang === 'uz' ? 'Xarita' : 'Карта'}</span>
          </button>
          <button
            onClick={() => setIsRewardsModalOpen(true)}
            className="hover:text-amber-400 transition-colors cursor-pointer py-1 flex items-center gap-1.5 text-amber-300 font-bold"
          >
            <Gift className="w-3.5 h-3.5 text-amber-400" />
            <span>Rewards</span>
          </button>
          <button
            onClick={() => handleNavClick('contact-section')}
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            {getTranslation('navContacts', lang)}
          </button>

        </nav>

        {/* Right Action Icons: Language, Tracking, Cabinet, Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-900/80 border border-amber-900/40 hover:border-amber-500/50 text-xs font-semibold text-amber-200 transition-all shadow-sm"
              title="Тилди тандоо / Tilni tanlash"
            >
              <span className="text-base leading-none">{currentLangObj.flag}</span>
              <span className="hidden sm:inline">{currentLangObj.short}</span>
              <Globe className="w-3.5 h-3.5 text-amber-400 ml-0.5 opacity-80" />
            </button>

            {isLangDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsLangDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#0f1d13] border border-amber-500/30 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 backdrop-blur-md">
                  <div className="px-3 py-1 text-[11px] font-semibold text-amber-400/80 uppercase tracking-wider border-b border-white/5 mb-1">
                    {lang === 'ky' ? 'Тилди тандаңыз' : lang === 'uz' ? 'Tilni tanlang' : lang === 'ru' ? 'Выберите язык' : 'Select Language'}
                  </div>
                  {languageOptions.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => {
                        setLang(opt.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                        lang === opt.code
                          ? 'bg-amber-500/20 text-amber-300 font-bold'
                          : 'text-stone-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">{opt.flag}</span>
                        <span>{opt.label}</span>
                      </span>
                      {lang === opt.code && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Currency Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-900/80 border border-amber-900/40 hover:border-amber-500/50 text-xs font-semibold text-amber-200 transition-all shadow-sm"
              title="Валютаны тандоо / Valyutani tanlash"
            >
              <span className="text-base leading-none">{currentCurrencyObj.flag}</span>
              <span className="font-mono font-bold text-amber-300">{currentCurrencyObj.symbol}</span>
              <Coins className="w-3.5 h-3.5 text-amber-400 ml-0.5 opacity-80" />
            </button>

            {isCurrencyDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsCurrencyDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#0f1d13] border border-amber-500/30 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 backdrop-blur-md">
                  <div className="px-3 py-1 text-[11px] font-semibold text-amber-400/80 uppercase tracking-wider border-b border-white/5 mb-1">
                    {lang === 'ky' ? 'Валютаны тандаңыз' : lang === 'uz' ? 'Valyutani tanlang' : lang === 'ru' ? 'Выберите валюту' : 'Select Currency'}
                  </div>
                  {currencyOptions.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => {
                        setCurrency(opt.code);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                        currency === opt.code
                          ? 'bg-amber-500/20 text-amber-300 font-bold'
                          : 'text-stone-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">{opt.flag}</span>
                        <span>{opt.label[lang] || opt.label.ky}</span>
                      </span>
                      {currency === opt.code && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Zaytun Rewards Loyalty Button */}
          <button
            onClick={() => setIsRewardsModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-emerald-500/20 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer group"
            title="Zaytun Rewards • Акысыз тамактар каталогу"
          >
            <Gift className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="font-mono font-bold text-xs">
              {user.bonusPoints}
            </span>
            <span className="hidden xl:inline text-[11px] font-semibold text-amber-200">
              {lang === 'ky' ? 'упай' : 'ball'}
            </span>
          </button>

          {/* Active Order Tracker Button (Pulsing if active order exists) */}
          {activeOrdersCount > 0 && (
            <button
              onClick={() => setIsTrackingOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs font-semibold shadow-md shadow-emerald-950/40 hover:from-emerald-500 hover:to-emerald-600 transition-all animate-pulse"
              title="Курьерди байкоо"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="hidden sm:inline">
                {lang === 'ky' ? 'Буйрутма' : lang === 'uz' ? 'Buyurtma' : lang === 'ru' ? 'Заказ' : 'Order'}
              </span>
            </button>
          )}

          {/* Personal Cabinet Button */}
          <button
            onClick={() => setIsCabinetOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900/80 border border-amber-900/40 hover:border-amber-500/50 text-stone-200 hover:text-amber-300 transition-all shadow-sm"
            title={getTranslation('navCabinet', lang)}
          >
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold leading-tight line-clamp-1 max-w-[90px]">
                {user.name.split(' ')[0]}
              </span>
              <span className="text-[10px] text-amber-400 font-mono font-medium">
                {formatPrice(user.bonusPoints)}
              </span>
            </div>
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/40 transition-all active:scale-95 cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              {cartCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 min-w-4 h-4 px-1 rounded-full bg-rose-600 text-white text-[10px] font-extrabold flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-bold">
              {cartSubtotal > 0 ? formatPrice(cartSubtotal) : getTranslation('navMenu', lang)}
            </span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-stone-900/80 border border-white/10 text-stone-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#09150d] border-b border-amber-900/30 px-5 py-4 space-y-3 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs text-stone-400">
              {lang === 'ky' ? 'Багыттоо' : lang === 'uz' ? 'Menyu boʻlimlari' : lang === 'ru' ? 'Навигация' : 'Navigation'}
            </span>
            <span className="text-xs font-semibold text-amber-400">
              {formatPrice(user.bonusPoints)} кэшбэк
            </span>
          </div>

          {/* Mobile Currency Selector Strip */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-stone-900/90 border border-white/5">
            <span className="text-[11px] text-stone-400 pl-2 font-medium">
              {lang === 'ky' ? 'Валюта:' : lang === 'uz' ? 'Valyuta:' : 'Валюта:'}
            </span>
            <div className="flex-1 grid grid-cols-3 gap-1">
              {currencyOptions.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => setCurrency(opt.code)}
                  className={`py-1 text-xs font-mono font-bold rounded-lg transition-colors flex items-center justify-center gap-1 ${
                    currency === opt.code
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'text-stone-300 hover:bg-white/5'
                  }`}
                >
                  <span>{opt.flag}</span>
                  <span>{opt.symbol}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => handleNavClick('menu-section')}
              className="p-2.5 rounded-xl bg-stone-900/90 border border-white/5 text-left text-stone-200 hover:text-amber-400"
            >
              🍽 {getTranslation('navMenu', lang)}
            </button>
            <button
              onClick={() => handleNavClick('map-section')}
              className="p-2.5 rounded-xl bg-stone-900/90 border border-emerald-500/30 text-left text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              📍 {lang === 'ky' ? 'Google Карта' : lang === 'uz' ? 'Google Xarita' : 'Google Карта'}
            </button>
            <button
              onClick={() => handleNavClick('delivery-section')}
              className="p-2.5 rounded-xl bg-stone-900/90 border border-white/5 text-left text-stone-200 hover:text-amber-400"
            >
              🛵 {getTranslation('navDelivery', lang)}
            </button>
            <button
              onClick={() => handleNavClick('about-section')}
              className="p-2.5 rounded-xl bg-stone-900/90 border border-white/5 text-left text-stone-200 hover:text-amber-400"
            >
              🏛 {getTranslation('navAbout', lang)}
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsRewardsModalOpen(true);
              }}
              className="col-span-2 p-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-emerald-500/20 border border-amber-500/40 text-center text-amber-300 font-bold flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4 text-amber-400" />
              <span>🎁 Zaytun Rewards ({user.bonusPoints} {lang === 'ky' ? 'упай' : 'ball'})</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsReservationOpen(true);
              }}
              className="col-span-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center text-amber-300 font-semibold"
            >
              🛎 {getTranslation('navReservations', lang)}
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-stone-400 border-t border-white/10">
            <span>📞 +996 (555) 12-34-56</span>
            <span>📍 Өзгөн, Манас 247А</span>
          </div>

        </div>
      )}
    </header>
  );
};
