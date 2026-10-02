import React from 'react';
import { M3Icon } from './M3Icon';

export type M3ButtonVariant = 'filled' | 'tonal' | 'outlined' | 'text' | 'icon';

interface M3ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: M3ButtonVariant;
  icon?: string;
  iconFilled?: boolean;
  trailingIcon?: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const M3Button: React.FC<M3ButtonProps> = ({
  variant = 'filled',
  icon,
  iconFilled = false,
  trailingIcon,
  children,
  fullWidth = false,
  size = 'md',
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-roboto font-medium tracking-wide transition-all select-none focus:outline-none cursor-pointer active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed';

  // Size styling
  const sizeClasses = {
    sm: 'h-8 px-3 text-xs gap-1.5 rounded-m3-full',
    md: 'h-10 px-5 text-sm gap-2 rounded-m3-full',
    lg: 'h-12 px-6 text-base gap-2.5 rounded-m3-full',
  }[size];

  // Variant styling according to M3 tokens
  let variantClasses = '';
  switch (variant) {
    case 'filled':
      variantClasses =
        'bg-primary text-on-primary hover:shadow-md hover:bg-[#004fa8] active:bg-[#00438f]';
      break;
    case 'tonal':
      variantClasses =
        'bg-secondary-container text-on-secondary-container hover:bg-[#86e2f1] active:bg-[#71d9eb]';
      break;
    case 'outlined':
      variantClasses =
        'bg-transparent border border-outline text-primary hover:bg-primary/8 active:bg-primary/12';
      break;
    case 'text':
      variantClasses =
        'bg-transparent text-primary hover:bg-primary/8 active:bg-primary/12 px-3';
      break;
    case 'icon':
      return (
        <button
          className={`w-10 h-10 rounded-full inline-flex items-center justify-center text-on-surface hover:bg-on-surface/8 active:bg-on-surface/12 transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none ${className}`}
          disabled={disabled}
          {...props}
        >
          {icon && <M3Icon name={icon} filled={iconFilled} size={22} />}
          {children}
        </button>
      );
  }

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <M3Icon name={icon} filled={iconFilled} size={size === 'sm' ? 18 : 20} />}
      {children}
      {trailingIcon && <M3Icon name={trailingIcon} size={size === 'sm' ? 18 : 20} />}
    </button>
  );
};
