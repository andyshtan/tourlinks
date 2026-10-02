import React from 'react';

export type M3CardVariant = 'elevated' | 'filled' | 'outlined';

interface M3CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: M3CardVariant;
  rounded?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
}

export const M3Card: React.FC<M3CardProps> = ({
  variant = 'filled',
  rounded = 'lg',
  interactive = false,
  className = '',
  children,
  ...props
}) => {
  const roundedClass = {
    sm: 'rounded-m3-sm',
    md: 'rounded-m3-md',
    lg: 'rounded-m3-lg',
    xl: 'rounded-m3-xl',
  }[rounded];

  let variantClass = '';
  switch (variant) {
    case 'elevated':
      variantClass = 'bg-surface-container-lowest m3-elevation-1 text-on-surface';
      break;
    case 'filled':
      variantClass = 'bg-surface-container text-on-surface';
      break;
    case 'outlined':
      variantClass = 'bg-surface border border-outline-variant/70 text-on-surface';
      break;
  }

  const interactiveClass = interactive
    ? 'cursor-pointer transition-all duration-200 hover:m3-elevation-2 active:scale-[0.99] hover:bg-surface-container-high'
    : '';

  return (
    <div
      className={`overflow-hidden transition-colors ${roundedClass} ${variantClass} ${interactiveClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
