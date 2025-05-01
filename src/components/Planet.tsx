import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (ref.current) {
      // Main right-to-left movement
      gsap.fromTo(
        ref.current,
        {
          x: "100vw",
          opacity: 0.4,
        },
        {
          x: "-100vw",
          opacity: 1,
          duration: 10,
          delay,
          ease: "none",
          repeat: -1,
        }
      );

      // Subtle floating animation
      gsap.to(ref.current, {
        y: "+=30",
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Subtle rotation
      gsap.to(ref.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    }
  }, [duration, delay, src]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${startLeft}%`,
        top: `${Math.random() * 100}%`,
        width: size,
        height: size,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <img src={src} alt="Planet" className="w-full h-full object-contain" />
    </div>
  );
};

export default Planet;
