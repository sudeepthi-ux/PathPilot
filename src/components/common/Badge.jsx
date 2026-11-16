import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Badge = ({
  children,
  variant = 'forest',
  size = 'md',
  className = '',
  dot = false,
  icon: Icon
}) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full tracking-tight transition-colors";

  const variants = {
    forest: "bg-forest-100 text-forest-900 border border-forest-200/80",
    ivory: "bg-ivory-100 text-charcoal-700 border border-ivory-300",
    charcoal: "bg-inverse text-on-inverse border border-inverse",
    subtle: "bg-sand-100 text-charcoal-600 border border-ivory-200",
    amber: "bg-amber-50 text-amber-800 border border-amber-200/80",
    outline: "bg-transparent text-charcoal-600 border border-ivory-300",
  };

  const sizes = {
    sm: "text-[11px] px-2.5 py-0.5 gap-1",
    md: "text-xs px-3 py-1 gap-1.5",
    lg: "text-sm px-3.5 py-1.5 gap-2"
  };

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-forest-600 animate-pulse" />
      )}
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
};
