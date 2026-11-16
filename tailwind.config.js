/**
 * PathPilot design tokens.
 *
 * Every colour is a CSS variable holding space-separated RGB channels
 * (see src/styles/index.css for the light + dark values), which lets Tailwind
 * keep full opacity-modifier support (`bg-card/80`, `border-ivory-200/60` …).
 * Components never need per-theme duplicates: the same class resolves to the
 * correct colour in whichever theme is active.
 */
const v = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

const scale = (family, shades) =>
  Object.fromEntries(shades.map((shade) => [shade, v(`${family}-${shade}`)]));

const FULL = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Theme is driven by <html data-theme="light|dark"> (set before first paint).
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // ── Core palette (remapped per theme via CSS variables) ──────────
        ivory: scale('ivory', [50, 100, 200, 300, 400, 500]),
        charcoal: scale('charcoal', [100, 200, 300, 400, 500, 600, 700, 800, 900, 950]),
        forest: scale('forest', FULL),
        sage: scale('sage', [50, 100, 200, 300]),
        sand: scale('sand', [50, 100, 200]),

        // ── Semantic tokens ──────────────────────────────────────────────
        card: v('card'),                 // raised surfaces: cards, modals, inputs
        muted: v('muted'),               // hover / subtle fill surfaces
        overlay: v('overlay'),           // modal & drawer scrims
        accent: {
          DEFAULT: v('accent'),          // primary buttons, selected states, fills
          hover: v('accent-hover'),
          soft: v('accent-soft'),        // light icon colour on accent surfaces
        },
        'on-accent': v('on-accent'),     // text/icon colour on accent surfaces
        inverse: v('inverse'),           // high-contrast chips (avatars, toggles)
        'on-inverse': v('on-inverse'),
        danger: {
          DEFAULT: v('danger'),
          hover: v('danger-hover'),
        },

        // ── Status colours (re-tuned for dark surfaces) ──────────────────
        red: scale('red', FULL),
        amber: scale('amber', FULL),
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Newsreader', 'Playfair Display', 'Georgia', 'serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Shadow colour + strength are theme variables so depth stays natural
        // in dark mode (deeper, pure-black shadows) instead of washing out.
        'subtle': '0 1px 2px rgb(var(--shadow-rgb) / calc(0.04 * var(--shadow-k))), 0 4px 12px rgb(var(--shadow-rgb) / calc(0.03 * var(--shadow-k)))',
        'card': '0 4px 20px -2px rgb(var(--shadow-rgb) / calc(0.05 * var(--shadow-k))), 0 2px 6px -1px rgb(var(--shadow-rgb) / calc(0.03 * var(--shadow-k)))',
        'elevated': '0 12px 32px -4px rgb(var(--shadow-rgb) / calc(0.08 * var(--shadow-k))), 0 4px 12px -2px rgb(var(--shadow-rgb) / calc(0.04 * var(--shadow-k)))',
        'float': '0 24px 48px -12px rgb(var(--shadow-rgb) / calc(0.12 * var(--shadow-k))), 0 8px 16px -4px rgb(var(--shadow-rgb) / calc(0.06 * var(--shadow-k)))',
        'inner-light': 'inset 0 1px 0 0 rgb(var(--highlight-rgb) / var(--highlight-a))',
        'glow-forest': '0 0 30px -8px rgb(var(--glow-rgb) / var(--glow-a))',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        pulseSubtle: 'pulseSubtle 3s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
      }
    },
  },
  plugins: [],
}
