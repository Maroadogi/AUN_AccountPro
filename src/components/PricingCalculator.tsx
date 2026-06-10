import React, { useState, useEffect } from "react";
import { Calculator, Check, ArrowRight, Sparkles, Building2, User } from "lucide-react";

interface PricingCalculatorProps {
  onSelectCalculatedPlan: (planName: string, calculatedPrice: number, details: string) => void;
}

export default function PricingCalculator({ onSelectCalculatedPlan }: PricingCalculatorProps) {
  const [legalForm, setLegalForm] = useState<"IP" | "OOO">("OOO");
  const [taxSystem, setTaxSystem] = useState<"USN_6" | "USN_15" | "OSNO">("USN_6");
  const [operations, setOperations] = useState<number>(15);
  const [employees, setEmployees] = useState<number>(1);
  const [isAnnualBilling, setIsAnnualBilling] = useState<boolean>(false);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(15000);
  const [recommendedPlan, setRecommendedPlan] = useState<string>("Старт");

  useEffect(() => {
    // Basic billing calculation formula based on Russian accounting reality
    let base = 8000;
    
    // Legal form factor
    if (legalForm === "OOO") {
      base += 4000;
    }

    // Tax system difficulty factor
    if (taxSystem === "USN_15") {
      base += 3000;
    } else if (taxSystem === "OSNO") {
      base += 8000;
    }

    // Operations cost
    if (operations <= 10) {
      base += operations * 200;
    } else if (operations <= 50) {
      base += 2000 + (operations - 10) * 150;
    } else {
      base += 8000 + (operations - 50) * 100;
    }

    // Employee surcharge (500 rubles per employee after the first one)
    if (employees > 0) {
      base += (employees) * 600;
    }

    // Plan recommendation heuristic
    let recommended = "Старт";
    if (operations > 50 || employees > 10 || taxSystem === "OSNO") {
      recommended = "Максимум";
    } else if (operations > 10 || legalForm === "OOO" || taxSystem === "USN_15") {
      recommended = "Оптимальный";
    }

    // Round to nearest 500 rubles
    let finalBase = Math.round(base / 500) * 500;

    // Minimum check
    if (finalBase < 10000) finalBase = 10000;

    if (isAnnualBilling) {
      // 20% discount
      finalBase = Math.round((finalBase * 0.8) / 100) * 100;
    }

    setCalculatedPrice(finalBase);
    setRecommendedPlan(recommended);
  }, [legalForm, taxSystem, operations, employees, isAnnualBilling]);

  const handleSelect = () => {
    const detailsLabel = `${legalForm === "IP" ? "ИП" : "ООО"}, ${
      taxSystem === "USN_6" ? "УСН 6%" : taxSystem === "USN_15" ? "УСН 15%" : "ОСНО"
    }, ${operations} операций, ${employees} сотр. (${isAnnualBilling ? "Годовая оплата" : "Месячная оплата"})`;
    onSelectCalculatedPlan(recommendedPlan, calculatedPrice, detailsLabel);
  };

  return (
    <div id="calculator" className="bg-surface-container-low py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lavender-accent/10 text-lavender-accent text-[12px] font-semibold uppercase tracking-wider rounded mb-3">
            <Calculator className="w-4.5 h-3.5" />
            Интерактивный тарифный калькулятор
          </div>
          <h2 className="font-headline text-3xl md:text-4xl font-semibold text-ink-dark mb-4">
            Рассчитайте точную стоимость под свой бизнес
          </h2>
          <p className="font-sans text-on-surface-variant text-lg">
            Настройте ключевые параметры, и система подберет оптимальный пакет обслуживания.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded border border-slate-blue/20 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Legal Form */}
              <div>
                <label className="block text-[14px] font-semibold text-ink-dark uppercase tracking-wider mb-3">
                  Организационно-правовая форма
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setLegalForm("IP")}
                    className={`py-3 px-4 rounded border flex items-center justify-center gap-2 font-sans font-medium text-[15px] transition-all cursor-pointer ${
                      legalForm === "IP"
                        ? "border-mint-action bg-mint-action/5 text-mint-action font-semibold"
                        : "border-slate-blue/20 text-on-surface-variant hover:border-ink-dark"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Индивидуальный предприниматель (ИП)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLegalForm("OOO")}
                    className={`py-3 px-4 rounded border flex items-center justify-center gap-2 font-sans font-medium text-[15px] transition-all cursor-pointer ${
                      legalForm === "OOO"
                        ? "border-mint-action bg-mint-action/5 text-mint-action font-semibold"
                        : "border-slate-blue/20 text-on-surface-variant hover:border-ink-dark"
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    Юридическое лицо (ООО)
                  </button>
                </div>
              </div>

              {/* Tax System */}
              <div>
                <label className="block text-[14px] font-semibold text-ink-dark uppercase tracking-wider mb-2">
                  Система налогообложения
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "USN_6", label: "УСН 6%", desc: "Доходы" },
                    { value: "USN_15", label: "УСН 15%", desc: "Дох. минус Расх." },
                    { value: "OSNO", label: "ОСНО", desc: "Общая (с НДС)" },
                  ].map((sys) => (
                    <button
                      key={sys.value}
                      type="button"
                      onClick={() => setTaxSystem(sys.value as any)}
                      className={`p-3 rounded border flex flex-col items-center justify-center transition-all cursor-pointer ${
                        taxSystem === sys.value
                          ? "border-mint-action bg-mint-action/5 text-mint-action font-semibold"
                          : "border-slate-blue/20 text-on-surface-variant hover:border-ink-dark"
                      }`}
                    >
                      <span className="text-[15px] font-bold">{sys.label}</span>
                      <span className="text-[11px] opacity-80 font-normal">{sys.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Operations Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[14px] font-semibold text-ink-dark uppercase tracking-wider">
                    Количество операций в месяц
                  </label>
                  <span className="font-mono text-lg font-bold text-lavender-accent bg-lavender-accent/10 px-2.5 py-0.5 rounded">
                    {operations} {operations >= 100 ? "100+" : ""}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={operations}
                  onChange={(e) => setOperations(Number(e.target.value))}
                  className="w-full h-2 bg-slate-blue/10 rounded-lg appearance-none cursor-pointer accent-mint-action"
                />
                <div className="flex justify-between text-xs text-on-surface-variant mt-1 font-mono">
                  <span>До 10</span>
                  <span>До 50</span>
                  <span>100+</span>
                </div>
              </div>

              {/* Employees Counter */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[14px] font-semibold text-ink-dark uppercase tracking-wider">
                    Штат сотрудников (кадровый учет)
                  </label>
                  <span className="font-mono text-lg font-bold text-lavender-accent bg-lavender-accent/10 px-2.5 py-0.5 rounded">
                    {employees}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="flex-grow h-2 bg-slate-blue/10 rounded-lg appearance-none cursor-pointer accent-mint-action"
                  />
                </div>
                <div className="flex justify-between text-xs text-on-surface-variant mt-1 font-mono">
                  <span>Без сотрудников</span>
                  <span>10 сотр.</span>
                  <span>50 сотр.</span>
                </div>
              </div>
            </div>

            {/* Billing Toggle */}
            <div className="mt-8 pt-6 border-t border-slate-blue/10 flex items-center justify-between">
              <div>
                <span className="font-sans text-[14px] font-semibold text-ink-dark uppercase tracking-wider">Оплата за год вперед</span>
                <p className="text-xs text-on-surface-variant mt-0.5">Экономия 20% при годовой предоплате обслуживания</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAnnualBilling(!isAnnualBilling)}
                className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 pointer-events-auto cursor-pointer ${
                  isAnnualBilling ? "bg-mint-action" : "bg-slate-blue/30"
                }`}
              >
                <div
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                    isAnnualBilling ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Results Side Panel */}
          <div className="lg:col-span-5 bg-ink-dark text-white p-6 md:p-8 rounded flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Calculator className="w-64 h-64 text-white" />
            </div>

            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white rounded-full text-xs font-semibold mb-6">
                <Sparkles className="w-3.5 h-3.5 text-secondary-container" />
                Индивидуальное предложение
              </span>

              <h4 className="font-sans text-xs tracking-widest text-[#8EA3CC] uppercase font-bold mb-1">Рекомендуемый пакет</h4>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="font-headline text-3xl font-bold tracking-tight text-white">{recommendedPlan}</span>
                <span className="text-xs bg-mint-action text-white px-2 py-0.5 rounded uppercase font-semibold tracking-wide">
                  Подходит
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-2.5">
                  <div className="bg-white/10 p-1 rounded mt-0.5">
                    <Check className="w-4 h-4 text-mint-action" />
                  </div>
                  <span className="text-[14px] text-gray-300">
                    {legalForm === "IP" ? "Ведение ИП" : "Ведение ООО"} на {taxSystem === "USN_6" ? "УСН 6% (Доходы)" : taxSystem === "USN_15" ? "УСН 15% (Расходы)" : "ОСНО (Общая система)"}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="bg-white/10 p-1 rounded mt-0.5">
                    <Check className="w-4 h-4 text-mint-action" />
                  </div>
                  <span className="text-[14px] text-gray-300">
                    Обработка до {operations} банковских постингов и первичных доков
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="bg-white/10 p-1 rounded mt-0.5">
                    <Check className="w-4 h-4 text-mint-action" />
                  </div>
                  <span className="text-[14px] text-gray-300">
                    Кадровый учет и выплаты для {employees} {employees === 1 ? 'сотрудника' : 'сотрудников'}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="bg-white/10 p-1 rounded mt-0.5">
                    <Check className="w-4 h-4 text-mint-action" />
                  </div>
                  <span className="text-[14px] text-gray-300">
                    {isAnnualBilling ? "Включена годовая скидка 20%" : "Личный кабинет и online-отчетность в комплекте"}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10">
              <div className="flex justify-between items-baseline mb-6">
                <div>
                  <span className="text-xs text-[#8EA3CC] tracking-wider uppercase font-bold block">Оценочная стоимость</span>
                  <span className="text-xs text-[#8EA3CC]">в пересчете за месяц</span>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-extrabold tracking-tight text-white font-mono">
                    {calculatedPrice.toLocaleString("ru-RU")} ₽
                  </div>
                  <span className="text-[11px] text-[#2AB272] bg-[#2AB272]/15 px-1.5 py-0.5 rounded font-medium mt-1 inline-block">
                    {isAnnualBilling ? "Цена зафиксирована со скидкой" : "НДС не облагается"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSelect}
                className="w-full bg-mint-action hover:bg-mint-action/90 text-white font-sans text-[14px] font-semibold tracking-wider py-4 rounded transition-all duration-200 cursor-pointer active:scale-95 shadow-md flex items-center justify-center gap-2"
              >
                Выбрать этот расчет в заявку
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
