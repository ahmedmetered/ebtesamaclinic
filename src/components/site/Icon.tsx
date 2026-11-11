import { Stethoscope, Sparkles, ShieldCheck, Smile, Star } from "lucide-react";
const map = { stethoscope: Stethoscope, sparkles: Sparkles, shield: ShieldCheck, smile: Smile, star: Star };
export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const C = map[name as keyof typeof map] ?? Smile;
  return <C className={className} aria-hidden />;
}
