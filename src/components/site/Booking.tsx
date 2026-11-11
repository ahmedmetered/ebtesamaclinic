import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useHydrated } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ShieldAlert } from "lucide-react";
import { doctors, services, timeSlots, ui } from "@/data/clinic";
import { digits, useI18n } from "@/lib/i18n";
import { ServiceIcon } from "./Icon";
import { toneClass } from "./Sections";

const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
function slotUnavailable(date: Date, slot: string, doctorId: string) {
  const s = dayKey(date) + slot + doctorId;
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 3 === 0;
}

export function Booking() {
  const { t, lang, dir, price, num } = useI18n();
  const hydrated = useHydrated();
  const [step, setStep] = useState(0);
  const [movement, setMovement] = useState(1);
  const [serviceId, setServiceId] = useState<string>();
  const [doctorId, setDoctorId] = useState<string>();
  const [date, setDate] = useState<Date>();
  const [slot, setSlot] = useState<string>();
  const [form, setForm] = useState({ name: "", phone: "", type: "new", note: "" });
  const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean }>({});
  const [done, setDone] = useState(false);
  const loc = lang === "ar" ? "ar-EG" : "en-US";

  const days = useMemo(() => {
    if (!hydrated) return [];
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return Array.from({ length: 30 }, (_, i) => { const d = new Date(today); d.setDate(today.getDate() + i + 1); return d; });
  }, [hydrated]);

  const service = services.find((s) => s.id === serviceId);
  const doctor = doctors.find((d) => d.id === doctorId);
  const canNext = [!!service, !!doctor, !!date && !!slot, true][step];

  const go = (n: number) => { setMovement(n > step ? 1 : -1); setStep(n); };
  // forward = slides in from the reading-direction end
  const sign = dir === "rtl" ? -1 : 1;
  const variants = {
    enter: (m: number) => ({ x: 60 * m * sign, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (m: number) => ({ x: -60 * m * sign, opacity: 0 }),
  };

  const submit = () => {
    const phoneOk = /^01[0125]\d{8}$/.test(form.phone.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d))).replace(/\s/g, ""));
    const e = { name: form.name.trim().length < 2, phone: !phoneOk };
    setErrors(e);
    if (!e.name && !e.phone) setDone(true);
  };
  const reset = () => { setDone(false); setStep(0); setServiceId(undefined); setDoctorId(undefined); setDate(undefined); setSlot(undefined); setForm({ name: "", phone: "", type: "new", note: "" }); setErrors({}); };

  const fmtDate = (d: Date) => d.toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "long" });
  const Prev = dir === "rtl" ? ChevronRight : ChevronLeft;
  const Next = dir === "rtl" ? ChevronLeft : ChevronRight;

  // calendar grid: pad to week start (Saturday) — Egyptian week
  const lead = days.length ? (days[0]!.getDay() + 1) % 7 : 0;
  const weekdays = Array.from({ length: 7 }, (_, i) => new Date(2024, 0, 6 + i).toLocaleDateString(loc, { weekday: "short" }));

  return (
    <section id="booking" className="relative overflow-hidden px-4 py-14">
      <div className="blob -start-20 top-20 h-64 w-64 bg-secondary" />
      <div className="relative mx-auto max-w-xl">
        <h2 className="mb-6 text-center text-3xl font-bold">{t(ui.bookingTitle)}</h2>
        <div className="card-soft p-5">
          {done ? (
            <div className="py-8 text-center">
              <svg viewBox="0 0 80 80" className="mx-auto h-24 w-24" aria-hidden>
                <motion.circle cx="40" cy="40" r="34" fill="none" className="stroke-accent" strokeWidth="5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
                <motion.path d="M25 41 L36 52 L56 30" fill="none" className="stroke-primary" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.5 }} />
              </svg>
              <h3 className="mt-4 text-2xl font-bold">{t(ui.successTitle)}</h3>
              <p className="mt-2 text-muted-foreground">{t(ui.successSub)}</p>
              <button onClick={reset} className="mt-6 rounded-full border border-primary px-6 py-2 font-semibold text-primary">{t(ui.newBooking)}</button>
            </div>
          ) : (
            <>
              <ol className="mb-6 grid grid-cols-4 gap-2">
                {ui.steps.map((s, i) => (
                  <li key={i} className="text-center">
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <motion.div className="h-full rounded-full bg-primary" initial={false} animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.4 }} />
                    </div>
                    <span className={`mt-1.5 block text-xs ${i === step ? "font-bold text-primary" : "text-muted-foreground"}`}>{num(i + 1)}. {t(s)}</span>
                  </li>
                ))}
              </ol>
              <div className="relative min-h-[22rem] overflow-hidden">
                <AnimatePresence mode="wait" custom={movement} initial={false}>
                  <motion.div key={step + lang} custom={movement} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    {step === 0 && (
                      <div>
                        <h3 className="mb-3 font-bold">{t(ui.pickService)}</h3>
                        <div className="space-y-2">
                          {services.map((s) => (
                            <button key={s.id} onClick={() => setServiceId(s.id)} aria-pressed={serviceId === s.id}
                              className={`flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-start transition-colors ${serviceId === s.id ? "border-primary bg-primary/5" : "border-border"}`}>
                              <ServiceIcon name={s.icon} className="h-6 w-6 text-primary" />
                              <span className="flex-1 font-medium">{t(s.name)}</span>
                              <span className="text-sm text-muted-foreground">{price(s.price)}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {step === 1 && (
                      <div>
                        <h3 className="mb-3 font-bold">{t(ui.pickDoctor)}</h3>
                        <div className="space-y-2">
                          {doctors.map((d) => (
                            <button key={d.id} onClick={() => { setDoctorId(d.id); setSlot(undefined); }} aria-pressed={doctorId === d.id}
                              className={`flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-start transition-colors ${doctorId === d.id ? "border-primary bg-primary/5" : "border-border"}`}>
                              <span className={`grid h-11 w-11 place-items-center rounded-full font-heading font-bold ${toneClass[d.tone]}`}>{t(d.initials)}</span>
                              <span><span className="block font-medium">{t(d.name)}</span><span className="text-sm text-muted-foreground">{t(d.specialty)}</span></span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {step === 2 && (
                      <div>
                        <h3 className="mb-3 font-bold">{t(ui.pickDate)}</h3>
                        <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
                          {weekdays.map((w) => <span key={w} className="py-1">{w}</span>)}
                          {Array.from({ length: lead }, (_, i) => <span key={"p" + i} />)}
                          {days.map((d) => {
                            const closed = d.getDay() === 5;
                            const sel = date && dayKey(d) === dayKey(date);
                            const showMonth = d.getDate() === 1 || d === days[0];
                            return (
                              <motion.button key={dayKey(d)} disabled={closed} onClick={() => { setDate(d); setSlot(undefined); }}
                                animate={{ scale: sel ? 1.12 : 1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                title={closed ? t(ui.closedFriday) : fmtDate(d)} aria-pressed={!!sel}
                                className={`relative aspect-square rounded-xl text-sm font-medium ${sel ? "bg-primary text-primary-foreground ring-4 ring-primary/25" : closed ? "text-muted-foreground/40 line-through" : "bg-muted text-foreground"}`}>
                                {d.toLocaleDateString(loc, { day: "numeric" })}
                                {showMonth && <span className="absolute inset-x-0 -bottom-0.5 text-[9px] leading-none opacity-70">{d.toLocaleDateString(loc, { month: "short" })}</span>}
                              </motion.button>
                            );
                          })}
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">{t(ui.closedFriday)}</p>
                        {date && (
                          <div className="mt-4">
                            <h3 className="mb-2 font-bold">{t(ui.pickTime)} — <span className="font-normal text-muted-foreground">{fmtDate(date)}</span></h3>
                            <div className="flex flex-wrap gap-2">
                              {timeSlots.map((s) => {
                                const off = slotUnavailable(date, s, doctorId ?? "");
                                const sel = slot === s;
                                return (
                                  <motion.button key={s} disabled={off} onClick={() => setSlot(s)} animate={sel ? { scale: [1, 1.18, 1] } : { scale: 1 }} transition={{ duration: 0.3 }}
                                    className={`rounded-full border px-4 py-1.5 text-sm ${sel ? "border-primary bg-primary text-primary-foreground" : off ? "cursor-not-allowed border-border bg-muted text-muted-foreground/50 line-through" : "border-primary/40 text-foreground"}`}>
                                    <span dir="ltr">{digits(s, lang)}</span>
                                  </motion.button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {step === 3 && (
                      <div className="space-y-4">
                        <p className="flex gap-2 rounded-2xl bg-coral/10 p-3 text-sm text-foreground"><ShieldAlert className="h-5 w-5 shrink-0 text-coral" aria-hidden />{t(ui.medicalWarning)}</p>
                        <label className="block">
                          <span className="mb-1 block text-sm font-medium">{t(ui.name)}</span>
                          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-input bg-background px-3 py-2.5 outline-none focus:ring-2 focus:ring-ring" />
                          {errors.name && <span className="mt-1 block text-sm text-destructive">{t(ui.errName)}</span>}
                        </label>
                        <label className="block">
                          <span className="mb-1 block text-sm font-medium">{t(ui.phone)}</span>
                          <input type="tel" inputMode="tel" dir="ltr" placeholder={digits("01xxxxxxxxx", lang)} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-start outline-none focus:ring-2 focus:ring-ring" />
                          {errors.phone && <span className="mt-1 block text-sm text-destructive">{t(ui.errPhone)}</span>}
                        </label>
                        <fieldset>
                          <legend className="mb-1 text-sm font-medium">{t(ui.patientType)}</legend>
                          <div className="grid grid-cols-2 gap-2">
                            {(["new", "returning"] as const).map((v) => (
                              <button key={v} type="button" onClick={() => setForm({ ...form, type: v })} aria-pressed={form.type === v}
                                className={`rounded-xl border-2 py-2 text-sm font-medium ${form.type === v ? "border-primary bg-primary/5 text-primary" : "border-border"}`}>
                                {t(v === "new" ? ui.newPatient : ui.returning)}
                              </button>
                            ))}
                          </div>
                        </fieldset>
                        <label className="block">
                          <span className="mb-1 block text-sm font-medium">{t(ui.note)}</span>
                          <textarea rows={2} maxLength={300} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="w-full rounded-xl border border-input bg-background px-3 py-2.5 outline-none focus:ring-2 focus:ring-ring" />
                        </label>
                        <div className="rounded-2xl bg-secondary p-4 text-sm">
                          <h4 className="mb-2 font-bold">{t(ui.summary)}</h4>
                          <dl className="space-y-1">
                            <div className="flex justify-between gap-2"><dt className="text-muted-foreground">{t(ui.steps[0]!)}</dt><dd className="font-medium">{service && `${t(service.name)} · ${price(service.price)}`}</dd></div>
                            <div className="flex justify-between gap-2"><dt className="text-muted-foreground">{t(ui.steps[1]!)}</dt><dd className="font-medium">{doctor && t(doctor.name)}</dd></div>
                            <div className="flex justify-between gap-2"><dt className="text-muted-foreground">{t(ui.steps[2]!)}</dt><dd className="font-medium">{date && fmtDate(date)} · <span dir="ltr">{slot && digits(slot, lang)}</span></dd></div>
                          </dl>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <button onClick={() => go(step - 1)} disabled={step === 0} className="flex items-center gap-1 rounded-full px-4 py-2.5 font-medium text-foreground disabled:invisible">
                  <Prev className="h-4 w-4" aria-hidden />{t(ui.back)}
                </button>
                {step < 3 ? (
                  <button onClick={() => go(step + 1)} disabled={!canNext} className="flex items-center gap-1 rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground transition-opacity disabled:opacity-40">
                    {t(ui.next)}<Next className="h-4 w-4" aria-hidden />
                  </button>
                ) : (
                  <motion.button whileTap={{ scale: 0.95 }} onClick={submit} className="rounded-full bg-coral px-7 py-2.5 font-heading font-bold text-coral-foreground shadow-cta">{t(ui.submit)}</motion.button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
