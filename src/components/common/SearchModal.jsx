import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from './Modal';
import { Search, ArrowRight, Compass, Cpu, Dna, Leaf, Layers, TrendingUp, ShieldCheck } from 'lucide-react';
import { careerCategories } from '../../data/careersData';

export const SearchModal = ({ isOpen, onClose, onSelectRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle search modal can be managed by parent
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Gather all roles across categories
  const allRoles = careerCategories.flatMap(cat => 
    cat.roles.map(r => ({
      ...r,
      categoryName: cat.name,
      categoryId: cat.id
    }))
  );

  const filteredRoles = allRoles.filter(role => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      role.title.toLowerCase().includes(term) ||
      role.coreSkills.some(s => s.toLowerCase().includes(term)) ||
      role.categoryName.toLowerCase().includes(term) ||
      role.matchProfile.toLowerCase().includes(term)
    );
  }).slice(0, 6);

  const handlePick = (role) => {
    onClose();
    if (onSelectRole) {
      onSelectRole(role);
    } else {
      navigate(`/explore?role=${role.id}`);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Search Trajectories & Blueprints"
      subtitle="Universal Career Index"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        {/* Search input box */}
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-charcoal-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type a skill, role, or interest (e.g., 'ROS2', 'Genomics', 'Quant', 'UX')..."
            autoFocus
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-ivory-50 border border-ivory-300 text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-forest-600/30 focus:border-forest-600 text-sm"
          />
        </div>

        {/* Results */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {filteredRoles.length === 0 ? (
            <div className="py-8 text-center text-charcoal-400 text-sm">
              No matching trajectories found. Try "AI", "Bio", "Design", or "Hardware".
            </div>
          ) : (
            filteredRoles.map((role) => (
              <button
                key={role.id}
                onClick={() => handlePick(role)}
                className="w-full p-3 rounded-2xl bg-card hover:bg-forest-50/70 border border-ivory-200 hover:border-forest-200 text-left transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-charcoal-900 group-hover:text-forest-900">
                      {role.title}
                    </span>
                    <span className="text-[10px] bg-ivory-100 text-charcoal-600 px-2 py-0.5 rounded-full">
                      {role.categoryName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-charcoal-500">
                    <span>Entry: <strong className="text-charcoal-800">{role.startingComp}</strong></span>
                    <span>•</span>
                    <span className="text-forest-800 font-semibold">{role.growth} growth</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-charcoal-300 group-hover:text-forest-700 group-hover:translate-x-1 transition-all" />
              </button>
            ))
          )}
        </div>

        <div className="pt-2 border-t border-ivory-200 flex items-center justify-between text-[11px] text-charcoal-400">
          <span>Search calibrated on 2026-2030 hiring models</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </Modal>
  );
};
