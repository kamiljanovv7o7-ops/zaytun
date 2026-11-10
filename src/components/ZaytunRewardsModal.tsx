import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { REWARD_ITEMS, LOYALTY_TIERS } from '../data/rewards';
import { RewardItem, PointsTransaction } from '../types';
import confetti from 'canvas-confetti';
import { 
  X, 
  Gift, 
  Award, 
  Crown, 
  Sparkles, 
  Check, 
  ChevronRight, 
  History, 
  Flame, 
  ShoppingBag, 
  ArrowUpRight, 
  Coins, 
  Lock, 
  Info,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export const ZaytunRewardsModal: React.FC = () => {
  const {
    isRewardsModalOpen,
    setIsRewardsModalOpen,
    user,
    pointsHistory,
    redeemReward,
    currentLoyaltyTier,
    nextLoyaltyTier,
    pointsToNextTier,
    cart,
    setIsCartOpen,
    lang,
    formatPrice,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'catalog' | 'history' | 'tiers'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [redeemingId, setRedeemingId] = useState<string | null>(null);

  if (!isRewardsModalOpen) return null;

  // Count how many reward items are currently in user's cart
  const freeItemsInCart = cart.filter((c) => c.isRewardItem);

  const handleRedeem = (reward: RewardItem) => {
    setRedeemingId(reward.id);
    const success = redeemReward(reward);
    if (success) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#ffffff', '#eab308'],
      });
    }
    setTimeout(() => setRedeemingId(null), 500);
  };

  // Filter rewards by category
  const filteredRewards = selectedCategory === 'all'
    ? REWARD_ITEMS
    : REWARD_ITEMS.filter((item) => item.category === selectedCategory);

  // Calculate progress percent to next tier
  let progressPercent = 100;
  if (nextLoyaltyTier) {
    const currentTierMin = currentLoyaltyTier.minPointsRequired;
    const nextTierMin = nextLoyaltyTier.minPointsRequired;
    const span = nextTierMin - currentTierMin;
    const progressInSpan = Math.max(0, user.bonusPoints - currentTierMin);
    progressPercent = Math.min(100, Math.round((progressInSpan / span) * 100));
  }

  const categoryFilters = [
    { id: 'all', label: { ky: 'Баары', uz: 'Barchasi', ru: 'Все', en: 'All' } },
    { id: 'tandir', label: { ky: 'Тандыр', uz: 'Tandir', ru: 'Тандыр', en: 'Tandoor' } },
    { id: 'palov', label: { ky: 'Палоо', uz: 'Palov', ru: 'Плов', en: 'Pilaf' } },
    { id: 'shashlik', label: { ky: 'Шишкебек', uz: 'Shashlik', ru: 'Шашлык', en: 'Kebab' } },
    { id: 'ichimliklar', label: { ky: 'Чай', uz: 'Choy', ru: 'Чай', en: 'Tea' } },
    { id: 'shirinliklar', label: { ky: 'Таттуулар', uz: 'Shirinliklar', ru: 'Десерты', en: 'Sweets' } },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={() => setIsRewardsModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#08140a] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-6 text-stone-100 flex flex-col max-h-[92vh] animate-in zoom-in-95">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-amber-900/30 flex items-center justify-between bg-gradient-to-r from-[#0b1d10] via-[#102917] to-[#0b1d10]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 flex items-center justify-center shadow-lg shadow-amber-950/50 shrink-0">
              <Gift className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  className="font-black text-lg sm:text-xl text-white tracking-wide font-serif"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  ZAYTUN REWARDS
                </h2>
                <span className="text-[10px] sm:text-xs font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{lang === 'ky' ? 'Адал упайлар' : 'Halol ballar'}</span>
                </span>
              </div>
              <p className="text-xs text-stone-300 hidden sm:block">
                {lang === 'ky'
                  ? 'Ар бир буйрутмадан кэшбэк топтоп, бекер тамактарга алмаштырыңыз!'
                  : lang === 'uz'
                  ? 'Har bir buyurtmadan keshbek toʻplab, bepul taomlarga almashtiring!'
                  : 'Копите баллы с каждого заказа и обменивайте на любимые бесплатные блюда!'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsRewardsModalOpen(false)}
            className="p-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          
          {/* Main User Points & Loyalty Tier Status Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#122817] via-[#0d1e11] to-[#071309] border border-amber-500/40 shadow-xl relative overflow-hidden">
            {/* Ambient background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: Points Balance & Cash Value */}
              <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-white/10 pb-5 md:pb-0 md:pr-6">
                <span className="text-xs font-semibold text-amber-300/80 uppercase tracking-wider block">
                  {lang === 'ky' ? 'Сиздин упай балансыңыз:' : lang === 'uz' ? 'Sizning ball balansingiz:' : 'Ваш баланс баллов:'}
                </span>
                
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-amber-400">
                    {user.bonusPoints}
                  </span>
                  <span className="text-lg font-bold text-stone-300 font-serif">
                    {lang === 'ky' ? 'упай' : lang === 'uz' ? 'ball' : 'баллов'}
                  </span>
                </div>

                <div className="mt-2 text-xs text-stone-400 flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {lang === 'ky' ? 'Накталай эквиваленти:' : lang === 'uz' ? 'Naqd ekvivalenti:' : 'Эквивалент:'}{' '}
                    <strong className="text-stone-200 font-mono">{formatPrice(user.bonusPoints)}</strong>
                  </span>
                </div>

                {/* Free items in cart indicator */}
                {freeItemsInCart.length > 0 && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{freeItemsInCart.length} {lang === 'ky' ? 'бекер тамак себетте' : 'bepul taom savatda'}</span>
                  </div>
                )}
              </div>

              {/* Right Column: Current Tier Badge & Progress to Next Tier */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-stone-950 shadow-md"
                      style={{ backgroundColor: currentLoyaltyTier.color }}
                    >
                      <Crown className="w-4 h-4 text-stone-950 fill-stone-950" />
                    </div>
                    <div>
                      <span className="text-[11px] text-stone-400 block font-medium">
                        {lang === 'ky' ? 'Учурдагы даражаңыз:' : lang === 'uz' ? 'Hozirgi darajangiz:' : 'Ваш уровень:'}
                      </span>
                      <span className="font-extrabold text-base text-white">
                        {currentLoyaltyTier.name[lang] || currentLoyaltyTier.name.ky}
                      </span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black font-mono">
                    +{currentLoyaltyTier.cashbackPercent}% КЭШБЭК
                  </span>
                </div>

                {/* Progress bar to next tier */}
                {nextLoyaltyTier ? (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-stone-300 font-medium">
                      <span>
                        {lang === 'ky' ? `Кийинки даража: «${nextLoyaltyTier.name[lang] || nextLoyaltyTier.name.ky}»` : `Keyingi bosqich: «${nextLoyaltyTier.name[lang] || nextLoyaltyTier.name.uz}»`}
                      </span>
                      <span className="text-amber-400 font-mono font-bold">
                        {user.bonusPoints} / {nextLoyaltyTier.minPointsRequired}
                      </span>
                    </div>

                    <div className="w-full h-3 rounded-full bg-stone-900 border border-white/10 overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-stone-400 text-right">
                      {lang === 'ky'
                        ? `Дагы ${pointsToNextTier} упай топтоп, ${nextLoyaltyTier.cashbackPercent}% кэшбэкке жетиңиз!`
                        : lang === 'uz'
                        ? `Yana ${pointsToNextTier} ball toʻplab, ${nextLoyaltyTier.cashbackPercent}% keshbekka ega boʻling!`
                        : `Еще ${pointsToNextTier} баллов до ${nextLoyaltyTier.cashbackPercent}% кешбэка!`}
                    </p>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>
                      {lang === 'ky' ? 'Сиз эң жогорку Платина VIP даражасындасыз!' : 'Siz eng yuqori Platina VIP maqomidasiz!'}
                    </span>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Navigation Tabs: Catalog / Points History / Tiers & Perks */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-stone-900/90 border border-white/10">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Gift className="w-4 h-4" />
              <span>{lang === 'ky' ? 'Бекер тамактар' : lang === 'uz' ? 'Bepul taomlar' : 'Бесплатные блюда'}</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <History className="w-4 h-4" />
              <span>{lang === 'ky' ? 'Упай тарыхы' : lang === 'uz' ? 'Ballar tarixi' : 'История баллов'}</span>
            </button>

            <button
              onClick={() => setActiveTab('tiers')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'tiers'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{lang === 'ky' ? 'Даражалар' : lang === 'uz' ? 'Darajalar' : 'Уровни'}</span>
            </button>
          </div>

          {/* TAB 1: Free Items Catalog (Redeemable Rewards) */}
          {activeTab === 'catalog' && (
            <div className="space-y-5">
              
              {/* Category Pill Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categoryFilters.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
                        : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 border border-white/5'
                    }`}
                  >
                    {cat.label[lang] || cat.label.ky}
                  </button>
                ))}
              </div>

              {/* Reward Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRewards.map((reward) => {
                  const canAfford = user.bonusPoints >= reward.pointsCost;
                  const rewardName = reward.name[lang] || reward.name.ky;
                  const rewardDesc = reward.description[lang] || reward.description.ky;
                  const isRedeeming = redeemingId === reward.id;

                  return (
                    <div
                      key={reward.id}
                      className={`p-4 rounded-3xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                        canAfford
                          ? 'bg-[#0b170e] border-amber-500/30 hover:border-amber-400/60 shadow-lg'
                          : 'bg-[#070e09]/80 border-white/5 opacity-85'
                      }`}
                    >
                      {/* Badge if available */}
                      {reward.badge && (
                        <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-black text-[10px] uppercase tracking-wider shadow-md">
                          {reward.badge[lang] || reward.badge.ky}
                        </div>
                      )}

                      <div className="flex gap-3.5 mb-4">
                        {/* Image */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-stone-950 shrink-0 border border-white/10 relative">
                          <img
                            src={reward.image}
                            alt={rewardName}
                            className="w-full h-full object-cover"
                          />
                          {!canAfford && (
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
                              <Lock className="w-5 h-5 text-stone-400" />
                            </div>
                          )}
                        </div>

                        {/* Text description */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm sm:text-base text-white line-clamp-1">
                            {rewardName}
                          </h4>
                          <p className="mt-1 text-xs text-stone-400 line-clamp-2 leading-relaxed">
                            {rewardDesc}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="font-mono text-xs text-stone-400">
                              {lang === 'ky' ? 'Баасы:' : 'Narxi:'}{' '}
                              <del className="text-stone-500">{formatPrice(reward.originalPriceKgs)}</del>
                            </span>
                            <span className="text-[11px] font-bold text-emerald-400 uppercase">
                              {lang === 'ky' ? 'БЕКЕР' : 'BEPUL'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Strip */}
                      <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-xs">
                            <Gift className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-sm sm:text-base font-black font-mono text-amber-400">
                              {reward.pointsCost}
                            </span>
                            <span className="text-xs text-stone-400 ml-1">
                              {lang === 'ky' ? 'упай' : 'ball'}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRedeem(reward)}
                          disabled={!canAfford || isRedeeming}
                          className={`py-2 px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                            canAfford
                              ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-md shadow-amber-950/40 active:scale-95'
                              : 'bg-stone-900 border border-white/5 text-stone-500 cursor-not-allowed'
                          }`}
                        >
                          {isRedeeming ? (
                            <span>{lang === 'ky' ? 'Кошулууда...' : 'Qoʻshilmoqda...'}</span>
                          ) : canAfford ? (
                            <>
                              <Gift className="w-3.5 h-3.5" />
                              <span>{lang === 'ky' ? 'Бекер алуу' : lang === 'uz' ? 'Bepul olish' : 'Получить бесплатно'}</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-3.5 h-3.5 text-stone-500" />
                              <span>
                                {lang === 'ky'
                                  ? `Дагы ${reward.pointsCost - user.bonusPoints} упай`
                                  : `Yana ${reward.pointsCost - user.bonusPoints} ball`}
                              </span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 2: Points History (Transactions) */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-stone-900/40 border border-white/5 flex items-center justify-between text-xs text-stone-300">
                <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'ky' ? 'Бардык топтолгон жана коротулган упайлар' : 'Barcha toʻplangan va sarflangan ballar'}</span>
                </span>
                <span className="font-mono text-stone-400">{pointsHistory.length} {lang === 'ky' ? 'амал' : 'amaliyot'}</span>
              </div>

              {pointsHistory.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-sm">
                  {lang === 'ky' ? 'Упайлар тарыхы азырынча жок' : 'Ballar tarixi hali mavjud emas'}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {pointsHistory.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3.5 rounded-2xl bg-[#09150d] border border-white/5 flex items-center justify-between gap-3 hover:border-amber-500/20 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                            tx.type === 'earned'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {tx.type === 'earned' ? '+' : '−'}
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-white truncate">
                            {tx.description[lang] || tx.description.ky}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-0.5">
                            <Clock className="w-3 h-3 text-stone-500" />
                            <span>{tx.date}</span>
                            {tx.orderNumber && (
                              <span className="px-1.5 py-0.2 rounded bg-stone-900 border border-white/5 font-mono text-[10px] text-amber-300">
                                {tx.orderNumber}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          className={`font-mono text-sm sm:text-base font-bold ${
                            tx.type === 'earned' ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {tx.type === 'earned' ? `+${tx.points}` : `−${tx.points}`}
                        </span>
                        <span className="text-[10px] text-stone-400 block">
                          {lang === 'ky' ? 'упай' : 'ball'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Loyalty Tiers & Perks Comparison */}
          {activeTab === 'tiers' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {LOYALTY_TIERS.map((tier) => {
                  const isCurrent = currentLoyaltyTier.id === tier.id;

                  return (
                    <div
                      key={tier.id}
                      className={`p-5 rounded-3xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-[#0d2212] border-amber-500/70 shadow-xl ring-1 ring-amber-500/40'
                          : 'bg-[#09150d] border-white/5'
                      }`}
                    >
                      {isCurrent && (
                        <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-black text-[10px] uppercase tracking-wider">
                          {lang === 'ky' ? 'СИЗДИН ДАРАЖА' : 'SIZNING DARAJA'}
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                          <div
                            className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-stone-950 shadow-md"
                            style={{ backgroundColor: tier.color }}
                          >
                            <Crown className="w-5 h-5 text-stone-950 fill-stone-950" />
                          </div>
                          <div>
                            <h4 className="font-bold text-base text-white">
                              {tier.name[lang] || tier.name.ky}
                            </h4>
                            <span className="text-xs text-amber-400 font-mono font-semibold">
                              {tier.minPointsRequired === 0
                                ? (lang === 'ky' ? 'Башталгыч даража' : 'Boshlangʻich daraja')
                                : `${tier.minPointsRequired}+ ${lang === 'ky' ? 'упай' : 'ball'}`}
                            </span>
                          </div>
                        </div>

                        {/* Tier Perks */}
                        <div className="mt-4 space-y-2">
                          {tier.perks.map((perk, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-stone-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{perk[lang] || perk.ky}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-stone-400">{lang === 'ky' ? 'Кэшбэк өлчөмү:' : 'Keshbek miqdori:'}</span>
                        <span className="text-base font-mono font-black text-amber-400">
                          +{tier.cashbackPercent}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explainer card */}
              <div className="p-4 rounded-2xl bg-stone-900/60 border border-white/5 text-xs text-stone-300 space-y-1.5">
                <h4 className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'ky' ? 'Упайлар кантип эсептелет?' : 'Ballar qanday toʻplanadi?'}</span>
                </h4>
                <p className="leading-relaxed">
                  {lang === 'ky'
                    ? '«Зайтун» кафесинде жасалган ар бир буйрутмаңыздан кэшбэк упайлары дароо чегерилет. 1 упай = 1 сомго тете. Сиз топтолгон упайларды кийинки буйрутмаларда арзандатуу катары колдонсоңуз же каалаган убакта акысыз тамактарга алмаштыра аласыз!'
                    : lang === 'uz'
                    ? '«Zaytun» kafesida berilgan har bir buyurtmangizdan keshbek ballari darhol yoziladi. 1 ball = 1 soʻmga teng. Ballarni keyingi buyurtmalarda chegirma sifatida ishlatishingiz yoki bepul taomlarga almashtirishingiz mumkin!'
                    : 'С каждого заказа начисляются баллы (1 балл = 1 сом). Вы можете обменивать их на бесплатные блюда или списывать до 30% стоимости заказа!'}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Sticky Bottom Bar */}
        <div className="p-4 sm:p-5 border-t border-amber-900/30 bg-[#071108] flex items-center justify-between gap-4">
          <div className="text-xs text-stone-300 flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {lang === 'ky' ? 'Каталогдон каалаган тамакты тандап, бекер алыңыз!' : 'Katalogdan xohlagan taomni bepul tanlang!'}
            </span>
          </div>

          <button
            onClick={() => {
              setIsRewardsModalOpen(false);
              setIsCartOpen(true);
            }}
            className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-950/40 cursor-pointer shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-stone-950" />
            <span>{lang === 'ky' ? 'Себетке өтүү' : 'Savatga oʻtish'}</span>
            {freeItemsInCart.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-stone-950 text-amber-400 font-extrabold text-[11px] flex items-center justify-center">
                {freeItemsInCart.length}
              </span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
