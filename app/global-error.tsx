'use client';

import { useEffect } from 'react';
import { ErrorView } from '@/components/layout/ErrorView';

export default function GlobalError({
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
    <html lang="uk">
      <body className="min-h-screen flex flex-col bg-cream text-mocha">
        <ErrorView
          title="Щось пішло не так"
          subtitle="Вибачте за незручності, будь ласка, спробуйте ще раз"
          resetLabel="Спробувати знову"
          homeLabel="На головну"
          onReset={reset}
        />
      </body>
    </html>
  );
}
