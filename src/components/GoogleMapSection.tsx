import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../data/translations';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin,
  InfoWindow 
} from '@vis.gl/react-google-maps';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Phone, 
  Compass, 
  ExternalLink, 
  Sparkles,
  Car,
  CheckCircle2
} from 'lucide-react';

export const GoogleMapSection: React.FC = () => {
  const { lang, setIsReservationOpen } = useApp();
  const [selectedMarker, setSelectedMarker] = useState(true);

  // Exact coordinates for ул. Манаса 247А, г. Өзгөн (Uzgen)
  const uzgenLocation = {
    lat: 40.7712,
    lng: 73.3045,
  };

  const rawKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const mapsApiKey = rawKey && !rawKey.includes('MY_GOOGLE_MAPS_API_KEY') ? rawKey : '';

  const gmapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${uzgenLocation.lat},${uzgenLocation.lng}&destination_place_id=Uzgen+Manas+247A`;
  const gmapsViewUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Кыргызстан, Ошская область, г. Узген, ул. Манаса 247А')}`;

  return (
    <section id="map-section" className="py-16 sm:py-24 bg-[#071109] relative overflow-hidden border-t border-amber-950/40">
      {/* Decorative ambient background lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{lang === 'ky' ? 'Google Картадан биздин дарек' : lang === 'uz' ? 'Google Xaritada manzilimiz' : 'Наш адрес на Google Картах'}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'ky' ? 'Өзгөн: Манас 247А • Топчандар & VIP' : lang === 'uz' ? 'Oʻzgan: Manas 247A • Soʻrilar & VIP' : 'Узген: Манас 247А • Топчаны & VIP'}</span>
              </div>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {lang === 'ky' ? 'Өзгөн шаары, Манас көчөсү 247А' : lang === 'uz' ? 'Oʻzgan shahri, Manas koʻchasi 247A' : 'г. Узген, ул. Манаса 247А'}
            </h2>
            <p className="mt-2 text-stone-300 text-sm max-w-xl">
              {lang === 'ky'
                ? '«Зайтун» кафеси Өзгөн шаарынын негизги Манас көчөсүндө, ыңгайлуу унаа токтотуучу жайы менен жайгашкан.'
                : lang === 'uz'
                ? '«Zaytun» kafesi Oʻzgan shahrining markaziy Manas koʻchasida qulay avtoturargoh bilan joylashgan.'
                : 'Кафе «Zaytun» удобно расположено на центральной улице Манаса 247А в городе Узген.'}
            </p>
          </div>

          {/* Quick External Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={gmapsDirUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-950/40 transition-transform active:scale-95"
            >
              <Navigation className="w-4 h-4 fill-stone-950" />
              <span>{lang === 'ky' ? 'Маршрут чийүү' : lang === 'uz' ? 'Marshrut olish' : 'Проложить маршрут'}</span>
            </a>

            <a
              href={gmapsViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-semibold flex items-center gap-2 border border-amber-500/30 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Google Maps</span>
            </a>
          </div>
        </div>

        {/* Map Layout: Left details card + Interactive Google Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Address, Hours, Amenities */}
          <div className="lg:col-span-4 rounded-3xl bg-[#09150d] border border-amber-500/30 p-6 flex flex-col justify-between shadow-xl space-y-6">
            
            <div className="space-y-5">
              {/* Cafe Badge */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold font-serif text-xl shrink-0">
                  Z
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-lg font-serif">
                    {lang === 'ky' ? '«ЗАЙТУН» КАФЕСИ' : '«ZAYTUN» KAFESI'}
                  </h3>
                  <p className="text-xs text-amber-300/80 font-medium">
                    {getTranslation('brandSubtitle', lang)}
                  </p>
                </div>
              </div>

              {/* Exact Address */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider block font-semibold">
                    {lang === 'ky' ? 'Так дареги:' : 'Aniq manzil:'}
                  </span>
                  <p className="text-sm font-bold text-white leading-snug mt-0.5">
                    {lang === 'ky'
                      ? 'Өзгөн шаары, Манас көчөсү 247А'
                      : lang === 'uz'
                      ? 'Oʻzgan shahri, Manas koʻchasi 247A'
                      : 'г. Узген, ул. Манаса 247А'}
                  </p>
                  <span className="text-[11px] text-stone-400 block mt-0.5">
                    (Ош—Бишкек трассасынын боюнда, борбордук бөлүк)
                  </span>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider block font-semibold">
                    {lang === 'ky' ? 'Иштөө тартиби:' : 'Ish tartibi:'}
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {lang === 'ky' ? 'Күн сайын: 09:00 — 23:00' : 'Har kuni: 09:00 — 23:00'}
                  </p>
                  <span className="text-[11px] text-emerald-400 font-medium">
                    {lang === 'ky' ? '● Азыр ачык' : '● Hozir ochiq'}
                  </span>
                </div>
              </div>

              {/* Phone Contacts */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider block font-semibold">
                    {lang === 'ky' ? 'Байланыш телефондору:' : 'Aloqa telefonlari:'}
                  </span>
                  <div className="space-y-0.5 mt-0.5">
                    <a
                      href="tel:+996555123456"
                      className="text-sm font-mono font-bold text-amber-300 hover:text-white block transition-colors"
                    >
                      +996 (555) 12-34-56
                    </a>
                    <a
                      href="tel:+996559146555"
                      className="text-xs font-mono text-stone-300 hover:text-white block transition-colors"
                    >
                      +996 (559) 14-65-55 (MBank/Касса)
                    </a>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-white/5 space-y-2 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-amber-400" />
                  <span>20+ унаа үчүн акысыз токтотуучу жай</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Чоң жайлуу сөрөлөр (Топчандар) & VIP зал</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsReservationOpen(true)}
              className="w-full py-3 px-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/40 transition-colors"
            >
              {getTranslation('navReservations', lang)}
            </button>
          </div>

          {/* Right Column: Google Maps Interactive View Container */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-amber-500/40 shadow-2xl relative min-h-[460px] bg-stone-950 flex flex-col">
            
            {/* If Google Maps API key is configured, render official @vis.gl/react-google-maps SDK */}
            {mapsApiKey ? (
              <div className="w-full h-full min-h-[440px] relative flex-1">
                <APIProvider apiKey={mapsApiKey}>
                  <Map
                    defaultCenter={uzgenLocation}
                    defaultZoom={16}
                    mapId="DEMO_MAP_ID"
                    internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                    gestureHandling="greedy"
                    disableDefaultUI={false}
                    className="w-full h-full min-h-[440px]"
                  >
                    {/* AdvancedMarker at ул. Манаса 247А */}
                    <AdvancedMarker
                      position={uzgenLocation}
                      onClick={() => setSelectedMarker(true)}
                    >
                      <Pin
                        background="#f59e0b"
                        borderColor="#78350f"
                        glyphColor="#000000"
                        scale={1.25}
                      />
                    </AdvancedMarker>

                    {selectedMarker && (
                      <InfoWindow
                        position={uzgenLocation}
                        onCloseClick={() => setSelectedMarker(false)}
                      >
                        <div className="p-1 text-stone-900 max-w-xs">
                          <h4 className="font-extrabold text-sm text-stone-950 font-serif">
                            «ZAYTUN» ӨЗГӨН
                          </h4>
                          <p className="text-xs text-stone-700 mt-0.5">
                            📍 Манас көчөсү 247А (ул. Манаса 247А)
                          </p>
                          <div className="mt-2 flex items-center justify-between text-[11px] pt-1 border-t border-stone-200">
                            <span className="font-semibold text-emerald-700">09:00 - 23:00</span>
                            <a
                              href={gmapsDirUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold text-amber-700 hover:underline flex items-center gap-0.5"
                            >
                              <span>Маршрут</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </InfoWindow>
                    )}
                  </Map>
                </APIProvider>
              </div>
            ) : (
              /* High-fidelity interactive Map Embed for instant preview */
              <div className="w-full h-full min-h-[440px] relative flex-1 flex flex-col">
                <iframe
                  title="Zaytun Cafe Google Map Manasa 247A Uzgen"
                  src={`https://maps.google.com/maps?q=${uzgenLocation.lat},${uzgenLocation.lng}&hl=${lang}&z=16&output=embed`}
                  className="w-full h-full min-h-[440px] border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            )}

            {/* Bottom floating badge on the map */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#0a180e]/90 backdrop-blur-md border border-amber-500/40 rounded-2xl p-3 shadow-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs shrink-0">
                Z
              </div>
              <div className="text-xs">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span>Zaytun Cafe • Өзгөн</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-[11px] text-amber-300">
                  Манас көчөсү 247А (ул. Манаса 247А)
                </div>
              </div>
              <a
                href={gmapsDirUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] flex items-center gap-1 transition-colors shrink-0"
              >
                <span>Ачуу</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
