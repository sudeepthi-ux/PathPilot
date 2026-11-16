import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const publicLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'How It Works', href: '/#how-it-works' }
  ];

  const authenticatedLinks = [
    { name: 'Home', href: '/' },
    { name: 'Discover', href: '/careers' },
    { name: 'Experiments', href: '/experiments' },
    { name: 'Assessments', href: '/assessment/personality' },
    { name: 'AI Guide', href: '/advisor' }
  ];

  const navLinks = user ? authenticatedLinks : publicLinks;

  const isActive = (path) => {
    if (path === '/') {
      return (location.pathname === '/' && !location.hash) || location.pathname === '/home';
    }
    if (path === '/#how-it-works') {
      return location.pathname === '/' && location.hash === '#how-it-works';
    }
    if (path === '/about') {
      return location.pathname === '/about' || (location.pathname === '/' && location.hash === '#about');
    }
    if (path === '/assessment/personality') {
      return location.pathname.startsWith('/assessment');
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    setMobileOpen(false);
    await logout();
    navigate('/', { replace: true });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ivory-50/90 backdrop-blur-md border-b border-ivory-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LEFT: Logo & Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-accent text-on-accent flex items-center justify-center transition-transform group-hover:scale-105">
            <Compass className="w-4 h-4 text-accent-soft" />
          </div>
          <span className="font-semibold text-base tracking-tight text-charcoal-900">
            PathPilot
          </span>
        </Link>

        {/* CENTER: Public or Authenticated Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm transition-colors ${
                isActive(link.href)
                  ? 'text-charcoal-900 font-semibold'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT: Theme Toggle + Authenticated (Dashboard & Sign Out) OR Public (Login & Get Started) */}
        <div className="hidden md:flex items-center gap-3.5">
          <ThemeToggle variant="compact" />
          {user ? (
            <div className="flex items-center gap-3.5">
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'text-forest-900 font-semibold'
                    : 'text-charcoal-700 hover:text-charcoal-900'
                }`}
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-full border border-ivory-200 bg-card hover:bg-muted text-xs font-medium text-charcoal-700 hover:text-charcoal-900 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-full border border-ivory-300 bg-card hover:bg-muted text-xs font-semibold text-charcoal-800 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-full bg-accent hover:bg-accent-hover text-on-accent text-xs font-semibold tracking-tight transition-all duration-200 shadow-sm active:scale-95"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Theme Switch & Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle variant="compact" />
          {!user && (
            <Link
              to="/login"
              className="px-3 py-1.5 rounded-full border border-ivory-300 bg-card text-xs font-semibold text-charcoal-800"
            >
              Login
            </Link>
          )}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 text-charcoal-700 hover:text-charcoal-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Clean Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-ivory-50 border-b border-ivory-200 px-6 py-5 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm py-1 transition-colors ${
                  isActive(link.href)
                    ? 'text-charcoal-900 font-semibold'
                    : 'text-charcoal-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-ivory-200 space-y-3">
            <ThemeToggle variant="labeled" />
            {user ? (
              <div className="flex items-center justify-between w-full">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-semibold text-forest-800"
                >
                  Dashboard →
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs font-medium text-charcoal-600"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 w-full justify-between">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 rounded-full border border-ivory-300 bg-card text-xs font-semibold text-charcoal-800"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 rounded-full bg-accent text-on-accent text-xs font-semibold"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
