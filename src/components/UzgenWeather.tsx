import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  CloudSnow, 
  Wind, 
  Droplets, 
  Thermometer, 
  RefreshCw,
  Sparkles,
  Compass,
  MapPin,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  isDay: boolean;
  tempMax: number;
  tempMin: number;
  dailyForecast: {
    dayName: { ky: string; uz: string; ru: string; en: string };
    max: number;
    min: number;
    code: number;
  }[];
  lastUpdated: string;
}

// Fallback baseline for Uzgen, Kyrgyzstan
const defaultUzgenWeather: WeatherData = {
  temp: 19,
  feelsLike: 19,
  humidity: 46,
  windSpeed: 3.2,
  weatherCode: 1,
  isDay: true,
  tempMax: 22,
  tempMin: 10,
  dailyForecast: [
    {
      dayName: { ky: 'Бүгүн', uz: 'Bugun', ru: 'Сегодня', en: 'Today' },
      max: 22,
      min: 10,
      code: 1,
    },
    {
      dayName: { ky: 'Эртең', uz: 'Ertaga', ru: 'Завтра', en: 'Tomorrow' },
      max: 21,
      min: 9,
      code: 2,
    },
    {
      dayName: { ky: 'Бүрсүгүн', uz: 'Indinga', ru: 'Послезавтра', en: 'In 2 days' },
      max: 23,
      min: 11,
      code: 0,
    },
  ],
  lastUpdated: '12:00',
};

export interface UzgenWeatherProps {
  variant?: 'full' | 'hero' | 'compact';
  className?: string;
}

