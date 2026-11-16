import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { InteractiveDiscovery } from '../components/home/InteractiveDiscovery';
import { HowItWorks } from '../components/home/HowItWorks';
import { CareerCategories } from '../components/home/CareerCategories';
import { CtaSection } from '../components/home/CtaSection';
import { RoleDetailModal } from '../components/common/RoleDetailModal';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Sparkles, FlaskConical, MessageSquareText, LayoutDashboard, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const HomePage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();
  const { user, profileCompletionPercentage } = useAuth();
  const firstName = user?.name ? user.name.split(' ')[0] : 'Student';

  return (
    <main className="min-h-screen bg-ivory-50">
      {/* Authenticated Student Quick Workspace Strip */}
      <section className="pt-24 pb-2 bg-ivory-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-card rounded-3xl border border-ivory-200 shadow-subtle p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-forest-800">
                <span className="w-2 h-2 rounded-full bg-forest-600" />
                <span>Authenticated Student Workspace • {profileCompletionPercentage}% profile ready</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-charcoal-900 tracking-tight">
                Welcome back, {firstName}
              </h2>
              <p className="text-xs text-charcoal-500">
                {user?.university || 'University Student'} • {user?.major || 'Career Discovery'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/careers"
                className="px-3.5 py-2 rounded-full bg-ivory-50 hover:bg-forest-50 border border-ivory-200 text-xs font-semibold text-charcoal-800 inline-flex items-center gap-1.5 transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-forest-700" />
                <span>Discover</span>
              </Link>
              <Link
                to="/experiments"
                className="px-3.5 py-2 rounded-full bg-ivory-50 hover:bg-forest-50 border border-ivory-200 text-xs font-semibold text-charcoal-800 inline-flex items-center gap-1.5 transition-colors"
              >
                <FlaskConical className="w-3.5 h-3.5 text-forest-700" />
                <span>Experiments</span>
              </Link>
              <Link
                to="/assessment/personality"
                className="px-3.5 py-2 rounded-full bg-ivory-50 hover:bg-forest-50 border border-ivory-200 text-xs font-semibold text-charcoal-800 inline-flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-forest-700" />
                <span>Assessments</span>
              </Link>
              <Link
                to="/advisor"
                className="px-3.5 py-2 rounded-full bg-ivory-50 hover:bg-forest-50 border border-ivory-200 text-xs font-semibold text-charcoal-800 inline-flex items-center gap-1.5 transition-colors"
              >
                <MessageSquareText className="w-3.5 h-3.5 text-forest-700" />
                <span>AI Guide</span>
              </Link>
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-full bg-accent hover:bg-accent-hover text-on-accent text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Hero Section */}
      <div className="-mt-12 sm:-mt-16">
        <HeroSection />
      </div>

      {/* 2. Interactive Discovery (5-Step Curiosity Matcher) */}
      <InteractiveDiscovery />

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
