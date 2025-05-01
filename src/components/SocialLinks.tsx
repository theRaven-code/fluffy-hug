import React from "react";
import { clsx } from "clsx";

const SocialLinks: React.FC = () => {
  return (
    <div className="absolute bottom-8 left-8 lg:left-10 flex space-x-5">
      <a href="#" target="_blank" rel="noopener noreferrer">
        <img
          src="/images/discord.svg"
          alt="Discord"
          className={clsx("w-10 h-10", "transition hover:scale-95")}
        />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <img
          src="/images/opensea.svg"
          alt="OpenSea"
          className={clsx("w-10 h-10", "transition hover:scale-95")}
        />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <img
          src="/images/twitter.svg"
          alt="Twitter"
          className={clsx(
            "w-10 h-10",
            "transition duration-300 hover:scale-95"
          )}
        />
      </a>
    </div>
  );
};

export default SocialLinks;
