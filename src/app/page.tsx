import { HeroSection } from "@/components/home/hero-section";
import { WelcomeBanner } from "@/components/home/welcome-banner";
import { ExperiencesSection } from "@/components/home/experiences-section";
import { WineClubSection } from "@/components/home/wine-club-section";
import { StorySection } from "@/components/home/story-section";
import { EventsSection } from "@/components/home/events-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CtaSection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <WelcomeBanner />
      <ExperiencesSection />
      <WineClubSection />
      <StorySection />
      <EventsSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
