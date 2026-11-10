import React from 'react';
import { useApp } from '../context/AppContext';
import { categories, menuItems } from '../data/menu';
import { getTranslation } from '../data/translations';
import { MenuItem, CategoryId } from '../types';
import { 
  Search, 
  X, 
  Flame, 
  Heart, 
  Plus, 
  Minus, 
  Clock, 
  Sparkles, 
  Beef, 
  Soup, 
  Croissant, 
  Coffee, 
  Salad, 
  GlassWater, 
  Cake 
} from 'lucide-react';

export const MenuSection: React.FC = () => {
  const {
    lang,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    cart,
    addToCart,
    updateQuantity,
    setActiveDishModal,
    user,
    toggleFavorite,
    formatPrice,
  } = useApp();

  // Helper to render icon for category
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Beef': return <Beef className="w-4 h-4" />;
      case 'Soup': return <Soup className="w-4 h-4" />;
      case 'Croissant': return <Croissant className="w-4 h-4" />;
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      case 'Salad': return <Salad className="w-4 h-4" />;
      case 'GlassWater': return <GlassWater className="w-4 h-4" />;
      case 'Cake': return <Cake className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  // Filter items based on selected category & search query
  const filteredDishes = menuItems.filter((dish) => {
    // category match
    if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
      return false;
    }

    // search query match in any language
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const inKy = dish.name.ky.toLowerCase().includes(q) || dish.ingredients.ky.toLowerCase().includes(q);
      const inUz = dish.name.uz.toLowerCase().includes(q) || dish.ingredients.uz.toLowerCase().includes(q);
      const inRu = dish.name.ru.toLowerCase().includes(q) || dish.ingredients.ru.toLowerCase().includes(q);
      const inEn = dish.name.en.toLowerCase().includes(q) || dish.ingredients.en.toLowerCase().includes(q);
      return inKy || inUz || inRu || inEn;
    }

    return true;
  });

  return (
    <section id="menu-section" className="py-14 sm:py-20 bg-[#0a120b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
              <span className="w-8 h-[2px] bg-amber-400" />
              <span>{getTranslation('brandSubtitle', lang)}</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {lang === 'ky' ? 'Биздин Онлайн Меню' : lang === 'uz' ? 'Bizning Onlayn Menyu' : lang === 'ru' ? 'Наше Онлайн Меню' : 'Our Online Menu'}
            </h2>
            <p className="mt-2 text-stone-400 text-sm max-w-xl">
              {lang === 'ky'
                ? 'Өзгөндүн байыркы рецепттери менен бышырылган ысык тамактар. Бир басуу менен себетке кошуңуз!'
                : lang === 'uz'
                ? 'Oʻzganing azaliy retseptlari asosida pishirilgan qaynoq taomlar. Birgina tugma bilan savatga qoʻshing!'
                : lang === 'ru'
                ? 'Горячие блюда по старинным узгенским рецептам с моментальной доставкой.'
                : 'Authentic Eastern meals prepared using historic recipes. Order with one click!'}
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={getTranslation('searchPlaceholder', lang)}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-stone-900/90 border border-amber-900/40 text-stone-100 placeholder:text-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const catName = cat.name[lang] || cat.name.ky;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-lg shadow-amber-950/50 scale-[1.02]'
                    : 'bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800/80 border border-white/5'
                }`}
              >
                <span className={isSelected ? 'text-stone-950' : 'text-amber-400'}>
                  {renderCategoryIcon(cat.iconName)}
                </span>
                <span>{catName}</span>
              </button>
            );
          })}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredDishes.length === 0 && (
          <div className="text-center py-20 px-4 rounded-3xl bg-stone-900/30 border border-white/5">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {lang === 'ky' ? 'Тамак табылган жок' : lang === 'uz' ? 'Hech qanday taom topilmadi' : lang === 'ru' ? 'Блюда не найдены' : 'No dishes found'}
            </h3>
            <p className="text-sm text-stone-400 max-w-md mx-auto mb-6">
              {lang === 'ky'
                ? `«${searchQuery}» боюнча эч нерсе табылган жок. Башка сөз же категория тандап көрүңүз.`
                : lang === 'uz'
                ? `«${searchQuery}» boʻyicha taom topilmadi. Boshqa soʻz bilan qidiring.`
                : 'Попробуйте изменить поисковый запрос или выберите другую категорию.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider"
            >
              {lang === 'ky' ? 'Бардык менюну көрсөтүү' : lang === 'uz' ? 'Barcha menyuni koʻrish' : 'Показать всё меню'}
            </button>
          </div>
        )}

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDishes.map((dish) => {
            const isFav = user.favorites.includes(dish.id);
            const cartEntries = cart.filter((c) => c.menuItem.id === dish.id);
            const qtyInCart = cartEntries.reduce((s, c) => s + c.quantity, 0);

            return (
              <div
                key={dish.id}
                className="group relative flex flex-col rounded-3xl bg-[#0e1910] border border-amber-900/30 hover:border-amber-500/50 shadow-xl hover:shadow-2xl hover:shadow-amber-950/30 transition-all duration-300 overflow-hidden"
              >
                {/* Dish Card Image & Badges */}
                <div
                  onClick={() => setActiveDishModal(dish)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950 cursor-pointer"
                >
                  <img
                    src={dish.image}
                    alt={dish.name[lang] || dish.name.ky}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1910] via-transparent to-transparent opacity-80" />

                  {/* Top Badges: Popular / Spicy */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {dish.isPopular && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-stone-950" />
                        {getTranslation('popularBadge', lang)}
                      </span>
                    )}
                    {dish.isSpicy && (
                      <span className="px-2.5 py-1 rounded-full bg-rose-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {getTranslation('spicyBadge', lang)}
                      </span>
                    )}
                  </div>

                  {/* Favorite Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(dish.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-colors border border-white/10"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFav ? 'fill-rose-500 text-rose-500' : 'text-stone-300'
                      }`}
                    />
                  </button>

                  {/* Bottom Image Stats: Weight & Prep time */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-stone-300 font-medium">
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm border border-white/10">
                      {dish.weight}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm border border-white/10 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {dish.prepTimeMinutes} {getTranslation('prepTime', lang)}
                    </span>
                  </div>
                </div>

                {/* Dish Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div
                    onClick={() => setActiveDishModal(dish)}
                    className="cursor-pointer"
                  >
                    <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {dish.name[lang] || dish.name.ky}
                    </h3>
                    <p className="mt-1 text-xs text-stone-400 line-clamp-2 leading-relaxed">
                      {dish.description[lang] || dish.description.ky}
                    </p>
                  </div>

                  {/* Price and Cart Actions */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-lg sm:text-xl font-black font-mono text-amber-400">
                        {formatPrice(dish.price)}
                      </span>
                    </div>

                    {qtyInCart > 0 ? (
                      /* Quantity control buttons */
                      <div className="flex items-center rounded-xl bg-amber-500/20 border border-amber-500/50 p-1">
                        <button
                          onClick={() => {
                            if (cartEntries[0]) {
                              updateQuantity(cartEntries[0].id, cartEntries[0].quantity - 1);
                            }
                          }}
                          className="w-7 h-7 rounded-lg hover:bg-amber-500/30 flex items-center justify-center text-amber-300 font-bold transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center font-bold font-mono text-sm text-white">
                          {qtyInCart}
                        </span>
                        <button
                          onClick={() => addToCart(dish)}
                          className="w-7 h-7 rounded-lg hover:bg-amber-500/30 flex items-center justify-center text-amber-300 font-bold transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      /* Add to Cart Button */
                      <button
                        onClick={() => addToCart(dish)}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-950/40 transition-all active:scale-95 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>{getTranslation('addToCart', lang)}</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
