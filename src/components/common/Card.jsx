import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({
  children,
  className = '',
  hoverEffect = true,
  onClick,
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      onClick={onClick}
      className={twMerge(
        clsx(
          "bg-card/80 rounded-2xl border border-ivory-200/90 shadow-subtle p-6 transition-all duration-300",
          hoverEffect && "hover:border-ivory-400 hover:shadow-card hover:-translate-y-0.5",
          onClick && "cursor-pointer",
          className
        )
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
