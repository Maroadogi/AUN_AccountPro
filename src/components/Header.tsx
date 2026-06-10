import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, UserCheck } from "lucide-react";
import { motion } from "motion/react";
import Logo from "./Logo";

interface HeaderProps {
  onOpenConsultation: () => void;
}

export default function Header({ onOpenConsultation }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navigationItems = [
    { label: "Услуги", href: "#services" },
    { label: "Наш подход", href: "#approach" },
    { label: "FAQ", href: "#faq" },
    { label: "Калькулятор", href: "#calculator" },
    { label: "Контакты", href: "#contacts" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Scroll Spy
      const sections = ["services", "approach", "faq", "calculator", "contacts"];
      const currentScroll = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (currentScroll >= top && currentScroll < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 88; // header height + padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 shadow-md py-4 border-b border-slate-blue/15"
            : "bg-white/80 py-6 border-b border-slate-blue/10"
        } backdrop-blur-xl`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Logo />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-sans text-[14px] font-medium tracking-wide transition-colors duration-200 relative py-1 ${
                  activeSection === item.href.replace("#", "")
                    ? "text-lavender-accent"
                    : "text-on-surface-variant hover:text-mint-action"
                }`}
              >
                {item.label}
                {activeSection === item.href.replace("#", "") && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-lavender-accent rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Action button */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              onClick={onOpenConsultation}
              whileHover={{ scale: 1.04, y: -1, boxShadow: "0 10px 15px -3px rgba(42, 178, 114, 0.2)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 450, damping: 15 }}
              className="bg-mint-action text-white px-6 py-3 font-sans text-[14px] font-semibold tracking-wider rounded shadow-sm inline-flex items-center gap-2 cursor-pointer"
            >
              Получить консультацию
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-ink-dark p-2 hover:bg-surface rounded transition"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[70px] bg-white z-40 md:hidden flex flex-col justify-between py-8 px-6 animate-fade-in border-t border-slate-blue/15 shadow-2xl">
          <div className="flex flex-col gap-6">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-headline text-xl font-semibold tracking-wide py-2 border-b border-slate-blue/10 ${
                  activeSection === item.href.replace("#", "")
                    ? "text-lavender-accent pl-2 border-l-4 border-l-lavender-accent"
                    : "text-ink-dark hover:text-mint-action"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full bg-mint-action text-white text-center py-4 font-semibold rounded tracking-wider shadow-md hover:bg-mint-action/90"
            >
              Получить консультацию
            </button>
          </div>
        </div>
      )}
    </>
  );
}
