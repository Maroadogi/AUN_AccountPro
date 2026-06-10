import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Compass, 
  Map, 
  Info, 
  Navigation, 
  Building,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface OfficeInfo {
  city: string;
  address: string;
  floor: string;
  phone: string;
  email: string;
  hours: string;
  metro: { name: string; time: string; color: string }[];
  accentColor: string;
  osmUrl: string;
  coordinates: { lat: number; lng: number };
  pointsOfInterest: {
    id: string;
    label: string;
    shortLabel: string;
    details: string;
    x: number; // percentage coordinate on SVG
    y: number; // percentage coordinate on SVG
  }[];
}

const OFFICES_DATA: OfficeInfo[] = [
  {
    city: "Москва",
    address: "Пресненская наб., 12, ММДЦ «Москва-Сити»",
    floor: "Башня Федерация Восток, 45 этаж, офис 4512",
    phone: "+7 (495) 123-45-67",
    email: "msk@accountpro.ru",
    hours: "Пн-Пт: 9:00 - 19:00",
    metro: [
      { name: "Деловой центр", time: "1 мин", color: "#0072C6" },
      { name: "Выставочная", time: "3 мин", color: "#00B2A9" },
      { name: "Международная", time: "5 мин", color: "#8E2582" }
    ],
    accentColor: "from-lavender-accent to-indigo-600",
    osmUrl: "https://www.openstreetmap.org/export/embed.html?bbox=37.5342%2C55.7460%2C37.5452%2C55.7510&layer=mapnik&marker=55.7486%2C37.5398",
    coordinates: { lat: 55.7486, lng: 37.5398 },
    pointsOfInterest: [
      {
        id: "office-msk",
        label: "Офис АудитУчетНалоги",
        shortLabel: "АудитУчетНалоги",
        details: "Башня Федерация Восток, 45 этаж. Для входа понадобится паспорт. Закажите пропуск за 15 минут.",
        x: 50,
        y: 40
      },
      {
        id: "metro-dc",
        label: "Метро 'Деловой центр'",
        shortLabel: "М. Деловой центр",
        details: "Выход 4 из метро, далее 80 метров пешком прямо до центрального входа в Башню Федерация.",
        x: 30,
        y: 75
      },
      {
        id: "metro-vys",
        label: "Метро 'Выставочная'",
        shortLabel: "М. Выставочная",
        details: "Выход через ТРЦ 'Афимолл Сити', следуйте по указателям к переходу в Башню Федерация.",
        x: 75,
        y: 65
      },
      {
        id: "parking-afimall",
        label: "Парковка 'Афимолл'",
        shortLabel: "Паркинг",
        details: "Многоуровневый подземный паркинг. Первые 2 часа бесплатно при покупках в ТРЦ от 1000 ₽.",
        x: 70,
        y: 25
      }
    ]
  },
  {
    city: "Санкт-Петербург",
    address: "Лиговский проспект, 140",
    floor: "БЦ «Лайт-Хаус», 6 этаж, офис 607",
    phone: "+7 (812) 765-43-21",
    email: "spb@accountpro.ru",
    hours: "Пн-Пт: 9:00 - 19:00",
    metro: [
      { name: "Обводный канал", time: "2 мин", color: "#5C134F" },
      { name: "Лиговский проспект", time: "8 мин", color: "#E03F3F" }
    ],
    accentColor: "from-mint-action to-teal-600",
    osmUrl: "https://www.openstreetmap.org/export/embed.html?bbox=30.3428%2C59.9112%2C30.3528%2C59.9172&layer=mapnik&marker=55.7486%2C37.5398&marker=59.9142%2C30.3478",
    coordinates: { lat: 59.9142, lng: 30.3478 },
    pointsOfInterest: [
      {
        id: "office-spb",
        label: "Офис АудитУчетНалоги СПБ",
        shortLabel: "АудитУчетНалоги СПБ",
        details: "БЦ 'Лайт-Хаус', 6 этаж. Комфортная переговорная зона, охраняемая территория, вход по документам.",
        x: 50,
        y: 45
      },
      {
        id: "metro-ok",
        label: "Метро 'Обводный канал'",
        shortLabel: "М. Обводный канал",
        details: "Выход из метро на Лиговский проспект, поверните налево и идите прямо около 2 минут.",
        x: 35,
        y: 80
      },
      {
        id: "metro-lp",
        label: "Метро 'Лиговский проспект'",
        shortLabel: "М. Лиговский пр.",
        details: "Выйдите на проспект и направляйтесь на юг около 8 минут пешком.",
        x: 65,
        y: 20
      }
    ]
  }
];

