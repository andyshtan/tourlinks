import React from 'react';

export type M3BadgeVariant = 'primary' | 'secondary' | 'tertiary' | 'error' | 'surface';

interface M3BadgeProps {
  label?: string | number;
  variant?: M3BadgeVariant;
  dot?: boolean;
  className?: string;
}

export const M3Badge: React.FC<M3BadgeProps> = ({
  label,
  variant = 'primary',
  dot = false,
  className = '',
}) => {
  let colorClass = '';
  switch (variant) {
    case 'primary':
      colorClass = 'bg-primary-container text-on-primary-container';
      break;
    case 'secondary':
      colorClass = 'bg-secondary-container text-on-secondary-container';
      break;
    case 'tertiary':
      colorClass = 'bg-tertiary-container text-on-tertiary-container';
      break;
    case 'error':
      colorClass = 'bg-error-container text-on-error-container';
      break;
    case 'surface':
      colorClass = 'bg-surface-container-highest text-on-surface';
      break;
  }

  if (dot) {
    return (
      <span
        className={`w-2 h-2 rounded-full inline-block ${
          variant === 'error'
            ? 'bg-error'
            : variant === 'primary'
            ? 'bg-primary'
            : 'bg-secondary'
        } ${className}`}
      />
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-0.5 rounded-m3-full text-[11px] font-bold font-roboto tracking-wide leading-none ${colorClass} ${className}`}
    >
      {label}
    </span>
  );
};