export const UzgenWeather: React.FC<UzgenWeatherProps> = ({ variant = 'full', className = '' }) => {
  const { lang } = useApp();
  const [weather, setWeather] = useState<WeatherData>(defaultUzgenWeather);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      // Free Open-Meteo API for coordinates of Uzgen (40.7712, 73.3045)
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=40.7712&longitude=73.3045&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FBishkek'
      );
      if (res.ok) {
        const data = await res.json();
        const cur = data.current;
        const daily = data.daily;

        const dayNames = [
          { ky: 'Бүгүн', uz: 'Bugun', ru: 'Сегодня', en: 'Today' },
          { ky: 'Эртең', uz: 'Ertaga', ru: 'Завтра', en: 'Tomorrow' },
          { ky: 'Бүрсүгүн', uz: 'Indinga', ru: 'Послезавтра', en: 'In 2 days' },
        ];

        const forecast = (daily?.time || []).slice(0, 3).map((_: any, idx: number) => ({
          dayName: dayNames[idx] || { ky: `Күн ${idx + 1}`, uz: `${idx + 1}-kun`, ru: `День ${idx + 1}`, en: `Day ${idx + 1}` },
          max: Math.round(daily.temperature_2m_max[idx] ?? 20),
          min: Math.round(daily.temperature_2m_min[idx] ?? 10),
          code: daily.weather_code[idx] ?? 1,
        }));

        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setWeather({
          temp: Math.round(cur.temperature_2m),
          feelsLike: Math.round(cur.apparent_temperature),
          humidity: Math.round(cur.relative_humidity_2m),
          windSpeed: Number(cur.wind_speed_10m.toFixed(1)),
          weatherCode: cur.weather_code,
          isDay: cur.is_day === 1,
          tempMax: Math.round(daily?.temperature_2m_max[0] ?? cur.temperature_2m + 2),
          tempMin: Math.round(daily?.temperature_2m_min[0] ?? cur.temperature_2m - 7),
          dailyForecast: forecast.length > 0 ? forecast : defaultUzgenWeather.dailyForecast,
          lastUpdated: timeStr,
        });
      }
    } catch {
      // Graceful fallback to default Uzgen weather
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 10 * 60 * 1000); // 10 minutes
    return () => clearInterval(interval);
  }, []);

  const getWeatherDetails = (code: number, isCompact = false) => {
    const iconSize = isCompact ? 'w-5 h-5' : 'w-8 h-8';
    if (code === 0) {
      return {
        label: { ky: 'Ачык асман', uz: 'Ochiq osmon', ru: 'Ясно, солнечно', en: 'Clear sky' },
        icon: <Sun className={`${iconSize} text-amber-400`} />,
      };
    }
    if (code <= 2) {
      return {
        label: { ky: 'Бир аз булуттуу', uz: 'Qisman bulutli', ru: 'Малооблачно', en: 'Partly cloudy' },
        icon: <CloudSun className={`${iconSize} text-amber-300`} />,
      };
    }
    if (code === 3) {
      return {
        label: { ky: 'Булуттуу', uz: 'Bulutli', ru: 'Пасмурно', en: 'Overcast' },
        icon: <Cloud className={`${iconSize} text-stone-300`} />,
      };
    }
    if (code >= 51 && code <= 67) {
      return {
        label: { ky: 'Жамгырлуу', uz: 'Yomgʻir', ru: 'Дождь', en: 'Rain' },
        icon: <CloudRain className={`${iconSize} text-sky-400`} />,
      };
    }
    if (code >= 71 && code <= 77) {
      return {
        label: { ky: 'Кар жаайт', uz: 'Qor', ru: 'Снег', en: 'Snow' },
        icon: <CloudSnow className={`${iconSize} text-cyan-200`} />,
      };
    }
    if (code >= 95) {
      return {
        label: { ky: 'Күн күркүрөйт', uz: 'Momaqaldiroq', ru: 'Гроза', en: 'Thunderstorm' },
        icon: <CloudLightning className={`${iconSize} text-yellow-400`} />,
      };
    }
    return {
      label: { ky: 'Жайлуу аба ырайы', uz: 'Yoqimli ob-havo', ru: 'Приятная погода', en: 'Mild weather' },
      icon: <Sun className={`${iconSize} text-amber-400`} />,
    };
  };

  const isGoodForOutdoor = weather.temp >= 14 && weather.weatherCode < 50;

  // COMPACT HERO VARIANT: Specifically designed for side/corner placement on main screen
  if (variant === 'hero' || variant === 'compact') {
    const compactWeather = getWeatherDetails(weather.weatherCode, true);
    return (
      <div className={`relative transition-all ${className}`}>
        <div className="rounded-2xl bg-gradient-to-br from-[#0c1e12]/90 via-[#0a180f]/90 to-[#07120a]/90 border border-amber-500/30 p-2.5 sm:p-3 shadow-xl backdrop-blur-md hover:border-amber-400/50 transition-all">
          <div className="flex items-center justify-between gap-3">
            {/* Left: Weather Icon & Live Temperature */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                {compactWeather.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-black font-mono text-white tracking-tight leading-none">
                    {weather.temp > 0 ? `+${weather.temp}` : weather.temp}°C
                  </span>
                  <span className="text-xs font-bold text-amber-300 truncate max-w-[120px] sm:max-w-none">
                    {compactWeather.label[lang] || compactWeather.label.ky}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-stone-300 mt-0.5">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span>{lang === 'ky' ? 'Өзгөн' : lang === 'uz' ? 'Oʻzgan' : 'Узген'}</span>
                  </span>
                  <span className="text-stone-500">•</span>
                  <span className="font-mono text-[10.5px]">
                    <span className="text-rose-400">↑{weather.tempMax}°</span>{' '}
                    <span className="text-sky-400">↓{weather.tempMin}°</span>
                  </span>
                  <span className="hidden sm:inline text-stone-500">•</span>
                  <span className="hidden sm:inline text-stone-300 text-[10.5px]">
                    💧 {weather.humidity}%
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions (Refresh & Toggle 3-Day Forecast) */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={fetchWeather}
                disabled={loading}
                className="p-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-amber-400 border border-white/5 transition-colors cursor-pointer"
                title={lang === 'ky' ? 'Жаңыртуу' : lang === 'uz' ? 'Yangilash' : 'Обновить'}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-400' : ''}`} />
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-2 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>{isExpanded ? (lang === 'ky' ? 'Жабуу' : lang === 'uz' ? 'Yopish' : 'Закрыть') : (lang === 'ky' ? '3 күн' : lang === 'uz' ? '3 kun' : '3 дня')}</span>
                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Smooth Dropdown with 3-Day Forecast & Cafe Terrace Tip */}
          {isExpanded && (
            <div className="mt-2.5 pt-2.5 border-t border-white/10 space-y-2">
              <div className={`p-2 rounded-xl text-[11px] leading-tight flex items-start gap-1.5 border ${
                isGoodForOutdoor 
                  ? 'bg-emerald-950/50 border-emerald-500/30 text-emerald-200' 
                  : 'bg-amber-950/50 border-amber-500/30 text-amber-200'
              }`}>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {isGoodForOutdoor
                    ? (lang === 'ky'
                        ? '🌿 Топчандарда жана террасада дем алууга эң ыңгайлуу аба ырайы!'
                        : lang === 'uz'
                        ? '🌿 Ochiq soʻrilar va terassada hordiq chiqarish uchun ajoyib ob-havo!'
                        : '🌿 Отличная погода для отдыха на топчанах и летней террасе!')
                    : (lang === 'ky'
                        ? '🫖 Жылуу VIP залдарыбызда ысык чай жана самса менен кош келиңиз!'
                        : lang === 'uz'
                        ? '🫖 Shinam VIP xonalarimizda issiq choy va somsa bilan xush kelibsiz!'
                        : '🫖 Приглашаем в уютные теплые залы и VIP-кабинки!')}
                </span>
              </div>

              {/* 3-day forecast chips */}
              <div className="grid grid-cols-3 gap-1.5">
                {weather.dailyForecast.map((item, idx) => (
                  <div key={idx} className="p-1.5 rounded-lg bg-stone-900/80 border border-white/5 text-center">
                    <span className="text-[10px] text-stone-400 block font-medium">
                      {item.dayName[lang] || item.dayName.ky}
                    </span>
                    <span className="text-xs font-mono font-bold text-white block mt-0.5">
                      +{item.max}° / +{item.min}°
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // FULL STANDALONE CARD VARIANT
  const fullWeather = getWeatherDetails(weather.weatherCode, false);
  return (
    <div className={`rounded-3xl bg-gradient-to-br from-[#0c1c11] via-[#09150d] to-[#0a180e] border border-amber-500/30 p-5 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between ${className}`}>
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 font-serif">
              <span>{lang === 'ky' ? 'Өзгөн аба ырайы' : lang === 'uz' ? 'Oʻzgan ob-havosi' : lang === 'ru' ? 'Погода в Узгене' : 'Uzgen Live Weather'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </h4>
            <span className="text-[11px] text-stone-400">
              {lang === 'ky' ? 'Ул. Манаса 247А аймагы' : 'Ul. Manasa 247A hududi'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchWeather}
          disabled={loading}
          className="p-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-amber-400 border border-white/5 transition-colors cursor-pointer"
          title="Жаңыртуу / Yangilash"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-400' : ''}`} />
        </button>
      </div>

      {/* Main Temperature & Condition Display */}
      <div className="my-4 relative z-10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              {fullWeather.icon}
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight flex items-baseline">
                <span>{weather.temp > 0 ? `+${weather.temp}` : weather.temp}</span>
                <span className="text-2xl sm:text-3xl font-light text-amber-400 ml-0.5">°C</span>
              </div>
              <div className="text-xs font-semibold text-amber-200 mt-0.5">
                {fullWeather.label[lang] || fullWeather.label.ky}
              </div>
            </div>
          </div>

          <div className="text-right space-y-1">
            <div className="text-[11px] text-stone-400">
              {lang === 'ky' ? 'Сезилет:' : lang === 'uz' ? 'Seziladi:' : 'Ощущается:'}{' '}
              <span className="font-mono font-bold text-stone-200">
                {weather.feelsLike > 0 ? `+${weather.feelsLike}` : weather.feelsLike}°C
              </span>
            </div>
            <div className="text-[11px] text-stone-400 font-mono">
              <span className="text-rose-400">↑ {weather.tempMax}°</span>
              {' / '}
              <span className="text-sky-400">↓ {weather.tempMin}°</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Metrics Strip */}
      <div className="grid grid-cols-2 gap-2 my-2 relative z-10">
        <div className="p-2.5 rounded-xl bg-stone-900/80 border border-white/5 flex items-center gap-2">
          <Droplets className="w-4 h-4 text-sky-400 shrink-0" />
          <div className="text-[11px]">
            <span className="text-stone-400 block">{lang === 'ky' ? 'Нымдуулук' : 'Namlik'}</span>
            <span className="font-bold text-stone-200 font-mono">{weather.humidity}%</span>
          </div>
        </div>
        <div className="p-2.5 rounded-xl bg-stone-900/80 border border-white/5 flex items-center gap-2">
          <Wind className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="text-[11px]">
            <span className="text-stone-400 block">{lang === 'ky' ? 'Шамал' : 'Shamol'}</span>
            <span className="font-bold text-stone-200 font-mono">{weather.windSpeed} м/с</span>
          </div>
        </div>
      </div>

      {/* Recommendation for Cafe Topchans / Outdoor Terrace */}
      <div className={`mt-2 p-3 rounded-2xl border text-xs leading-relaxed relative z-10 ${
        isGoodForOutdoor 
          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
          : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
      }`}>
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-[11px] uppercase tracking-wider text-amber-300 mb-0.5">
              {lang === 'ky' ? '«Зайтун» сунушу:' : lang === 'uz' ? '«Zaytun» tavsiyasi:' : 'Совет от «Zaytun»:'}
            </span>
            <p className="text-[11px]">
              {isGoodForOutdoor
                ? (lang === 'ky'
                    ? 'Ачык асман алдындагы топчандарда жана террасада дем алууга эң ыңгайлуу аба ырайы! 🌿'
                    : lang === 'uz'
                    ? 'Ochiq osmon ostidagi soʻrilar (topchan) va terassada hordiq chiqarish uchun ajoyib ob-havo! 🌿'
                    : 'Идеальная погода для отдыха на топчанах и летней террасе на свежем воздухе! 🌿')
                : (lang === 'ky'
                    ? 'Жайлуу жана жылуу VIP залдарыбызда ысык чай жана жаңы самса менен эс алыңыз! 🫖'
                    : lang === 'uz'
                    ? 'Shinam va issiq VIP xonalarimizda damlangan choy va sershira somsa bilan xush kelibsiz! 🫖'
                    : 'Приглашаем в уютные теплые залы и VIP-кабинки с горячим чайником и свежей самсой! 🫖')}
            </p>
          </div>
        </div>
      </div>

      {/* 3-Day Forecast Mini Cards */}
      <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 gap-1.5 relative z-10">
        {weather.dailyForecast.map((item, idx) => (
          <div key={idx} className="p-2 rounded-xl bg-stone-900/60 border border-white/5 text-center">
            <span className="text-[10px] text-stone-400 block font-medium truncate">
              {item.dayName[lang] || item.dayName.ky}
            </span>
            <span className="text-xs font-mono font-bold text-white block mt-0.5">
              +{item.max}°
            </span>
            <span className="text-[10px] font-mono text-stone-500 block">
              +{item.min}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
