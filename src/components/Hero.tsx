import React from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../data/translations';
import { 
  Flame, 
  Clock, 
  ShieldCheck, 
  Coins, 
  ArrowRight, 
  UtensilsCrossed, 
  Sparkles,
  Award
} from 'lucide-react';
import { UzgenWeather } from './UzgenWeather';

export const Hero: React.FC = () => {
  const { lang, setIsReservationOpen, setSearchQuery, formatPrice } = useApp();

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const quickFilter = (keyword: string) => {
    setSearchQuery(keyword);
    scrollToMenu();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#09150d] via-[#0d1c12] to-[#0a120b] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-amber-950/40">
      {/* Decorative ambient lights & radial blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-amber-600/10 blur-[130px] rounded-full pointer-events-none -z-0" />
      <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Row on Main Screen: Left Award Badge & Right Compact Weather Widget */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          {/* Top Award Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-amber-400/20 to-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium shadow-sm w-fit">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{getTranslation('heroBadge', lang)}</span>
          </div>

          {/* Compact Uzgen Weather Widget on the side / corner ("бироз кичинарок ва чекрока") */}
          <div className="w-full sm:w-auto self-end sm:self-auto max-w-sm sm:max-w-md">
            <UzgenWeather variant="hero" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Badges, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Main Headline */}
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-5"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <span className="block text-white">
                {lang === 'ky' && 'Даамдуу чыгыш тамактары'}
                {lang === 'uz' && 'Haqiqiy sharqona lazzat'}
                {lang === 'ru' && 'Истинный вкус Востока'}
                {lang === 'en' && 'Authentic Eastern Delicacies'}
              </span>
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                «ZAYTUN» ӨЗГӨН
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl mb-8 leading-relaxed">
              {getTranslation('heroSubtitle', lang)}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <button
                onClick={scrollToMenu}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-base shadow-xl shadow-amber-950/50 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <UtensilsCrossed className="w-5 h-5 text-stone-950" />
                <span>{getTranslation('orderNow', lang)}</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </button>

              <button
                onClick={() => setIsReservationOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900/80 hover:bg-stone-800/80 border border-amber-500/30 text-amber-200 font-semibold text-base transition-all hover:-translate-y-0.5 cursor-pointer backdrop-blur-sm"
              >
                <span>{getTranslation('navReservations', lang)}</span>
              </button>
            </div>

            {/* Quick Popular Dish Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
              <span className="font-semibold text-amber-400/90 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {lang === 'ky' ? 'Тез издөө:' : lang === 'uz' ? 'Tez qidiruv:' : lang === 'ru' ? 'Популярно:' : 'Trending:'}
              </span>
              {[
                { label: lang === 'ky' ? 'Өзгөн девзира ашы' : lang === 'uz' ? 'Oʻzgan devzira oshi' : 'Узгенский плов', val: 'девзира' },
                { label: lang === 'ky' ? 'Тандыр самса' : lang === 'uz' ? 'Tandir somsa' : 'Самса', val: 'самса' },
                { label: lang === 'ky' ? 'Козу шишкебек' : lang === 'uz' ? 'Qoʻy shashlik' : 'Шашлык', val: 'шашлык' },
                { label: lang === 'ky' ? 'Гуйру лагман' : lang === 'uz' ? 'Lagʻmon' : 'Лагман', val: 'лагман' },
              ].map((pill) => (
                <button
                  key={pill.val}
                  onClick={() => quickFilter(pill.val)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-200 hover:bg-emerald-900/60 hover:text-white transition-colors cursor-pointer"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Golden Glow & Border Card */}
              <div className="relative rounded-3xl p-3 bg-gradient-to-b from-amber-500/30 via-emerald-800/20 to-stone-900/60 border border-amber-500/40 shadow-2xl backdrop-blur-md">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[5/4] shadow-inner bg-stone-950">
                  <img
                    src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop"
                    alt="Authentic Uzgen Devzira Plov"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />

                  {/* Corner Authentic Emblem Badge */}
                  <div className="absolute top-4 left-4 bg-[#0a180e]/95 border border-amber-400/50 rounded-2xl p-2.5 shadow-xl flex items-center gap-2.5 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-400/60 shrink-0 bg-black">
                      <img
                        src="/assets/aistudio/WhatsApp_Image_2026-11-06_at_15.35.09_eeaeb21b.jpeg"
                        alt="Zaytun emblem"
                        className="w-full h-full object-cover scale-[2.2] object-[center_45.2%]"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-300">ZAYTUN CAFE</div>
                      <div className="text-[10px] text-stone-300 font-medium">Өзгөн • Узген</div>
                    </div>
                  </div>

                  {/* Bottom Dish Showcase Note */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">
                        {lang === 'ky' ? 'Башкы шедевр' : lang === 'uz' ? 'Bosh durdona' : lang === 'ru' ? 'Главный хит' : 'Signature Dish'}
                      </span>
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {lang === 'ky' ? 'Падышалык Девзира Ашы' : lang === 'uz' ? 'Shohona Devzira Palovi' : lang === 'ru' ? 'Царский плов Девзира' : 'Royal Devzira Pilaf'}
                      </h3>
                      <p className="text-xs text-stone-300">
                        {lang === 'ky' ? 'Жаш козу эти, казы & бөдөнө жумурткасы' : lang === 'uz' ? 'Qoʻzi goʻshti, qazi va bedana tuxumlari' : 'Баранина, казы и яйца перепелки'}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xl font-extrabold text-amber-400 font-mono">
                        {formatPrice(320)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Micro Badge: Live delivery indicator */}
                <div className="absolute -bottom-5 -left-4 sm:left-4 bg-[#0a180f]/95 border border-emerald-500/40 rounded-2xl p-3 shadow-2xl flex items-center gap-3 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{getTranslation('heroStat1Label', lang)}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <div className="text-[11px] text-emerald-300 font-medium">
                      {lang === 'ky' ? 'Өзгөн боюнча 30-45 мүнөт' : lang === 'uz' ? 'Oʻzgan boʻylab 30-45 daqiqa' : lang === 'ru' ? 'По Узгену 30-45 минут' : '30-45 min across Uzgen'}
                    </div>
                  </div>
                </div>

                {/* Floating Micro Badge: 100% Halal */}
                <div className="absolute -top-4 -right-2 sm:right-4 bg-[#0a180f]/95 border border-amber-500/40 rounded-2xl p-2.5 shadow-2xl flex items-center gap-2 backdrop-blur-md">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-bold text-amber-200">
                    100% ХАЛАЛ
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 3 Value Pillars */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-10 border-t border-white/10">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-900/40 border border-white/5 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{getTranslation('heroStat1Value', lang)}</div>
              <div className="text-xs text-stone-400">{getTranslation('heroStat1Label', lang)}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-900/40 border border-white/5 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{getTranslation('heroStat2Value', lang)}</div>
              <div className="text-xs text-stone-400">{getTranslation('heroStat2Label', lang)}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-900/40 border border-white/5 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{getTranslation('heroStat3Value', lang)}</div>
              <div className="text-xs text-stone-400">{getTranslation('heroStat3Label', lang)}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
