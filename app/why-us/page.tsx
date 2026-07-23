'use client';

import { useEffect } from 'react';

export default function WhyUsPage() {
  useEffect(() => {
    // Redirect to the static why-us page
    window.location.href = '/why-us.html';
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg text-slate">
        Loading...
      </p>
    </div>
  );
}
