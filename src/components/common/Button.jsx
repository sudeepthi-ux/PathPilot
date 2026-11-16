import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-forest-600/30 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none tracking-tight";

  const variants = {
    primary: "bg-accent hover:bg-accent-hover text-on-accent border border-on-accent/15 shadow-sm hover:shadow",
    secondary: "bg-ivory-100 hover:bg-ivory-200/90 text-charcoal-800 border border-ivory-300/80 shadow-subtle hover:border-ivory-400",
    dark: "bg-inverse hover:bg-inverse/90 text-on-inverse border border-inverse shadow-sm",
    outline: "bg-transparent hover:bg-ivory-200/50 text-charcoal-800 border border-ivory-300/90",
    ghost: "bg-transparent hover:bg-ivory-200/60 text-charcoal-700 hover:text-charcoal-900",
    forestLight: "bg-forest-100/80 hover:bg-forest-200/80 text-forest-900 border border-forest-200"
  };

  const sizes = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-4.5 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5 font-semibold"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className={size === 'sm' ? "w-3.5 h-3.5" : size === 'lg' ? "w-5 h-5" : "w-4 h-4"} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className={size === 'sm' ? "w-3.5 h-3.5" : size === 'lg' ? "w-5 h-5" : "w-4 h-4"} />}
    </button>
  );
};
