import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PlanetProps } from "../types";

const Planet: React.FC<PlanetProps> = ({
  src,
  startLeft,
  duration,
  delay,
  size,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    // Reduce animation complexity on mobile
    const reducedAnimations = isMobile;

    // Main right-to-left movement
    const mainAnimation = gsap.fromTo(
      ref.current,
      {
        x: "100vw",
        opacity: 0.4,
      },
      {
        x: "-100vw",
        opacity: 1,
        duration: reducedAnimations ? 15 : 10, // Slower on mobile
        delay,
        ease: "none",
        repeat: -1,
      }
    );

    // Subtle floating animation - reduced on mobile
    const floatAnimation = gsap.to(ref.current, {
      y: reducedAnimations ? "+=15" : "+=30",
      duration: reducedAnimations ? 3 : 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Subtle rotation - reduced on mobile
    const rotationAnimation = gsap.to(ref.current, {
      rotation: 360,
      duration: reducedAnimations ? 30 : 20,
      repeat: -1,
      ease: "none",
    });

    // Cleanup animations on unmount
    return () => {
      mainAnimation.kill();
      floatAnimation.kill();
      rotationAnimation.kill();
    };
  }, [duration, delay, src, isMobile]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Floating planet"
      style={{
        position: "absolute",
        left: `${startLeft}%`,
        top: `${Math.random() * 100}%`,
        width: isMobile ? size * 0.7 : size, // Smaller on mobile
        height: isMobile ? size * 0.7 : size,
        pointerEvents: "none",
        zIndex: 10,
        willChange: "transform", // Optimize for animations
      }}
    >
      <img
        src={src}
        alt={`Floating planet ${src.split("-")[1]?.split(".")[0] || ""}`}
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </div>
  );
};

export default Planet;
