"use client";

import { useState, useMemo, useCallback, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionDivider } from "@/components/shared/section-divider";
import { FrenchText } from "@/components/shared/french-text";
import { SectionBlobs } from "@/components/ui/section-blobs";
import { useSectionBlobs } from "@/hooks/use-section-blobs";
import { LineMaskReveal, LineMaskLine } from "@/components/shared/line-mask-reveal";
import { ClipPathReveal } from "@/components/shared/clip-path-reveal";
import { ParallaxImage } from "@/components/shared/parallax-image";
import { WineIcon } from "@/components/ui/wine-icon";
import {
  Clock, Users, Check, ChevronLeft, ChevronRight,
  User, Mail, Phone, MessageSquare, ArrowRight,
  Minus, Plus, Shield, Star, MapPin, Calendar,
} from "lucide-react";
import { experiences, generateTimeSlots } from "@/lib/data/experiences";

type Step = "choose" | "schedule" | "book" | "confirmed";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

/* Mobile step transitions — horizontal swipe feel */
const mobileStepVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 60 : -60,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: LUXURY_EASE },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -40 : 40,
    transition: { duration: 0.25, ease: LUXURY_EASE },
  }),
};

/* ═══════════════════════════════════════════
   Calendar helpers
   ═══════════════════════════════════════════ */
