import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { I18nProvider } from "@/lib/i18n";
import { Header, Hero, Services, Doctors, Faq, Visit, Footer } from "@/components/site/Sections";
import { Booking } from "@/components/site/Booking";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "عيادة ابتسامة | Ebtesama Dental Clinic" },
      { name: "description", content: "عيادة أسنان في الجيزة: كشف، تنظيف، حشو، تقويم وتجميل. اطلب ميعادك أونلاين. A friendly dental clinic in Giza." },
      { property: "og:title", content: "عيادة ابتسامة | Ebtesama Dental Clinic" },
      { property: "og:description", content: "ابتسامتك تستاهل الأحسن — Your smile deserves the best." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <I18nProvider>
      <MotionConfig reducedMotion="user">
        <Header />
        <main>
          <Hero />
          <Services />
          <Doctors />
          <Booking />
          <Faq />
          <Visit />
        </main>
        <Footer />
      </MotionConfig>
    </I18nProvider>
  );
}
