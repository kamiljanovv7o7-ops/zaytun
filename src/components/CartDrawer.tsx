import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../data/translations';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Store, 
  Sparkles,
  Tag,
  Gift
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    setIsRewardsModalOpen,
    user,
    cart,
    cartSubtotal,
    removeFromCart,
    updateQuantity,
    lang,
    showToast,
    formatPrice,
  } = useApp();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  if (!isCartOpen) return null;

  const deliveryFee = deliveryType === 'delivery' ? (cartSubtotal >= 1500 ? 0 : 100) : 0;
  const total = Math.max(0, cartSubtotal + deliveryFee - appliedDiscount);
  const cashbackEarned = Math.floor(cartSubtotal * 0.05);

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'ZAYTUN' || code === 'UZGEN' || code === 'DEVZIRA') {
      const discount = Math.min(150, Math.floor(cartSubtotal * 0.1));
      setAppliedDiscount(discount);
      showToast(
        lang === 'ky' ? `Промокод ийгиликтүү колдонулду: -${discount} сом!` :
        lang === 'uz' ? `Promokod qoʻllanildi: -${discount} soʻm!` :
        lang === 'ru' ? `Промокод применен: -${discount} сом!` :
        `Promo applied: -${discount} KGS!`,
        'success'
      );
    } else {
      showToast(
        lang === 'ky' ? 'Жараксыз промокод. «ZAYTUN» же «UZGEN» деп жазып көрүңүз' :
        lang === 'uz' ? 'Notoʻgʻri promokod. «ZAYTUN» yoki «UZGEN» ni kiriting' :
        'Неверный промокод. Попробуйте «ZAYTUN» или «UZGEN»',
        'error'
      );
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c180e] border-l border-amber-500/30 text-stone-100 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Cart Header */}
          <div className="p-5 border-b border-amber-900/30 flex items-center justify-between bg-[#08120a]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                  {getTranslation('cartTitle', lang)}
                </h3>
                <span className="text-xs text-amber-300/80">
                  {cart.length} {lang === 'ky' ? 'түр тамак' : lang === 'uz' ? 'xil taom' : 'позиции'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl bg-stone-900/80 text-stone-400 hover:text-white border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fulfillment Toggle: Delivery or Pickup */}
          <div className="p-4 bg-[#0e1e12] border-b border-white/5">
            <span className="text-xs text-stone-400 font-medium block mb-2">
              {getTranslation('deliveryTypePrompt', lang)}
            </span>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-stone-900/90 border border-white/10">
              <button
                onClick={() => setDeliveryType('delivery')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  deliveryType === 'delivery'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>{lang === 'ky' ? 'Жеткирүү' : lang === 'uz' ? 'Yetkazish' : lang === 'ru' ? 'Доставка' : 'Delivery'}</span>
              </button>
              <button
                onClick={() => setDeliveryType('pickup')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  deliveryType === 'pickup'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>{lang === 'ky' ? 'Алып кетүү' : lang === 'uz' ? 'Olib ketish' : lang === 'ru' ? 'Самовывоз' : 'Pickup'}</span>
              </button>
            </div>
          </div>

          {/* Zaytun Rewards Points Shortcut Banner */}
          <div 
            onClick={() => {
              setIsCartOpen(false);
              setIsRewardsModalOpen(true);
            }}
            className="mx-5 my-3 p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#162d1a] to-emerald-500/15 border border-amber-500/40 flex items-center justify-between cursor-pointer hover:border-amber-400 transition-all shadow-md group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
                <Gift className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span>Zaytun Rewards</span>
                  <span className="text-[10px] text-amber-400 font-mono font-bold">
                    ({user.bonusPoints} {lang === 'ky' ? 'упай' : 'ball'})
                  </span>
                </div>
                <div className="text-[11px] text-stone-300">
                  {lang === 'ky' ? 'Бекер тамактарга алмаштыруу' : 'Bepul taomlarga almashtirish'}
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-stone-900/80 border border-white/10 flex items-center justify-center text-stone-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-white text-base">
                  {getTranslation('cartEmpty', lang)}
                </h4>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  {getTranslation('cartEmptySubtitle', lang)}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs hover:bg-amber-500/30 transition-colors"
                >
                  {getTranslation('viewMenu', lang)}
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const optCost = item.selectedOptions.reduce((s, o) => s + o.price, 0);
                const lineTotal = item.isRewardItem ? optCost * item.quantity : (item.menuItem.price + optCost) * item.quantity;

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-2xl border transition-colors flex gap-3.5 ${
                      item.isRewardItem 
                        ? 'bg-[#0a1e12] border-emerald-500/40 shadow-sm' 
                        : 'bg-[#09150d] border-white/5 hover:border-amber-500/30'
                    }`}
                  >
                    {/* Item Thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-950 shrink-0 border border-white/10">
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name[lang] || item.menuItem.name.ky}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                              {item.menuItem.name[lang] || item.menuItem.name.ky}
                            </h4>
                            {item.isRewardItem && (
                              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 w-fit mt-0.5">
                                <Gift className="w-3 h-3 text-emerald-400" />
                                <span>{lang === 'ky' ? 'Zaytun Rewards (Бекер)' : 'Zaytun Rewards (Bepul)'}</span>
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-500 hover:text-rose-400 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Selected options tags */}
                        {item.selectedOptions.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {item.selectedOptions.map((opt, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 font-medium"
                              >
                                +{opt.name}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.portionNote && (
                          <p className="text-[10px] text-stone-400 italic mt-0.5">
                            "{item.portionNote}"
                          </p>
                        )}
                      </div>

                      {/* Quantity & Line Total */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-lg bg-stone-900 border border-white/10 p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-stone-300 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-bold font-mono text-xs text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-stone-300 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {item.isRewardItem ? (
                          <span className="font-black font-mono text-emerald-400 text-xs sm:text-sm">
                            {lang === 'ky' ? 'БЕКЕР (0)' : 'BEPUL (0)'}
                          </span>
                        ) : (
                          <span className="font-black font-mono text-amber-400 text-sm">
                            {formatPrice(lineTotal)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Promo Code Input Card */}
            {cart.length > 0 && (
              <div className="p-3 rounded-2xl bg-stone-900/40 border border-white/5 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Промокод (ZAYTUN / UZGEN)"
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-stone-900/90 border border-white/10 text-xs text-white uppercase placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button
                    onClick={applyPromo}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-bold border border-amber-500/30 transition-colors"
                  >
                    OK
                  </button>
                </div>
                {appliedDiscount > 0 && (
                  <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>-{formatPrice(appliedDiscount)} скидка колдонулду!</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Footer Summary & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-amber-900/30 bg-[#08120a] space-y-3">
              {/* Free delivery prompt */}
              {deliveryType === 'delivery' && (
                <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                  <span>{getTranslation('freeDeliveryBadge', lang)}</span>
                  {cartSubtotal >= 1500 && (
                    <span className="font-extrabold text-amber-400 uppercase">
                      ✓ {getTranslation('freeDeliveryTag', lang)}
                    </span>
                  )}
                </div>
              )}

              {/* Subtotal, delivery, discount, total */}
              <div className="space-y-1.5 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span>{getTranslation('subtotal', lang)}:</span>
                  <span className="font-mono font-medium text-white">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>
                {deliveryType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>{getTranslation('deliveryFee', lang)}:</span>
                    <span className="font-mono font-medium text-white">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-400 font-bold uppercase">{getTranslation('freeDeliveryTag', lang)}</span>
                      ) : (
                        formatPrice(deliveryFee)
                      )}
                    </span>
                  </div>
                )}
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Скидка:</span>
                    <span>-{formatPrice(appliedDiscount)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-white/10 flex justify-between text-base font-black text-white">
                  <span>{getTranslation('total', lang)}:</span>
                  <span className="text-xl text-amber-400 font-mono">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Cashback teaser */}
              <div className="flex items-center justify-between text-[11px] text-amber-300/90 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
                <span className="flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {lang === 'ky' ? 'Кэшбэк топтолот:' : lang === 'uz' ? 'Keshbek toʻplanadi:' : 'Начислится кешбэк:'}
                </span>
                <span className="font-bold font-mono">+{formatPrice(cashbackEarned)}</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-extrabold text-sm flex items-center justify-between shadow-xl shadow-amber-950/50 transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>{getTranslation('checkoutBtn', lang)}</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-base">{formatPrice(total)}</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </div>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
