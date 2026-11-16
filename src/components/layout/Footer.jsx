import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Footer = () => {
  const { user } = useAuth();

  return (
    <footer className="bg-ivory-50 border-t border-ivory-200 py-14 text-charcoal-600">
      <div className="max-w-6xl mx-auto px-6">
        {/* Quote & Brand Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 border-b border-ivory-200">
          <div className="space-y-1.5">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-accent text-on-accent flex items-center justify-center">
                <Compass className="w-3.5 h-3.5 text-accent-soft" />
              </div>
              <span className="font-semibold text-base text-charcoal-900 tracking-tight">
                PathPilot
              </span>
            </Link>
            <p className="text-xs text-charcoal-500 max-w-sm">
              Helping students discover what they're good at and find career paths they genuinely enjoy.
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="font-serif italic text-sm text-charcoal-700">
              "Your future begins with understanding yourself."
            </p>
            <p className="text-[11px] text-charcoal-400 mt-1">
              PathPilot Student Discovery
            </p>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          {user ? (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link to="/" className="hover:text-charcoal-900 transition-colors">Home</Link>
              <Link to="/careers" className="hover:text-charcoal-900 transition-colors">Discover</Link>
              <Link to="/experiments" className="hover:text-charcoal-900 transition-colors">Experiments</Link>
              <Link to="/assessment/personality" className="hover:text-charcoal-900 transition-colors">Assessments</Link>
              <Link to="/advisor" className="hover:text-charcoal-900 transition-colors">AI Guide</Link>
              <Link to="/dashboard" className="hover:text-charcoal-900 transition-colors">Dashboard</Link>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link to="/" className="hover:text-charcoal-900 transition-colors">Home</Link>
              <Link to="/about" className="hover:text-charcoal-900 transition-colors">About</Link>
              <Link to="/#how-it-works" className="hover:text-charcoal-900 transition-colors">How It Works</Link>
              <Link to="/login" className="hover:text-charcoal-900 transition-colors">Login</Link>
              <Link to="/signup" className="hover:text-forest-800 font-medium transition-colors">Sign Up</Link>
            </div>
          )}

          <div className="text-[11px] text-charcoal-400">
            © {new Date().getFullYear()} PathPilot. Made with care for students everywhere.
          </div>
        </div>
      </div>
    </footer>
  );
};
