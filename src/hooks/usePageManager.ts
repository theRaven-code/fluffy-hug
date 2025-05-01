import { useState, useRef } from "react";
import gsap from "gsap";
import { AnimationConfig } from "../types";

export const usePageManager = (isMobile: boolean) => {
  const [currentPage, setCurrentPage] = useState(0);
  const animating = useRef(false);
  const prevClientY = useRef(0);

  const mcAnimations: AnimationConfig[] = [
    {
      rotateZ: 0,
      scale: 1,
      y: "13vh",
      xPercent: -50,
    },
    {
      rotateZ: -90,
      scale: isMobile ? 0.3 : 0.46,
      y: "-25vh",
      xPercent: -50,
    },
    {
      rotateZ: 0,
      scale: isMobile ? 0.3 : 0.4,
      y: isMobile ? "0vh" : "-12vh",
      xPercent: isMobile ? -50 : -100,
    },
  ];

  const humanAnimations = [
    {
      x: 0,
      y: 0,
    },
    {
      y: "112vh",
      x: "112vw",
    },
    {
      y: "112vh",
      x: "112vw",
    },
  ];

  const logoAnimations = [
    {
      opacity: 1,
    },
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
  ];

  const hugeLogoAnimations = [
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
    {
      opacity: 0,
    },
  ];

  const jpTextAnimations = [
    {
      opacity: 0,
    },
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
  ];

  const pageChange = (opt = 1) => {
    if (animating.current) return;

    const newPage = currentPage + opt;
    const nextPage = newPage >= 3 ? 0 : newPage < 0 ? 2 : newPage;

    setCurrentPage(nextPage);
    animating.current = true;

    try {
      gsap.to(".human", {
        ...humanAnimations[nextPage],
        duration: 0.6,
        stagger: 0.01,
        ease: "power1.inOut",
      });

      gsap.to(".jp-text", {
        ...jpTextAnimations[nextPage],
        duration: 0.4,
        ease: "power1.inOut",
      });

      gsap.to(".logo", {
        ...logoAnimations[nextPage],
        duration: 0.4,
        ease: "power1.inOut",
      });

      gsap.to(".huge-logo", {
        ...hugeLogoAnimations[nextPage],
        duration: 0.4,
        delay: nextPage === 1 ? 0.4 : 0,
        ease: "power1.inOut",
      });

      gsap.to(".mc", {
        ...mcAnimations[nextPage],
        duration: 0.6,
        ease: "power1.inOut",
        onComplete: () => {
          animating.current = false;
        },
      });
    } catch (error) {
      console.error("Animation error:", error);
      animating.current = false;
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (animating.current) return;

    if (e.deltaY > 0) {
      pageChange(1);
    } else {
      pageChange(-1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    prevClientY.current = touch.clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];

    if (animating.current) return;

    if (touch.clientY < prevClientY.current) {
      pageChange(1);
    } else {
      pageChange(-1);
    }
  };

  return {
    currentPage,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
  };
};
