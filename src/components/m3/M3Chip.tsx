import React from 'react';
import { M3Icon } from './M3Icon';

export type M3ChipType = 'filter' | 'assist' | 'suggestion' | 'input';

interface M3ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  chipType?: M3ChipType;
  selected?: boolean;
  icon?: string;
  onRemove?: () => void;
  label: string;
}

export const M3Chip: React.FC<M3ChipProps> = ({
  chipType = 'filter',
  selected = false,
  icon,
  onRemove,
  label,
  className = '',
  disabled,
  onClick,
  ...props
}) => {
  let stateClasses = '';

  if (chipType === 'filter') {
    stateClasses = selected
      ? 'bg-secondary-container text-on-secondary-container border border-transparent font-medium'
      : 'bg-surface text-on-surface border border-outline-variant hover:bg-surface-container-high';
  } else if (chipType === 'assist' || chipType === 'suggestion') {
    stateClasses =
      'bg-surface-container-low text-on-surface border border-outline-variant/60 hover:bg-surface-container';
  } else {
    stateClasses =
      'bg-surface-container-highest text-on-surface border border-transparent';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`h-8 px-3 rounded-m3-sm inline-flex items-center gap-1.5 text-xs font-roboto transition-all select-none cursor-pointer active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none ${stateClasses} ${className}`}
      {...props}
    >
      {selected && chipType === 'filter' && (
        <M3Icon name="check" size={16} className="text-on-secondary-container" />
      )}
      {!selected && icon && <M3Icon name={icon} size={16} />}
      <span>{label}</span>
      {onRemove && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 -mr-1 p-0.5 rounded-full hover:bg-on-surface/10 cursor-pointer"
        >
          <M3Icon name="close" size={14} />
        </span>
      )}
    </button>
  );
};
