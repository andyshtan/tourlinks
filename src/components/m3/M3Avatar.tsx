import React from 'react';

interface M3AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

// Initials avatar: the demo uses these instead of stock photos of real people
export const M3Avatar: React.FC<M3AvatarProps> = ({ name, size = 40, className = '' }) => {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

  return (
    <span
      role="img"
      aria-label={name}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }}
      className={`rounded-full inline-flex items-center justify-center font-extrabold font-roboto shrink-0 select-none bg-secondary-container text-on-secondary-container ${className}`}
    >
      {initials}
    </span>
  );
};
