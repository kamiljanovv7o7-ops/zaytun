import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../data/translations';
import { CartItemOption } from '../types';
import { 
  X, 
  Clock, 
  Flame, 
  Heart, 
  Plus, 
  Minus, 
  Check, 
  ShoppingBag,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const DishModal: React.FC = () => {
  const { activeDishModal, setActiveDishModal, addToCart, lang, user, toggleFavorite, formatPrice } = useApp();
  const [selectedOptions, setSelectedOptions] = useState<CartItemOption[]>([]);
  const [portionNote, setPortionNote] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!activeDishModal) return null;

  const dish = activeDishModal;
  const isFavorite = user.favorites.includes(dish.id);

  const toggleOption = (optName: string, optPrice: number) => {
    setSelectedOptions((prev) => {
      const exists = prev.some((o) => o.name === optName);
      if (exists) {
        return prev.filter((o) => o.name !== optName);
      } else {
        return [...prev, { name: optName, price: optPrice }];
      }
    });
  };

  const optionsTotal = selectedOptions.reduce((sum, o) => sum + o.price, 0);
  const totalItemPrice = (dish.price + optionsTotal) * quantity;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(dish, selectedOptions, portionNote || undefined);
    }
    setActiveDishModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={() => setActiveDishModal(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0d1a10] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 animate-in zoom-in-95 text-stone-100">
        
        {/* Close Button */}
        <button
          onClick={() => setActiveDishModal(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-stone-300 hover:text-white transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(dish.id)}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-stone-300 transition-colors border border-white/10"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'
            }`}
          />
        </button>

        {/* Dish Hero Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-950">
          <img
            src={dish.image}
            alt={dish.name[lang] || dish.name.ky}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a10] via-transparent to-black/40" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold backdrop-blur-md">
                {dish.weight}
              </span>
              {dish.calories && (
                <span className="px-3 py-1 rounded-full bg-stone-900/60 border border-white/10 text-stone-300 text-xs font-medium backdrop-blur-md flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  {dish.calories} ккал
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-medium backdrop-blur-md">
              <Clock className="w-3.5 h-3.5" />
              <span>{dish.prepTimeMinutes} {getTranslation('prepTime', lang)}</span>
            </div>
          </div>
        </div>

        {/* Dish Info Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-white"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {dish.name[lang] || dish.name.ky}
              </h2>
              <div className="text-2xl font-black text-amber-400 font-mono shrink-0">
                {formatPrice(dish.price)}
              </div>
            </div>

            <p className="mt-2 text-stone-300 text-sm leading-relaxed">
              {dish.description[lang] || dish.description.ky}
            </p>
          </div>

          {/* Ingredients list */}
          <div className="p-4 rounded-2xl bg-stone-900/60 border border-white/5 space-y-1.5">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{getTranslation('ingredientsLabel', lang)}</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 leading-normal">
              {dish.ingredients[lang] || dish.ingredients.ky}
            </p>
          </div>

          {/* Available Add-ons / Options */}
          {dish.availableOptions && dish.availableOptions.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                {lang === 'ky'
                  ? 'Кошумча кошуу (каалоого жараша):'
                  : lang === 'uz'
                  ? 'Qoʻshimchalar (ixtiyoriy):'
                  : lang === 'ru'
                  ? 'Дополнительно к блюду:'
                  : 'Optional Add-ons:'}
              </label>

              <div className="space-y-2">
                {dish.availableOptions.map((opt, i) => {
                  const optName = opt.name[lang] || opt.name.ky;
                  const isChecked = selectedOptions.some((o) => o.name === optName);
                  return (
                    <div
                      key={i}
                      onClick={() => toggleOption(optName, opt.price)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-amber-500/15 border-amber-500/50 text-white'
                          : 'bg-stone-900/40 border-white/5 text-stone-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            isChecked
                              ? 'bg-amber-500 border-amber-400 text-black'
                              : 'border-stone-600'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium">{optName}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        +{formatPrice(opt.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Kitchen Note Input */}
          <div>
            <label className="text-xs font-medium text-stone-400 block mb-1.5">
              {lang === 'ky'
                ? 'Ашпозчуга эскертүү (мисалы: пиязсыз, көбүрөөк зире)'
                : lang === 'uz'
                ? 'Oshpazga eslatma (masalan: piyozsiz, koʻproq zira)'
                : lang === 'ru'
                ? 'Пожелание повару (например: без лука, больше зелени)'
                : 'Special cooking instructions:'}
            </label>
            <input
              type="text"
              value={portionNote}
              onChange={(e) => setPortionNote(e.target.value)}
              placeholder="..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Action Row: Quantity + Add Button */}
          <div className="pt-2 flex items-center gap-4">
            <div className="flex items-center rounded-xl bg-stone-900/90 border border-amber-500/30 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold font-mono text-base text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-base flex items-center justify-between shadow-xl shadow-amber-950/50 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-stone-950" />
                <span>{getTranslation('addToCart', lang)}</span>
              </span>
              <span className="font-black font-mono">
                {formatPrice(totalItemPrice)}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
