import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Compass, Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { ForgotPasswordModal } from '../../components/auth/ForgotPasswordModal';

export const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const initialEmail = location.state?.email || searchParams.get('email') || '';
  const isResetSuccess = searchParams.get('reset') === 'success';
  const isRecoveryRedirect =
    searchParams.get('reset') === 'true' || (location.hash || '').includes('type=recovery');

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(() =>
    isResetSuccess
      ? 'Your password has been updated successfully! Please sign in with your new password.'
      : ''
  );
  const [loading, setLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(
    () => searchParams.get('forgot') === 'true'
  );

  const { user, loading: authLoading, login, loginWithGoogle, loadDemoStudent } = useAuth();
  const navigate = useNavigate();
  const redirectTarget = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (initialEmail && !email) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  useEffect(() => {
    // Forward any recovery redirect hitting /login?reset=true or #type=recovery to /reset-password
    if (isRecoveryRedirect) {
      navigate(`/reset-password${location.search}${location.hash}`, { replace: true });
    }
  }, [isRecoveryRedirect, location.search, location.hash, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-ivory-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-forest-800 text-sm font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-forest-600 animate-ping" />
          <span>Checking active session...</span>
        </div>
      </div>
    );
  }

  // Already logged-in users automatically continue to dashboard or requested page
  if (user && !isRecoveryRedirect) {
    return <Navigate to={redirectTarget} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await login({ email, password });
      navigate(redirectTarget, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate(redirectTarget, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to authenticate with Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    loadDemoStudent();
    navigate(redirectTarget, { replace: true });
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-ivory-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-forest-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-md w-full space-y-6">
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
            Welcome back to your trajectory
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 font-serif italic">
            "Your future begins with understanding yourself."
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-3xl border border-ivory-300 shadow-card p-6 sm:p-8 space-y-6">
          {successMessage && (
            <div
              role="status"
              className="p-3.5 rounded-2xl bg-forest-50 border border-forest-200 text-forest-900 text-xs font-medium flex items-start gap-2.5 animate-fadeIn"
            >
              <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium animate-fadeIn"
            >
              {error}
            </div>
          )}

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleLogin}
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
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-ivory-200 w-full" />
            <span className="bg-card px-3 text-[11px] uppercase tracking-wider font-semibold text-charcoal-400 absolute">
              or email
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                Academic or Personal Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-ivory-50 border border-ivory-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-xs text-forest-800 hover:underline font-semibold"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-11 py-2.5 rounded-2xl bg-ivory-50 border border-ivory-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
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
              {loading ? 'Authenticating...' : 'Sign In to PathPilot'}
            </Button>
          </form>

          {/* Quick Demo Evaluation Option */}
          <div className="p-3.5 rounded-2xl bg-forest-50 border border-forest-200/80 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-forest-800 block mb-1">
              Instant Evaluator Access
            </span>
            <p className="text-xs text-forest-700 mb-2.5">
              Explore the student dashboard immediately with pre-loaded demo metrics.
            </p>
            <Button
              variant="forestLight"
              size="sm"
              onClick={handleQuickDemo}
              icon={Sparkles}
              className="w-full justify-center"
            >
              Continue as Elena Rostova (UC Berkeley)
            </Button>
          </div>
        </div>

        {/* Signup Link */}
        <div className="text-center text-xs text-charcoal-500">
          New to PathPilot?{' '}
          <Link to="/signup" className="text-forest-800 font-bold hover:underline">
            Create your student account
          </Link>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
      />
    </div>
  );
};
