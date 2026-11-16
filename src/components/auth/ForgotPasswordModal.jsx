import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Mail, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid academic or personal email address.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch (err) {
      setSubmitted(false);
      setError(err.message || 'Failed to send password reset email. Please check email settings.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setEmail('');
    setError('');
    setLoading(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Reset Student Password"
      subtitle="Security & Access Recovery"
      maxWidth="max-w-md"
    >
      {submitted ? (
        <div className="space-y-5 py-3 text-center animate-fadeIn">
          <div className="w-12 h-12 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6 text-forest-700" />
          </div>
          <div>
            <h4 className="text-base font-bold text-charcoal-900">Recovery Instructions Dispatched</h4>
            <p className="text-xs text-charcoal-500 mt-1.5 leading-relaxed">
              We have sent a password reset link to <strong className="text-charcoal-800">{email}</strong>. Please check your inbox and spam folder.
            </p>
          </div>
          <Button variant="primary" size="md" onClick={handleClose} className="w-full">
            Return to Login
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Enter the email associated with your PathPilot profile. We will send a secure link to set a new password.
          </p>

          {error && (
            <div
              role="alert"
              className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

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
                placeholder="student@university.edu"
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-ivory-50 border border-ivory-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600/30 disabled:opacity-60"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={loading}
              icon={ArrowRight}
              iconPosition="right"
            >
              {loading ? 'Sending Link...' : 'Send Reset Link'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
