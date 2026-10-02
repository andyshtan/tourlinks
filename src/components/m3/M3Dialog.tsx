import React, { useEffect } from 'react';
import { M3Icon } from './M3Icon';

interface M3DialogProps {
  open: boolean;
  onClose: () => void;
  icon?: string;
  headline: string;
  supportingText?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
}

export const M3Dialog: React.FC<M3DialogProps> = ({
  open,
  onClose,
  icon,
  headline,
  supportingText,
  children,
  actions,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-xl',
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`w-full ${maxWidthClass} rounded-m3-xl bg-surface-container-high text-on-surface m3-elevation-3 p-6 flex flex-col shadow-2xl transition-all scale-100 animate-in zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {icon && (
          <div className="mb-4 text-secondary flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <M3Icon name={icon} size={28} />
            </div>
          </div>
        )}

        <h3 className="text-xl font-bold font-roboto tracking-tight text-on-surface text-center sm:text-left">
          {headline}
        </h3>

        {supportingText && (
          <p className="mt-2 text-sm text-on-surface-variant font-roboto leading-relaxed text-center sm:text-left">
            {supportingText}
          </p>
        )}

        {children && <div className="mt-4 flex-1">{children}</div>}

        {actions && (
          <div className="mt-6 flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/30">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
