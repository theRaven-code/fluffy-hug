import React from "react";
import { clsx } from "clsx";

const SocialLinks: React.FC = () => {
  return (
    <nav
      className="absolute bottom-8 left-8 lg:left-10 flex space-x-5"
      aria-label="Social media links"
    >
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join our Discord community"
      >
        <img
          src="/images/discord.svg"
          alt="Discord"
          className={clsx("w-10 h-10", "transition hover:scale-95")}
        />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit our OpenSea collection"
      >
        <img
          src="/images/opensea.svg"
          alt="OpenSea"
          className={clsx("w-10 h-10", "transition hover:scale-95")}
        />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Twitter"
      >
        <img
          src="/images/twitter.svg"
          alt="Twitter"
          className={clsx(
            "w-10 h-10",
            "transition duration-300 hover:scale-95"
          )}
        />
      </a>
    </nav>
  );
};

export default SocialLinks;