export default function ContactsSection() {
  const [selectedCityIdx, setSelectedCityIdx] = useState<number>(0);
  const [mapType, setMapType] = useState<"blueprint" | "interactive">("blueprint");
  const [selectedPoiId, setSelectedPoiId] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const currentOffice = OFFICES_DATA[selectedCityIdx];

  // Auto-select first POI for display
  React.useEffect(() => {
    if (currentOffice.pointsOfInterest.length > 0) {
      setSelectedPoiId(currentOffice.pointsOfInterest[0].id);
    }
  }, [selectedCityIdx]);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus(label);
      setTimeout(() => {
        setCopyStatus(null);
      }, 2000);
    });
  };

  const selectedPoi = currentOffice.pointsOfInterest.find(p => p.id === selectedPoiId) || currentOffice.pointsOfInterest[0];

  return (
    <section className="py-20 bg-surface/20 border-t border-slate-blue/10 relative overflow-hidden" id="contacts">
      {/* Visual background details */}
      <div className="absolute top-0 left-0 w-1/3 h-96 bg-mint-action/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-1/3 h-96 bg-lavender-accent/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-mint-action/10 text-mint-action text-[12px] font-semibold uppercase tracking-wider rounded mb-3">
            <Map className="w-3.5 h-3.5" /> Мы на связи
          </span>
          <h2 className="font-headline text-3xl md:text-4xl font-semibold text-ink-dark mb-4">
            Наши контакты
          </h2>
          <p className="font-sans text-on-surface-variant text-lg">
            Посетите наш современный офис для личной консультации или свяжитесь с нами любым удобным цифровым способом.
          </p>
        </div>

        {/* City Toggle Switches */}
        <div className="flex justify-center gap-3 mb-10">
          {OFFICES_DATA.map((office, idx) => (
            <motion.button
              key={office.city}
              onClick={() => {
                setSelectedCityIdx(idx);
                // Reset map type view or POI selection if appropriate
              }}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 450, damping: 15 }}
              className={`px-6 py-2.5 rounded font-sans text-sm font-semibold tracking-wide outline-hidden cursor-pointer ${
                selectedCityIdx === idx
                  ? "bg-ink-dark text-white shadow-md shadow-ink-dark/10"
                  : "bg-white text-on-surface-variant border border-slate-blue/15 hover:border-ink-dark/30 hover:bg-slate-50"
              }`}
            >
              {office.city}
            </motion.button>
          ))}
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Contacts Left Column (Details Cards) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Primary Details Card */}
            <motion.div 
              key={`office-details-${selectedCityIdx}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded border border-slate-blue/15 shadow-xl flex-1 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-slate-blue/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-lavender-accent" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-mono tracking-widest text-[#8EA3CC] uppercase font-bold mb-1">Адрес офиса</h4>
                    <p className="font-headline text-lg font-bold text-ink-dark leading-tight">{currentOffice.address}</p>
                    <p className="font-sans text-sm text-on-surface-variant mt-1 font-medium">{currentOffice.floor}</p>
                    <button
                      onClick={() => handleCopyText(`${currentOffice.address}, ${currentOffice.floor}`, "address")}
                      className="text-xs text-lavender-accent hover:text-lavender-accent/80 font-semibold font-sans mt-2 flex items-center gap-1 focus:outline-hidden"
                    >
                      {copyStatus === "address" ? "Скопировано!" : "Скопировать адрес"}
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-blue/10 pt-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-slate-blue/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-mint-action" />
                  </div>
                  <div className="text-left w-full">
                    <h4 className="text-xs font-mono tracking-widest text-[#8EA3CC] uppercase font-bold mb-1">Телефон</h4>
                    <p className="font-headline text-lg font-bold text-ink-dark">
                      <a href={`tel:${currentOffice.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-mint-action transition">
                        {currentOffice.phone}
                      </a>
                    </p>
                    <p className="font-sans text-xs text-on-surface-variant mt-0.5">Звонки принимаются по расписанию офиса</p>
                    <button
                      onClick={() => handleCopyText(currentOffice.phone, "phone")}
                      className="text-xs text-mint-action hover:text-mint-action/80 font-semibold font-sans mt-2 flex items-center gap-1 focus:outline-hidden"
                    >
                      {copyStatus === "phone" ? "Скопировано!" : "Скопировать номер"}
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-blue/10 pt-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-slate-blue/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-lavender-accent" />
                  </div>
                  <div className="text-left w-full">
                    <h4 className="text-xs font-mono tracking-widest text-[#8EA3CC] uppercase font-bold mb-1 font-semibold">Электронная почта</h4>
                    <p className="font-headline text-lg font-bold text-ink-dark">
                      <a href={`mailto:${currentOffice.email}`} className="hover:text-lavender-accent transition">
                        {currentOffice.email}
                      </a>
                    </p>
                    <p className="font-sans text-xs text-on-surface-variant mt-0.5">Официальные запросы и первичная документация</p>
                  </div>
                </div>

                <div className="border-t border-slate-blue/10 pt-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-slate-blue/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-mint-action" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-mono tracking-widest text-[#8EA3CC] uppercase font-bold mb-1">Часы работы</h4>
                    <p className="font-headline text-base font-bold text-ink-dark">{currentOffice.hours}</p>
                    <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Суббота и воскресенье — выходные дни. Прием клиентов осуществляется по предварительной договоренности.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative side color strip accent */}
              <div className={`absolute top-0 left-0 w-1.5 h-full bg-linear-to-b ${currentOffice.accentColor}`} />
            </motion.div>

            {/* Micro FAQ/Notice card */}
            <div className="bg-slate-blue/5 p-6 rounded border border-slate-blue/15 text-left flex gap-4 items-start">
              <Info className="w-5 h-5 text-lavender-accent shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-on-surface-variant">
                <strong className="text-ink-dark">Важная информация перед визитом:</strong> Специфика пропускной системы офисных центров требует наличия документов, удостоверяющих личность (паспорт или водительские права). Пожалуйста, свяжитесь с ассистентом заранее для резерва провизии.
              </div>
            </div>
          </div>

          {/* Interactive Map Block Right Column */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-xl border border-slate-blue/20 shadow-xl flex flex-col justify-between">
            
            {/* Map Header Utilities */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-blue/10">
              <div className="text-left">
                <span className="text-[11px] font-bold text-[#8EA3CC] uppercase tracking-widest font-mono">Визуализация</span>
                <h3 className="font-headline text-xl font-bold text-ink-dark mt-0.5">
                  {mapType === "blueprint" ? "Схема прилегающей территории" : "Интерактивная карта Google / OSM"}
                </h3>
              </div>

              {/* Toggle controls */}
              <div className="bg-slate-100 p-1 rounded-lg flex items-center justify-center">
                <motion.button
                  onClick={() => setMapType("blueprint")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold leading-none tracking-wide cursor-pointer ${
                    mapType === "blueprint"
                      ? "bg-white text-ink-dark shadow-sm"
                      : "text-on-surface-variant"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    Чертеж
                  </span>
                </motion.button>
                <motion.button
                  onClick={() => setMapType("interactive")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold leading-none tracking-wide cursor-pointer ${
                    mapType === "interactive"
                      ? "bg-white text-ink-dark shadow-sm"
                      : "text-on-surface-variant"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Map className="w-3.5 h-3.5" />
                    Спутник / Стрит
                  </span>
                </motion.button>
              </div>
            </div>

            {/* The Map Canvas Area */}
            <div className="relative aspect-[16/10] bg-[#110C24] rounded-lg overflow-hidden border border-slate-blue/2 w-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                {mapType === "blueprint" ? (
                  /* Elegant Interactive Schematic blueprint map representation with absolute points of interest */
                  <motion.div 
                    key={`blueprint-${selectedCityIdx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 select-none overflow-hidden"
                  >
                    {/* SVG Blueprint Background */}
                    <svg className="w-full h-full opacity-65" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                      
                      {/* Grid Pattern */}
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#251F42" strokeWidth="1" />
                        </pattern>
                        <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#2AB272" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#2AB272" stopOpacity="0" />
                        </radialGradient>
                      </defs>

                      <rect width="100%" height="100%" fill="#0C071C" />
                      <rect width="100%" height="100%" fill="url(#grid)" />

                      {/* Mock Streets and Lines relative to Moscow / SPB */}
                      {selectedCityIdx === 0 ? (
                        <>
                          {/* Moscow Map Lines */}
                          {/* Moscow River Line */}
                          <path d="M 0 50 Q 300 200 800 130" stroke="#1F285C" strokeWidth="48" fill="none" opacity="0.5" />
                          <path d="M 0 50 Q 300 200 800 130" stroke="#1F2D6B" strokeWidth="32" fill="none" opacity="0.6" />
                          
                          {/* Presnenskaya Embankment path */}
                          <path d="M 0 90 Q 300 240 800 170" stroke="#363C66" strokeWidth="8" strokeDasharray="6 3" fill="none" />
                          <text x="350" y="240" fill="#4B568F" fontSize="10" className="font-mono tracking-widest font-semibold" transform="rotate(7 350 240)">ПРЕСНЕНСКАЯ НАБ.</text>
                          
                          {/* City Ring Block representations */}
                          <rect x="150" y="280" width="100" height="70" rx="4" fill="#131030" stroke="#282259" strokeWidth="1.5" />
                          <text x="200" y="320" fill="#6A75AD" fontSize="11" textAnchor="middle" className="font-semibold">Башня ОКО</text>

                          <rect x="520" y="180" width="140" height="110" rx="4" fill="#131030" stroke="#282259" strokeWidth="1.5" />
                          <text x="590" y="240" fill="#6A75AD" fontSize="12" textAnchor="middle" className="font-semibold">ТРЦ Афимолл</text>

                          {/* Tower Federation Tower (MAIN BUILDING) */}
                          <g transform="translate(360, 160)">
                            {/* Accent Glow backdrop */}
                            <circle cx="40" cy="40" r="100" fill="url(#ringGlow)" />
                            {/* Building Outline (Hexagon block for extra tech vibe) */}
                            <polygon points="40,5 75,25 75,65 40,85 5,65 5,25" fill="#19133E" stroke="#5F51B8" strokeWidth="2.5" />
                            <polygon points="40,11 68,28 68,62 40,79 12,62 12,28" fill="#1e184e" stroke="#2AB272" strokeWidth="1" opacity="0.7" />
                            <text x="40" y="47" fill="#ffffff" fontSize="12" textAnchor="middle" className="font-headline font-bold">ФЕДЕРАЦИЯ</text>
                          </g>

                          {/* Animated metro-to-office path indicator */}
                          <path d="M 240 375 L 340 375 L 400 245" stroke="#2AB272" strokeWidth="2.5" strokeDasharray="8 4" fill="none" opacity="0.8" className="animate-pulse" />
                        </>
                      ) : (
                        <>
                          {/* St. Petersburg Map Lines */}
                          {/* Obvodny Canal Line */}
                          <path d="M 0 400 L 800 400" stroke="#1F285C" strokeWidth="40" fill="none" opacity="0.5" />
                          <text x="400" y="405" fill="#505F9E" fontSize="10" className="font-mono tracking-widest font-semibold" textAnchor="middle">ОБВОДНЫЙ КАНАЛ</text>

                          {/* Ligovsky Prospect road line */}
                          <path d="M 280 0 L 280 500" stroke="#363C66" strokeWidth="10" strokeDasharray="6 3" fill="none" />
                          <text x="260" y="260" fill="#4B568F" fontSize="10" className="font-mono tracking-widest font-semibold" transform="rotate(-90 260 260)">ЛИГОВСКИЙ ПРОСПЕКТ</text>

                          {/* BCS Blocks */}
                          <rect x="420" y="160" width="160" height="90" rx="4" fill="#131030" stroke="#282259" strokeWidth="1.5" />
                          <circle cx="500" cy="205" r="50" fill="url(#ringGlow)" opacity="0.5" />
                          <text x="500" y="210" fill="#ffffff" fontSize="12" textAnchor="middle" className="font-headline font-bold">БЦ ЛАЙТ-ХАУС</text>

                          {/* Metro connection indicator */}
                          <path d="M 280 400 L 500 245" stroke="#2AB272" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.8" />
                        </>
                      )}
                    </svg>

                    {/* Interactive Clickable POI Markers positioned overlay absolute */}
                    {currentOffice.pointsOfInterest.map((poi) => {
                      const isSelected = selectedPoiId === poi.id;
                      const isMainOffice = poi.id.startsWith("office");

                      return (
                        <button
                          key={poi.id}
                          style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                          onClick={() => setSelectedPoiId(poi.id)}
                          className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 outline-hidden"
                        >
                          {/* Ripple marker background */}
                          <span className={`absolute inset-0 flex items-center justify-center`}>
                            <span className={`animate-ping absolute inline-flex h-8 w-8 rounded-full opacity-60 ${
                              isMainOffice ? "bg-mint-action" : isSelected ? "bg-lavender-accent" : "bg-slate-400"
                            }`} />
                          </span>

                          {/* Pin Container */}
                          <div className={`relative px-3 py-1.5 rounded-full border shadow-lg font-sans text-[11px] font-bold tracking-wide transition-all ${
                            isMainOffice 
                              ? "bg-mint-action border-white text-white scale-110" 
                              : isSelected
                              ? "bg-lavender-accent border-white text-ink-dark"
                              : "bg-[#181238] border-slate-blue/30 text-gray-300 hover:text-white hover:border-slate-blue/60"
                          }`}>
                            <div className="flex items-center gap-1.5">
                              {isMainOffice && <Building className="w-3.5 h-3.5" />}
                              <span>{poi.shortLabel}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}

                    {/* Compass North Arrow overlay decorative */}
                    <div className="absolute bottom-4 right-4 pointer-events-none bg-black/40 backdrop-blur-md p-2 rounded text-[10px] text-gray-400 font-mono flex flex-col items-center select-none border border-white/10">
                      <Navigation className="w-5 h-5 text-mint-action rotate-180 mb-1" />
                      <span>СЕВЕР / N</span>
                    </div>

                  </motion.div>
                ) : (
                  /* Live OpenStreetMap Interactive Iframe Frame */
                  <motion.div 
                    key={`map-interactive-${selectedCityIdx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {/* Map Loader status backdrop (will fade as iframe loads) */}
                    <div className="absolute inset-0 bg-[#0C071C] flex items-center justify-center -z-10">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full border-4 border-mint-action/20 border-t-mint-action animate-spin" />
                        <span className="text-xs font-sans text-gray-400 tracking-wider">Загрузка карт OpenStreetMap...</span>
                      </div>
                    </div>

                    <iframe
                      width="100%"
                      height="100%"
                      className="border-0 m-0 p-0 block filter contrast-125 saturate-[0.85]"
                      title="Адрес офиса АудитУчетНалоги"
                      src={currentOffice.osmUrl}
                      referrerPolicy="no-referrer"
                    />

                    {/* Open External button */}
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${currentOffice.coordinates.lat}&mlon=${currentOffice.coordinates.lng}#map=17/${currentOffice.coordinates.lat}/${currentOffice.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-3 left-3 bg-white/95 hover:bg-white text-ink-dark px-3 py-1.5 rounded shadow text-xs font-semibold flex items-center gap-1 border border-slate-blue/15 transition-all outline-hidden cursor-pointer"
                    >
                      <span>Открыть на весь экран</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* POI Info Description Box (Dynamic based on selected points) */}
            <div className="mt-6 p-4 bg-slate-blue/5 rounded-lg border border-slate-blue/10 min-h-[96px] flex flex-col justify-between text-left">
              <div>
                <span className="text-[10px] font-bold text-lavender-accent uppercase tracking-widest font-mono">
                  {selectedPoi.id.startsWith("office") ? "Адрес нашего филиала" : "Точка ориентира на схеме"}
                </span>
                <h4 className="font-sans text-sm font-bold text-ink-dark mt-0.5">{selectedPoi.label}</h4>
                <p className="font-sans text-[12.5px] leading-relaxed text-on-surface-variant mt-1">
                  {selectedPoi.details}
                </p>
              </div>

              {/* Staggered POI Switcher list at the bottom */}
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-blue/10">
                {currentOffice.pointsOfInterest.map((poi) => (
                  <button
                    key={poi.id}
                    onClick={() => setSelectedPoiId(poi.id)}
                    className={`text-[11px] px-2.5 py-1 rounded cursor-pointer transition font-sans font-medium focus:outline-hidden ${
                      selectedPoiId === poi.id
                        ? "bg-ink-dark text-white font-semibold"
                        : "bg-white text-on-surface-variant border border-slate-blue/15 hover:bg-slate-100"
                    }`}
                  >
                    {poi.shortLabel}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Metro details block quick-read summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-5xl mx-auto">
          {currentOffice.metro.map((m, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-blue/15 shadow-sm text-left flex items-center gap-3">
              <span className={`w-3.5 h-3.5 rounded-full`} style={{ backgroundColor: m.color }} />
              <div>
                <p className="font-headline text-sm font-bold text-ink-dark leading-tight">{m.name}</p>
                <p className="font-sans text-xs text-on-surface-variant mt-0.5">{m.time} — Пешком от входа</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
