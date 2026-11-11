import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { L, Lang } from "@/data/clinic";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (v: L) => string; num: (n: number) => string; price: (n: number) => string; dir: "rtl" | "ltr" };
const I18n = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");
  useEffect(() => {
    const s = localStorage.getItem("lang");
    if (s === "en" || s === "ar") setLangState(s);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem("lang", l); };
  const loc = lang === "ar" ? "ar-EG" : "en-US";
  const num = (n: number) => n.toLocaleString(loc, { useGrouping: n >= 10000 });
  const price = (n: number) => (lang === "ar" ? `${n.toLocaleString("ar-EG")} ج.م` : `EGP ${n.toLocaleString("en-US")}`);
  return (
    <I18n.Provider value={{ lang, setLang, t: (v) => v[lang], num, price, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </I18n.Provider>
  );
}

export function useI18n() {
  const c = useContext(I18n);
  if (!c) throw new Error("I18nProvider missing");
  return c;
}

/** Convert Western digits in a string to Eastern Arabic when in Arabic. */
export function digits(s: string, lang: Lang) {
  return lang === "ar" ? s.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d] ?? d) : s;
}
