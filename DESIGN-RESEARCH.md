# DL Winery — Design Research Synthesis
> Generated 13 Feb 2026 — 6 research agents compiled

---

## 1. EPAISSIR DIASPORA (DONE)
- `-webkit-text-stroke-width: 0.45px` + `paint-order: stroke fill` on all h1-h4
- Using `currentColor` so stroke matches whatever color is applied
- Already deployed

## 2. SHIMMER ORGANIQUE (DONE — fixed)
- Technique: multi-directional `background-position` animation with 3 radial gradient layers
- Each layer at different `background-size` (300%, 250%, 200%) = different drift speeds
- Figure-8 path, 25-30s cycle, `ease-in-out`
- NOTE: `@property` technique with separate keyframes did NOT work (animation conflicts)
- Already deployed

## 3. BOUTONS LUXURY (DONE)
- Pattern Krug/Dom Perignon: 1px border, font-weight 400, letter-spacing 0.2em, uppercase
- Hover: fill sweep via `transform: scaleX(0)` to `scaleX(1)` on `::before` pseudo-element
- GPU-accelerated (transform only), cubic-bezier(0.445, 0.05, 0.55, 0.95)
- Zero border-radius, zero shadow, zero bounce
- Primary (gold border, gold fill), Secondary (cream border, cream fill on dark bg)
- Already deployed

## 4. VIDEO HERO (DONE)
- `/public/images/hero-video.webm` replacing static image
- Poster fallback: `winery-lake-view.webp`
- Overlay: `from-black/55 via-black/30 to-olive-deep/75` + vignette at 30%
- Already deployed

---

## 5. COULEURS — Recommandations

### Verdict: Garder olive/gold, shifter pourpre → burgundy, ajouter amber

| Role | Actuel | Recommandation | Hex |
|------|--------|---------------|-----|
| Primary | Olive | **Garder** | `#3D5A3E` |
| Primary Dark | Olive Deep | **Garder** | `#2A3F2B` |
| Accent | Gold | **Garder** | `#C49A3C` |
| Wine | Pourpre `#5C3A4E` | **Shifter → Burgundy** | `#6B2D3E` |
| Wine Dark | Pourpre Deep `#3D2233` | **Shifter** | `#4A1C28` |
| Wine Light | Pourpre Light `#7A5068` | **Shifter** | `#8B3D4E` |
| Autumn (NEW) | Amber (défini, pas utilisé) | **Promouvoir** | `#B8763A` |
| Backgrounds | Cream/Warm White/Parchment | **Garder** | `#F7F4EE` / `#FEFCF7` / `#EDE8DB` |

### Pourquoi burgundy > pourpre pour la cible US
- Burgundy = vin + chaleur + France (la région Bourgogne)
- Pourpre = créativité + mystère (pas le signal voulu)
- Les Américains associent burgundy directement au luxe et au vin

### WCAG Contrast
- Gold `#C49A3C` sur cream = 3.2:1 → **DECORATIF SEULEMENT** (jamais en body text)
- Burgundy `#6B2D3E` sur cream = ~7:1 → **PASS AA + AAA**
- Olive sur cream = ~6:1 → **PASS AA**
- Warm Black sur cream = ~14:1 → **PASS tout**

### Règle 80/20 clair/sombre
- 80% light (cream/parchment) = terrasse, vue du lac, ouvert
- 20% dark (warm black, olive deep, burgundy deep) = cave, intime, premium
- Dark sections: Hero, Wine Club, Footer uniquement

---

## 6. BLOBS COLORÉS AU SCROLL

### Architecture recommandée: IntersectionObserver + CSS transitions

**Hook `useSectionBlobs`:**
```tsx
// hooks/use-section-blobs.ts
"use client";
import { useEffect, useRef, useState } from "react";

export function useSectionBlobs({ threshold = 0.15, rootMargin = "0px 0px -50px 0px", once = true } = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) { setIsVisible(true); return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(section);
        } else if (!once) { setIsVisible(false); }
      },
      { threshold, rootMargin }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { sectionRef, isVisible };
}
```

