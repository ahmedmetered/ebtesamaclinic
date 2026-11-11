export type Lang = "ar" | "en";
export type L = { ar: string; en: string };

export const clinic = {
  name: { ar: "عيادة ابتسامة", en: "Ebtesama Clinic" },
  tagline: { ar: "ابتسامتك تستاهل الأحسن", en: "Your smile deserves the best" },
  heroSub: {
    ar: "رعاية أسنان هادية ومريحة لكل العيلة، بأحدث الأجهزة وإيد خبيرة.",
    en: "Gentle, relaxed dental care for the whole family, with modern equipment and experienced hands.",
  },
  demoNote: {
    ar: "موقع تجريبي — لا يتم حجز مواعيد حقيقية",
    en: "Demo website: no real appointments are booked.",
  },
  address: { ar: "١٢ شارع التحرير، الدقي، الجيزة", en: "12 El Tahrir St, Dokki, Giza" },
  phone: "+20 100 000 0000",
};

export type Service = { id: string; icon: string; name: L; desc: L; price: number };
export const services: Service[] = [
  { id: "checkup", icon: "stethoscope", price: 350, name: { ar: "كشف وتشخيص", en: "Check-up & diagnosis" }, desc: { ar: "فحص شامل وأشعة لو محتاج، وخطة علاج واضحة.", en: "A full exam, X-rays if needed, and a clear treatment plan." } },
  { id: "cleaning", icon: "sparkles", price: 500, name: { ar: "تنظيف الأسنان", en: "Teeth cleaning" }, desc: { ar: "إزالة الجير والتصبغات وتلميع لابتسامة منعشة.", en: "Tartar and stain removal plus polishing for a fresh smile." } },
  { id: "filling", icon: "shield", price: 800, name: { ar: "حشو وعلاج عصب", en: "Fillings & root canals" }, desc: { ar: "علاج من غير ألم بتخدير موضعي وخامات ممتازة.", en: "Pain-free treatment with local anaesthetic and quality materials." } },
  { id: "ortho", icon: "smile", price: 6000, name: { ar: "تقويم", en: "Orthodontics" }, desc: { ar: "تقويم معدني أو شفاف لأسنان منتظمة ومتناسقة.", en: "Metal or clear aligners for straight, even teeth." } },
  { id: "cosmetic", icon: "star", price: 1500, name: { ar: "تجميل الأسنان", en: "Cosmetic dentistry" }, desc: { ar: "تبييض وفينير وابتسامة هوليود على مقاسك.", en: "Whitening, veneers and a smile makeover tailored to you." } },
];

export type Doctor = { id: string; initials: L; name: L; specialty: L; years: number; tone: "mint" | "blue" | "coral" };
export const doctors: Doctor[] = [
  { id: "d1", tone: "mint", years: 12, initials: { ar: "سأ", en: "SA" }, name: { ar: "د. سارة أحمد", en: "Dr. Sara Ahmed" }, specialty: { ar: "تقويم الأسنان", en: "Orthodontist" } },
  { id: "d2", tone: "blue", years: 9, initials: { ar: "كم", en: "KM" }, name: { ar: "د. كريم منصور", en: "Dr. Karim Mansour" }, specialty: { ar: "علاج الجذور والحشو", en: "Endodontics & fillings" } },
  { id: "d3", tone: "coral", years: 7, initials: { ar: "ني", en: "NY" }, name: { ar: "د. نور يوسف", en: "Dr. Nour Youssef" }, specialty: { ar: "تجميل الأسنان", en: "Cosmetic dentist" } },
];

