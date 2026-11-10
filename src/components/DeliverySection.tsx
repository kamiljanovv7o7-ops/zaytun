import React from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../data/translations';
import { 
  Truck, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  PhoneCall, 
  MapPin, 
  Thermometer, 
  Package, 
  CreditCard 
} from 'lucide-react';

export const DeliverySection: React.FC = () => {
  const { lang, setIsCartOpen, cartCount } = useApp();

  return (
    <section id="delivery-section" className="py-16 sm:py-24 bg-gradient-to-b from-[#0a120b] via-[#0d1c12] to-[#0a120b] relative border-t border-amber-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
            <Truck className="w-3.5 h-3.5" />
            <span>{lang === 'ky' ? 'Ыкчам жана ишенимдүү' : lang === 'uz' ? 'Tezkor va sifatli' : 'Быстро и надежно'}</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {lang === 'ky' ? 'Өзгөн боюнча жеткирүү кызматы' : lang === 'uz' ? 'Oʻzgan boʻylab yetkazib berish xizmati' : lang === 'ru' ? 'Служба доставки по Узгену' : 'Delivery Service in Uzgen'}
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
            {lang === 'ky'
              ? 'Тамактар казандын отунан түшөрү менен атайын термо-сумкаларга салынып, 30-45 мүнөттө ысык бойдон жеткирилет.'
              : lang === 'uz'
              ? 'Taomlar olovdan olingach maxsus termo-idishlarga joylanib, 30-45 daqiqada qaynoq holda yetkazib beriladi.'
              : lang === 'ru'
              ? 'Блюда упаковываются в эко-термобоксы сразу после приготовления и доставляются обжигающе горячими за 30-45 минут.'
              : 'Dishes are packed into thermo-insulated containers straight from the stove and delivered piping hot within 30-45 minutes.'}
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="p-6 rounded-3xl bg-[#09150d] border border-amber-900/30 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">
              {lang === 'ky' ? '30-45 мүнөт ичинде' : lang === 'uz' ? '30-45 daqiqa ichida' : 'За 30-45 минут'}
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {lang === 'ky'
                ? 'Өзгөн шаарынын каалаган жерине эң ылдам мото-курьерлер жеткиришет.'
                : lang === 'uz'
                ? 'Oʻzgan shahrining istalgan nuqtasiga chaqqon kuryerlarimiz yetkazadilar.'
                : 'Быстрые курьеры на скутерах знают каждый переулок и дом в Узгене.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#09150d] border border-amber-900/30 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Thermometer className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">
              {lang === 'ky' ? 'Ысык бойдон термо-идиште' : lang === 'uz' ? 'Qaynoq termo-qutilarda' : 'Горячим в термобоксах'}
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {lang === 'ky'
                ? 'Пловдун буусу чыгып, самсанын кытырагы жоголбогондой атайын таңгактоо.'
                : lang === 'uz'
                ? 'Palovning xushboʻy bugʻi va somsaning qarsildoq taʼmi toʻliq saqlanadi.'
                : 'Специальная упаковка сохраняет сочность мяса и температуру плова.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#09150d] border border-amber-900/30 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">
              {lang === 'ky' ? '1500 сомдон бекер жеткирүү' : lang === 'uz' ? '1500 soʻmdan bepul' : 'Бесплатно от 1500 сом'}
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {lang === 'ky'
                ? 'Ири буйрутмалар жана үй-бүлөлүк кечтер үчүн жеткирүү акысы алынбайт.'
                : lang === 'uz'
                ? 'Katta buyurtmalar va oilaviy dasturxonlar uchun yetkazish haqi 0 soʻm.'
                : 'При заказе от 1500 сом доставка полностью бесплатная.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#09150d] border border-amber-900/30 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">
              {lang === 'ky' ? 'Ыңгайлуу төлөмдөр' : lang === 'uz' ? 'Qulay toʻlovlar' : 'Удобная оплата'}
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {lang === 'ky'
                ? 'MBank, Optima, Элсом, Click, Visa/Mastercard же колуңузга алганда накталай.'
                : lang === 'uz'
                ? 'MBank, Optima, Click, Payme, bank kartalari yoki qoʻlingizga olganda naqd.'
                : 'Оплата через MBank, Click, Optima, банковские карты или наличными.'}
            </p>
          </div>

        </div>

        {/* Uzgen Delivery Map Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#09150d] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
              <MapPin className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-white">
                {lang === 'ky' ? 'Өзгөн шаары жана жакынкы айылдар' : lang === 'uz' ? 'Oʻzgan shahri va yaqin hududlar' : 'Город Узген и пригороды'}
              </h4>
              <p className="text-xs text-stone-300 mt-1 max-w-lg">
                {lang === 'ky'
                  ? 'Манас, Ленин, Курманжан Датка, Автобекет, Базар, Жаңы-Өзгөн жана башка бардык райондорго жеткиребиз.'
                  : lang === 'uz'
                  ? 'Manas, Lenin, Avtobekat, Yangi-Oʻzgan va barcha hududlarga yetkazib beramiz.'
                  : 'Доставляем по всему городу Узген: центр, базар, автовокзал, Жаны-Узген.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="tel:+996555123456"
              className="w-full md:w-auto py-3 px-5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 border border-white/10"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>+996 555 12-34-56</span>
            </a>
            <button
              onClick={() => {
                const el = document.getElementById('menu-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full md:w-auto py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-950/40"
            >
              {getTranslation('orderNow', lang)}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
