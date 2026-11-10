import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../data/translations';
import { 
  X, 
  Copy, 
  Check, 
  ShieldCheck, 
  QrCode, 
  Smartphone, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const StandaloneQRModal: React.FC = () => {
  const { isQrModalOpen, setIsQrModalOpen, lang, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isQrModalOpen) return null;

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
      `Номер скопирован: ${phoneNumber}`,
      'success'
    );
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div
        className="fixed inset-0"
        onClick={() => setIsQrModalOpen(false)}
      />

      <div className="relative max-w-sm w-full bg-[#0d1a10] border border-amber-500/50 rounded-3xl p-6 shadow-2xl text-stone-100 z-10 space-y-4 text-center animate-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={() => setIsQrModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold mb-2">
            <QrCode className="w-3.5 h-3.5 text-emerald-400" />
            <span>MBank • ELQR Бирдиктүү коду</span>
          </div>
          <h3 className="text-xl font-black text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            «ZAYTUN» КАФЕСИ
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            {lang === 'ky' ? 'Төлөм алуучу:' : 'Toʻlov qabul qiluvchi:'} <span className="text-amber-300 font-bold">{recipientName}</span>
          </p>
        </div>

        {/* QR Code Card from user upload */}
        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white shadow-2xl border-2 border-emerald-500/50">
          <img
            src={qrImagePath}
            alt="MBank ELQR Умар К"
            className="w-full h-full object-cover scale-[1.32] object-[center_42%]"
          />
        </div>

        {/* Recipient Phone & Copy button */}
        <div className="p-3.5 rounded-2xl bg-stone-900/90 border border-white/10 flex items-center justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] text-stone-400 block uppercase tracking-wider">
              {lang === 'ky' ? 'MBank / Капчык номери:' : 'MBank / Hamyon raqami:'}
            </span>
            <span className="font-mono text-sm font-bold text-white">
              {phoneNumber}
            </span>
          </div>
          <button
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
                <span>Көчүрүү</span>
              </>
            )}
          </button>
        </div>

        {/* Notice */}
        <p className="text-[11px] text-stone-400 leading-relaxed">
          {getTranslation('elqrNotice', lang)}
        </p>

        {/* Done Button */}
        <button
          onClick={() => setIsQrModalOpen(false)}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg"
        >
          {lang === 'ky' ? 'Түшүнүктүү / Жабуу' : 'Tushunarli / Yopish'}
        </button>

      </div>
    </div>
  );
};
