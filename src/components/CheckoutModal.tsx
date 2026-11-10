import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../data/translations';
import { PaymentMethodType, SavedAddress } from '../types';
import confetti from 'canvas-confetti';
import { ZaytunPaymentQR } from './ZaytunPaymentQR';
import { 
  X, 
  MapPin, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  Copy, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Coins, 
  FileText, 
  Phone, 
  User, 
  Clock,
  Sparkles,
  Smartphone
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsTrackingOpen,
    cart,
    cartSubtotal,
    user,
    placeOrder,
    lang,
    showToast,
    formatPrice,
  } = useApp();

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');

  // Customer info
  const [customerName, setCustomerName] = useState(user.name || '');
  const [customerPhone, setCustomerPhone] = useState(user.phone || '+996 ');
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    user.savedAddresses.find((a) => a.isDefault)?.id || user.savedAddresses[0]?.id || 'custom'
  );
  const [streetAddress, setStreetAddress] = useState(
    user.savedAddresses[0]?.street ? `${user.savedAddresses[0].street}, ${user.savedAddresses[0].house}` : ''
  );
  const [apartmentInfo, setApartmentInfo] = useState(user.savedAddresses[0]?.apartment || '');
  const [orderNotes, setOrderNotes] = useState('');

  // Payment settings
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('mbank');
  const [useBonus, setUseBonus] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState('');

  // Card simulation state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState(user.name || '');

  if (!isCheckoutOpen) return null;

  const deliveryFee = deliveryType === 'delivery' ? (cartSubtotal >= 1500 ? 0 : 100) : 0;
  const maxBonusUsable = Math.min(user.bonusPoints, Math.floor(cartSubtotal * 0.3));
  const appliedBonus = useBonus ? maxBonusUsable : 0;
  const finalTotal = Math.max(0, cartSubtotal + deliveryFee - appliedBonus);

  // Quick Uzgen streets for convenient one-click entry
  const uzgenStreets = [
    'Манас көчөсү',
    'Ленин көчөсү',
    'Курманжан Датка көчөсү',
    'Шота Руставели көчөсү',
    'Борбордук Базар аймагы',
    'Ош көчөсү',
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast(getTranslation('copyNumber', lang) + ': ' + text, 'info');
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      showToast(lang === 'ky' ? 'Атыңызды жана телефон номериңизди жазыңыз' : 'Ism va telefon raqamingizni kiriting', 'error');
      return;
    }
    if (deliveryType === 'delivery' && !streetAddress.trim()) {
      showToast(lang === 'ky' ? 'Жеткирүү дарегин жазыңыз' : 'Yetkazish manzilini kiriting', 'error');
      return;
    }
    setStep('payment');
  };

  const handleExecutePayment = () => {
    setIsProcessingPayment(true);

    // Simulate real bank processing gateway
    setTimeout(() => {
      setIsProcessingPayment(false);

      const resolvedAddress: SavedAddress = {
        id: 'addr-used-' + Date.now(),
        title: 'Буйрутма дареги',
        city: 'Өзгөн шаары',
        street: streetAddress,
        house: '',
        apartment: apartmentInfo,
      };

      const order = placeOrder({
        deliveryType,
        address: deliveryType === 'delivery' ? resolvedAddress : undefined,
        customerName,
        customerPhone,
        customerNote: orderNotes,
        paymentMethod,
        useBonus,
      });

      setConfirmedOrderNumber(order.orderNumber);
      setStep('success');

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#fbbf24', '#ffffff'],
        });
      } catch {
        // Fallback
      }
    }, 1400);
  };

  const formatCardNum = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    return raw.replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => {
          if (step !== 'success') setIsCheckoutOpen(false);
        }}
      />

      <div className="relative w-full max-w-2xl bg-[#0b170e] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-6 text-stone-100 animate-in zoom-in-95">
        
        {/* Top Header */}
        <div className="p-5 border-b border-amber-900/30 flex items-center justify-between bg-[#08120a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                {getTranslation('checkoutHeader', lang)}
              </h3>
              <p className="text-xs text-amber-300/80">
                {step === 'details' && getTranslation('stepDelivery', lang)}
                {step === 'payment' && getTranslation('stepPayment', lang)}
                {step === 'success' && getTranslation('orderSuccessTitle', lang)}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl bg-stone-900/80 text-stone-400 hover:text-white border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Address & Contacts Form */}
        {step === 'details' && (
          <form onSubmit={handleNextToPayment} className="p-6 space-y-5">
            {/* Delivery or Pickup toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-stone-900 border border-white/10">
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  deliveryType === 'delivery'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                🛵 {getTranslation('deliveryOption', lang)}
              </button>
              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  deliveryType === 'pickup'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                🏬 {getTranslation('pickupOption', lang)}
              </button>
            </div>

            {/* Recipient details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5 mb-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>{getTranslation('fullName', lang)} *</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Бексултан Аманов"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5 mb-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{getTranslation('phoneNumber', lang)} *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+996 555 12-34-56"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* If delivery, show address selector & input */}
            {deliveryType === 'delivery' && (
              <div className="space-y-3 pt-1">
                {/* Saved addresses quick picker */}
                {user.savedAddresses.length > 0 && (
                  <div>
                    <label className="text-xs font-medium text-stone-400 block mb-1.5">
                      {lang === 'ky' ? 'Сакталган даректерден тандоо:' : lang === 'uz' ? 'Saqlangan manzillardan tanlash:' : 'Выбрать сохраненный адрес:'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {user.savedAddresses.map((addr) => (
                        <div
                          key={addr.id}
                          onClick={() => {
                            setSelectedAddressId(addr.id);
                            setStreetAddress(`${addr.street}, ${addr.house}`);
                            if (addr.apartment) setApartmentInfo(addr.apartment);
                          }}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2 ${
                            selectedAddressId === addr.id
                              ? 'bg-amber-500/15 border-amber-500/60 text-white'
                              : 'bg-stone-900/50 border-white/5 text-stone-300 hover:border-white/20'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-amber-300">{addr.title}</div>
                            <div className="text-[11px] text-stone-400">{addr.street}, {addr.house}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Street and house number */}
                <div>
                  <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{getTranslation('deliveryAddress', lang)} (Өзгөн ш.) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="Манас көчөсү, 45-үй"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Quick street suggestions in Uzgen */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-[11px] text-stone-400">{getTranslation('addressSelectQuick', lang)}</span>
                  {uzgenStreets.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStreetAddress(st)}
                      className="px-2 py-0.5 rounded-md bg-stone-900 hover:bg-stone-800 text-[11px] text-stone-300 border border-white/10"
                    >
                      {st}
                    </button>
                  ))}
                </div>

                {/* Apartment / entrance / intercom */}
                <div>
                  <label className="text-xs font-medium text-stone-300 block mb-1.5">
                    {getTranslation('floorApt', lang)}
                  </label>
                  <input
                    type="text"
                    value={apartmentInfo}
                    onChange={(e) => setApartmentInfo(e.target.value)}
                    placeholder="12-батир, 3-кабат, домофон 12"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            )}

            {/* Order notes */}
            <div>
              <label className="text-xs font-medium text-stone-300 block mb-1.5">
                {getTranslation('orderNotes', lang)}
              </label>
              <input
                type="text"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder={lang === 'ky' ? 'Эшиктин коңгуроосун баспаңыз, бала уктап жатат...' : 'Eshik qoʻngʻirogʻini chalmang...'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Bottom action: Next to Payment */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs text-stone-400">
                <span>{getTranslation('total', lang)}: </span>
                <span className="font-mono text-base font-bold text-amber-400">
                  {formatPrice(cartSubtotal + deliveryFee)}
                </span>
              </div>
              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-950/40 cursor-pointer"
              >
                <span>{getTranslation('stepPayment', lang)}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Integrated Payment Selection & Gateway */}
        {step === 'payment' && (
          <div className="p-6 space-y-6">
            
            {/* Bonus Points Checkbox */}
            {user.bonusPoints > 0 && (
              <div
                onClick={() => setUseBonus(!useBonus)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  useBonus
                    ? 'bg-amber-500/15 border-amber-500/60 text-white'
                    : 'bg-stone-900/60 border-white/5 text-stone-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{getTranslation('tabBonus', lang)}</span>
                      <span className="text-amber-400 font-mono">({formatPrice(user.bonusPoints)})</span>
                    </div>
                    <div className="text-[11px] text-stone-400">
                      {lang === 'ky' ? `Буйрутма үчүн ${formatPrice(maxBonusUsable)} бонус коротуу` : `Buyurtma uchun ${formatPrice(maxBonusUsable)} bonus sarflash`}
                    </div>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border font-bold text-xs ${
                    useBonus ? 'bg-amber-500 border-amber-400 text-black' : 'border-stone-600'
                  }`}
                >
                  {useBonus && '✓'}
                </div>
              </div>
            )}

            {/* Payment Methods Grid */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                {getTranslation('payMethodTitle', lang)}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                
                {/* MBank */}
                <div
                  onClick={() => setPaymentMethod('mbank')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === 'mbank'
                      ? 'bg-amber-500/15 border-amber-400 text-white shadow-md'
                      : 'bg-stone-900/50 border-white/5 text-stone-300 hover:border-white/20'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center shrink-0 border border-red-500/30">
                    <Smartphone className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{getTranslation('payMbank', lang)}</span>
                      <span className="px-1.5 py-0.2 rounded bg-red-600 text-white text-[9px] font-black">QR</span>
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      {getTranslation('payMbankDesc', lang)}
                    </div>
                  </div>
                </div>

                {/* Optima / Elsom / O!Dengi */}
                <div
                  onClick={() => setPaymentMethod('optima')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === 'optima'
                      ? 'bg-amber-500/15 border-amber-400 text-white shadow-md'
                      : 'bg-stone-900/50 border-white/5 text-stone-300 hover:border-white/20'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                    <QrCode className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white">
                      {getTranslation('payOptima', lang)}
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      {getTranslation('payOptimaDesc', lang)}
                    </div>
                  </div>
                </div>

                {/* Click / Payme / Uzum */}
                <div
                  onClick={() => setPaymentMethod('click')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === 'click'
                      ? 'bg-amber-500/15 border-amber-400 text-white shadow-md'
                      : 'bg-stone-900/50 border-white/5 text-stone-300 hover:border-white/20'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white">
                      {getTranslation('payClickPayme', lang)}
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      {getTranslation('payClickPaymeDesc', lang)}
                    </div>
                  </div>
                </div>

                {/* Bank Card (Visa / Mastercard) */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === 'card'
                      ? 'bg-amber-500/15 border-amber-400 text-white shadow-md'
                      : 'bg-stone-900/50 border-white/5 text-stone-300 hover:border-white/20'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <CreditCard className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white">
                      {getTranslation('payCard', lang)}
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      {getTranslation('payCardDesc', lang)}
                    </div>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cash')}
                  className={`sm:col-span-2 p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === 'cash'
                      ? 'bg-amber-500/15 border-amber-400 text-white shadow-md'
                      : 'bg-stone-900/50 border-white/5 text-stone-300 hover:border-white/20'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                    <Coins className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white">
                      {getTranslation('payCash', lang)}
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      {getTranslation('payCashDesc', lang)}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Real MBank & ELQR Payment Gateway with Umar K's QR code */}
            {(paymentMethod === 'mbank' || paymentMethod === 'optima' || paymentMethod === 'click') && (
              <ZaytunPaymentQR amount={finalTotal} />
            )}


            {/* Bank Card Simulator Gateway */}
            {paymentMethod === 'card' && (
              <div className="p-4 rounded-2xl bg-[#08150c] border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> 3D-Secure 256-bit Encryption
                  </span>
                  <span>Visa • MC • Элкарт</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1">Номер карты</label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNum(e.target.value))}
                        placeholder="8600 •••• •••• •••• / 4177 ••••"
                        className="w-full pl-3.5 pr-10 py-2 rounded-xl bg-stone-900 border border-white/15 text-sm font-mono text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-400"
                      />
                      <CreditCard className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-stone-400 block mb-1">Мөөнөтү (MM/YY)</label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-white/15 text-sm font-mono text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-400 block mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-white/15 text-sm font-mono text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1">Карта ээсинин аты-жөнү</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                      placeholder="BEKSULTAN AMANOV"
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-white/15 text-sm uppercase text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom buttons: Back and Confirm Payment */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold flex items-center gap-1.5 border border-white/10"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{lang === 'ky' ? 'Артка' : lang === 'uz' ? 'Orqaga' : 'Назад'}</span>
              </button>

              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handleExecutePayment}
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-950/50 transition-all cursor-pointer disabled:opacity-70"
              >
                {isProcessingPayment ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                    <span>{lang === 'ky' ? 'Төлөм текшерилүүдө...' : lang === 'uz' ? 'Toʻlov tekshirilmoqda...' : 'Обработка платежа...'}</span>
                  </div>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    <span>{getTranslation('confirmPaymentBtn', lang)} ({formatPrice(finalTotal)})</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: Order Confirmation & Digital Receipt */}
        {step === 'success' && (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 animate-bounce">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-white"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {getTranslation('orderSuccessTitle', lang)}
              </h2>
              <p className="mt-2 text-stone-300 text-xs sm:text-sm max-w-md mx-auto">
                {getTranslation('orderSuccessSubtitle', lang)}
              </p>
            </div>

            {/* Receipt Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#071309] border border-amber-500/30 text-left space-y-3 font-sans">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs text-stone-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>{getTranslation('orderNumberLabel', lang)}</span>
                </span>
                <span className="font-mono font-bold text-amber-400 text-sm">
                  {confirmedOrderNumber}
                </span>
              </div>

              <div className="text-xs space-y-1.5 text-stone-300">
                <div className="flex justify-between">
                  <span>Алуучу:</span>
                  <span className="font-medium text-white">{customerName} ({customerPhone})</span>
                </div>
                {deliveryType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Дарек:</span>
                    <span className="font-medium text-white text-right max-w-[200px] truncate">{streetAddress}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Төлөм түрү:</span>
                  <span className="font-medium text-emerald-400 uppercase">{paymentMethod}</span>
                </div>
                <div className="flex justify-between font-bold text-white pt-2 border-t border-white/10 text-sm">
                  <span>Төлөндү:</span>
                  <span className="text-amber-400 font-mono">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setIsTrackingOpen(true);
                }}
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer"
              >
                <Clock className="w-4 h-4" />
                <span>{getTranslation('trackOrderBtn', lang)}</span>
              </button>

              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-sm font-semibold border border-white/10"
              >
                {getTranslation('continueShopping', lang)}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
