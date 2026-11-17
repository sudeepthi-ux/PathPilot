import React, { useState, useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CareerAssessmentIntro } from '../components/home/CareerAssessmentIntro';
import { HowItWorks } from '../components/home/HowItWorks';
import { CareerCategories } from '../components/home/CareerCategories';
import { CtaSection } from '../components/home/CtaSection';
import { RoleDetailModal } from '../components/common/RoleDetailModal';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { inspirationalQuotes } from '../data/inspirationalQuotes';

export const HomePage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const navigate = useNavigate();
  const { user, profileCompletionPercentage } = useAuth();
  const firstName = user?.name ? user.name.split(' ')[0] : 'Student';

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const currentQuote = inspirationalQuotes[quoteIdx] || inspirationalQuotes[0];
  const academicParts = [
    user?.university,
    user?.major,
    user?.gradYear ? `Class of ${user.gradYear}` : ''
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-ivory-50">
      {/* Clean Student Welcome & Motivational Quote Header */}
      <section className="pt-24 pb-4 bg-ivory-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-card rounded-3xl border border-ivory-200 shadow-subtle p-6 sm:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-charcoal-900 tracking-tight">
                  Welcome back, {firstName}
                </h1>
                {academicParts.length > 0 ? (
                  <p className="text-xs sm:text-sm text-charcoal-600">
                    {academicParts.join(' • ')}
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm text-charcoal-500">
                    Add your university and academic details in{' '}
                    <Link to="/dashboard" className="font-semibold text-forest-800 hover:underline">
                      Profile Settings
                    </Link>
                  </p>
                )}
              </div>

              <span className="inline-flex items-center gap-2 self-start sm:self-center px-3 py-1 rounded-full bg-ivory-50 border border-ivory-200 text-xs font-semibold text-forest-800">
                <span className="w-2 h-2 rounded-full bg-forest-600" />
                <span>{profileCompletionPercentage}% profile ready</span>
              </span>
            </div>

            <div className="pt-4 border-t border-ivory-200/80">
              <blockquote className="font-serif italic text-base sm:text-lg text-charcoal-700 leading-relaxed">
                “{currentQuote.quote}”
              </blockquote>
              <p className="text-xs text-charcoal-400 mt-1">
                — {currentQuote.author}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Hero Section */}
      <HeroSection compactTop />

      {/* 2. Minimal Career Assessment Introduction (results live on /discover only after submission) */}
      <CareerAssessmentIntro />

      {/* 3. How PathPilot Works (3 Simple Human Steps) */}
      <HowItWorks />

      {/* 4. Featured Career Categories (6 Inspiring Student-Friendly Fields) */}
      <CareerCategories />

      {/* 5. Simple, Serene CTA */}
      <CtaSection />

      {/* Role Detail Modal if triggered */}
      <RoleDetailModal
        isOpen={!!selectedRole}
        onClose={() => setSelectedRole(null)}
        role={selectedRole}
        onStartBlueprint={() => navigate('/assessment/personality')}
      />
    </main>
  );
};
