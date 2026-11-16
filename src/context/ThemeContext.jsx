import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Centralised theme management for PathPilot.
 *
 * - Source of truth is the `data-theme` attribute on <html> (read by the CSS
 *   design tokens in src/styles/index.css and Tailwind's `dark:` selector).
 * - The very first value is applied by the inline script in index.html before
 *   React mounts, so there is never a flash of the wrong theme.
 * - The explicit user choice is stored under THEME_STORAGE_KEY. It is a
 *   device preference, deliberately independent of authentication, so logging
 *   out / in keeps it.
 * - With no saved choice we follow the system preference (light by default).
 */
export const THEME_STORAGE_KEY = 'pathpilot_theme_preference';
const THEME_COLORS = { light: '#FAF9F5', dark: '#0F1512' };
const TRANSITION_MS = 420;

const ThemeContext = createContext(null);

const isValidTheme = (value) => value === 'light' || value === 'dark';

const readSavedTheme = () => {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isValidTheme(saved) ? saved : null;
  } catch {
    return null;
  }
};

const getSystemTheme = () => {
  try {
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

/** Applies a theme to the document (idempotent). */
const applyThemeToDocument = (theme) => {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_COLORS[theme]);
};

const getInitialTheme = () => {
  if (typeof document === 'undefined') return 'light';
  // The inline script has already resolved saved choice → system → light.
  const fromDom = document.documentElement.getAttribute('data-theme');
  if (isValidTheme(fromDom)) return fromDom;
  return readSavedTheme() || getSystemTheme();
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getInitialTheme);
  // True once the visitor has made an explicit choice (then system changes are ignored).
  const hasExplicitChoice = useRef(readSavedTheme() !== null);
  const transitionTimer = useRef(null);

  const commitTheme = useCallback((next, { animate = true } = {}) => {
    if (!isValidTheme(next)) return;
    const root = document.documentElement;

    if (animate && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('theme-transitioning');
      window.clearTimeout(transitionTimer.current);
      transitionTimer.current = window.setTimeout(() => {
        root.classList.remove('theme-transitioning');
      }, TRANSITION_MS);
    }

    applyThemeToDocument(next);
    setThemeState(next);
  }, []);

  /** Explicit user choice – persisted on this device. */
  const setTheme = useCallback(
    (next) => {
      if (!isValidTheme(next)) return;
      hasExplicitChoice.current = true;
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Storage can be unavailable (private mode); the theme still applies for this session.
      }
      commitTheme(next);
    },
    [commitTheme]
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  // Keep the DOM in sync on mount (covers HMR / edge cases where the inline script was skipped).
  useEffect(() => {
    applyThemeToDocument(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Follow OS changes only while the visitor has not chosen a theme.
  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!media) return undefined;
    const onChange = (event) => {
      if (hasExplicitChoice.current) return;
      commitTheme(event.matches ? 'dark' : 'light');
    };
    media.addEventListener?.('change', onChange);
    return () => media.removeEventListener?.('change', onChange);
  }, [commitTheme]);

  // Keep multiple tabs consistent.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      if (isValidTheme(event.newValue)) {
        hasExplicitChoice.current = true;
        commitTheme(event.newValue);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [commitTheme]);

  useEffect(() => () => window.clearTimeout(transitionTimer.current), []);

  const value = useMemo(
    () => ({ theme, isDark: theme === 'dark', setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
