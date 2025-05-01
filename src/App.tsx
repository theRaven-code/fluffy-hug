import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { clsx } from "clsx";
import Loading from "./components/Loading";
import Planet from "./components/Planet";
import JapaneseText from "./components/JapaneseText";
import SocialLinks from "./components/SocialLinks";
import Logo from "./components/Logo";
import { images } from "./constants";
import { usePageManager } from "./hooks/usePageManager";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  const { currentPage, handleWheel, handleTouchStart, handleTouchMove } =
    usePageManager(isMobile);

  // Preload critical images
  useEffect(() => {
    const preloadImages = async () => {
      const criticalImages = [
        "/images/bg-2.png",
        "/images/bg-3.png",
        "/images/logo.webp",
        "/images/loading.webp",
      ];

      try {
        await Promise.all(
          criticalImages.map((src) => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = reject;
            });
          })
        );
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        setImagesLoaded(true); // Continue even if preloading fails
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (imagesLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [imagesLoaded]);

  useEffect(() => {
    if (!isLoading && bgRef.current) {
      gsap.fromTo(
        bgRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
      );
    }
  }, [isLoading]);

  useEffect(() => {
    if (currentPage === 2 && bgImageRef.current) {
      gsap.to(bgImageRef.current, {
        scale: 1.1,
        duration: 5,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
        zIndex: -10,
      });
    }
  }, [currentPage]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className="w-full h-screen relative bg-[#fcf6ec] overflow-hidden"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      role="application"
      aria-label="Interactive animal showcase"
    >
      {currentPage === 1 && (
        <div
          className="absolute w-full h-full"
          role="region"
          aria-label="First scene"
        >
          <img
            src="/images/bg-2.png"
            alt="Background scene with floating elements"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute w-full h-full pointer-events-none overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <Planet
                key={i}
                src={`/images/planet-${i + 1}.webp`}
                startLeft={20 + i * 20}
                duration={20 + i}
                delay={i * 2}
                size={100 + i * 20}
              />
            ))}
          </div>
        </div>
      )}

      {currentPage === 2 && (
        <div
          className="absolute w-full h-full"
          role="region"
          aria-label="Second scene"
        >
          <img
            src="/images/bg-2.png"
            alt="Background scene with floating elements"
            className="w-full h-full object-cover"
            ref={bgImageRef}
            loading="eager"
          />
          {[...Array(4)].map((_, i) => (
            <Planet
              key={i}
              src={`/images/planet-${i + 1}.webp`}
              startLeft={20 + i * 20}
              duration={20 + i * 3}
              delay={i * 2}
              size={100 + i * 20}
            />
          ))}
        </div>
      )}

      {currentPage === 3 && (
        <div
          className="absolute w-full h-full"
          role="region"
          aria-label="Third scene"
        >
          <img
            src="/images/bg-3.png"
            alt="Background scene with floating elements"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      )}

      <div role="banner">
        <Logo
          className="absolute opacity-0 -translate-y-1/2 top-[40vh] left-1/2 -translate-x-1/2 w-[84vw]"
          isHuge
        />
      </div>

      <div
        className={clsx(
          "absolute",
          "min-w-full min-h-full aspect-[1.5/1]",
          "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        )}
        role="region"
        aria-label="Character showcase"
      >
        {images.map((image, idx) =>
          idx === 13 ? (
            <div
              key={idx}
              className={clsx(
                "mc absolute top-0 w-[45%] left-1/2 translate-y-[13vh] -translate-x-1/2"
              )}
              role="img"
              aria-label="Main character"
            >
              <img
                src={image.src}
                alt="Main character"
                className={`w-full h-auto ${
                  idx % 2 === 0 ? "animate-jump" : "animate-jump-alt"
                }`}
                loading="lazy"
              />
            </div>
          ) : (
            <div
              key={idx}
              className={clsx("absolute top-0 w-[45%] human")}
              style={{
                top: image.pos.top + "%",
                left: image.pos.left + "%",
              }}
              role="img"
              aria-label={`Character ${idx + 1}`}
            >
              <div
                className={clsx(
                  "absolute w-full -translate-x-1/2 -translate-y-1/2"
                )}
              >
                <img
                  src={image.src}
                  alt={`Character ${idx + 1}`}
                  className={`w-full h-auto ${
                    idx % 2 === 0 ? "animate-jump" : "animate-jump-alt"
                  }`}
                  loading="lazy"
                />
              </div>
            </div>
          )
        )}
      </div>

      <div className="w-full h-full absolute left-0 right-0">
        <Logo className="absolute left-8 top-8 lg:top-10 lg:left-10 w-[40vw] lg:w-[30vw] max-w-[380px]" />
        <SocialLinks />
      </div>

      <JapaneseText />
    </div>
  );
};

export default App;
