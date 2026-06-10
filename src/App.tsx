import React, { useState, useEffect } from "react";
import { 
  Calculator as CalcIcon, 
  Wallet, 
  FileText, 
  BarChart3, 
  ArrowRight, 
  Send, 
  CheckCircle2, 
  Award, 
  Briefcase, 
  TrendingUp, 
  Sparkles,
  Zap,
  Shield,
  Clock,
  Check
} from "lucide-react";
import { SavedInquiry } from "./types";
import { SERVICES_DATA, TARIFF_PLANS, WHY_CHOOSE_US } from "./data";
import Logo from "./components/Logo";
import { motion } from "motion/react";

// Custom Subcomponents
import Header from "./components/Header";
import PricingCalculator from "./components/PricingCalculator";
import ApproachStepper from "./components/ApproachStepper";
import ConsultationForm from "./components/ConsultationForm";
import FAQAccordion from "./components/FAQAccordion";
import ContactsSection from "./components/ContactsSection";
import ClientRequests from "./components/ClientRequests";
import TelegramConsultant from "./components/TelegramConsultant";

export default function App() {
  // Global states for coordinating form submissions and pricing presets
  const [selectedTariff, setSelectedTariff] = useState<string>("Оптимальный");
  const [calculatedPrice, setCalculatedPrice] = useState<number | undefined>(undefined);
  const [calculatorDetails, setCalculatorDetails] = useState<string | undefined>(undefined);
  const [submittedInquiries, setSubmittedInquiries] = useState<SavedInquiry[]>([]);

  // Load inquiries from localStorage on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem("accountpro_inquiries");
      if (cached) {
        setSubmittedInquiries(JSON.parse(cached));
      }
    } catch (e) {
      console.error("Failed to read inquiries from localStorage", e);
    }
  }, []);

  // Sync inquiries with localStorage
  const saveInquiries = (updatedList: SavedInquiry[]) => {
    setSubmittedInquiries(updatedList);
    try {
      localStorage.setItem("accountpro_inquiries", JSON.stringify(updatedList));
    } catch (e) {
      console.error("Failed to save inquiries to localStorage", e);
    }
  };

  const handleFormSubmitted = (newInquiry: SavedInquiry) => {
    const updated = [newInquiry, ...submittedInquiries];
    saveInquiries(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    const filtered = submittedInquiries.filter((inq) => inq.id !== id);
    saveInquiries(filtered);
  };

  const handleClearInquiries = () => {
    if (window.confirm("Вы уверены, что хотите очистить всю базу отправленных заявок в этой сессии?")) {
      saveInquiries([]);
    }
  };

  // Preset tariff choice from the listing cards or the dynamic calculator
  const handleSelectTariff = (tariffName: string, calculatedVal?: number, detailsText?: string) => {
    setSelectedTariff(tariffName);
    if (calculatedVal !== undefined) {
      setCalculatedPrice(calculatedVal);
      setCalculatorDetails(detailsText);
    } else {
      setCalculatedPrice(undefined);
      setCalculatorDetails(undefined);
    }

    // Scroll smoothly to contact form
    const formElement = document.getElementById("contacts");
    if (formElement) {
      const offset = 88;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = formElement.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Scroll directly to the form
  const navigateToContacts = () => {
    const element = document.getElementById("contacts");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Helper mapping for services icons
  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Calculator":
        return <Wallet className="w-6 h-6 text-ink-dark group-hover:text-white transition-colors" />;
      case "FileText":
        return <FileText className="w-6 h-6 text-ink-dark group-hover:text-white transition-colors" />;
      case "BarChart3":
        return <BarChart3 className="w-6 h-6 text-ink-dark group-hover:text-white transition-colors" />;
      default:
        return <Briefcase className="w-6 h-6 text-ink-dark group-hover:text-white transition-colors" />;
    }
  };

  return (
    <div className="bg-surface min-h-screen text-ink-dark">
      {/* Sticky Header component */}
      <Header onOpenConsultation={navigateToContacts} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface pt-32 pb-20 md:py-36">
        {/* Background ambient mesh */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-b from-lavender-accent/5 to-transparent rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8 text-left"
          >
            <span className="inline-flex items-center gap-2 bg-slate-blue/10 text-ink-dark px-3 py-1.5 text-[12px] font-semibold uppercase tracking-wider rounded select-none">
              <span className="w-2 h-2 rounded-full bg-mint-action animate-pulse" />
              Бухгалтерия для технологичного бизнеса
            </span>
            
            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-dark tracking-tight leading-tight">
              Бухгалтерия и налоги <br className="hidden sm:inline" />
              <span className="text-lavender-accent">без лишнего стресса</span> <br className="hidden sm:inline" />
              для вашего бизнеса
            </h1>

            <p className="font-sans text-on-surface-variant text-lg leading-relaxed max-w-xl">
              Мы берем на себя полную ответственность за вашу отчетность, налоговый аудит и планирование, пока вы масштабируете свой проект. Гарантируем точность по договору.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <motion.button
                onClick={navigateToContacts}
                whileHover={{ scale: 1.03, y: -2, boxShadow: "0 10px 20px -10px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="bg-ink-dark text-white px-8 py-4 rounded font-sans text-[14px] font-semibold tracking-wider cursor-pointer shadow-md flex items-center gap-2"
              >
                Связаться с нами
                <ArrowRight className="w-4 h-4 text-[#8EA3CC]" />
              </motion.button>
              
              {/* This opens the Telegram bot widget instantly */}
              <motion.button
                type="button"
                onClick={() => {
                  // Direct trigger of assistant chat
                  const btn = document.querySelector(".fixed.bottom-6.right-6 > button") as HTMLButtonElement;
                  if (btn) btn.click();
                }}
                whileHover={{ scale: 1.03, y: -2, backgroundColor: "rgba(17,8,34,1)", color: "#fff" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="border border-ink-dark text-ink-dark px-8 py-4 rounded font-sans text-[14px] font-semibold tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4.5 h-4.5" />
                Чат в Telegram
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-high border border-slate-blue/20 relative group shadow-xl">
              <img
                className="w-full h-full object-cover grayscale-[20%] transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuY9uaE8AQOmlMq3qgfqKUR4pQCparMTPUAiNrUM3LuhOwA5MQEdxYP_Xg-XkMGmLSmcYjotF3kWtySxUGmqKZsh1jaW2BpTgcfgeJ7k_La48c5vYGdG5zmpY8yKD5UI6ocFPNXe77jZXmLV9uNlioi2coRYF3CbCMaqMaX-sGb_9IprBQEyNXoCBKieA3SNJXuCX4QTN8SeZivh4Pn09YxGEGbhmou3C7DWPiTjNiPTwjYmKoh8BeuA2IFZRm8_rtm4OcYNLIkYk"
                alt="АудитУчетНалоги Professional Accountant"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-dark/35 to-transparent pointer-events-none" />
            </div>

            {/* Floating Trust Indicator Stat Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded border border-slate-blue/15 shadow-xl z-25 max-w-xs divide-y divide-slate-blue/10"
            >
              <div className="pb-3">
                <div className="text-mint-action font-headline text-3xl font-bold mb-1">99.8%</div>
                <div className="text-[11px] font-semibold font-sans tracking-widest text-[#8EA3CC] uppercase">
                  ТОЧНОСТЬ ОТЧЕТОВ
                </div>
              </div>
              <div className="pt-3 flex items-center gap-2 text-[11px] text-on-surface-variant font-medium">
                <Award className="w-4 h-4 text-lavender-accent shrink-0" />
                <span>Застраховано на 10 млн рублей по договору</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section / Bento Grid */}
      <section className="py-20 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl text-left">
              <span className="inline-block bg-lavender-accent/10 text-lavender-accent px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded mb-4">
                Специализированные услуги
              </span>
              <h2 className="font-headline text-3xl md:text-4xl font-semibold text-ink-dark mb-4">
                Наши услуги
              </h2>
              <p className="font-sans text-on-surface-variant text-lg">
                Комплексные бухгалтерские и юридические решения для малого и среднего бизнеса, адаптированные под ваши цели.
              </p>
            </div>
            <a
              href="#calculator"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-lavender-accent font-sans text-[14px] font-semibold flex items-center gap-2 hover:underline select-none shrink-0 group"
            >
              Перейти к калькулятору
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {SERVICES_DATA.map((service) => (
              <motion.div
                key={service.id}
                onClick={navigateToContacts}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="p-8 md:p-10 border border-slate-blue/20 rounded flex flex-col justify-between min-h-[380px] hover:border-lavender-accent hover:shadow-lg transition-all duration-300 group bg-surface/30 cursor-pointer"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-sm transition-all group-hover:bg-lavender-accent">
                    {renderServiceIcon(service.icon)}
                  </div>
                  <h3 className="font-headline text-xl md:text-2xl font-bold text-ink-dark leading-tight group-hover:text-lavender-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-on-surface-variant text-[14.5px] leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-blue/10">
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-slate-blue/10 text-ink-dark text-[11px] font-medium px-2.5 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-surface relative overflow-hidden" id="about">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Visual Column */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-square bg-surface-container-high rounded-xl overflow-hidden border border-slate-blue/20 shadow-xl relative group">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOUEFezM-b3cHG0BhmR9FAXM08hfuBGgjbIUUJObEll96xfZ6FixknRoSZ0HzGzY5NDBLWFiMY06lqbDvsLkxiS38XLsaZSXqT3VUoLt4INshY06t6zurIv6kCcchIXn6HejHryOMFqsEBFUHnhPbKn2z2LSFWsk-uH9HrfFRuTwIwmwsmIvDBXzBpZAo-GQun0dcP6lOyTyzCnWrvnjFAr9K_h6XCGxfmyVHYzxoybeBxl9UjjNNdolVtqPjfCG5_d7BU3-JdLBc"
                  alt="АудитУчетНалоги Meeting Room"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
              
              <div className="absolute top-1/2 -right-12 -translate-y-1/2 w-48 h-48 bg-mint-action/10 rounded-full blur-3xl -z-10" />
            </motion.div>

            {/* copy Column */}
            <div className="lg:col-span-7 text-left space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block bg-mint-action/10 text-mint-action px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded mb-4">
                  Наше преимущество
                </span>
                <h2 className="font-headline text-3xl md:text-4xl font-semibold text-ink-dark tracking-tight leading-tight">
                  Почему ответственные <br />
                  компании выбирают АудитУчетНалоги?
                </h2>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.15
                    }
                  }
                }}
                className="grid grid-cols-1 gap-6"
              >
                {[
                  {
                    id: "01",
                    icon: <Zap className="w-5 h-5 text-lavender-accent" />,
                    title: "Абсолютная технологичность",
                    desc: "Автоматическая двухсторонняя интеграция со всеми банк-клиентами (Т-Банк, Сбер, Альфа, Точка) и CRM в режиме реального времени. Никаких бумажных архивов и файлов ручных выгрузок."
                  },
                  {
                    id: "02",
                    icon: <Shield className="w-5 h-5 text-mint-action" />,
                    title: "Материальная гарантия по договору",
                    desc: "Наша ответственность полностью застрахована. Если мы допустим ошибку при расчете, страховая компания компенсирует любые пени или начисленные ФНС штрафы."
                  },
                  {
                    id: "03",
                    icon: <Clock className="w-5 h-5 text-lavender-accent" />,
                    title: "Выделенный финансовый эксперт",
                    desc: "Вы получаете команду профессиональных бухгалтеров и юристов во главе с аттестованным главным бухгалтером, глубоко погруженным в специфику именно вашей ниши."
                  }
                ].map((item) => (
                  <motion.div 
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
                    }}
                    className="flex gap-4 p-5 bg-white rounded border border-slate-blue/15 hover:border-mint-action transition-all"
                  >
                    <div className="shrink-0 w-10 h-10 bg-slate-blue/10 rounded flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-headline text-[17px] font-bold text-ink-dark flex items-center gap-2">
                        <span className="text-gray-300 font-mono text-xs">{item.id}</span>
                        {item.title}
                      </h4>
                      <p className="text-on-surface-variant text-[13.5px] mt-1.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Interactive Approach Stepper */}
      <ApproachStepper />

      {/* Interactive Pricing Calculator component */}
      <PricingCalculator onSelectCalculatedPlan={handleSelectTariff} />

      {/* Tariff Plans Cards */}
      <section className="py-20 bg-surface-container-low" id="pricing-plans">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-lavender-accent/10 text-lavender-accent text-[12px] font-semibold uppercase tracking-wider rounded mb-3">
              Готовые пакетные решения
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-semibold text-ink-dark mb-4">
              Тарифные планы
            </h2>
            <p className="font-sans text-on-surface-variant text-lg">
              Выберите подходящий базовый уровень поддержки для вашего бизнеса или воспользуйтесь калькулятором для точной конфигурации параметров.
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto"
          >
            {TARIFF_PLANS.map((plan) => {
              const isSelected = selectedTariff === plan.name;
              return (
                <motion.div
                  key={plan.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(17,8,34,0.15)",
                    borderColor: plan.isPopular ? "#2AB272" : "#110822"
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className={`bg-white p-8 md:p-10 rounded-xl border flex flex-col justify-between transition-colors duration-300 relative ${
                    plan.isPopular
                      ? "border-2 border-mint-action shadow-lg"
                      : "border-slate-blue/15"
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-mint-action text-white px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider select-none shadow">
                      Популярный выбор
                    </div>
                  )}

                  <div>
                    <div className="mb-8 text-left">
                      <h3 className="font-headline text-xl font-bold text-ink-dark mb-2">{plan.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl md:text-4xl font-headline font-bold text-ink-dark tracking-tight">
                          {plan.priceMonthly.toLocaleString("ru-RU")}
                        </span>
                        <span className="text-xl font-bold text-ink-dark">₽</span>
                        <span className="text-xs text-on-surface-variant font-normal font-sans">/мес</span>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-10 text-left">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs md:text-[13px] text-on-surface-variant leading-relaxed">
                          <Check className="w-4 h-4 text-mint-action shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => handleSelectTariff(plan.name)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 450, damping: 15 }}
                    className={`w-full py-3.5 rounded font-sans text-[13px] font-bold tracking-wider uppercase cursor-pointer ${
                      plan.isPopular
                        ? "bg-mint-action text-white shadow-md text-[13px]"
                        : "border border-ink-dark text-ink-dark bg-transparent"
                    }`}
                  >
                    Выбрать этот тариф
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Interactive Consultation and Audit form Component */}
      <ConsultationForm
        selectedTariff={selectedTariff}
        calculatedPrice={calculatedPrice}
        calculatorDetails={calculatorDetails}
        onFormSubmitted={handleFormSubmitted}
      />

      {/* Live inquiries database rows for fully interactive proof-of-work (collapsible) */}
      <ClientRequests
        inquiries={submittedInquiries}
        onClearAll={handleClearInquiries}
        onDeleteInquiry={handleDeleteInquiry}
      />

      {/* FAQ Accordion with instant search Filter */}
      <FAQAccordion />

      {/* Наши контакты с интерактивной схемой / картой */}
      <ContactsSection />

      {/* Final Brand Footer */}
      <footer className="bg-[#110822] text-white py-16 border-t border-slate-blue/15">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4 text-left">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Logo textClassName="font-sans font-extrabold tracking-tight text-xl md:text-2xl text-white" />
            </a>
            <p className="font-sans text-[13px] text-gray-400">
              © 2026 АудитУчетНалоги. Все права защищены. Надежный финтех партнер в мире налогов и отчетности.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center">
            <a className="font-sans text-[13.5px] text-gray-400 hover:text-mint-action transition-colors duration-200" href="#">
              Политика конфиденциальности
            </a>
            <a className="font-sans text-[13.5px] text-gray-400 hover:text-mint-action transition-colors duration-200" href="#">
              Условия использования
            </a>
            <span className="font-sans text-[13.5px] text-gray-400 pointer-events-none select-none select-none opacity-50">
              Копия защищена 
            </span>
          </div>
        </div>
      </footer>

      {/* Simulated Floating Telegram Chat Assistance */}
      <TelegramConsultant onSelectTariff={handleSelectTariff} />
    </div>
  );
}
