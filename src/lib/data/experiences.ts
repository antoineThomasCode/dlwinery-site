import type { Experience, TimeSlot } from "@/lib/types";

export const experiences: Experience[] = [
  {
    id: "educational",
    serviceVariationId: "SV_EDUCATIONAL",
    name: "Educational Wine Tasting",
    subtitle: "Discover the Finger Lakes",
    price: 15,
    memberPrice: 0,
    duration: "45 min",
    description: "Five wines, one journey through the Finger Lakes. Our team guides you from vine to glass, sharing the techniques that span six generations. Includes a tasting of 5 wines with commentary on each vintage.",
    includes: ["5 wine tastings", "Tasting notes card", "10% off same-day purchases"],
    image: "/images/experience-tasting-1.webp",
    maxGuests: 8,
  },
  {
    id: "macaron",
    serviceVariationId: "SV_MACARON",
    name: "A Taste of France",
    subtitle: "Wine & Macaron Pairing",
    price: 28,
    memberPrice: 0,
    duration: "60 min",
    description: "An exclusive pairing of our finest wines with artisanal French macarons. A sensory journey that brings the elegance of France to the shores of Keuka Lake. Each macaron is crafted to complement and elevate the character of the wine.",
    includes: ["5 wine tastings", "5 artisanal French macarons", "Pairing guide", "15% off same-day purchases"],
    image: "/images/winery-wine-macaron.webp",
    maxGuests: 6,
  },
  {
    id: "signature",
    serviceVariationId: "SV_SIGNATURE",
    name: "Signature Wine & Food Pairing",
    subtitle: "The Complete Experience",
    price: 35,
    memberPrice: 0,
    duration: "75 min",
    description: "Our premium experience: curated wine and artisanal food pairings in a private terrace setting. Discover the full Domaine LeSeurre story as Céline or Sébastien guide you through our finest selections. A truly immersive French winemaking experience.",
    includes: ["6 premium wine tastings", "Artisanal food pairings", "Private terrace seating", "Winery tour", "20% off same-day purchases"],
    image: "/images/experience-tasting-3.webp",
    maxGuests: 6,
  },
  {
    id: "walk-in",
    serviceVariationId: "SV_WALKIN",
    name: "Wine by the Glass & Artisanal Plates",
    subtitle: "No Reservation Needed",
    price: 0,
    memberPrice: 0,
    duration: "At your pace",
    description: "Drop by and enjoy a glass (or a bottle) on our terrace overlooking Keuka Lake. Pair with our selection of artisanal cheese and charcuterie plates. No reservation required — just walk in and unwind.",
    includes: ["Wines by the glass ($8–$14)", "Cheese & charcuterie plates", "Terrace seating", "Lake views"],
    image: "/images/winery-terrace-dining.jpg",
    maxGuests: 20,
  },
];

/** Generate mock time slots for a given date */
export function generateTimeSlots(date: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const startHour = 10;
  const endHour = 17;

  for (let h = startHour; h < endHour; h++) {
    for (const m of [0, 30]) {
      const hour = h.toString().padStart(2, "0");
      const min = m.toString().padStart(2, "0");
      const spotsLeft = Math.floor(Math.random() * 6) + 1;
      slots.push({
        id: `slot-${hour}${min}`,
        startAt: `${date}T${hour}:${min}:00`,
        spotsLeft: spotsLeft > 4 ? 6 : spotsLeft,
        maxSpots: 6,
      });
    }
  }
  return slots;
}
