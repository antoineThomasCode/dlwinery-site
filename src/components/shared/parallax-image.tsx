"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  speed?: number; // multiplier, default 0.1 = [-10%, 10%]
  priority?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  sizes = "100vw",
  className = "",
  speed = 0.1,
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${speed * 100}%`, `${speed * 100}%`]
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div className="relative w-full h-[120%] -top-[10%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+e9fPQAJoQN4oGLsFwAAAABJRU5ErkJggg=="
        />
      </motion.div>
    </div>
  );
}
