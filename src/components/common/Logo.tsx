import React from 'react';

interface LogoProps {
  className?: string;
}

// Text-only wordmark: heavy lowercase, two brand colours, dotless "i". Size comes from className.
export const Logo: React.FC<LogoProps> = ({ className = '' }) => (
  <span
    role="img"
    aria-label="Tourlinks"
    className={`font-logo font-black tracking-[-0.035em] leading-none select-none whitespace-nowrap ${className}`}
  >
    <span aria-hidden="true" className="text-primary">tour</span>
    <span aria-hidden="true" className="text-[#00A3B4]">lınks</span>
  </span>
);
