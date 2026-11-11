import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Clock, MapPin, Phone, Info } from "lucide-react";
import { clinic, services, doctors, faqs, hours, ui } from "@/data/clinic";
import { useI18n } from "@/lib/i18n";
import { ServiceIcon } from "./Icon";
import { WinkingTooth, Toothbrush, HandMirror } from "./Art";

export function Header() {
  const { lang, setLang, t } = useI18n();
  return (
    <header className="sticky top-0 z-30 border-b-2 border-ink bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <a href="#top" className="flex items-center gap-2 font-heading text-lg font-black text-foreground">
          <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-yellow"><WinkingTooth className="h-7 w-7" /></span>
          {t(clinic.name)}
        </a>
        <div className="ink-box flex rounded-full bg-card p-1 text-sm font-bold" role="group" aria-label="Language">
          {(["ar", "en"] as const).map((l) => (
            <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
              className={`rounded-full px-3 py-1 transition-colors ${lang === l ? "bg-yellow text-foreground ring-2 ring-ink" : "text-foreground"}`}>
              {l === "ar" ? "العربية" : "English"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 border-t-2 border-ink bg-mint px-4 py-1.5 text-center text-xs font-medium text-foreground">
        <Info className="h-3.5 w-3.5 shrink-0" aria-hidden /> {t(clinic.demoNote)}
      </div>
    </header>
  );
}

export function Hero() {
  const { t, lang } = useI18n();
  const reduce = useReducedMotion();
  const words = t(clinic.tagline).split(" ");
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-10">
      <div className="relative mx-auto max-w-xl text-center">
        <div className="mx-auto mb-4 flex items-end justify-center gap-2">
          <Toothbrush className="h-24 w-10 -rotate-12" />
          <motion.div initial={{ scale: reduce ? 1 : 0.6, rotate: 0 }} animate={{ scale: 1, rotate: reduce ? 0 : [0, -6, 4, 0] }} transition={{ duration: 0.8 }}>
            <WinkingTooth className="h-32 w-32" />
          </motion.div>
          <HandMirror className="h-24 w-14 rotate-12" />
        </div>
        <p className="inline-block -rotate-2 rounded-md border-2 border-ink bg-mint px-3 py-0.5 font-heading text-sm font-black">{t(clinic.name)}</p>
        <h1 key={lang} className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
          {words.map((w, i) => (
            <span key={i} className={`relative inline-block ${i < words.length - 1 ? "me-[0.3em]" : ""}`}>
              <motion.span className="inline-block" initial={reduce ? false : { scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 14, delay: 0.1 + i * 0.12 }}>{w}</motion.span>
              {i === words.length - 1 && (
                <svg viewBox="0 0 100 12" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-2 h-3 w-full" aria-hidden>
                  <motion.path d="M2 8 Q30 2 52 7 T98 5" fill="none" stroke="var(--yellow)" strokeWidth="6" strokeLinecap="round"
                    initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 + words.length * 0.12, duration: 0.6 }} />
                </svg>
              )}
            </span>
          ))}
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted-foreground">{t(clinic.heroSub)}</p>
        <a href="#booking" className="ink-box press mt-8 inline-flex rounded-full bg-yellow px-8 py-3.5 font-heading text-lg font-black text-ink">
          {t(ui.bookCta)}
        </a>
      </div>
    </section>
  );
}

const reveal = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-black text-foreground">{title}</h2>
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
            <motion.li key={s.id} variants={reveal} whileHover="bounce" whileTap="bounce" className={`card-soft flex gap-4 p-5 ${i % 2 ? "tilt-r" : "tilt-l"}`}>
              <motion.span variants={{ bounce: { y: [0, -8, 0], transition: { duration: 0.45 } } }}
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-2 border-ink ${i % 2 ? "bg-yellow" : "bg-mint"} text-ink`}>
                <ServiceIcon name={s.icon} className="h-7 w-7" />
              </motion.span>
              <div>
                <h3 className="text-lg font-bold">{t(s.name)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t(s.desc)}</p>
                <p className="mt-2 inline-block rounded-md border-2 border-ink bg-yellow px-2 text-sm font-bold">{t(ui.from)} {price(s.price)}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export const toneClass = { mint: "bg-mint text-ink", blue: "bg-yellow text-ink", coral: "bg-card text-ink" };

export function Doctors() {
  const { t, num } = useI18n();
  return (
    <section className="relative overflow-hidden px-4 py-14">
            <div className="relative mx-auto max-w-5xl">
        <SectionTitle title={t(ui.doctorsTitle)} />
        <motion.ul variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-4 sm:grid-cols-3">
          {doctors.map((d, i) => (
            <motion.li key={d.id} variants={reveal} whileHover="bounce" whileTap="bounce" className={`card-soft p-6 text-center ${i % 2 ? "tilt-r" : "tilt-l"}`}>
              <motion.div variants={{ bounce: { scale: [1, 1.12, 1], transition: { duration: 0.4 } } }}
                className={`mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-ink font-heading text-2xl font-black ${toneClass[d.tone]}`}>{t(d.initials)}</motion.div>
              <h3 className="mt-4 text-lg font-bold">{t(d.name)}</h3>
              <p className="text-sm font-bold text-primary">{t(d.specialty)}</p>
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
        <div className="card-soft tilt-l p-6">
          <h3 className="flex items-center gap-2 text-xl font-bold"><Clock className="h-5 w-5 text-primary" aria-hidden />{t(ui.hoursTitle)}</h3>
          <ul className="mt-4 divide-y-2 divide-dashed divide-ink">
            {hours.map((h, i) => (
              <li key={i} className="flex justify-between py-3"><span>{t(h.day)}</span><span className="font-semibold text-primary">{t(h.time)}</span></li>
            ))}
          </ul>
        </div>
        <div className="card-soft tilt-r overflow-hidden">
          <div className="relative grid h-36 place-items-center overflow-hidden border-b-2 border-ink bg-mint">
                        <div className="relative flex flex-col items-center text-sm text-muted-foreground"><MapPin className="h-8 w-8 text-ink" aria-hidden />{t(ui.mapPlaceholder)}</div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold">{t(ui.locationTitle)}</h3>
            <p className="mt-2 text-muted-foreground">{t(clinic.address)}</p>
            <p className="mt-2 flex items-center gap-2 text-sm" dir="ltr"><Phone className="h-4 w-4 text-primary" aria-hidden />{lang === "ar" ? clinic.phone.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d] ?? d) : clinic.phone}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t, num } = useI18n();
  return (
    <footer className="border-t-2 border-ink bg-ink px-4 py-8 text-center text-sm text-paper">
      <p className="font-heading text-lg font-bold">{t(clinic.name)}</p>
      <p className="mt-1 opacity-80">{t(clinic.demoNote)}</p>
      <p className="mt-3 opacity-60">© {num(2026)} — {t(ui.rights)}</p>
    </footer>
  );
}
