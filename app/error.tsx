'use client';

import { useEffect } from 'react';
import { ErrorView } from '@/components/layout/ErrorView';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <html>
      <body>
        <ErrorView onReset={reset} />
      </body>
    </html>
  );
}
