import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../data/translations';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  UtensilsCrossed, 
  CheckCircle2, 
  Phone, 
  User, 
  Sparkles,
  MapPin
} from 'lucide-react';

export const TableReservationModal: React.FC = () => {
  const { isReservationOpen, setIsReservationOpen, user, lang, showToast } = useApp();

  const [date, setDate] = useState('2026-11-10');
  const [time, setTime] = useState('18:30');
  const [guests, setGuests] = useState('4');
  const [zone, setZone] = useState<'tapchan' | 'hall' | 'vip'>('tapchan');
  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '+996 ');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isReservationOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    showToast(getTranslation('reserveSuccess', lang), 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsReservationOpen(false)}
      />

      <div className="relative w-full max-w-lg bg-[#0b170e] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-6 text-stone-100 flex flex-col animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-5 border-b border-amber-900/30 flex items-center justify-between bg-[#08120a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <UtensilsCrossed className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                {getTranslation('reserveTitle', lang)}
              </h3>
              <p className="text-xs text-amber-300/80">
                Өзгөн шаары • Чыгыш меймандостугу
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsReservationOpen(false)}
            className="p-2 rounded-xl bg-stone-900/80 text-stone-400 hover:text-white border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 animate-bounce">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-bold text-white font-serif">
              {getTranslation('reserveSuccess', lang)}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-sm mx-auto">
              {date} күнү саат {time} убактысында {guests} конок үчүн орун даярдалат. Сизди күтөбүз!
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                setIsReservationOpen(false);
              }}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider"
            >
              Жабуу
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-stone-300 leading-relaxed">
              {getTranslation('reserveSubtitle', lang)}
            </p>

            {/* Zone Selection */}
            <div>
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
                {getTranslation('reserveZone', lang)}:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'tapchan', label: getTranslation('zoneTapchan', lang), icon: '🛋' },
                  { id: 'hall', label: getTranslation('zoneHall', lang), icon: '🍽' },
                  { id: 'vip', label: getTranslation('zoneVip', lang), icon: '👑' },
                ].map((z) => (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => setZone(z.id as 'tapchan' | 'hall' | 'vip')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                      zone === z.id
                        ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md'
                        : 'bg-stone-900/60 border-white/10 text-stone-300 hover:border-white/25'
                    }`}
                  >
                    <div className="text-base mb-1">{z.icon}</div>
                    <div className="line-clamp-2 leading-tight">{z.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date, Time, Guests */}
            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="text-[11px] font-medium text-stone-300 block mb-1">
                  {getTranslation('reserveDate', lang)}
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-stone-900 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-stone-300 block mb-1">
                  {getTranslation('reserveTime', lang)}
                </label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-stone-900 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-stone-300 block mb-1">
                  {getTranslation('reserveGuests', lang)}
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-stone-900 border border-white/10 text-xs text-white"
                >
                  <option value="2">2 адам</option>
                  <option value="4">4 адам</option>
                  <option value="6">6 адам</option>
                  <option value="8">8-10 адам</option>
                  <option value="15">15+ адам (Той/Маараке)</option>
                </select>
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-stone-300 block mb-1">
                  {getTranslation('fullName', lang)} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Бексултан Аманов"
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-stone-300 block mb-1">
                  {getTranslation('phoneNumber', lang)} *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+996 555 12-34-56"
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-white/10 text-xs text-white"
                />
              </div>
            </div>

            {/* Special Wishes */}
            <div>
              <label className="text-[11px] font-medium text-stone-300 block mb-1">
                Кошумча каалоолор (Туулган күн, бала үчүн отургуч)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="..."
                className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-white/10 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-xl shadow-amber-950/40 cursor-pointer"
            >
              {getTranslation('reserveSubmitBtn', lang)}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
