import React, { useState } from "react";
import { APPROACH_STEPS } from "../data";
import { CheckCircle2, User, Clock, HelpCircle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function ApproachStepper() {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section className="py-20 bg-white" id="approach">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-lavender-accent/10 text-lavender-accent text-[12px] font-semibold uppercase tracking-wider rounded mb-3">
            Прозрачный процесс перехода
          </span>
          <h2 className="font-headline text-3xl md:text-4xl font-semibold text-ink-dark mb-4">
            Наш подход
          </h2>
          <p className="font-sans text-on-surface-variant text-lg">
            Простой и безопасный переход на аутсорсинг за 4 простых шага.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto"
        >
          {/* Interactive Steps List */}
          <div className="lg:col-span-5 space-y-4">
            {APPROACH_STEPS.map((step) => {
              const isSelected = activeStep === step.id;
              return (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  whileHover={{ scale: 1.015, x: isSelected ? 8 : 4 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className={`w-full text-left p-5 rounded border cursor-pointer flex gap-4 ${
                    isSelected
                      ? "border-lavender-accent bg-lavender-accent/[0.03] shadow-md"
                      : "border-slate-blue/15 bg-white"
                  }`}
                >
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      isSelected
                        ? "bg-lavender-accent text-white"
                        : "bg-surface-container text-ink-dark"
                    }`}
                  >
                    {step.id}
                  </span>
                  <div>
                    <h3
                      className={`font-headline text-lg font-bold transition-colors ${
                        isSelected ? "text-lavender-accent" : "text-ink-dark"
                      }`}
                    >
                      {step.id < 10 ? `0${step.id}` : step.id} {step.title}
                    </h3>
                    <p className="text-[13px] text-on-surface-variant mt-1.5 line-clamp-2">
                      {step.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Stepper Details Card */}
          <div className="lg:col-span-7 bg-surface p-6 md:p-8 rounded border border-slate-blue/20 overflow-hidden">
            {APPROACH_STEPS.map((step) => {
              if (step.id !== activeStep) return null;
              return (
                <motion.div 
                  key={step.id} 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center pb-4 border-b border-slate-blue/15">
                    <div>
                      <span className="text-[11px] font-bold text-lavender-accent uppercase tracking-widest font-mono">
                        ШАГ 0{step.id} ИЗ 04
                      </span>
                      <h4 className="font-headline text-2xl font-bold text-ink-dark mt-1">
                        {step.title}
                      </h4>
                    </div>
                    <span className="text-4xl text-slate-blue/20 font-bold font-mono">
                      0{step.id}
                    </span>
                  </div>

                  <p className="text-on-surface-variant font-sans text-[15px] leading-relaxed">
                    {step.description}
                  </p>

                  <div className="bg-white p-5 rounded border border-slate-blue/10">
                    <h5 className="font-sans text-[13px] font-bold text-ink-dark uppercase tracking-wider mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-mint-action" />
                      Чек-лист выполняемых работ на этом этапе:
                    </h5>
                    <ul className="space-y-3.5">
                      {step.detailedItems.map((item, idx) => (
                        <li key={idx} className="flex gap-3 text-[14px] text-on-surface-variant">
                          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-lavender-accent mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Onboarding guarantee badge */}
                  <div className="flex items-center gap-4 bg-mint-action/5 border border-mint-action/20 p-4 rounded text-xs text-on-secondary-container">
                    <Clock className="w-8 h-8 text-mint-action shrink-0" />
                    <div>
                      <span className="font-bold uppercase tracking-wider">Гарантия соблюдения сроков:</span>
                      <p className="mt-0.5">
                        Все этапы регламентированы. Интеграция выполняется без вреда прерывания текущих оплат и контрагентов.
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
