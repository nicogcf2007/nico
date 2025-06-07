'use client';

import { ReactNode, useEffect, useState } from 'react';

interface NoSSRProps {
  fallback?: ReactNode;
  children: ReactNode;
}

const NoSSR: React.FC<NoSSRProps> = ({ fallback = null, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default NoSSR; 