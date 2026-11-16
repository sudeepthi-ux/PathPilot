import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { 
  LayoutDashboard, 
  Brain, 
  Sparkles, 
  Zap,
  Compass, 
  Bot, 
  Settings, 
  LogOut,
  Play,
  Layers,
  Map
} from 'lucide-react';

export const DashboardSidebar = ({ onOpenSettings, isMobileOpen, setIsMobileOpen }) => {
  const { user, studentProfile, logout, profileCompletionPercentage } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  const navItems = [
    {
      name: 'Overview',
      path: '/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Career Recommendations',
      path: '/recommendations',
      icon: Sparkles
    },
    {
      name: 'Career Experiments',
      path: '/experiments',
      icon: Play
    },
    {
      name: 'Skill Gap Analyzer',
      path: '/skills',
      icon: Layers
    },
    {
      name: 'Learning Roadmap',
      path: '/roadmap',
      icon: Map
    },
    {
      name: 'Personality Assessment',
      path: '/assessment/personality',
      icon: Brain
    },
    {
      name: 'Interest Assessment',
      path: '/assessment/interests',
      icon: Sparkles
    },
    {
      name: 'Strength Assessment',
      path: '/assessment/strengths',
      icon: Zap
    },
    {
      name: 'Career Library',
      path: '/careers',
      icon: Compass
    },
    {
      name: 'AI Career Guide',
      path: '/advisor',
      icon: Bot
    }
  ];

  const content = (
    <div className="flex flex-col h-full justify-between p-6 bg-card border-r border-ivory-200">
      <div className="space-y-6">
        
        {/* Student Profile Card */}
        <div className="space-y-1 pb-4 border-b border-ivory-200">
          <h4 className="font-bold text-sm text-charcoal-900 truncate">
            {user?.name || 'Student'}
          </h4>
          <p className="text-xs text-charcoal-500 truncate">
            {user?.university || 'University Student'}
          </p>
          <div className="pt-2">
            <span className="text-[10px] font-semibold text-forest-800 bg-forest-50 px-2 py-0.5 rounded-full border border-forest-200">
              Profile: {profileCompletionPercentage}% complete
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileOpen?.(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-2xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-accent text-on-accent'
                      : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-50'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

      </div>

      {/* Footer controls: Theme, Settings & Logout */}
      <div className="pt-4 border-t border-ivory-200 space-y-2">
        <div className="pb-1">
          <ThemeToggle variant="labeled" />
        </div>

        <button
          onClick={onOpenSettings}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-2xl text-xs text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-50 transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Profile Settings</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-2xl text-xs text-charcoal-500 hover:text-red-700 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-[calc(100vh-64px)] sticky top-16 shrink-0">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 top-16 z-40 lg:hidden flex">
          <div className="fixed inset-0 bg-overlay/20 backdrop-blur-xs" onClick={() => setIsMobileOpen(false)} />
          <div className="relative w-64 max-w-[80vw] h-full bg-card z-10 animate-fadeIn">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
