import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// -- DOM APIs --
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

class MockMutationObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
}
vi.stubGlobal("MutationObserver", MockMutationObserver);

vi.stubGlobal(
  "matchMedia",
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
);

window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;

// -- Next.js --
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    const { fill, priority, ...rest } = props;
    void fill;
    void priority;
    return <img {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  },
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    ...props
  }: React.PropsWithChildren<Record<string, unknown>>) => (
    <a {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
      {children}
    </a>
  ),
}));

// -- GSAP --
vi.mock("gsap", () => {
  const tl = {
    to: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    fromTo: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    kill: vi.fn(),
  };
  return {
    default: {
      to: vi.fn(),
      from: vi.fn(),
      fromTo: vi.fn(),
      set: vi.fn(),
      timeline: vi.fn(() => tl),
      registerPlugin: vi.fn(),
      context: vi.fn(() => ({ revert: vi.fn() })),
    },
    gsap: {
      to: vi.fn(),
      from: vi.fn(),
      fromTo: vi.fn(),
      set: vi.fn(),
      timeline: vi.fn(() => tl),
      registerPlugin: vi.fn(),
      context: vi.fn(() => ({ revert: vi.fn() })),
    },
  };
});

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: { create: vi.fn(), refresh: vi.fn(), getAll: vi.fn(() => []) },
  default: { create: vi.fn(), refresh: vi.fn(), getAll: vi.fn(() => []) },
}));

// -- Lenis --
vi.mock("lenis", () => ({
  default: vi.fn().mockImplementation(() => ({
    on: vi.fn(),
    destroy: vi.fn(),
    raf: vi.fn(),
  })),
}));

// -- Framer Motion --
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>(
    "framer-motion"
  );
  return {
    ...actual,
    AnimatePresence: ({ children }: React.PropsWithChildren) => children,
    motion: new Proxy(
      {},
      {
        get: (_target, prop) => {
          if (typeof prop === "string") {
            return (props: React.PropsWithChildren<Record<string, unknown>>) => {
              const {
                initial,
                animate,
                exit,
                whileHover,
                whileTap,
                whileInView,
                transition,
                variants,
                viewport,
                onAnimationComplete,
                layout,
                layoutId,
                ...rest
              } = props;
              void initial; void animate; void exit; void whileHover;
              void whileTap; void whileInView; void transition;
              void variants; void viewport; void onAnimationComplete;
              void layout; void layoutId;
              const Tag = prop as keyof React.JSX.IntrinsicElements;
              return <Tag {...(rest as Record<string, unknown>)} />;
            };
          }
          return undefined;
        },
      }
    ),
    useAnimation: () => ({ start: vi.fn(), set: vi.fn() }),
    useInView: () => true,
    useScroll: () => ({
      scrollY: { get: () => 0, onChange: vi.fn() },
      scrollYProgress: { get: () => 0, onChange: vi.fn() },
    }),
    useTransform: () => 0,
    useMotionValue: (v: number) => ({ get: () => v, set: vi.fn(), onChange: vi.fn() }),
    useSpring: (v: number) => ({ get: () => v, set: vi.fn(), onChange: vi.fn() }),
  };
});
