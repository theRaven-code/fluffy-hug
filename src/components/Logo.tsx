import React from "react";

interface LogoProps {
  className?: string;
  isHuge?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", isHuge = false }) => {
  return (
    <img
      src="/images/logo.webp"
      alt="Logo"
      className={`${className} ${isHuge ? "huge-logo" : "logo"}`}
    />
  );
};

export default Logo;
