import React, { useState } from "react";
import { FAQ_DATA } from "../data";
import { Plus, Minus, Search, MessageSquare, HelpCircle } from "lucide-react";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const categories = ["Все", "Процесс", "Безопасность", "Интеграции", "Взаимодействие"];

  const filteredFaq = FAQ_DATA.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "Все" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-lavender-accent/10 text-lavender-accent text-[12px] font-semibold uppercase tracking-wider rounded mb-3">
            Ответы на популярные вопросы
          </span>
          <h2 className="font-headline text-3xl md:text-4xl font-semibold text-ink-dark mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="font-sans text-on-surface-variant text-base">
            Не нашли нужный ответ? Воспользуйтесь поиском по базе знаний или обратитесь на горячую линию.
          </p>
        </div>

        {/* Search Bar & Categories */}
        <div className="space-y-6 mb-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по вопросам и ответам (например: страхование, тарифы, 1С)..."
              className="w-full bg-surface border border-slate-blue/20 rounded-md py-3.5 pl-12 pr-4 text-[15px] outline-none transition-all focus:border-lavender-accent focus:bg-white text-ink-dark placeholder:text-gray-400"
            />
          </div>

          {/* Categories selectors */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2 rounded text-[13px] font-medium transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-lavender-accent text-white"
                    : "bg-surface hover:bg-slate-blue/10 text-on-surface-variant"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ list */}
        <div className="border border-slate-blue/15 rounded-lg divide-y divide-slate-blue/15 shadow-sm bg-white overflow-hidden">
          {filteredFaq.length > 0 ? (
            filteredFaq.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="transition-all">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full py-5 px-6 flex justify-between items-center text-left group hover:bg-surface-bright focus:outline-none transition-colors cursor-pointer"
                  >
                    <span className={`font-headline text-base md:text-[17px] font-semibold transition-colors duration-200 ${
                      isOpen ? "text-lavender-accent" : "text-ink-dark group-hover:text-mint-action"
                    }`}>
                      {item.question}
                    </span>
                    <span className="shrink-0 ml-4 p-1 rounded-full bg-slate-blue/10 text-lavender-accent group-hover:bg-lavender-accent group-hover:text-white transition-all duration-200">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-60 opacity-100 border-t border-slate-blue/5 bg-surface/40" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="p-6 text-on-surface-variant font-sans text-[14.5px] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center text-on-surface-variant">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-sans text-base font-medium">Ничего не найдено по вашему запросу</p>
              <p className="text-xs text-gray-400 mt-1">Попробуйте ввести другие ключевые слова или сбросить фильтры.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
