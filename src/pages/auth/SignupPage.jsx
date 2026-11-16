import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Compass, Eye, EyeOff, Lock, Mail, User, GraduationCap, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, loading: authLoading, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  if (user && !authLoading) {
    return <Navigate to="/" replace />;
  }

  // Password strength score (0 to 4)
  const calculateStrength = (pwd) => {
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  };
  const strength = calculateStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your full student name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please provide a valid academic or personal email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      await signup({ name: name.trim(), email: normalizedEmail, password, university, major });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to create student account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to authenticate via Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-ivory-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-forest-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-lg w-full space-y-6">
        {/* Header with Brand */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-accent text-on-accent flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-accent-soft" />
            </div>
            <span className="font-bold text-xl tracking-tight text-charcoal-900">
              Path<span className="text-forest-700">Pilot</span>
            </span>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal-900">
            Define your career conviction
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 font-serif italic">
            "Every discovery brings you closer to your purpose."
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-3xl border border-ivory-300 shadow-card p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium animate-fadeIn">
              {error}
            </div>
          )}

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full py-3 px-4 rounded-full border border-ivory-300 hover:border-ivory-400 bg-card hover:bg-sand-50/70 text-charcoal-800 text-xs font-semibold flex items-center justify-center gap-3 transition-all shadow-subtle active:scale-[0.99]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.09z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Sign up with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-ivory-200 w-full" />
            <span className="bg-card px-3 text-[11px] uppercase tracking-wider font-semibold text-charcoal-400 absolute">
              or student credentials
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                Full Student Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Marcus Chen"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-ivory-50 border border-ivory-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marcus@umich.edu"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-ivory-50 border border-ivory-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                  University / College
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="e.g. UMich, Stanford"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-ivory-50 border border-ivory-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                  Major / Discipline
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    placeholder="e.g. Mechanical Eng"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-ivory-50 border border-ivory-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  required
                  className="w-full pl-10 pr-11 py-2.5 rounded-2xl bg-ivory-50 border border-ivory-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength indicator */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1 h-1.5">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`flex-1 rounded-full transition-all ${
                          step <= strength
                            ? strength <= 1
                              ? 'bg-amber-500'
                              : strength <= 2
                              ? 'bg-amber-600'
                              : 'bg-forest-600'
                            : 'bg-ivory-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-charcoal-400">
                    {strength <= 1 && 'Weak password'}
                    {strength === 2 && 'Fair — consider adding numbers or symbols'}
                    {strength >= 3 && 'Strong student password'}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-ivory-50 border border-ivory-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full justify-center mt-2"
              icon={ArrowRight}
              iconPosition="right"
            >
              {loading ? 'Creating Student Profile...' : 'Begin Career Trajectory'}
            </Button>
          </form>
        </div>

        {/* Login Link */}
        <div className="text-center text-xs text-charcoal-500">
          Already have an account?{' '}
          <Link to="/login" className="text-forest-800 font-bold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
