import { M3Icon } from './M3Icon';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
  icon?: string;
  badge?: number;
}

interface M3SegmentedButtonProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export function M3SegmentedButton<T extends string>({
  options,
  value,
  onChange,
  className = '',
  size = 'md',
}: M3SegmentedButtonProps<T>) {
  const heightClass = size === 'sm' ? 'h-9 text-xs' : 'h-10 text-sm';

  return (
    <div
      className={`inline-flex items-center rounded-m3-full border border-outline-variant/80 p-0.5 bg-surface overflow-hidden ${className}`}
      role="group"
    >
      {options.map((option, index) => {
        const isSelected = option.value === value;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`relative flex-1 ${heightClass} px-3.5 inline-flex items-center justify-center gap-1.5 font-roboto font-medium transition-all cursor-pointer select-none active:scale-[0.98] ${
              isFirst ? 'rounded-l-m3-full' : ''
            } ${isLast ? 'rounded-r-m3-full' : ''} ${
              isSelected
                ? 'bg-secondary-container text-on-secondary-container font-semibold shadow-xs'
                : 'text-on-surface hover:bg-surface-container-high'
            }`}
          >
            {isSelected && (
              <M3Icon name="check" size={16} className="text-on-secondary-container" />
            )}
            {!isSelected && option.icon && <M3Icon name={option.icon} size={16} />}
            <span>{option.label}</span>
            {option.badge !== undefined && (
              <span
                className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  isSelected
                    ? 'bg-on-secondary-container text-secondary-container'
                    : 'bg-primary-container text-on-primary-container'
                }`}
              >
                {option.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
