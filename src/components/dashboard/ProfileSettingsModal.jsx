import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useAuth, calculateProfileCompletion } from '../../context/AuthContext';
import { User, GraduationCap, BookOpen, Calendar, Target, CheckCircle2 } from 'lucide-react';

export const ProfileSettingsModal = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [university, setUniversity] = useState(user?.university || '');
  const [major, setMajor] = useState(user?.major || '');
  const [gradYear, setGradYear] = useState(user?.gradYear || '');
  const [targetIndustry, setTargetIndustry] = useState(user?.targetIndustry || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setName(user?.name || '');
    setUniversity(user?.university || '');
    setMajor(user?.major || '');
    setGradYear(user?.gradYear || '');
    setTargetIndustry(user?.targetIndustry || '');
    setBio(user?.bio || '');
  }, [user, isOpen]);

  const livePercent = calculateProfileCompletion({
    name,
    university,
    major,
    gradYear,
    targetIndustry,
    bio
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name: name.trim(),
      university: university.trim(),
      major: major.trim(),
      gradYear: gradYear.trim(),
      targetIndustry: targetIndustry.trim(),
      bio: bio.trim()
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Student Profile & Trajectory Settings"
      subtitle="Identity & Educational Parameters"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-charcoal-700">Profile Completion</span>
            <span className="font-mono font-bold text-forest-800">{livePercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-ivory-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${livePercent}%` }}
            />
          </div>
          <p className="text-[11px] text-charcoal-500">
            Calculated from university, major, graduation year, target sector, and bio.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-3 rounded-2xl bg-forest-100 text-forest-900 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-forest-700" />
            <span>Profile parameters updated successfully.</span>
          </div>
        )}

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 block mb-1.5">
            Full Student Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-ivory-50 border border-ivory-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              University / Institution
            </label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-ivory-50 border border-ivory-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Expected Graduation
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                placeholder="2026"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-ivory-50 border border-ivory-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 block mb-1.5">
            Academic Major & Concentrations
          </label>
          <div className="relative">
            <BookOpen className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="e.g. Cognitive Science & Computer Science"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-ivory-50 border border-ivory-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 block mb-1.5">
            Target Frontier Sector
          </label>
          <div className="relative">
            <Target className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={targetIndustry}
              onChange={(e) => setTargetIndustry(e.target.value)}
              placeholder="e.g. Autonomous Systems, Biotech, Spatial UI"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-ivory-50 border border-ivory-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 block mb-1.5">
            Personal Bio & Curiosity Statement
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Brief summary of what questions and domains genuinely fascinate you..."
            className="w-full p-3 rounded-2xl bg-ivory-50 border border-ivory-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
          />
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <Button variant="ghost" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};