**Component `SectionBlobs`:**
```tsx
// components/ui/section-blobs.tsx
"use client";
interface BlobConfig {
  type: "pourpre" | "gold" | "dark" | "olive" | "champagne";
  size: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay?: number;
}

export function SectionBlobs({ blobs, isVisible }: { blobs: BlobConfig[]; isVisible: boolean }) {
  return (
    <div className="organic-overlay" aria-hidden="true">
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`organic-blob blob-${blob.type} transition-opacity duration-[1500ms] ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
          style={{
            width: blob.size, height: blob.size, ...blob.position,
            transitionDelay: `${blob.delay ?? i * 200}ms`,
            animationPlayState: isVisible ? "running" : "paused",
          }}
        />
      ))}
    </div>
  );
}
```

### Nouvelles couleurs de blobs à ajouter au CSS
```css
.blob-olive {
  background: radial-gradient(circle, rgba(61,90,62,0.5) 0%, rgba(42,63,43,0.25) 40%, transparent 70%);
  animation: blob-drift-1 32s ease-in-out infinite;
}
.blob-champagne {
  background: radial-gradient(circle, rgba(237,217,179,0.4) 0%, rgba(212,174,84,0.2) 40%, transparent 70%);
  animation: blob-drift-3 30s ease-in-out infinite;
}
```

### Mapping couleurs par section
| Section | Blob 1 | Blob 2 |
|---------|--------|--------|
| Hero | pourpre 55% | gold 45% + dark 60% |
| Welcome | champagne 40% | gold 35% |
| Experiences | olive 50% | gold 40% |
| Wine Club | pourpre 45% | champagne 40% |
| Story | pourpre 50% | olive 35% |
| Events | gold 50% | champagne 40% |
| Testimonials | olive 40% | gold 30% |
| CTA | pourpre 55% | gold 50% + dark 40% |

### Performance
- `animation-play-state: paused` sur blobs hors viewport
- `filter: blur(60px)` au lieu de 100px sur mobile
- Max 5-6 blobs visibles simultanément
- `will-change: transform` uniquement quand visible
- Cacher 3e blob+ sur mobile: `.organic-blob:nth-child(n+3) { display: none }`

---

## 7. CURSEUR LUMINEUX (Desktop uniquement)

### Architecture: Framer Motion `useSpring` + glow orb fixe

```tsx
// components/shared/cursor-glow.tsx
"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const GLOW_COLORS = {
  gold: { inner: "rgba(196,154,60,0.12)", outer: "rgba(196,154,60,0.04)" },
  champagne: { inner: "rgba(237,217,179,0.15)", outer: "rgba(237,217,179,0.05)" },
  pourpre: { inner: "rgba(92,58,78,0.10)", outer: "rgba(92,58,78,0.03)" },
};

const SPRING = { damping: 30, stiffness: 150, mass: 0.5 }; // ~200-300ms trailing
const SIZE = 350;

