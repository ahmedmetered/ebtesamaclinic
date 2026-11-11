import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Clock, MapPin, Phone, Info } from "lucide-react";
import { clinic, services, doctors, faqs, hours, ui } from "@/data/clinic";
import { useI18n } from "@/lib/i18n";
import { ServiceIcon } from "./Icon";

export function Header() {
  const { lang, setLang, t } = useI18n();
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <a href="#top" className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"><ServiceIcon name="smile" className="h-5 w-5" /></span>
          {t(clinic.name)}
        </a>
        <div className="flex rounded-full bg-secondary p-1 text-sm font-medium" role="group" aria-label="Language">
          {(["ar", "en"] as const).map((l) => (
            <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
              className={`rounded-full px-3 py-1 transition-colors ${lang === l ? "bg-primary text-primary-foreground" : "text-foreground"}`}>
              {l === "ar" ? "العربية" : "English"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 bg-accent/40 px-4 py-1.5 text-center text-xs font-medium text-foreground">
        <Info className="h-3.5 w-3.5 shrink-0" aria-hidden /> {t(clinic.demoNote)}
      </div>
    </header>
  );
}

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-12">
      <div className="blob -top-10 -start-16 h-56 w-56 bg-accent/50" />
      <div className="blob top-24 -end-20 h-64 w-64 bg-secondary" style={{ animationDelay: "-5s" }} />
      <div className="blob bottom-0 start-1/3 h-40 w-40 bg-primary/15" style={{ animationDelay: "-9s" }} />
      <div className="relative mx-auto max-w-xl text-center">
        <svg viewBox="0 0 300 60" className="mx-auto mb-4 h-12 w-56 text-primary" aria-hidden>
          <motion.path d="M0 30 H90 L105 10 L120 50 L135 20 L150 40 L162 30 H300" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, ease: "easeInOut" }} />
          <motion.circle cx="230" cy="30" r="5" className="fill-coral" initial={{ scale: 0 }} animate={{ scale: [0, 1.4, 1] }} transition={{ delay: 1.6, duration: 0.5 }} />
        </svg>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-heading text-sm font-semibold text-primary">{t(clinic.name)}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-2 text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">{t(clinic.tagline)}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mx-auto mt-4 max-w-md text-muted-foreground">{t(clinic.heroSub)}</motion.p>
        <motion.a href="#booking" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
          whileTap={{ scale: 0.96 }} className="mt-8 inline-flex rounded-full bg-coral px-8 py-3.5 font-heading text-lg font-bold text-coral-foreground shadow-cta">
          {t(ui.bookCta)}
        </motion.a>
      </div>
    </section>
  );
}

const reveal = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold text-foreground">{title}</h2>
      {sub && <p className="mt-2 text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Services() {
  const { t, price } = useI18n();
  return (
    <section className="relative px-4 py-14">
      <div className="mx-auto max-w-5xl">
        <SectionTitle title={t(ui.servicesTitle)} sub={t(ui.servicesSub)} />
        <motion.ul variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.li key={s.id} variants={reveal} whileHover="bounce" whileTap="bounce" className="card-soft flex gap-4 p-5">
              <motion.span variants={{ bounce: { y: [0, -8, 0], transition: { duration: 0.45 } } }}
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${i % 2 ? "bg-secondary" : "bg-accent/60"} text-primary`}>
                <ServiceIcon name={s.icon} className="h-7 w-7" />
              </motion.span>
              <div>
                <h3 className="text-lg font-bold">{t(s.name)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t(s.desc)}</p>
                <p className="mt-2 text-sm font-semibold text-primary">{t(ui.from)} {price(s.price)}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export const toneClass = { mint: "bg-accent text-accent-foreground", blue: "bg-secondary text-secondary-foreground", coral: "bg-coral text-coral-foreground" };

export function Doctors() {
  const { t, num } = useI18n();
  return (
    <section className="relative overflow-hidden px-4 py-14">
      <div className="blob -end-24 top-10 h-60 w-60 bg-accent/30" />
      <div className="relative mx-auto max-w-5xl">
        <SectionTitle title={t(ui.doctorsTitle)} />
        <motion.ul variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-4 sm:grid-cols-3">
          {doctors.map((d) => (
            <motion.li key={d.id} variants={reveal} whileHover="bounce" whileTap="bounce" className="card-soft p-6 text-center">
              <motion.div variants={{ bounce: { scale: [1, 1.12, 1], transition: { duration: 0.4 } } }}
                className={`mx-auto grid h-20 w-20 place-items-center rounded-full font-heading text-2xl font-bold ${toneClass[d.tone]}`}>{t(d.initials)}</motion.div>
              <h3 className="mt-4 text-lg font-bold">{t(d.name)}</h3>
              <p className="text-sm text-primary">{t(d.specialty)}</p>
              <p className="mt-2 text-sm text-muted-foreground">{num(d.years)} {t(ui.yearsExp)}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-2xl">
        <SectionTitle title={t(ui.faqTitle)} />
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="card-soft overflow-hidden">
                <button className="flex w-full items-center justify-between gap-3 p-4 text-start font-heading font-semibold" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                  {t(f.q)}
                  <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} aria-hidden />
                </button>
                <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }}>
                  <p className="px-4 pb-4 text-muted-foreground">{t(f.a)}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Visit() {
  const { t, lang } = useI18n();
  return (
    <section className="px-4 pb-14">
      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
        <div className="card-soft p-6">
          <h3 className="flex items-center gap-2 text-xl font-bold"><Clock className="h-5 w-5 text-primary" aria-hidden />{t(ui.hoursTitle)}</h3>
          <ul className="mt-4 divide-y divide-border">
            {hours.map((h, i) => (
              <li key={i} className="flex justify-between py-3"><span>{t(h.day)}</span><span className="font-semibold text-primary">{t(h.time)}</span></li>
            ))}
          </ul>
        </div>
        <div className="card-soft overflow-hidden">
          <div className="relative grid h-36 place-items-center overflow-hidden bg-secondary">
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <div className="relative flex flex-col items-center text-sm text-muted-foreground"><MapPin className="h-8 w-8 text-coral" aria-hidden />{t(ui.mapPlaceholder)}</div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold">{t(ui.locationTitle)}</h3>
            <p className="mt-2 text-muted-foreground">{t(clinic.address)}</p>
            <p className="mt-2 flex items-center gap-2 text-sm" dir="ltr"><Phone className="h-4 w-4 text-primary" aria-hidden />{lang === "ar" ? clinic.phone.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]) : clinic.phone}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t, num } = useI18n();
  return (
    <footer className="bg-foreground px-4 py-8 text-center text-sm text-background">
      <p className="font-heading text-lg font-bold">{t(clinic.name)}</p>
      <p className="mt-1 opacity-80">{t(clinic.demoNote)}</p>
      <p className="mt-3 opacity-60">© {num(2026)} — {t(ui.rights)}</p>
    </footer>
  );
}
