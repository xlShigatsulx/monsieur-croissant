import '@/app/globals.css';
import { NotFoundView } from '@/components/layout/NotFoundView';

export default function NotFound() {
  return (
    <html lang="uk">
      <body className="min-h-screen flex flex-col bg-cream text-mocha">
        <NotFoundView />
      </body>
    </html>
  );
}
