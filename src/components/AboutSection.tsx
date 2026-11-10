import React from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../data/translations';
import { ZaytunLogo } from './ZaytunLogo';
import { 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Flame, 
  HeartHandshake, 
  CheckCircle2 
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { lang, setIsReservationOpen } = useApp();

  return (
    <section id="about-section" className="py-16 sm:py-24 bg-[#08120a] relative overflow-hidden border-t border-amber-950/40">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Composition with real emblem and historic culinary vibe */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-amber-500/40 shadow-2xl shadow-black/80 bg-stone-950">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop"
                  alt="Eastern charcoal grill"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                
                {/* Central Emblem Badge Floating */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600 shadow-2xl shadow-amber-950/60 mb-4 animate-pulse">
                    <div className="w-full h-full rounded-full overflow-hidden bg-black border border-amber-400 flex items-center justify-center">
                      <img
                        src="/assets/aistudio/WhatsApp_Image_2026-11-06_at_15.35.09_eeaeb21b.jpeg"
                        alt="Zaytun emblem"
                        className="w-full h-full object-cover scale-[2.2] object-[center_45.2%]"
                      />
                    </div>
                  </div>
                  <h3
                    className="text-2xl font-black text-amber-300 tracking-wider"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    «ZAYTUN» ӨЗГӨН
                  </h3>
                  <p className="text-xs text-amber-100/90 font-medium max-w-xs mt-1">
                    {getTranslation('brandSubtitle', lang)}
                  </p>
                </div>

                {/* Bottom banner: Historic city Uzgen */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 text-center">
                  <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider block">
                    Улуу Жибек Жолунун мурасы
                  </span>
                  <span className="text-xs text-stone-300">
                    Өзгөн мунарасы & Караханийлер доорунан бери даңазаланган даамдар
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Story & Quality Badges */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ky' ? 'Нукура Өзгөн Салты' : 'Haqiqiy Oʻzgan Anʼanasi'}</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {getTranslation('aboutTitle', lang)}
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              {getTranslation('aboutP1', lang)}
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-[#09150d] border border-amber-900/30 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {getTranslation('aboutBadge1', lang)}
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Кара-Дарыянын суусу менен сугарылган нукура кызыл Девзира күрүчү.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#09150d] border border-amber-900/30 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {getTranslation('aboutBadge2', lang)}
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Күн сайын таң эрте тандалып алынган 100% Халал жаш козу эти.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#09150d] border border-amber-900/30 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {getTranslation('aboutBadge3', lang)}
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Чоподон жасалган чоң тандырларда оттун табы менен бышкан назик самсалар.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#09150d] border border-amber-900/30 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {getTranslation('aboutBadge4', lang)}
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Алай жана Тянь-Шань тоо чөптөрүнөн демделген сергитүүчү жыпар чайлар.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={() => setIsReservationOpen(true)}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-950/40"
              >
                {getTranslation('navReservations', lang)}
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('menu-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-semibold border border-white/10"
              >
                {getTranslation('viewMenu', lang)}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
