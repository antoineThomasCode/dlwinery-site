import type { Member } from "@/lib/types";

/** Mock member data for demo dashboard */
export const mockMember: Member = {
  id: "member-001",
  firstName: "Sarah",
  lastName: "Mitchell",
  email: "sarah.mitchell@email.com",
  tier: "classic",
  joinDate: "2025-06-15",
  nextShipment: {
    date: "April 15, 2026",
    wines: [
      { name: "Brut Sparkling 2021", type: "sparkling" },
      { name: "Dry Riesling 2023", type: "white" },
      { name: "Chardonnay Reserve 2021", type: "white" },
      { name: "Rosé de Provence Style 2023", type: "rose" },
      { name: "Cabernet Franc 2021", type: "red" },
      { name: "Pinot Noir 2022", type: "red" },
    ],
    status: "preparing",
  },
  orderHistory: [
    { id: "ORD-2026-003", date: "Feb 10, 2026", total: 148.75, items: 6 },
    { id: "ORD-2025-018", date: "Dec 22, 2025", total: 212.50, items: 8 },
    { id: "ORD-2025-014", date: "Oct 15, 2025", total: 95.20, items: 4 },
    { id: "ORD-2025-009", date: "Aug 1, 2025", total: 178.00, items: 6 },
    { id: "ORD-2025-004", date: "Jun 20, 2025", total: 64.60, items: 3 },
  ],
  benefits: {
    discount: 15,
    freeTaskings: 4,
    freeGuests: 3,
    vipEvents: true,
  },
};
