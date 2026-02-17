export function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["Winery", "LocalBusiness"],
    name: "Domaine LeSeurre Winery",
    description:
      "French-inspired winery on the shores of Keuka Lake. Méthode champenoise sparkling, Burgundy-style Chardonnay, and Loire-inspired Cabernet Franc in the heart of the Finger Lakes.",
    url: "https://dlwinery.com",
    telephone: "+1-607-569-3299",
    email: "info@dlwinery.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9485 Route 76",
      addressLocality: "Hammondsport",
      addressRegion: "NY",
      postalCode: "14840",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.3767,
      longitude: -77.2231,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "18:00",
    },
    image: "https://dlwinery.com/images/winery-scenic-view.webp",
    priceRange: "$$",
    servesCuisine: "Wine Tasting",
    sameAs: [
      "https://www.facebook.com/DomaineLeSeurre",
      "https://www.instagram.com/domaineleseurre",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}
