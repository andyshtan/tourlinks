import React from 'react';

interface M3IconProps {
  name: string;
  filled?: boolean;
  className?: string;
  size?: number;
}

export const M3Icon: React.FC<M3IconProps> = ({
  name,
  filled = false,
  className = '',
  size = 24,
}) => {
  return (
    <span
      className={`material-symbols-rounded select-none inline-flex items-center justify-center leading-none ${
        filled ? 'filled' : 'outlined'
      } ${className}`}
      style={{ fontSize: `${size}px`, width: `${size}px`, height: `${size}px` }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
};
