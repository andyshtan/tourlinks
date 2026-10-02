import React, { useState } from 'react';
import { M3Icon } from './M3Icon';

interface M3TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  leadingIcon?: string;
  trailingIcon?: string;
  helperText?: string;
  error?: string;
}

export const M3TextField: React.FC<M3TextFieldProps> = ({
  label,
  leadingIcon,
  trailingIcon,
  helperText,
  error,
  value,
  onChange,
  className = '',
  disabled,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== undefined && value !== '';

  return (
    <div className={`relative flex flex-col ${className}`}>
      <div
        className={`relative flex items-center h-14 px-4 rounded-m3-xs transition-all border ${
          error
            ? 'border-error bg-error-container/20'
            : isFocused
            ? 'border-primary border-2 bg-surface-container-highest/60'
            : 'border-outline-variant bg-surface-container-high/40 hover:border-outline'
        } ${disabled ? 'opacity-40 pointer-events-none' : ''}`}
      >
        {leadingIcon && (
          <span className="mr-3 text-on-surface-variant flex items-center">
            <M3Icon name={leadingIcon} size={20} />
          </span>
        )}

        <div className="relative flex-1 h-full flex items-center">
          <input
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className="w-full h-full pt-4 pb-1 bg-transparent text-sm text-on-surface font-roboto focus:outline-none placeholder-transparent"
            placeholder={label}
            {...props}
          />
          <label
            className={`absolute left-0 pointer-events-none font-roboto transition-all duration-150 ${
              isFocused || hasValue
                ? '-top-0.5 text-[11px] font-medium ' +
                  (error ? 'text-error' : isFocused ? 'text-primary' : 'text-on-surface-variant')
                : 'top-4 text-sm text-on-surface-variant'
            }`}
          >
            {label}
          </label>
        </div>

        {trailingIcon && (
          <span className="ml-2 text-on-surface-variant flex items-center">
            <M3Icon name={trailingIcon} size={20} />
          </span>
        )}
      </div>

      {(error || helperText) && (
        <span
          className={`text-xs mt-1 ml-4 font-roboto ${
            error ? 'text-error' : 'text-on-surface-variant'
          }`}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
};
