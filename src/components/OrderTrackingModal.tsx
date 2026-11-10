import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../data/translations';
import { 
  X, 
  Clock, 
  MapPin, 
  Phone, 
  ChefHat, 
  Bike, 
  CheckCircle2, 
  Check, 
  ShieldCheck, 
  PackageCheck,
  Navigation
} from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const {
    isTrackingOpen,
    setIsTrackingOpen,
    activeTrackingOrder,
    orders,
    lang,
    formatPrice,
  } = useApp();

  const [activeStepIndex, setActiveStepIndex] = useState(2); // Simulated "Courier on way"
  const [minutesRemaining, setMinutesRemaining] = useState(28);

  const order = activeTrackingOrder || orders.find((o) => o.status !== 'cancelled') || orders[0];

  useEffect(() => {
    // Subtle countdown timer simulation
    const interval = setInterval(() => {
      setMinutesRemaining((prev) => (prev > 1 ? prev - 1 : 1));
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  if (!isTrackingOpen || !order) return null;

  const trackingSteps = [
    {
      title: getTranslation('statusPending', lang),
      desc: lang === 'ky' ? 'Ашкана буйрутманы кабыл алды' : 'Oshxona buyurtmani qabul qildi',
      icon: PackageCheck,
      done: activeStepIndex >= 0,
      active: activeStepIndex === 0,
    },
    {
      title: getTranslation('statusPreparing', lang),
      desc: lang === 'ky' ? 'Девзира демделип, шишкебектер чокко коюлду' : 'Devzira dimlanib, kaboblar choʻgʻ ustiga qoʻyildi',
      icon: ChefHat,
      done: activeStepIndex >= 1,
      active: activeStepIndex === 1,
    },
    {
      title: getTranslation('statusOnWay', lang),
      desc: lang === 'ky' ? 'Курьер термо-сумкада ысык бойдон алып келе жатат' : 'Kuryer termo-sumkada qaynoq holda yetkazmoqda',
      icon: Bike,
      done: activeStepIndex >= 2,
      active: activeStepIndex === 2,
    },
    {
      title: getTranslation('statusDelivered', lang),
      desc: lang === 'ky' ? 'Дарегиңизге жеткирилди' : 'Manzilingizga yetkazildi',
      icon: CheckCircle2,
      done: activeStepIndex >= 3,
      active: activeStepIndex === 3,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsTrackingOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-[#0a160d] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-6 text-stone-100 flex flex-col animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-5 border-b border-amber-900/30 flex items-center justify-between bg-[#071109]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Bike className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                  {getTranslation('trackingTitle', lang)}
                </h3>
                <span className="font-mono text-xs text-amber-400 font-bold px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30">
                  {order.orderNumber}
                </span>
              </div>
              <p className="text-xs text-emerald-300 font-medium">
                {getTranslation('courierName', lang)}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-2 rounded-xl bg-stone-900/80 text-stone-400 hover:text-white border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Estimated Delivery Countdown */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-[#0f2415] to-[#12281a] border border-emerald-500/30 flex items-center justify-between">
            <div>
              <span className="text-xs text-emerald-200/80 block">
                {getTranslation('estimatedDeliveryIn', lang)}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono mt-0.5">
                ~ {minutesRemaining} {lang === 'ky' ? 'мүнөт' : 'daqiqa'}
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="space-y-4">
            {trackingSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex items-start gap-4 relative">
                  {/* Vertical line connecting steps */}
                  {idx < trackingSteps.length - 1 && (
                    <div
                      className={`absolute left-5 top-10 w-[2px] h-10 ${
                        activeStepIndex > idx ? 'bg-amber-400' : 'bg-stone-800'
                      }`}
                    />
                  )}

                  {/* Step circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                      step.active
                        ? 'bg-amber-500 border-amber-300 text-stone-950 shadow-lg shadow-amber-500/30 animate-pulse'
                        : step.done
                        ? 'bg-emerald-600 border-emerald-400 text-white'
                        : 'bg-stone-900 border-stone-700 text-stone-500'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Step details */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-sm font-bold ${
                          step.active ? 'text-amber-300' : step.done ? 'text-white' : 'text-stone-500'
                        }`}
                      >
                        {step.title}
                      </h4>
                      {step.active && (
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest px-2 py-0.5 rounded bg-amber-400/10">
                          {lang === 'ky' ? 'Азыркы учурда' : 'Hozirgi bosqich'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual Route Map in Uzgen */}
          <div className="p-4 rounded-2xl bg-[#060f08] border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1.5 font-bold text-amber-300">
                <Navigation className="w-4 h-4 text-emerald-400" />
                {lang === 'ky' ? 'Өзгөн шаары боюнча каттам:' : 'Oʻzgan shahri boʻyicha yoʻnalish:'}
              </span>
              <span className="text-[11px] text-emerald-400 font-mono font-medium">GPS Live • 2.4 км</span>
            </div>

            {/* Stylized Map View Graphic */}
            <div className="relative h-36 rounded-xl bg-stone-900 border border-white/5 overflow-hidden flex items-center justify-center">
              {/* Street grid background simulation */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e3a24_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
              
              {/* Street lines */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 40 90 Q 150 40 280 80 T 520 60"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
              </svg>

              {/* Start: Zaytun Cafe Pin */}
              <div className="absolute left-6 top-16 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs shadow-lg border-2 border-white">
                  Z
                </div>
                <span className="text-[10px] font-bold text-amber-300 mt-1 bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-sm">
                  Zaytun Cafe
                </span>
              </div>

              {/* Moving Courier Scooter */}
              <div className="absolute left-1/2 top-10 -translate-x-1/2 flex flex-col items-center animate-bounce">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl border-2 border-white">
                  <Bike className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950/90 px-1.5 py-0.2 rounded border border-emerald-500/40">
                  Азамат
                </span>
              </div>

              {/* Destination: Customer Home */}
              <div className="absolute right-6 top-8 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs shadow-lg border-2 border-white">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-white mt-1 bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-sm">
                  {order.address?.street || 'Өзгөн шаары'}
                </span>
              </div>
            </div>

            {/* Courier Contacts */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs">
                <div className="text-stone-400">{getTranslation('courierPhone', lang)}</div>
              </div>
              <a
                href="tel:+996550789012"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{lang === 'ky' ? 'Чалуу' : 'Qoʻngʻiroq qilish'}</span>
              </a>
            </div>
          </div>

          {/* Ordered items breakdown */}
          <div className="p-4 rounded-2xl bg-stone-900/50 border border-white/5 space-y-2 text-xs">
            <div className="font-bold text-amber-300 pb-1 border-b border-white/5">
              {lang === 'ky' ? 'Буйрутмадагы тамактар:' : 'Buyurtmadagi taomlar:'}
            </div>
            {order.items.map((it, i) => (
              <div key={i} className="flex justify-between text-stone-300">
                <span>{it.quantity} × {it.menuItem.name[lang] || it.menuItem.name.ky}</span>
                <span className="font-mono text-amber-400">{formatPrice(it.menuItem.price * it.quantity)}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-white/5 flex justify-between font-bold text-white text-sm">
              <span>{getTranslation('total', lang)}:</span>
              <span className="text-amber-400 font-mono">{formatPrice(order.total)}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