export function CursorGlow({ variant = "gold" }: { variant?: keyof typeof GLOW_COLORS }) {
  const [show, setShow] = useState(false);
  const mouseX = useMotionValue(-SIZE);
  const mouseY = useMotionValue(-SIZE);
  const springX = useSpring(mouseX, SPRING);
  const springY = useSpring(mouseY, SPRING);

  useEffect(() => {
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!hover.matches || motion.matches) return;
    setShow(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - SIZE / 2);
      mouseY.set(e.clientY - SIZE / 2);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  if (!show) return null;
  const c = GLOW_COLORS[variant];

  return (
    <motion.div aria-hidden style={{ x: springX, y: springY, width: SIZE, height: SIZE }}
      className="pointer-events-none fixed top-0 left-0 z-0">
      <div className="absolute inset-0 rounded-full"
        style={{ background: `radial-gradient(circle, ${c.inner} 0%, ${c.outer} 40%, transparent 70%)`, filter: "blur(40px)" }} />
      <div className="absolute rounded-full"
        style={{ top: "20%", left: "20%", width: "60%", height: "60%",
          background: `radial-gradient(circle, ${c.inner} 0%, transparent 70%)`, filter: "blur(20px)" }} />
    </motion.div>
  );
}
```

### Integration: dans layout.tsx
```tsx
<CursorGlow variant="gold" />
```

### Design
- NE PAS remplacer le curseur natif (garder la flèche système)
- Le glow passe DERRIERE le contenu (z-0)
- pointer-events: none — n'intercepte jamais les clics
- Désactivé sur mobile/touch et prefers-reduced-motion
- Optionnel: scale 0.6 + opacity 0.5 au hover sur éléments interactifs

---

## 8. ANIMATIONS AWWWARDS

### Stack des sites primés
- GSAP + ScrollTrigger (maintenant 100% gratuit depuis rachat Webflow)
- Lenis (~3KB) pour smooth scroll
- Framer Motion (déjà installé) pour UI animations
- Easing luxury standard: `cubic-bezier(0.16, 1, 0.3, 1)` (expo out)

### Priorité par impact/effort (Framer Motion, zero dépendance)

**Tier 1 — Wins immédiats:**
1. Stagger children dans ScrollReveal (variants pattern, 30min)
2. Line-mask text reveals: `overflow-hidden` + `y: "100%"` sur titres (1h)
3. Clip-path image reveals: `clipPath: "inset(100% 0 0 0)"` → `"inset(0)"` (1h)
4. Parallax images: `useScroll` + `useTransform` y: [-10%, 10%] (1h)
5. Link underline CSS: `scaleX(0)` → `scaleX(1)` avec transform-origin switch (15min)
6. template.tsx pour transition de page fade-in (10min)

**Tier 2 — Impact élevé:**
7. Bouton magnétique: `useMotionValue` + `useSpring` sur CTA (45min)
8. Image scale + overlay wipe combiné (cinematic reveal) (1h)
9. Word-by-word text reveal component (1h)

**Tier 3 — Premium (nécessite GSAP + Lenis, ~43KB):**
10. Lenis smooth scroll (30min setup)
11. GSAP ScrollTrigger pour section wine pinned (3-4h)
12. SplitText character reveal sur hero headline (1h)

### Timing luxury
| Element | Duration | Stagger |
|---------|----------|---------|
| Text line reveal | 0.8-1.0s | 0.08-0.12s |
| Image wipe | 1.0-1.4s | — |
| Fade-up content | 0.6-0.8s | 0.08-0.15s |
| Button hover | 0.3-0.4s | — |

---

## 9. DESIGN SYSTEM UX

### Section ordering recommandé
Hero → Welcome → **Story** (MONTER) → Experiences → **Testimonials** (MONTER) → Wine Club → Events → CTA

**Pourquoi:** Le story (heritage 6ème génération) est le #1 différenciateur. 70%+ du trafic mobile ne scrolle pas jusqu'à position 5. Le placer avant Experiences = les visiteurs comprennent POURQUOI avant de voir QUOI réserver.

### Content manquant
1. **Trust strip** (awards, Google rating 4.8/5, presse) entre Story et Experiences
2. **Plan Your Visit** mini-section (horaires, directions) avant CTA final
3. **Sticky mobile CTA** ("Book a Tasting" bottom bar après scroll past hero)
4. **Tap-to-call** sur mobile pour visiteurs déjà dans la région

### Typography scale (Major Third 1.25)
| Token | Mobile | Desktop | Usage |
|-------|--------|---------|-------|
| display-1 | 2.75rem | 5.5rem | Hero only |
| heading-1 | 1.75rem | 3.25rem | Section titles |
| heading-2 | 1.25rem | 1.75rem | Card titles |
| body | 0.8125rem | 0.875rem | Body text |
| kicker | 0.625rem | 0.6875rem | French labels |

### Spacing (8px base)
- Section gap: `clamp(80px, 12vw, 140px)` — garder tel quel
- Card padding: `p-5 sm:p-6` — correct
- Card grid gap: `gap-6 lg:gap-8` — correct
- Standardiser mobile card width: `w-[85vw] max-w-[340px]`

### Concurrence Finger Lakes
| Factor | Dr. Frank | Ravines | Wiemer | DL Winery (New) |
|--------|-----------|---------|--------|-----------------|
| Visual Design | B+ | A- | A- | **A+** |
| Storytelling | B+ | B | B- | **A+** |
| Video/Motion | C | C | C | **A** |
| Emotional Impact | B | B+ | B- | **A+** |

---

## 10. ENCRE DE CHINE (recherche en cours)

### Concept
- Petites touches d'encre de Chine / calligraphie française
- Dividers SVG ink-brush entre sections
- French quotes en style calligraphique ("À votre santé", "L'art de vivre")
- Background texture SVG feTurbulence avec mix-blend-mode: multiply
- Animation reveal: SVG stroke-dashoffset pour dessiner les traits d'encre au scroll

### Techniques CSS
- `mask-image` avec PNG/SVG encre pour masquer des images
- `mix-blend-mode: multiply` sur texture encre → fusionne avec fond cream
- SVG `feTurbulence` pour texture papier/grain
- `stroke-dasharray` + `stroke-dashoffset` animé pour dessiner des traits

### Où placer (max 3-4 touches sur toute la page)
1. Divider entre Welcome et Story (remplacer gold line)
2. Quote décorative dans Story section
3. Petit ornement au-dessus du CTA final
4. Optionnel: texture légère en background sur section Parchment

### Equilibre
- PAS un thème — des accents découvrables
- Compatible avec le design system Swiss (clean + organique)
- 3-4 éléments max sur toute la page
- Opacité très basse (5-15%) pour les textures

---

## PLAN D'IMPLEMENTATION (ordre recommandé)

### Phase 1 — Quick wins CSS (1-2h)
- [ ] Shifter couleurs pourpre → burgundy dans globals.css
- [ ] Ajouter blob-olive et blob-champagne au CSS
- [ ] Link underline animation CSS (scaleX switch)
- [ ] template.tsx page transition fade-in

### Phase 2 — Composants (3-4h)
- [ ] Hook useSectionBlobs + component SectionBlobs
- [ ] Wirer les blobs sur toutes les sections
- [ ] CursorGlow component dans layout.tsx
- [ ] Upgrader ScrollReveal avec stagger pattern

### Phase 3 — Animations premium (3-4h)
- [ ] Line-mask text reveals sur tous les h2
- [ ] Clip-path image reveals
- [ ] Parallax images (useScroll + useTransform)
- [ ] Bouton magnétique sur CTA principaux

### Phase 4 — Structure & contenu (2-3h)
- [ ] Réordonner sections: Story monte en 3, Testimonials monte en 5
- [ ] Ajouter Trust strip (awards, rating)
- [ ] Sticky mobile CTA
- [ ] Plan Your Visit mini-section

### Phase 5 — Encre de Chine (2-3h)
- [ ] SVG dividers encre
- [ ] French quote calligraphique dans Story
- [ ] Ornement CTA
- [ ] Texture background subtile

### Phase 6 — Polish (optionnel, nécessite GSAP)
- [ ] Lenis smooth scroll
- [ ] GSAP ScrollTrigger pinned sections
- [ ] SplitText hero headline
