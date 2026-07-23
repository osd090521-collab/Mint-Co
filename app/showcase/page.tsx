'use client';

import { useEffect } from 'react';

export default function ShowcasePage() {
  useEffect(() => {
    // Redirect to the static showcase
    window.location.href = '/showcase/index.html';
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg text-slate">
        Loading showcase...
      </p>
    </div>
  );
}
