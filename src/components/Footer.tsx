import React from 'react';
import { useApp } from '../context/AppContext';
import { ZaytunLogo } from './ZaytunLogo';
import { getTranslation } from '../data/translations';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  Send, 
  Instagram, 
  Heart,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, setLang, setIsReservationOpen, setIsQrModalOpen } = useApp();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact-section" className="bg-[#050b06] border-t border-amber-900/30 text-stone-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <ZaytunLogo size="md" />
            <p className="text-xs text-stone-400 leading-relaxed">
              {lang === 'ky'
                ? 'Өзгөн шаарындагы чыгыш ашканасынын ордосу. Нукура девзира ашы, чопо тандырда бышкан самса жана ширелүү шишкебектер.'
                : lang === 'uz'
                ? 'Oʻzgan shahridagi eng sarxil sharqona oshxona. Asl devzira palovi, loy tandir somsasi va suvli shashliklar.'
                : lang === 'ru'
                ? 'Кафе восточной кухни в Узгене. Легендарный узгенский плов из девзиры, тандырная самса и нежнейший шашлык.'
                : 'Authentic Eastern cuisine in Uzgen city. Renowned devzira pilaf, tandoor samsa, and juicy charcoal kebabs.'}
            </p>

            {/* Social channels */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-900/90 border border-white/10 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-900/90 border border-white/10 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/996555123456"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-900/90 border border-white/10 flex items-center justify-center text-stone-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                title="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {lang === 'ky' ? 'Бөлүмдөр' : lang === 'uz' ? 'Boʻlimlar' : 'Навигация'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo('menu-section')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {getTranslation('navMenu', lang)}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('delivery-section')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {getTranslation('navDelivery', lang)}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about-section')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {getTranslation('navAbout', lang)}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="text-amber-300 hover:text-amber-200 transition-colors"
                >
                  {getTranslation('navReservations', lang)}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacts & Address in Uzgen */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {getTranslation('navContacts', lang)}
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{getTranslation('addressLabel', lang)}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{getTranslation('workingHours', lang)}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+996555123456" className="hover:text-white transition-colors">
                  +996 (555) 12-34-56
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+996777987654" className="hover:text-white transition-colors">
                  +996 (777) 98-76-54
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Regional Integrated Payments & Languages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {lang === 'ky' ? 'Төлөм ыкмалары' : lang === 'uz' ? 'Toʻlov tizimlari' : 'Принимаем к оплате'}
            </h4>
            <p className="text-[11px] text-stone-400">
              {lang === 'ky'
                ? 'Кыргызстан жана Өзбекстандын бардык банктары жана капчыктары:'
                : 'Oʻzbekiston va Qirgʻiziston toʻlov tizimlari:'}
            </p>
            
            <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setIsQrModalOpen(true)}
                className="p-1.5 rounded-lg bg-red-950/90 border border-red-500/50 text-red-200 hover:bg-red-900/80 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                title="MBank ELQR кодун ачуу"
              >
                <span>MBank QR</span>
                <span className="text-[8px] bg-red-600 px-1 py-0.2 rounded text-white font-black">⚡</span>
              </button>
              <button
                type="button"
                onClick={() => setIsQrModalOpen(true)}
                className="p-1.5 rounded-lg bg-blue-950/70 border border-blue-500/30 text-blue-300 hover:bg-blue-900/60 transition-colors cursor-pointer"
              >
                Optima
              </button>
              <button
                type="button"
                onClick={() => setIsQrModalOpen(true)}
                className="p-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60 transition-colors cursor-pointer"
              >
                Элсом
              </button>
              <span className="p-1.5 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
                Click
              </span>
              <span className="p-1.5 rounded-lg bg-teal-950/70 border border-teal-500/30 text-teal-300">
                Payme
              </span>
              <span className="p-1.5 rounded-lg bg-amber-950/70 border border-amber-500/30 text-amber-300">
                Visa/MC
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsQrModalOpen(true)}
              className="w-full py-2 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer mt-1"
            >
              <span>📷 MBank QR кодун сканерлөө</span>
            </button>


            {/* Language Switcher Quick links */}
            <div className="pt-2 flex items-center gap-2">
              {[
                { code: 'ky' as const, flag: '🇰🇬', label: 'Кыргызча' },
                { code: 'uz' as const, flag: '🇺🇿', label: "O'zbek" },
                { code: 'ru' as const, flag: '🇷🇺', label: 'Русский' },
                { code: 'en' as const, flag: '🇬🇧', label: 'Eng' },
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                    lang === l.code
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-900 text-stone-400 hover:text-white'
                  }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © 2026 {getTranslation('footerRights', lang)}
          </div>
          <div className="flex items-center gap-1.5 text-stone-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Uzgen Gourmet Lovers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
