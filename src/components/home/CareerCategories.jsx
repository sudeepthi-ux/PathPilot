import React from 'react';
import { Link } from 'react-router-dom';
import { careerCategories } from '../../data/careersData';
import { ArrowRight, Cpu, Palette, HeartPulse, Leaf, Briefcase, Users } from 'lucide-react';

export const CareerCategories = () => {
  const iconMap = {
    Cpu: Cpu,
    Palette: Palette,
    HeartPulse: HeartPulse,
    Leaf: Leaf,
    Briefcase: Briefcase,
    Users: Users
  };

  return (
    <section className="py-20 md:py-28 bg-ivory-50 border-t border-ivory-200/70">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-forest-800 block mb-2">
              Career Fields
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900 leading-tight">
              Explore careers that match your interests.
            </h2>
            <p className="mt-2 text-sm text-charcoal-600">
              Browse modern paths across design, technology, science, and social impact without the confusion.
            </p>
          </div>

          <Link
            to="/careers"
            className="text-xs font-semibold text-forest-800 hover:text-forest-900 inline-flex items-center gap-1 group self-start md:self-end"
          >
            <span>View All 15 Fields</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 6 Clean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerCategories.map((category) => {
            const Icon = iconMap[category.iconName] || Cpu;
            return (
              <div
                key={category.id}
                className="bg-card rounded-3xl p-6 border border-ivory-200 hover:border-charcoal-300 transition-all duration-200 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-ivory-50 border border-ivory-200 text-forest-800 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>

                  <h3 className="font-bold text-base text-charcoal-900 tracking-tight">
                    {category.name}
                  </h3>

                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Simple Skill Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] px-2.5 py-0.5 rounded-full bg-ivory-50 border border-ivory-200 text-charcoal-600 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-ivory-200">
                  <Link
                    to={`/careers?q=${encodeURIComponent(category.name.split(' & ')[0])}`}
                    className="text-xs font-semibold text-forest-800 hover:text-forest-900 inline-flex items-center gap-1 group"
                  >
                    <span>Learn about this field</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
