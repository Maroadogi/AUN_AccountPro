import React, { useState, useEffect } from "react";
import { Mail, Briefcase, Phone, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { SavedInquiry } from "../types";

interface ConsultationFormProps {
  selectedTariff?: string;
  calculatedPrice?: number;
  calculatorDetails?: string;
  onFormSubmitted: (inquiry: SavedInquiry) => void;
}

export default function ConsultationForm({
  selectedTariff = "Оптимальный",
  calculatedPrice,
  calculatorDetails,
  onFormSubmitted,
}: ConsultationFormProps) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [tariff, setTariff] = useState(selectedTariff);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync state if selected tariff from outside changes
  useEffect(() => {
    if (selectedTariff) {
      setTariff(selectedTariff);
    }
  }, [selectedTariff]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !companyName) {
      alert("Пожалуйста, заполните почту и название компании.");
      return;
    }

    setIsSubmitting(true);

    // Simulate standard fast network response
    setTimeout(() => {
      const newInquiry: SavedInquiry = {
        id: "INQ_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        email,
        companyName,
        phone: phone || "Не указан",
        tariff: calculatorDetails ? `${tariff} (${calculatorDetails})` : tariff,
        submittedAt: new Date().toLocaleString("ru-RU"),
        notes: fullName ? `Контакт: ${fullName}` : undefined,
      };

      onFormSubmitted(newInquiry);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form fields
      setEmail("");
      setFullName("");
      setPhone("");
      setCompanyName("");
    }, 800);
  };

  return (
    <section className="py-20 bg-ink-dark text-white relative overflow-hidden" id="contacts">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-lavender-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-mint-action/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {!isSubmitted ? (
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-semibold mb-6 max-w-2xl mx-auto">
              Готовы передать бухгалтерию профессионалам?
            </h2>
            <p className="font-sans text-on-primary-container text-base md:text-lg mb-10 max-w-xl mx-auto">
              Оставьте заявку на бесплатный экспресс-аудит вашего текущего учета и получите индивидуальное коммерческое предложение.
            </p>

            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-xl backdrop-blur-md text-left">
              {calculatorDetails && (
                <div className="bg-lavender-accent/20 border border-lavender-accent/30 p-4 rounded mb-6 flex justify-between items-center text-xs animate-pulse">
                  <div>
                    <span className="font-bold text-lavender-accent block">ВЫБРАН РАСЧЕТ ИЗ КАЛЬКУЛЯТОРА:</span>
                    <span className="text-gray-300">{calculatorDetails}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 block uppercase">Прайс:</span>
                    <span className="font-bold text-mint-action text-base font-mono">{calculatedPrice?.toLocaleString("ru-RU")} ₽</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                {/* Email Address */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Ваш Корпоративный Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="address@company.ru"
                      className="w-full bg-white/10 focus:bg-white/15 border border-white/20 focus:border-mint-action rounded py-3.5 pl-11 pr-4 text-[15px] outline-none transition-all placeholder:text-gray-500 text-white"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Название компании / сферы *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder='ООО "Вектор" или ИП Иванов'
                      className="w-full bg-white/10 focus:bg-white/15 border border-white/20 focus:border-mint-action rounded py-3.5 pl-11 pr-4 text-[15px] outline-none transition-all placeholder:text-gray-500 text-white"
                    />
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Как вас зовут (Имя)
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Александр"
                    className="w-full bg-white/10 focus:bg-white/15 border border-white/20 focus:border-mint-action rounded py-3.5 px-4 text-[15px] outline-none transition-all placeholder:text-gray-500 text-white"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Номер телефона для связи
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full bg-white/10 focus:bg-white/15 border border-white/20 focus:border-mint-action rounded py-3.5 pl-11 pr-4 text-[15px] outline-none transition-all placeholder:text-gray-500 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Tariff Select */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Интересующий пакет обслуживания
                </label>
                <select
                  value={tariff}
                  onChange={(e) => setTariff(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 focus:border-mint-action rounded py-3.5 px-4 text-[15px] outline-none transition-all text-white [&>option]:text-ink-dark [&>option]:bg-white"
                >
                  <option value="Старт">Старт — от 15,000 ₽ / мес</option>
                  <option value="Оптимальный">Оптимальный — от 35,000 ₽ / мес</option>
                  <option value="Максимум">Максимум — от 75,000 ₽ / мес</option>
                </select>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-mint-action hover:bg-mint-action/90 text-white font-sans text-base font-semibold tracking-wider py-4 rounded transition-all duration-200 cursor-pointer disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Отправка..." : "Получить бесплатное предложение"}
                <Send className="w-4 h-4" />
              </button>

              <p className="text-center text-[11px] text-gray-500 mt-4">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных и передачу на бесплатный аудит.
              </p>
            </form>
          </div>
        ) : (
          <div className="bg-white text-ink-dark p-8 md:p-12 rounded-xl text-center max-w-2xl mx-auto shadow-2xl space-y-6 animate-scale-up border border-slate-blue/15">
            <div className="w-16 h-16 bg-mint-action/10 text-mint-action rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="inline-block bg-mint-action/10 text-mint-action px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded">
                Заявка успешно принята
              </span>
              <h3 className="font-headline text-2xl md:text-3xl font-bold">
                Спасибо за доверие!
              </h3>
            </div>

            <p className="font-sans text-on-surface-variant text-[15px] max-w-md mx-auto leading-relaxed">
              Наш ведущий финансовый аналитик свяжется с вами по адресу <span className="font-semibold text-ink-dark">{email}</span> в течение ближайших 30 минут для проведения экспресс-аудита вашей отчетности.
            </p>

            <div className="bg-surface p-4 rounded border border-slate-blue/10 text-left text-xs space-y-2 max-w-sm mx-auto font-mono text-on-surface-variant">
              <div><span className="font-bold text-ink-dark">Организация:</span> {companyName}</div>
              {phone && <div><span className="font-bold text-ink-dark">Телефон:</span> {phone}</div>}
              <div><span className="font-bold text-ink-dark">Тарифный план:</span> {tariff}</div>
              {calculatorDetails && <div><span className="font-bold text-ink-dark">Расчет:</span> {calculatorDetails}</div>}
            </div>

            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2.5 text-xs font-semibold text-lavender-accent border border-lavender-accent/30 hover:bg-lavender-accent/5 rounded transition cursor-pointer"
            >
              Отправить еще одну заявку
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
