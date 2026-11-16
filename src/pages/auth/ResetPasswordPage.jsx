import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../../services/supabaseClient';
import {
  Compass,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyResetToken, confirmPasswordReset } = useAuth();

  const token = searchParams.get('token') || '';
  const email = (searchParams.get('email') || '').trim().toLowerCase();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [checkingLink, setCheckingLink] = useState(true);
  const [linkValid, setLinkValid] = useState(false);
  const [linkError, setLinkError] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);

  const calculateStrength = (pwd) => {
    let s = 0;
    if (pwd.length >= 6) s++;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd) || /[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  };
  const strength = calculateStrength(newPassword);

  useEffect(() => {
    let active = true;
    let subscription = null;

    const validateSessionOrToken = async () => {
      // 1. Check URL hash errors (e.g., Supabase expired link error params)
      const hash = location.hash || window.location.hash || '';
      const hashParams = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash);
      const hashError = hashParams.get('error_description') || hashParams.get('error');
      if (hashError) {
        if (!active) return;
        setLinkValid(false);
        setLinkError(decodeURIComponent(hashError.replace(/\+/g, ' ')));
        setCheckingLink(false);
        return;
      }

      // 2. Supabase recovery flow (when Supabase Auth is configured)
      if (isSupabaseConfigured && supabase && !token) {
        const isRecoveryHash = hashParams.get('type') === 'recovery' && Boolean(hashParams.get('access_token'));
        const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
          if (!active) return;
          if (event === 'PASSWORD_RECOVERY') {
            setLinkValid(true);
            setLinkError('');
            setCheckingLink(false);
          }
        });
        subscription = authListener?.subscription || null;

        try {
          const { data } = await supabase.auth.getSession();
          if (!active) return;
          if (data?.session || isRecoveryHash) {
            setLinkValid(true);
            setCheckingLink(false);
            return;
          }
        } catch {
          // Fall through to invalid recovery link state
        }

        if (active) {
          setLinkValid(false);
          setLinkError('This password reset link is invalid or has expired. Please request a new reset link.');
          setCheckingLink(false);
        }
        return;
      }

      // 3. PathPilot backend token flow
      if (!token || !email) {
        if (!active) return;
        setLinkValid(false);
        setLinkError('Missing or incomplete password reset link. Please request a new reset link.');
        setCheckingLink(false);
        return;
      }

      try {
        await verifyResetToken({ email, token });
        if (!active) return;
        setLinkValid(true);
        setLinkError('');
      } catch (err) {
        if (!active) return;
        setLinkValid(false);
        setLinkError(
          err.message || 'This password reset link is invalid or has expired. Please request a new reset link.'
        );
      } finally {
        if (active) setCheckingLink(false);
      }
    };

    validateSessionOrToken();

    return () => {
      active = false;
      if (subscription) subscription.unsubscribe();
    };
  }, [email, token, location.hash, verifyResetToken]);

  useEffect(() => {
    if (!resetComplete) return;
    const timer = setTimeout(() => {
      navigate(`/login?reset=success${email ? `&email=${encodeURIComponent(email)}` : ''}`, {
        replace: true
      });
    }, 1800);
    return () => clearTimeout(timer);
  }, [resetComplete, email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (newPassword.length < 6) {
      setFormError('Password must contain at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setFormError('Passwords do not match. Please enter the same password twice.');
      return;
    }

    setSubmitting(true);
    try {
      await confirmPasswordReset({ email, token, newPassword });
      setResetComplete(true);
    } catch (err) {
      setFormError(err.message || 'Failed to update password. Please request a fresh reset link.');
      if (err.code === 'TOKEN_EXPIRED' || err.code === 'TOKEN_INVALID') {
        setLinkValid(false);
        setLinkError(err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-ivory-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient Background */}
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
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal-900">
            Create New Password
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 font-serif italic">
            "Secure your PathPilot student account."
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-card rounded-3xl border border-ivory-300 shadow-card p-6 sm:p-8 space-y-5">
          {checkingLink ? (
            <div className="py-10 text-center space-y-3">
              <Loader2 className="w-6 h-6 text-forest-700 animate-spin mx-auto" />
              <p className="text-xs font-medium text-charcoal-600">
                Validating password reset link...
              </p>
            </div>
          ) : resetComplete ? (
            <div className="text-center space-y-5 py-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-2xl bg-forest-50 border border-forest-200 text-forest-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl font-bold text-charcoal-900">Password Updated Successfully</h2>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  Your password has been updated. Redirecting you to sign in...
                </p>
              </div>
              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={() =>
                  navigate(`/login?reset=success${email ? `&email=${encodeURIComponent(email)}` : ''}`, {
                    replace: true
                  })
                }
                icon={ArrowRight}
                iconPosition="right"
                className="w-full justify-center"
              >
                Continue to Sign In
              </Button>
            </div>
          ) : !linkValid ? (
            <div className="text-center space-y-5 py-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-center mx-auto">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-lg font-bold text-charcoal-900">Reset Link Expired or Invalid</h2>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  {linkError}
                </p>
              </div>
              <Link to="/login?forgot=true" className="block">
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right" className="w-full justify-center">
                  Request New Reset Link
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
              {email && (
                <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 text-xs text-charcoal-600">
                  Resetting password for <strong className="text-charcoal-900">{email}</strong>
                </div>
              )}

              {formError && (
                <div
                  role="alert"
                  className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-start gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
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

                {newPassword && (
                  <div className="mt-2 flex gap-1 h-1.5">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`flex-1 rounded-full transition-all ${
                          step <= strength
                            ? strength <= 1
                              ? 'bg-amber-500'
                              : strength === 2
                              ? 'bg-amber-600'
                              : 'bg-forest-600'
                            : 'bg-ivory-200'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-ivory-50 border border-ivory-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={submitting}
                icon={ArrowRight}
                iconPosition="right"
                className="w-full justify-center mt-2"
              >
                {submitting ? 'Updating Password...' : 'Save New Password'}
              </Button>
            </form>
          )}
        </div>

        <div className="text-center text-xs text-charcoal-500">
          <Link to="/login" className="inline-flex items-center gap-1 text-forest-800 font-semibold hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
