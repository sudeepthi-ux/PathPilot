import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PublicLandingPage } from './pages/PublicLandingPage';
import { HomePage } from './pages/HomePage';
import { CareerLibraryPage } from './pages/CareerLibraryPage';
import { CareerDetailPage } from './pages/CareerDetailPage';
import { CareerExperimentsPage } from './pages/CareerExperimentsPage';
import { CareerExperimentDetailPage } from './pages/CareerExperimentDetailPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { AiAdvisorPage } from './pages/AiAdvisorPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { PersonalityAssessmentPage } from './pages/PersonalityAssessmentPage';
import { InterestAnalyzerPage } from './pages/InterestAnalyzerPage';
import { StrengthAssessmentPage } from './pages/StrengthAssessmentPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { LearningRoadmapPage } from './pages/LearningRoadmapPage';
import { AssessmentModal } from './components/common/AssessmentModal';
import { SearchModal } from './components/common/SearchModal';

/**
 * Renders the Public Landing Page to guests and the Authenticated Home Workspace
 * to logged-in students without flashing unverified content during session hydration.
 */
const HomeOrLanding = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-forest-800 text-sm font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-forest-600 animate-ping" />
          <span>Loading PathPilot...</span>
        </div>
      </div>
    );
  }

  return user ? <HomePage /> : <PublicLandingPage />;
};

export const App = () => {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-ivory-50 text-charcoal-900 font-sans selection:bg-forest-100 selection:text-forest-900">
        {/* Top Universal Navbar */}
        <Navbar />

        {/* Main Routed Page Content */}
        <div className="flex-1">
          <Routes>
            {/* Public Landing & Auth Routes */}
            <Route path="/" element={<HomeOrLanding />} />
            <Route path="/about" element={<PublicLandingPage initialSection="about" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Protected Application Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/careers"
              element={
                <ProtectedRoute>
                  <CareerLibraryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/explore"
              element={
                <ProtectedRoute>
                  <CareerLibraryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/careers/:careerId"
              element={
                <ProtectedRoute>
                  <CareerDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/experiments"
              element={
                <ProtectedRoute>
                  <CareerExperimentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/experiments/:experimentId"
              element={
                <ProtectedRoute>
                  <CareerExperimentDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/skills"
              element={
                <ProtectedRoute>
                  <SkillGapPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/skills/:careerId"
              element={
                <ProtectedRoute>
                  <SkillGapPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roadmap"
              element={
                <ProtectedRoute>
                  <LearningRoadmapPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roadmap/:careerId"
              element={
                <ProtectedRoute>
                  <LearningRoadmapPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/advisor"
              element={
                <ProtectedRoute>
                  <AiAdvisorPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recommendations"
              element={
                <ProtectedRoute>
                  <RecommendationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assessments"
              element={
                <ProtectedRoute>
                  <PersonalityAssessmentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assessment/personality"
              element={
                <ProtectedRoute>
                  <PersonalityAssessmentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assessment/interests"
              element={
                <ProtectedRoute>
                  <InterestAnalyzerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assessment/strengths"
              element={
                <ProtectedRoute>
                  <StrengthAssessmentPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {/* Global Modals */}
        <AssessmentModal
          isOpen={isAssessmentOpen}
          onClose={() => setIsAssessmentOpen(false)}
          onComplete={() => setIsAssessmentOpen(false)}
        />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        {/* Minimal Footer */}
        <Footer />
      </div>
    </AuthProvider>
  );
};
