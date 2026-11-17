import React, { useEffect } from 'react';
import { InteractiveDiscovery } from '../components/home/InteractiveDiscovery';

/**
 * Dedicated Career Discovery assessment page.
 * Hosts the existing 5-question discovery engine. Recommendations are generated only after
 * explicit submission and are persisted to the student's profile.
 */
export const CareerDiscoveryPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <main className="min-h-screen bg-ivory-50">
      <InteractiveDiscovery standalone />
    </main>
  );
};
