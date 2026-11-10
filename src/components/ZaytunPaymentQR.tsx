import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../data/translations';
import { 
  QrCode, 
  Copy, 
  Check, 
  Maximize2, 
  X, 
  Sparkles, 
  Smartphone, 
  ShieldCheck,
  Download
} from 'lucide-react';

interface ZaytunPaymentQRProps {
  amount: number;
  className?: string;
}

export const ZaytunPaymentQR: React.FC<ZaytunPaymentQRProps> = ({ amount, className = '' }) => {
  const { lang, showToast, formatPrice, currency } = useApp();
  const [isZoomed, setIsZoomed] = useState(false);
  const [copied, setCopied] = useState(false);

  const qrImagePath = '/assets/aistudio/WhatsApp_Image_2026-11-09_at_15.57.34_3c4b4d2d.jpeg';
  const recipientName = 'Умар К';
  const phoneNumber = '+996 (559) 146 555';
  const rawPhone = '+996559146555';

  const handleCopy = () => {
    navigator.clipboard.writeText(rawPhone);
    setCopied(true);
    showToast(
      lang === 'ky' ? `Телефон номери көчүрүлдү: ${phoneNumber}` :
      lang === 'uz' ? `Telefon raqami nusxalandi: ${phoneNumber}` :
      `Номер телефона скопирован: ${phoneNumber}`,
      'success'
    );
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <div className={`p-4 sm:p-5 rounded-3xl bg-[#07130a] border border-amber-500/40 text-stone-100 shadow-xl space-y-4 ${className}`}>
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-white">
                  MBank & ELQR Төлөм коду
                </span>
                <span className="px-1.5 py-0.5 rounded bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[9px] font-black uppercase tracking-wider">
                  ELQR ⚡
                </span>
              </div>
              <span className="text-[11px] text-amber-300/80">
                Кыргызстандын бардык банктарынан сканерлөөгө болот
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsZoomed(true)}
            className="px-2.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-semibold flex items-center gap-1.5 border border-amber-500/30 transition-colors"
            title="Чоңойтуу"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Чоңойтуу</span>
          </button>
        </div>

        {/* QR Code and Payment Details Container */}
        <div className="flex flex-col sm:flex-row items-center gap-5 pt-1">
          
          {/* Real QR Card Image Container */}
          <div
            onClick={() => setIsZoomed(true)}
            className="group relative cursor-pointer p-2.5 bg-white rounded-2xl shadow-2xl shrink-0 transition-transform hover:scale-[1.02] border-2 border-emerald-500/40"
          >
            <div className="relative w-44 h-52 sm:w-48 sm:h-56 rounded-xl overflow-hidden bg-black flex items-center justify-center">
              {/* Cropped to the central white QR card from user's screenshot */}
              <img
                src={qrImagePath}
                alt="MBank ELQR Умар К"
                className="w-full h-full object-cover scale-[1.55] object-[center_42%] transition-transform duration-300 group-hover:scale-[1.62]"
                loading="eager"
              />
              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-bold gap-1 backdrop-blur-[1px]">
                <Maximize2 className="w-5 h-5 text-amber-300" />
                <span>Чоңойтуу / Сканер</span>
              </div>
            </div>

            {/* Bottom Amount Indicator */}
            <div className="mt-2 text-center border-t border-stone-200 pt-1.5">
              <span className="text-[10px] text-stone-500 font-semibold block uppercase tracking-wider">
                Төлөм суммасы:
              </span>
              <span className="font-mono font-black text-emerald-700 text-sm sm:text-base">
                {formatPrice(amount)}
                {currency !== 'KGS' && (
                  <span className="text-xs text-stone-500 font-normal ml-1">({amount} сом)</span>
                )}
              </span>
            </div>
          </div>

          {/* Right Information & Copy Details */}
          <div className="flex-1 space-y-3 text-xs w-full">
            {/* Beneficiary */}
            <div className="p-3 rounded-2xl bg-stone-900/80 border border-white/5 space-y-1">
              <span className="text-[11px] text-stone-400 block">{getTranslation('recipientLabel', lang)}</span>
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-amber-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {recipientName}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  ZAYTUN CAFE
                </span>
              </div>
            </div>

            {/* Phone Number with Instant Copy Button */}
            <div className="p-3 rounded-2xl bg-stone-900/80 border border-white/5 space-y-1">
              <span className="text-[11px] text-stone-400 block">
                {lang === 'ky' ? 'MBank / Капчык телефон номери:' : 'MBank / Hamyon raqami:'}
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-base font-bold text-white tracking-wide">
                  {phoneNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Көчүрүлдү</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{getTranslation('copyNumber', lang)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ELQR compatibility explanation */}
            <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-[11px] text-emerald-200 leading-relaxed">
              <span className="font-bold text-amber-300">💡 Кантип төлөйм? </span>
              {getTranslation('elqrNotice', lang)}
            </div>

            {/* Bank Logos Pill Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 text-[10px] text-stone-400">
              <span className="px-2 py-0.5 rounded bg-stone-900 border border-white/5 font-semibold text-white">
                MBank
              </span>
              <span className="px-2 py-0.5 rounded bg-stone-900 border border-white/5 font-semibold text-white">
                Optima
              </span>
              <span className="px-2 py-0.5 rounded bg-stone-900 border border-white/5 font-semibold text-white">
                О!Деньги
              </span>
              <span className="px-2 py-0.5 rounded bg-stone-900 border border-white/5 font-semibold text-white">
                Элсом
              </span>
              <span className="px-2 py-0.5 rounded bg-stone-900 border border-white/5 font-semibold text-white">
                Бакай
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* FULLSCREEN ZOOM MODAL FOR ZERO-GLARE SCANNING */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-sm w-full bg-white text-stone-900 rounded-3xl p-6 shadow-2xl space-y-4 text-center animate-in zoom-in-95">
            
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block">
                ZAYTUN CAFE • ӨЗГӨН
              </span>
              <h3 className="text-xl font-black text-stone-950 mt-0.5">
                {recipientName}
              </h3>
              <p className="text-sm font-mono font-bold text-stone-600">{phoneNumber}</p>
            </div>

            {/* Large full QR Code Card */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black shadow-inner border-2 border-stone-200">
              <img
                src={qrImagePath}
                alt="MBank ELQR Full"
                className="w-full h-full object-cover scale-[1.3] object-[center_42%]"
              />
            </div>

            {/* Amount */}
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-600 uppercase">Төлөм суммасы:</span>
              <span className="text-xl font-black font-mono text-emerald-700">
                {formatPrice(amount)}
                {currency !== 'KGS' && (
                  <span className="text-xs text-stone-500 font-normal ml-1">({amount} сом)</span>
                )}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Номерди көчүрүү</span>
              </button>
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                Даяр
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