function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = Array.from({ length: firstDay }, () => null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

function formatDateISO(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatDateDisplay(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

function formatDateShort(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/* ═══════════════════════════════════════════
   Wrapper with Suspense
   ═══════════════════════════════════════════ */
export default function ExperiencesPageWrapper() {
  return (
    <Suspense>
      <ExperiencesPage />
    </Suspense>
  );
}

/* ═══════════════════════════════════════════
   Main page component
   ═══════════════════════════════════════════ */
function ExperiencesPage() {
  const searchParams = useSearchParams();
  const preselect = searchParams.get("select");

  const [step, setStep] = useState<Step>(preselect ? "schedule" : "choose");
  const [stepDir, setStepDir] = useState(1); // 1 = forward, -1 = back
  const [selectedExp, setSelectedExp] = useState(
    preselect ? experiences.find((e) => e.id === preselect) ?? null : null
  );
  const [guests, setGuests] = useState(2);

  // Calendar
  const today = useMemo(() => new Date(), []);
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  // Form
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  // Refs for scroll anchoring
  const timeSlotsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { sectionRef, isVisible } = useSectionBlobs();

  const todayISO = useMemo(
    () => formatDateISO(today.getFullYear(), today.getMonth(), today.getDate()),
    [today]
  );

  const slots = useMemo(() => (selectedDate ? generateTimeSlots(selectedDate) : []), [selectedDate]);
  const morningSlots = useMemo(() => slots.filter((s) => new Date(s.startAt).getHours() < 12), [slots]);
  const afternoonSlots = useMemo(() => slots.filter((s) => new Date(s.startAt).getHours() >= 12), [slots]);

  const goTo = useCallback((to: Step, dir: 1 | -1 = 1) => {
    setStepDir(dir);
    setStep(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSelectExperience = useCallback((exp: (typeof experiences)[number]) => {
    setSelectedExp(exp);
    goTo("schedule", 1);
  }, [goTo]);

  const handleScheduleNext = useCallback(() => {
    if (selectedDate && selectedSlot) {
      goTo("book", 1);
    }
  }, [selectedDate, selectedSlot, goTo]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    goTo("confirmed", 1);
  }, [goTo]);

  // Auto-scroll to time slots when date selected (mobile only)
  const handleDateSelect = useCallback((iso: string) => {
    setSelectedDate(iso);
    setSelectedSlot("");
    // Smooth scroll to time slots on mobile
    if (window.matchMedia("(max-width: 768px)").matches) {
      setTimeout(() => {
        timeSlotsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    }
  }, []);

  const calendarDays = useMemo(() => getMonthDays(calYear, calMonth), [calYear, calMonth]);

  // Swipe month navigation for calendar
  const calSwipeX = useMotionValue(0);
  const calOpacity = useTransform(calSwipeX, [-100, 0, 100], [0.5, 1, 0.5]);

  const handleCalSwipe = useCallback((_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 50) {
      const dir = info.offset.x > 0 ? -1 : 1;
      setCalMonth((m) => {
        const next = m + dir;
        if (next < 0) { setCalYear((y) => y - 1); return 11; }
        if (next > 11) { setCalYear((y) => y + 1); return 0; }
        return next;
      });
    }
  }, []);

  const navigateMonth = useCallback((dir: 1 | -1) => {
    setCalMonth((m) => {
      const next = m + dir;
      if (next < 0) { setCalYear((y) => y - 1); return 11; }
      if (next > 11) { setCalYear((y) => y + 1); return 0; }
      return next;
    });
  }, []);

  const stepKeys: Step[] = ["choose", "schedule", "book"];
  const currentStepIndex = step === "confirmed" ? 3 : stepKeys.indexOf(step);

  // Computed total
  const total = selectedExp ? selectedExp.price * guests : 0;

  return (
    <main>
      {/* ── Hero — compact on mobile ── */}
      <section className="relative h-[36vh] min-h-[260px] sm:h-[44vh] sm:min-h-[320px] flex items-center justify-center overflow-hidden">
        <ParallaxImage
          src="/images/experience-tasting-3.webp"
          alt="Tasting experiences at Domaine LeSeurre"
          sizes="100vw"
          className="absolute inset-0"
          speed={0.08}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[rgba(38,50,27,0.6)]" />
        <div className="relative z-10 text-center px-6">
          <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 sm:mb-4 font-body font-medium">
            <FrenchText>Dégustation</FrenchText>
          </p>
          <h1 className="font-heading text-[1.75rem] sm:text-4xl md:text-5xl text-warm-white font-light leading-tight mb-3 sm:mb-4">
            <span className="shimmer-text-light">Tasting Experiences</span>
          </h1>
          <p className="text-warm-white/60 text-[13px] sm:text-base max-w-md mx-auto">
            Choose your experience and let us take care of the rest.
          </p>
        </div>
      </section>

      {/* ── Progress bar — thin line on mobile, circles on desktop ── */}
      {step !== "choose" && step !== "confirmed" && (
        <div className="bg-warm-white border-b border-gold/10 sticky top-[64px] sm:top-[72px] z-30">
          {/* Mobile: thin progress line */}
          <div className="sm:hidden">
            <div className="h-[2px] bg-gold/8">
              <motion.div
                className="h-full bg-gold"
                initial={false}
                animate={{ width: `${((currentStepIndex) / 2) * 100}%` }}
                transition={{ duration: 0.5, ease: LUXURY_EASE }}
              />
            </div>
            <div className="px-5 py-2.5 flex items-center justify-between">
              <button
                onClick={() => goTo(currentStepIndex === 1 ? "choose" : "schedule", -1)}
                className="flex items-center gap-1 text-stone/50 text-[11px] tracking-[0.08em] uppercase font-body active:scale-95 transition-transform cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Back
              </button>
              <span className="text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium">
                Step {currentStepIndex + 1} of 3
              </span>
            </div>
          </div>
          {/* Desktop: circle progress */}
          <div className="hidden sm:block">
            <div className="max-w-[var(--max-width)] mx-auto px-6 py-3">
              <div className="flex items-center justify-center gap-4">
                {["Experience", "Schedule", "Book"].map((label, i) => {
                  const isActive = i <= currentStepIndex;
                  const isDone = i < currentStepIndex;
                  return (
                    <div key={label} className="flex items-center gap-4">
                      {i > 0 && (
                        <div className={`w-12 h-px transition-colors duration-500 ${isActive ? "bg-gold" : "bg-gold/10"}`} />
                      )}
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-7 h-7 rounded-full text-[10px] font-medium flex items-center justify-center transition-all duration-500 ${
                            isDone
                              ? "bg-gold text-pourpre-deep"
                              : isActive
                                ? "bg-pourpre-deep text-warm-white"
                                : "bg-gold/8 text-stone/30"
                          }`}
                        >
                          {isDone ? <Check className="w-3 h-3" /> : i + 1}
                        </div>
                        <span
                          className={`text-[11px] tracking-[0.08em] uppercase font-body transition-colors duration-500 ${
                            isActive ? "text-pourpre-deep" : "text-stone/30"
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait" custom={stepDir}>
        {/* ═══════════════════════════════════════════
           Step 1 — Choose Experience
           ═══════════════════════════════════════════ */}
        {step === "choose" && (
          <motion.section
            key="choose"
            custom={stepDir}
            variants={mobileStepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            ref={sectionRef}
            className="py-12 sm:py-[var(--section-gap)] bg-cream bg-parchment-texture relative overflow-hidden"
          >
            <SectionBlobs
              isVisible={isVisible}
              sectionRef={sectionRef}
              blobs={[
                { type: "olive", size: "65%", position: { top: "-10%", left: "-20%" } },
                { type: "gold", size: "50%", position: { bottom: "-5%", right: "-15%" } },
              ]}
              parallax={[{ speed: 0.5 }, { speed: 0.3 }]}
            />
            <div className="max-w-[var(--max-width)] mx-auto px-4 sm:px-6">
              <ScrollReveal>
                <div className="text-center mb-8 sm:mb-16">
                  <LineMaskReveal className="font-heading text-[1.5rem] sm:text-4xl md:text-[3.25rem] text-pourpre-deep font-light mb-3 sm:mb-4 leading-tight">
                    <LineMaskLine>
                      <span className="shimmer-text">Choose Your Experience</span>
                    </LineMaskLine>
                  </LineMaskReveal>
                  <SectionDivider />
                  <p className="text-stone/60 text-[13px] sm:text-sm max-w-lg mx-auto mt-3 sm:mt-4">
                    From a relaxed glass on the terrace to an immersive food pairing — every visit tells a story.
                  </p>
                </div>
              </ScrollReveal>

              {/* Mobile: stacked full-bleed cards | Desktop: 2-col grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {experiences.map((exp, i) => (
                  <ScrollReveal key={exp.id} delay={i * 0.08}>
                    <div className="card-heritage group overflow-hidden bg-warm-white rounded-none h-full flex flex-col">
                      {/* Mobile: shorter aspect, Desktop: 16/10 */}
                      <ClipPathReveal direction="up" duration={1.1} className="relative aspect-[16/9] sm:aspect-[16/10] overflow-hidden">
                        <Image
                          src={exp.image!}
                          alt={exp.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {exp.price > 0 && (
                          <div className="absolute top-0 right-0 bg-pourpre-deep/90 text-gold text-sm font-heading font-semibold px-4 py-2">
                            ${exp.price}
                            <span className="text-gold/50 text-xs">/person</span>
                          </div>
                        )}
                        {exp.price === 0 && (
                          <div className="absolute top-0 right-0 bg-pourpre/90 text-warm-white text-[13px] font-body font-medium px-4 py-2">
                            Walk-in
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
                      </ClipPathReveal>

                      <div className="p-4 sm:p-6 flex flex-col flex-1">
                        <p className="text-gold/60 text-[10px] tracking-[0.2em] uppercase font-medium mb-1">
                          {exp.subtitle}
                        </p>
                        <h3 className="font-heading text-lg sm:text-2xl text-pourpre-deep mb-2 leading-tight">
                          {exp.name}
                        </h3>
                        <p className="text-stone text-[13px] leading-relaxed mb-3 sm:mb-4">
                          {exp.description}
                        </p>

                        {/* Mobile: collapsed includes | Desktop: full list */}
                        <ul className="space-y-1 sm:space-y-1.5 mb-4 sm:mb-5">
                          {exp.includes.slice(0, 3).map((item) => (
                            <li key={item} className="flex items-start gap-2 text-[12px] text-stone/70">
                              <Check className="w-3.5 h-3.5 text-gold/50 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                          {exp.includes.length > 3 && (
                            <li className="text-[11px] text-gold/60 pl-5.5 hidden sm:block">
                              +{exp.includes.length - 3} more included
                            </li>
                          )}
                        </ul>

                        <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-stone/50 mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-gold/8 mt-auto">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gold/40" />
                            {exp.duration}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-gold/40" />
                            Up to {exp.maxGuests}
                          </span>
                          {exp.memberPrice === 0 && exp.price > 0 && (
                            <span className="flex items-center gap-1.5 text-gold">
                              <Star className="w-3.5 h-3.5" />
                              Free for members
                            </span>
                          )}
                        </div>

                        {exp.id !== "walk-in" ? (
                          <button
                            onClick={() => handleSelectExperience(exp)}
                            className="w-full flex items-center justify-center gap-2 btn-cta-primary rounded-none h-12 sm:h-12 text-[11px] tracking-[0.15em] uppercase font-body font-medium cursor-pointer active:scale-[0.97] transition-transform"
                          >
                            <WineIcon className="w-3.5 h-3.5" />
                            Reserve This Experience
                          </button>
                        ) : (
                          <div className="w-full flex items-center justify-center h-12 text-[11px] tracking-[0.12em] uppercase font-body font-medium text-stone/50 border border-gold/15">
                            No Reservation Needed
                          </div>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Member perk */}
              <ScrollReveal>
                <div className="mt-8 sm:mt-16 text-center p-5 sm:p-8 bg-warm-white border border-gold/10">
                  <p className="text-gold/70 text-[10px] tracking-[0.3em] uppercase mb-2 font-body font-medium">
                    Wine Club Member?
                  </p>
                  <p className="text-pourpre-deep text-sm sm:text-base font-heading mb-3">
                    All tasting experiences are complimentary for members + 3 guests
                  </p>
                  <Link
                    href="/wine-club"
                    className="inline-flex items-center gap-2 text-pourpre-deep text-[11px] font-body font-medium tracking-[0.15em] uppercase hover:text-pourpre transition-colors group"
                  >
                    Learn about Le Cercle
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </motion.section>
        )}

        {/* ═══════════════════════════════════════════
           Step 2 — Schedule (Guests + Date + Time)
           ═══════════════════════════════════════════ */}
        {step === "schedule" && selectedExp && (
          <motion.section
            key="schedule"
            custom={stepDir}
            variants={mobileStepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="pb-28 sm:pb-16 pt-6 sm:py-16 bg-cream bg-parchment-texture relative overflow-hidden"
          >
            <div className="max-w-[720px] mx-auto px-4 sm:px-6">
              {/* Back — hidden on mobile (in progress bar) */}
              <button
                onClick={() => goTo("choose", -1)}
                className="hidden sm:flex items-center gap-1.5 text-stone/60 text-[11px] tracking-[0.1em] uppercase font-body mb-6 hover:text-pourpre-deep transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Change experience
              </button>

              {/* Experience summary — compact on mobile */}
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-warm-white border border-gold/10 mb-6 sm:mb-8">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 overflow-hidden">
                  <Image src={selectedExp.image!} alt={selectedExp.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-pourpre-deep text-base sm:text-lg leading-tight truncate">{selectedExp.name}</h3>
                  <p className="text-stone/60 text-[11px] sm:text-[12px]">
                    {selectedExp.duration} &middot; ${selectedExp.price}/person
                  </p>
                </div>
                <button
                  onClick={() => goTo("choose", -1)}
                  className="text-[10px] text-gold tracking-[0.1em] uppercase font-body font-medium hover:text-gold-dark transition-colors cursor-pointer flex-shrink-0 active:scale-95"
                >
                  Change
                </button>
              </div>

              {/* Party size stepper — larger touch targets */}
              <div className="mb-6 sm:mb-8">
                <label className="flex items-center gap-2 text-pourpre-deep text-[11px] tracking-[0.12em] uppercase font-body font-medium mb-3">
                  <Users className="w-3.5 h-3.5 text-gold/50" />
                  Number of Guests
                </label>
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    disabled={guests <= 1}
                    className="w-12 h-12 flex items-center justify-center border border-gold/20 bg-warm-white text-pourpre-deep hover:border-gold/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-90 active:bg-gold/5"
                    aria-label="Decrease guests"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="text-center min-w-[3.5rem]">
                    <div className="overflow-hidden h-8">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={guests}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.2, ease: LUXURY_EASE }}
                          className="block font-heading text-pourpre-deep text-2xl"
                        >
                          {guests}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <span className="block text-stone/40 text-[10px] uppercase tracking-wider">
                      {guests === 1 ? "guest" : "guests"}
                    </span>
                  </div>
                  <button
                    onClick={() => setGuests((g) => Math.min(selectedExp.maxGuests, g + 1))}
                    disabled={guests >= selectedExp.maxGuests}
                    className="w-12 h-12 flex items-center justify-center border border-gold/20 bg-warm-white text-pourpre-deep hover:border-gold/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-90 active:bg-gold/5"
                    aria-label="Increase guests"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <span className="text-stone/40 text-[11px] ml-1">{selectedExp.maxGuests} max</span>
                </div>
              </div>

              {/* Visual calendar — swipeable on mobile */}
              <div className="mb-6 sm:mb-8">
                <label className="flex items-center gap-2 text-pourpre-deep text-[11px] tracking-[0.12em] uppercase font-body font-medium mb-3">
                  <Calendar className="w-3.5 h-3.5 text-gold/50" />
                  Select a Date
                </label>
                <div className="bg-warm-white border border-gold/10 p-3 sm:p-5">
                  {/* Month navigation */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gold/5 transition-colors cursor-pointer active:scale-90"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="w-4 h-4 text-pourpre-deep" />
                    </button>
                    <h4 className="font-heading text-pourpre-deep text-base sm:text-lg">
                      {MONTH_NAMES[calMonth]} {calYear}
                    </h4>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gold/5 transition-colors cursor-pointer active:scale-90"
                      aria-label="Next month"
                    >
                      <ChevronRight className="w-4 h-4 text-pourpre-deep" />
                    </button>
                  </div>

                  {/* Day headers */}
                  <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1">
                    {DAY_LABELS.map((d) => (
                      <div key={d} className="text-center text-[10px] text-stone/40 uppercase tracking-wider font-body py-1">
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Day grid — swipeable */}
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragEnd={handleCalSwipe}
                    style={{ x: calSwipeX, opacity: calOpacity }}
                    className="grid grid-cols-7 gap-0.5 sm:gap-1 touch-pan-y"
                  >
                    {calendarDays.map((day, i) => {
                      if (day === null) return <div key={`empty-${i}`} />;
                      const iso = formatDateISO(calYear, calMonth, day);
                      const isPast = iso < todayISO;
                      const isSelected = selectedDate === iso;
                      const isToday = iso === todayISO;
                      return (
                        <button
                          key={iso}
                          disabled={isPast}
                          onClick={() => handleDateSelect(iso)}
                          className={`
                            h-11 sm:h-11 flex items-center justify-center text-sm font-body transition-all cursor-pointer relative
                            active:scale-90
                            ${isPast ? "text-stone/15 cursor-not-allowed" : ""}
                            ${isSelected
                              ? "bg-gold text-pourpre-deep font-medium"
                              : isToday
                                ? "text-pourpre-deep font-medium"
                                : !isPast
                                  ? "text-pourpre-deep hover:bg-gold/8"
                                  : ""
                            }
                          `}
                        >
                          {day}
                          {isToday && !isSelected && (
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                </div>
              </div>

              {/* Time slots — revealed with animation */}
              <AnimatePresence mode="wait">
                {selectedDate && (
                  <motion.div
                    key={selectedDate}
                    ref={timeSlotsRef}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: LUXURY_EASE }}
                    className="mb-6 sm:mb-8 overflow-hidden"
                  >
                    <label className="flex items-center gap-2 text-pourpre-deep text-[11px] tracking-[0.12em] uppercase font-body font-medium mb-3">
                      <Clock className="w-3.5 h-3.5 text-gold/50" />
                      <span className="hidden sm:inline">Available Times — {formatDateDisplay(selectedDate)}</span>
                      <span className="sm:hidden">Available — {formatDateShort(selectedDate)}</span>
                    </label>

                    {morningSlots.length > 0 && (
                      <div className="mb-3 sm:mb-4">
                        <p className="text-[10px] text-stone/40 uppercase tracking-wider font-body mb-2">Morning</p>
                        <div className="grid grid-cols-3 gap-2">
                          {morningSlots.map((slot) => (
                            <TimeSlotButton
                              key={slot.id}
                              slot={slot}
                              isSelected={selectedSlot === slot.id}
                              onSelect={setSelectedSlot}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {afternoonSlots.length > 0 && (
                      <div>
                        <p className="text-[10px] text-stone/40 uppercase tracking-wider font-body mb-2">Afternoon</p>
                        <div className="grid grid-cols-3 gap-2">
                          {afternoonSlots.map((slot) => (
                            <TimeSlotButton
                              key={slot.id}
                              slot={slot}
                              isSelected={selectedSlot === slot.id}
                              onSelect={setSelectedSlot}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Fixed bottom CTA bar — safe-area aware */}
            <AnimatePresence>
              {selectedDate && selectedSlot && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.35, ease: LUXURY_EASE }}
                  className="fixed bottom-0 left-0 right-0 z-40 sm:relative sm:bottom-auto sm:left-auto sm:right-auto sm:z-20 sm:max-w-[720px] sm:mx-auto sm:px-6"
                >
                  {/* Mobile: full-width fixed bottom bar with glass effect */}
                  <div className="sm:hidden bg-warm-white/95 backdrop-blur-xl border-t border-gold/15 px-4 pt-3 safe-area-bottom">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-stone/50 text-[10px] tracking-[0.1em] uppercase">Total</p>
                        <p className="font-heading text-pourpre-deep text-xl">${total}</p>
                        <p className="text-stone/40 text-[10px]">
                          {guests} guest{guests > 1 ? "s" : ""} &times; ${selectedExp.price}
                        </p>
                      </div>
                      <button
                        onClick={handleScheduleNext}
                        className="flex items-center gap-2 btn-cta-primary rounded-none h-12 px-6 text-[11px] tracking-[0.15em] uppercase font-body font-medium cursor-pointer active:scale-[0.97]"
                      >
                        Continue <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Desktop: sticky inline bar */}
                  <div className="hidden sm:block sticky bottom-4">
                    <div className="flex items-center justify-between p-5 bg-warm-white border border-gold/15 shadow-lg shadow-black/5">
                      <div>
                        <p className="text-stone/50 text-[10px] tracking-[0.1em] uppercase">Total</p>
                        <p className="font-heading text-pourpre-deep text-2xl">${total}</p>
                        <p className="text-stone/40 text-[11px]">
                          {guests} guest{guests > 1 ? "s" : ""} &times; ${selectedExp.price}
                        </p>
                      </div>
                      <button
                        onClick={handleScheduleNext}
                        className="flex items-center gap-2 btn-cta-primary rounded-none h-12 px-8 text-[11px] tracking-[0.15em] uppercase font-body font-medium cursor-pointer"
                      >
                        Continue <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}

        {/* ═══════════════════════════════════════════
           Step 3 — Book (Contact form + Summary)
           ═══════════════════════════════════════════ */}
        {step === "book" && selectedExp && (
          <motion.section
            key="book"
            custom={stepDir}
            variants={mobileStepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="pb-8 sm:pb-16 pt-6 sm:py-16 bg-cream bg-parchment-texture relative overflow-hidden"
          >
            <div className="max-w-[900px] mx-auto px-4 sm:px-6">
              {/* Back — hidden on mobile (in progress bar) */}
              <button
                onClick={() => goTo("schedule", -1)}
                className="hidden sm:flex items-center gap-1.5 text-stone/60 text-[11px] tracking-[0.1em] uppercase font-body mb-6 hover:text-pourpre-deep transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Change schedule
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 sm:gap-8 items-start">
                {/* Contact form */}
                <div>
                  {/* Mobile: compact inline summary before form */}
                  <div className="lg:hidden mb-5 p-3.5 bg-warm-white border border-gold/10">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden">
                        <Image src={selectedExp.image!} alt={selectedExp.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-heading text-pourpre-deep text-sm leading-tight truncate">{selectedExp.name}</p>
                        <p className="text-stone/50 text-[11px]">
                          {formatDateShort(selectedDate)} &middot; {slots.find((s) => s.id === selectedSlot)
                            ? new Date(slots.find((s) => s.id === selectedSlot)!.startAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
                            : ""
                          } &middot; {guests} guest{guests > 1 ? "s" : ""}
                        </p>
                      </div>
                      <p className="font-heading text-pourpre-deep text-lg flex-shrink-0">${total}</p>
                    </div>
                  </div>

                  <h2 className="font-heading text-[1.35rem] sm:text-3xl text-pourpre-deep font-light mb-1.5 sm:mb-2">
                    Complete Your Reservation
                  </h2>
                  <p className="text-stone text-[13px] sm:text-sm mb-6 sm:mb-8">Just a few details and you&apos;re all set.</p>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <InputField
                        icon={<User className="w-3 h-3" />}
                        label="First Name"
                        required
                        autoComplete="given-name"
                        enterKeyHint="next"
                        value={form.firstName}
                        onChange={(v) => setForm({ ...form, firstName: v })}
                      />
                      <InputField
                        label="Last Name"
                        required
                        autoComplete="family-name"
                        enterKeyHint="next"
                        value={form.lastName}
                        onChange={(v) => setForm({ ...form, lastName: v })}
                      />
                    </div>

                    <InputField
                      icon={<Mail className="w-3 h-3" />}
                      label="Email"
                      type="email"
                      inputMode="email"
                      required
                      autoComplete="email"
                      enterKeyHint="next"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                    />

                    <InputField
                      icon={<Phone className="w-3 h-3" />}
                      label="Phone"
                      type="tel"
                      inputMode="tel"
                      required
                      autoComplete="tel"
                      enterKeyHint="done"
                      value={form.phone}
                      onChange={(v) => setForm({ ...form, phone: v })}
                    />

                    <div>
                      <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">
                        <MessageSquare className="w-3 h-3 inline mr-1.5 text-gold/50" /> Special Requests{" "}
                        <span className="text-stone/40">(optional)</span>
                      </label>
                      <textarea
                        rows={2}
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors resize-none"
                        placeholder="Allergies, celebrations, accessibility needs..."
                      />
                    </div>

                    {/* Trust signals */}
                    <div className="flex flex-wrap gap-3 sm:gap-4 text-[11px] text-stone/50 py-2 sm:py-3">
                      <span className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-gold/40" />
                        Free cancellation 24h before
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gold/40" />
                        Keuka Lake, Hammondsport NY
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 btn-cta-primary rounded-none h-14 text-[12px] tracking-[0.15em] uppercase font-body font-medium cursor-pointer active:scale-[0.97] transition-transform"
                      data-track-event="booking_confirmed"
                    >
                      <WineIcon className="w-4 h-4" />
                      Confirm Reservation
                    </button>

                    <p className="text-center text-[10px] text-stone/35">
                      No payment required — pay when you arrive. Free cancellation up to 24 hours before your visit.
                    </p>
                  </form>
                </div>

                {/* Desktop sticky summary */}
                <div className="hidden lg:block sticky top-[120px]">
                  <OrderSummary
                    experience={selectedExp}
                    date={selectedDate}
                    slot={slots.find((s) => s.id === selectedSlot)}
                    guests={guests}
                  />
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* ═══════════════════════════════════════════
           Confirmation
           ═══════════════════════════════════════════ */}
        {step === "confirmed" && submitted && selectedExp && (
          <motion.section
            key="confirmed"
            custom={stepDir}
            variants={mobileStepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="py-12 sm:py-24 bg-cream bg-parchment-texture relative overflow-hidden"
          >
            <div className="max-w-[540px] mx-auto px-4 sm:px-6 text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5, ease: LUXURY_EASE }}
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 sm:mb-6"
              >
                <svg viewBox="0 0 50 50" className="w-full h-full">
                  <motion.circle
                    cx="25" cy="25" r="23"
                    fill="none"
                    stroke="rgba(215,164,94,0.2)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M14 26 L22 34 L37 17"
                    fill="none"
                    stroke="#D7A45E"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, delay: 0.6, ease: "easeOut" }}
                  />
                </svg>
              </motion.div>
              <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-2 sm:mb-3 font-body font-medium">
                <FrenchText>Merci</FrenchText>
              </p>
              <h2 className="font-heading text-[1.5rem] sm:text-4xl text-pourpre-deep font-light mb-3 sm:mb-4 leading-tight">
                Your Reservation is Confirmed
              </h2>
              <p className="text-stone text-[13px] sm:text-sm mb-6 sm:mb-8">
                A confirmation email has been sent to <strong className="text-pourpre-deep">{form.email}</strong>. We
                look forward to welcoming you.
              </p>

              <div className="p-4 sm:p-6 bg-warm-white border border-gold/10 text-left mb-6 sm:mb-8 space-y-2.5 sm:space-y-3">
                <SummaryRow label="Experience" value={selectedExp.name} />
                <SummaryRow label="Date" value={formatDateDisplay(selectedDate)} />
                <SummaryRow
                  label="Time"
                  value={
                    slots.find((s) => s.id === selectedSlot)
                      ? new Date(slots.find((s) => s.id === selectedSlot)!.startAt).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })
                      : ""
                  }
                />
                <SummaryRow label="Guests" value={String(guests)} />
                <SummaryRow label="Name" value={`${form.firstName} ${form.lastName}`} />
                <div className="h-px bg-gold/10" />
                <div className="flex justify-between">
                  <span className="text-pourpre-deep font-medium text-sm">Total</span>
                  <span className="font-heading text-pourpre-deep text-xl">${total}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="btn-cta-primary inline-flex items-center justify-center rounded-none h-11 px-8 text-[11px] tracking-[0.15em] uppercase font-body font-medium active:scale-[0.97]"
                >
                  Back to Home
                </Link>
                <Link
                  href="/wines"
                  className="btn-shimmer-gold inline-flex items-center justify-center rounded-none h-11 px-8 text-[11px] tracking-[0.15em] uppercase font-body font-medium active:scale-[0.97]"
                >
                  Explore Our Wines
                </Link>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

/* ═══════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════ */

function TimeSlotButton({
  slot,
  isSelected,
  onSelect,
}: {
  slot: { id: string; startAt: string; spotsLeft: number };
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  const time = new Date(slot.startAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const isFull = slot.spotsLeft === 0;
  const isLow = slot.spotsLeft <= 2 && !isFull;

  return (
    <button
      disabled={isFull}
      onClick={() => onSelect(slot.id)}
      className={`
        py-3 px-2 text-center transition-all text-sm cursor-pointer min-h-[48px]
        active:scale-95
        ${
          isFull
            ? "bg-stone/5 text-stone/20 cursor-not-allowed"
            : isSelected
              ? "bg-gold text-pourpre-deep font-medium shadow-sm"
              : "bg-warm-white border border-gold/15 text-pourpre-deep hover:border-gold/40 hover:bg-gold/5"
        }
      `}
    >
      <span className="block font-body">{time}</span>
      {!isFull && (
        <span
          className={`text-[10px] block mt-0.5 ${
            isLow
              ? "text-amber-600 font-medium"
              : isSelected
                ? "text-pourpre-deep/60"
                : "text-stone/35"
          }`}
        >
          {isLow ? `${slot.spotsLeft} left` : `${slot.spotsLeft} spots`}
        </span>
      )}
      {isFull && <span className="text-[10px] block mt-0.5">Full</span>}
    </button>
  );
}

function InputField({
  icon,
  label,
  type = "text",
  inputMode,
  required,
  autoComplete,
  enterKeyHint,
  value,
  onChange,
}: {
  icon?: React.ReactNode;
  label: string;
  type?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "search" | "none" | "url" | "decimal";
  required?: boolean;
  autoComplete?: string;
  enterKeyHint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send";
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-1.5 sm:mb-2">
        {icon && <span className="inline-flex mr-1.5 text-gold/50">{icon}</span>}
        {label}
      </label>
      <input
        type={type}
        inputMode={inputMode}
        required={required}
        autoComplete={autoComplete}
        enterKeyHint={enterKeyHint}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-[16px] sm:text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors"
      />
    </div>
  );
}

function OrderSummary({
  experience,
  date,
  slot,
  guests,
}: {
  experience: (typeof experiences)[number];
  date: string;
  slot?: { id: string; startAt: string };
  guests: number;
}) {
  return (
    <div className="bg-warm-white border border-gold/10 overflow-hidden">
      <div className="relative h-32 overflow-hidden">
        <Image src={experience.image!} alt={experience.name} fill className="object-cover" sizes="320px" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(38,50,27,0.8)] to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-gold/70 text-[10px] tracking-[0.2em] uppercase">{experience.subtitle}</p>
          <h4 className="font-heading text-warm-white text-lg leading-tight">{experience.name}</h4>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <SummaryRow label="Date" value={formatDateDisplay(date)} />
        {slot && (
          <SummaryRow
            label="Time"
            value={new Date(slot.startAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
          />
        )}
        <SummaryRow label="Guests" value={`${guests} ${guests === 1 ? "person" : "people"}`} />
        <SummaryRow label="Duration" value={experience.duration} />

        <div className="h-px bg-gold/10 !my-4" />

        <div className="flex justify-between text-sm">
          <span className="text-stone/70">
            {guests} &times; ${experience.price}
          </span>
          <span className="text-pourpre-deep">${experience.price * guests}</span>
        </div>

        <div className="h-px bg-gold/10" />

        <div className="flex justify-between items-baseline">
          <span className="text-pourpre-deep font-heading text-sm">Total</span>
          <span className="font-heading text-pourpre-deep text-2xl">${experience.price * guests}</span>
        </div>

        <p className="text-[10px] text-stone/35 leading-relaxed pt-2">
          Pay at the winery. Free cancellation up to 24 hours before your visit. Wine Club members enjoy complimentary
          tastings.
        </p>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-stone/60">{label}</span>
      <span className="text-pourpre-deep font-medium text-right">{value}</span>
    </div>
  );
}
