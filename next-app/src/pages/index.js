import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Loader2 } from 'lucide-react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/docs');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen 
                    dark:bg-neutral-950 bg-[#f8f5f1] 
                    dark:text-white text-[#4a2d12]">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="animate-spin dark:text-orange-400 text-[#7b3f00]" size={32} />
        <p className="text-lg font-medium tracking-wide">Redirecting to Documentation Page...</p>
      </div>
    </div>
  );
}
