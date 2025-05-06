import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Loader2 } from 'lucide-react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/docs');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-neutral-950 text-white">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="animate-spin text-orange-400" size={32} />
        <p className="text-lg font-medium">Redirecting to Documentation Page...</p>
      </div>
    </div>
  );
}
