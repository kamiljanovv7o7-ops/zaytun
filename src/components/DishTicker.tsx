import React from 'react';
import { useApp } from '../context/AppContext';
import { menuItems } from '../data/menu';
import { getTranslation } from '../data/translations';
import { Sparkles, Flame, Plus } from 'lucide-react';

export const DishTicker: React.FC = () => {
  const { lang, setActiveDishModal, addToCart, formatPrice } = useApp();

  // We duplicate the items to create a continuous infinite marquee
  const tickerItems = [...menuItems, ...menuItems];

  const tickerHeading = {
    ky: '🔥 АКТУАЛДУУ БААЛАР',
    uz: '🔥 KUNLIK TAOMLAR NARXI',
    ru: '🔥 ЦЕНЫ НАШЕГО МЕНЮ',
    en: '🔥 LIVE MENU PRICES',
  }[lang];

  return (
    <div className="relative w-full bg-gradient-to-r from-[#071309] via-[#0d2212] to-[#071309] border-y border-amber-500/30 overflow-hidden py-2.5 select-none z-20 shadow-md">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06),transparent_70%)] pointer-events-none" />

      <div className="flex items-center">
        
        {/* Fixed Left Badge */}
        <div className="shrink-0 z-10 pl-3 sm:pl-6 pr-3 bg-gradient-to-r from-[#071309] via-[#071309] to-transparent flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md shrink-0">
            <Flame className="w-3.5 h-3.5 fill-stone-950 animate-bounce" />
            <span>{tickerHeading}</span>
          </div>
        </div>

        {/* Marquee Track Container with left and right gradient fades */}
        <div className="relative flex-1 overflow-hidden">
          {/* Left edge shadow */}
          <div className="absolute left-0 inset-y-0 w-8 bg-gradient-to-r from-[#071309] to-transparent z-10 pointer-events-none" />
          {/* Right edge shadow */}
          <div className="absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-[#071309] to-transparent z-10 pointer-events-none" />

          {/* Running Ticker Track */}
          <div className="animate-marquee items-center gap-4 py-0.5">
            {tickerItems.map((dish, idx) => {
              const dishName = dish.name[lang] || dish.name.ky;

              return (
                <div
                  key={`${dish.id}-${idx}`}
                  onClick={() => setActiveDishModal(dish)}
                  className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#0a180e]/90 hover:bg-amber-500/20 border border-amber-500/25 hover:border-amber-400 text-stone-200 transition-all cursor-pointer shrink-0 shadow-sm"
                  title={`${dishName} - заказ кылуу`}
                >
                  {/* Thumbnail Image */}
                  <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-amber-400/60 bg-stone-950">
                    <img
                      src={dish.image}
                      alt={dishName}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-300"
                    />
                  </div>

                  {/* Dish Name */}
                  <span className="text-xs font-semibold text-stone-200 group-hover:text-amber-200 transition-colors whitespace-nowrap">
                    {dishName}
                  </span>

                  {/* Price Tag */}
                  <span className="font-mono text-xs font-black text-amber-400 group-hover:text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20 whitespace-nowrap">
                    {formatPrice(dish.price)}
                  </span>

                  {/* Plus Icon on hover */}
                  <div className="w-4 h-4 rounded-full bg-amber-500/30 group-hover:bg-amber-500 text-amber-300 group-hover:text-stone-950 flex items-center justify-center transition-colors">
                    <Plus className="w-2.5 h-2.5 stroke-[3]" />
                  </div>

                  {/* Oriental Separator Dot */}
                  <span className="text-amber-500/60 text-xs ml-1">•</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
