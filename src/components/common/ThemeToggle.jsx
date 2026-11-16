import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * Theme switch with a sun (Light) and moon (Dark) icon.
 * The sliding thumb + highlighted icon clearly show the current theme.
 *
 * variant="compact"  → icon-only pill for the navbar
 * variant="labeled"  → pill with "Light" / "Dark" text for drawers & sidebars
 */
export const ThemeToggle = ({ variant = 'compact', className = '' }) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const labeled = variant === 'labeled';

  const options = [
    { value: 'light', label: 'Light', Icon: Sun },
    { value: 'dark', label: 'Dark', Icon: Moon }
  ];

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={`relative inline-flex items-center p-0.5 rounded-full bg-ivory-100 border border-ivory-200 ${
        labeled ? 'w-full' : ''
      } ${className}`}
    >
      {/* Sliding thumb */}
      <span
        aria-hidden="true"
        className={`absolute top-0.5 bottom-0.5 rounded-full bg-card border border-ivory-200 shadow-subtle transition-all duration-300 ease-out ${
          labeled ? 'w-[calc(50%-2px)]' : 'w-7'
        }`}
        style={{
          left: labeled ? (isDark ? 'calc(50%)' : '2px') : isDark ? '30px' : '2px'
        }}
      />

      {options.map(({ value, label, Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-pressed={active}
            aria-label={`${label} mode${active ? ' (current)' : ''}`}
            title={`${label} mode`}
            className={`relative z-10 inline-flex items-center justify-center gap-1.5 rounded-full text-xs font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600/60 ${
              labeled ? 'flex-1 h-8 px-3' : 'w-7 h-7'
            } ${
              active
                ? 'text-forest-800'
                : 'text-charcoal-400 hover:text-charcoal-700'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${active ? '' : 'opacity-90'}`} strokeWidth={active ? 2.4 : 2} />
            {labeled && <span>{label}</span>}
          </button>
        );
      })}

      <span className="sr-only" aria-live="polite">
        {isDark ? 'Dark mode is on' : 'Light mode is on'}
      </span>
    </div>
  );
};
