import React, { useState, useEffect, useRef } from "react";
import { Send, X, MessageSquare, Bot, HelpCircle, Check, ArrowRight, User } from "lucide-react";

interface TelegramConsultantProps {
  onSelectTariff: (tariff: string) => void;
}

export default function TelegramConsultant({ onSelectTariff }: TelegramConsultantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string; time: string }>>([
    {
      sender: "bot",
      text: "Здравствуйте! Меня зовут Анна, я ведущий финансовый эксперт АудитУчетНалоги. Чем я могу помочь вам сегодня?",
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const quickReplies = [
    { text: "Сколько стоят ваши услуги?", action: "price" },
    { text: "Как быстро начнется учет?", action: "timing" },
    { text: "Какая страховка у вас?", action: "insurance" },
    { text: "Подобрать оптимальный тариф", action: "recommend" },
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userTime = new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { sender: "user", text, time: userTime }]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "Простите, я изучаю этот вопрос. Наш специалист свяжется с вами для подробного ответа. Рекомендуем заполнить форму аудита на сайте для мгновенного бесплатного расчета!";
      const query = text.toLowerCase();

      if (query.includes("стоим") || query.includes("цен") || query.includes("тариф") || query.includes("скольк")) {
        replyText = "Стоимость обслуживания начинается от 15,000 ₽ / мес для тарифа 'Старт' (до 10 операций). Популярный тариф 'Оптимальный' стоит 35,000 ₽ / мес (до 50 операций) и включает оптимизацию. Мы можем сделать для вас индивидуальный расчет!";
      } else if (query.includes("быстр") || query.includes("когд") || query.includes("нача")) {
        replyText = "Мы принимаем дела в среднем за 3 - 5 рабочих дней. При этом полностью исключаем прерывание ваших кассовых или контрагентских операций.";
      } else if (query.includes("страх") || query.includes("ответст") || query.includes("штраф")) {
        replyText = "Наша компания полностью страхует профессиональные риски на 10 млн рублей. Любые избыточные пени или претензии ФНС по нашей вине компенсируются страховым полисом.";
      } else if (query.includes("привет") || query.includes("здравст") || query.includes("добры")) {
        replyText = "Рада вас приветствовать! Интересует ли вас перевод бухгалтерии на аутсоринг или аудит текущей отчетности?";
      } else if (query.includes("оптимал") || query.includes("подобр")) {
        replyText = "Для большинства растущих компаний подходит тариф 'Оптимальный'. Давайте мы поможем настроить его под ваши обороты. Оставьте ваши контакты в форме внизу, и мы позвоним вам!";
      }

      const botTime = new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => [...prev, { sender: "bot", text: replyText, time: botTime }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-lavender-accent text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center justify-center cursor-pointer group hover:bg-lavender-accent/90"
        >
          <MessageSquare className="w-6 h-6 animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-semibold text-xs whitespace-nowrap pl-0 group-hover:pl-2">
            Чат с экспертом
          </span>
          <span className="absolute top-0 right-0 w-3 h-3 bg-mint-action rounded-full border-2 border-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl border border-slate-blue/25 w-80 sm:w-96 overflow-hidden flex flex-col justify-between h-[480px] animate-scale-up">
          {/* Header */}
          <div className="bg-ink-dark text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-lavender-accent rounded-full flex items-center justify-center font-bold text-white text-sm">
                  АН
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-mint-action rounded-full border-2 border-indigo-950" />
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight">Анна Новоселова</h4>
                <span className="text-[11px] text-gray-400">АудитУчетНалоги • Консультант online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Grid */}
          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-50 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-lavender-accent text-white rounded-tr-none"
                      : "bg-white text-ink-dark border border-slate-blue/15 rounded-tl-none shadow-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[10px] text-gray-400 mt-1 font-mono">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1 bg-white border border-slate-blue/10 p-3 rounded-lg rounded-tl-none w-20 max-w-sm">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-300" />
              </div>
            )}
          </div>

          {/* Footer & Typing */}
          <div className="p-3 bg-white border-t border-slate-blue/15 space-y-3">
            {/* Quick replies */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none select-none">
              {quickReplies.map((qr) => (
                <button
                  key={qr.text}
                  onClick={() => handleSendMessage(qr.text)}
                  className="shrink-0 bg-surface hover:bg-lavender-accent/10 border border-slate-blue/15 hover:border-lavender-accent text-[11px] text-on-surface-variant hover:text-lavender-accent px-3 py-1.5 rounded-full transition cursor-pointer font-medium"
                >
                  {qr.text}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Задать свой вопрос в бухгалтерию..."
                className="flex-grow bg-surface border border-slate-blue/20 rounded px-3 py-2 text-xs text-ink-dark outline-none focus:border-lavender-accent focus:bg-white"
              />
              <button
                type="submit"
                className="bg-lavender-accent hover:bg-lavender-accent/90 text-white p-2 rounded flex items-center justify-center cursor-pointer active:scale-95 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
