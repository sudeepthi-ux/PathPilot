import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RoleDetailModal = ({ isOpen, onClose, role }) => {
  if (!role) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={role.title}
      subtitle={role.categoryName || "Career Field"}
      maxWidth="max-w-xl"
    >
      <div className="space-y-6">
        
        {/* Short Description */}
        <p className="text-sm text-charcoal-700 leading-relaxed">
          {role.description || role.why}
        </p>

        {/* What fits you */}
        {role.matchProfile && (
          <div className="p-4 rounded-2xl bg-forest-50/70 border border-forest-200/80 space-y-1">
            <h5 className="text-xs font-bold text-forest-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-forest-700" />
              Why this might be a great fit for you
            </h5>
            <p className="text-xs text-forest-950 leading-relaxed">
              {role.matchProfile}
            </p>
          </div>
        )}

        {/* Day in the Life */}
        {role.dayInLife && (
          <div className="space-y-1.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
              What you'd do day-to-day:
            </h5>
            <p className="text-xs text-charcoal-700 leading-relaxed bg-ivory-50 p-3.5 rounded-2xl border border-ivory-200">
              {role.dayInLife}
            </p>
          </div>
        )}

        {/* Helpful Skills */}
        {role.coreSkills && (
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
              Useful skills to explore:
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {role.coreSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1 rounded-full bg-ivory-50 text-charcoal-800 border border-ivory-200 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action */}
        <div className="pt-4 border-t border-ivory-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs text-charcoal-500 hover:text-charcoal-800"
          >
            Close
          </button>
          
          <Link to="/assessment/personality" onClick={onClose}>
            <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
              Discover If This Fits You
            </Button>
          </Link>
        </div>

      </div>
    </Modal>
  );
};
