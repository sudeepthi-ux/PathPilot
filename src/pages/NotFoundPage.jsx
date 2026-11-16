import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-ivory-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4 space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-forest-100 text-forest-800 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-charcoal-900 tracking-tight">
          Trajectory Vector Not Found
        </h1>
        <p className="text-sm text-charcoal-600 leading-relaxed">
          The coordinates or career roadmap you requested does not exist in our current index. Let's redirect you back to the home compass.
        </p>
        <Link to="/">
          <Button variant="primary" size="md" icon={ArrowLeft} iconPosition="left">
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};