export const timeSlots = ["10:00", "11:00", "12:00", "13:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

export const faqs: { q: L; a: L }[] = [
  { q: { ar: "هل الكشف بيوجع؟", en: "Does the check-up hurt?" }, a: { ar: "خالص! الكشف فحص بسيط، ولو احتجنا أي علاج بنستخدم تخدير موضعي.", en: "Not at all. It's a simple exam, and any treatment uses local anaesthetic." } },
  { q: { ar: "إزاي أأكد الحجز؟", en: "How is my booking confirmed?" }, a: { ar: "بعد ما تبعت الطلب، حد من فريقنا هيكلمك يأكد الميعاد.", en: "Once you send a request, our team will call you to confirm the time." } },
  { q: { ar: "بتقبلوا تأمين؟", en: "Do you accept insurance?" }, a: { ar: "بنتعامل مع أغلب شركات التأمين الكبيرة، اسألنا وقت التأكيد.", en: "We work with most major insurers. Just ask when we call to confirm." } },
  { q: { ar: "ينفع أجيب أطفالي؟", en: "Can I bring my children?" }, a: { ar: "أكيد، عندنا خبرة كبيرة مع الأطفال وجو مريح ليهم.", en: "Of course. We're experienced with kids and keep things calm for them." } },
  { q: { ar: "لو عايز ألغي أو أغير الميعاد؟", en: "What if I need to cancel or reschedule?" }, a: { ar: "كلمنا قبلها بـ ٢٤ ساعة ونرتبلك ميعاد تاني.", en: "Give us a call 24 hours ahead and we'll find you another time." } },
];

export const hours: { day: L; time: L }[] = [
  { day: { ar: "السبت – الخميس", en: "Saturday – Thursday" }, time: { ar: "١٠ ص – ٩ م", en: "10 am – 9 pm" } },
  { day: { ar: "الجمعة", en: "Friday" }, time: { ar: "مغلق", en: "Closed" } },
];

export const ui = {
  bookCta: { ar: "احجز كشف", en: "Book a visit" },
  servicesTitle: { ar: "خدماتنا", en: "Our services" },
  servicesSub: { ar: "كل اللي ابتسامتك محتاجاه في مكان واحد", en: "Everything your smile needs, under one roof" },
  from: { ar: "تبدأ من", en: "From" },
  doctorsTitle: { ar: "دكاترتنا", en: "Meet our dentists" },
  yearsExp: { ar: "سنين خبرة", en: "years of experience" },
  bookingTitle: { ar: "اطلب حجز", en: "Request an appointment" },
  steps: [
    { ar: "الخدمة", en: "Service" },
    { ar: "الدكتور", en: "Dentist" },
    { ar: "الميعاد", en: "Date & time" },
    { ar: "بياناتك", en: "Your details" },
  ],
  pickService: { ar: "اختار الخدمة", en: "Choose a service" },
  pickDoctor: { ar: "اختار الدكتور", en: "Choose a dentist" },
  pickDate: { ar: "اختار اليوم", en: "Pick a day" },
  pickTime: { ar: "اختار الساعة", en: "Pick a time" },
  closedFriday: { ar: "الجمعة إجازة", en: "Closed on Fridays" },
  next: { ar: "التالي", en: "Next" },
  back: { ar: "رجوع", en: "Back" },
  submit: { ar: "ابعت الطلب", en: "Send request" },
  name: { ar: "الاسم", en: "Full name" },
  phone: { ar: "رقم الموبايل", en: "Mobile number" },
  patientType: { ar: "نوع الزيارة", en: "Visit type" },
  newPatient: { ar: "أول مرة", en: "New patient" },
  returning: { ar: "زرتنا قبل كده", en: "Returning patient" },
  note: { ar: "ملاحظة (اختياري)", en: "Note (optional)" },
  medicalWarning: { ar: "من فضلك ما تكتبش أي تفاصيل طبية هنا، هنسألك عنها في العيادة.", en: "Please don't enter medical details here. We'll ask about them at the clinic." },
  summary: { ar: "ملخص الطلب", en: "Request summary" },
  errName: { ar: "اكتب اسمك من فضلك", en: "Please enter your name" },
  errPhone: { ar: "اكتب رقم موبايل مصري صحيح (١١ رقم)", en: "Enter a valid Egyptian mobile number (11 digits)" },
  successTitle: { ar: "وصلنا طلبك، هنكلمك نأكد الموعد", en: "We've got your request and will call you to confirm" },
  successSub: { ar: "شكراً إنك اخترت عيادة ابتسامة.", en: "Thanks for choosing Ebtesama Clinic." },
  newBooking: { ar: "طلب جديد", en: "New request" },
  faqTitle: { ar: "أسئلة بتتكرر", en: "Frequently asked questions" },
  hoursTitle: { ar: "مواعيد العمل", en: "Opening hours" },
  locationTitle: { ar: "مكاننا", en: "Find us" },
  mapPlaceholder: { ar: "الخريطة هتظهر هنا", en: "Map coming soon" },
  rights: { ar: "كل الحقوق محفوظة", en: "All rights reserved" },
};
