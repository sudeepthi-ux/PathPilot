import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Compass, Zap, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * Shared category switcher across the three PathPilot self-discovery assessments:
 * 1. Personality Assessment
 * 2. Interest Assessment
 * 3. Strength Assessment
 */
export const AssessmentCategoryNav = ({ activeCategory }) => {
  const { studentProfile } = useAuth();

  const categories = [
    {
      id: 'personality',
      step: '1',
      title: 'Personality Assessment',
      subtitle: 'Thinking & problem-solving style',
      to: '/assessment/personality',
      icon: Brain,
      completed: Boolean(studentProfile?.personalityResult)
    },
    {
      id: 'interests',
      step: '2',
      title: 'Interest Assessment',
      subtitle: '10-field curiosity spectrum',
      to: '/assessment/interests',
      icon: Compass,
      completed: Boolean(studentProfile?.interestResult)
    },
    {
      id: 'strengths',
      step: '3',
      title: 'Strength Assessment',
      subtitle: 'Core capabilities & work preferences',
      to: '/assessment/strengths',
      icon: Zap,
      completed: Boolean(studentProfile?.strengthResult)
    }
  ];

  return (
    <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;

        return (
          <Link
            key={cat.id}
            to={cat.to}
            className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-2.5 ${
              isActive
                ? 'bg-accent text-on-accent border-accent shadow-sm'
                : 'bg-card text-charcoal-800 border-ivory-200 hover:border-charcoal-400 hover:bg-muted'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isActive ? 'bg-forest-600 text-on-accent' : 'bg-ivory-50 text-forest-800 border border-ivory-200'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold truncate">
                  {cat.step}. {cat.title}
                </p>
                <p
                  className={`text-[10px] truncate ${
                    isActive ? 'text-accent-soft' : 'text-charcoal-500'
                  }`}
                >
                  {cat.subtitle}
                </p>
              </div>
            </div>

            {cat.completed ? (
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${
                  isActive
                    ? 'bg-forest-700 text-on-accent'
                    : 'bg-forest-100 text-forest-900'
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>Done</span>
              </span>
            ) : (
              isActive && (
                <span className="px-2 py-0.5 rounded-full bg-forest-700 text-on-accent text-[10px] font-semibold shrink-0">
                  Active
                </span>
              )
            )}
          </Link>
        );
      })}
    </div>
  );
};
