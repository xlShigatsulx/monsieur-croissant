'use client';

import { ContactFormSection } from './ContactFormSection';
import { ContactHeader } from './ContactHeader';
import { ContactInfo } from './ContactInfo';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-screen-lg mx-auto px-6 py-8">
        <ContactHeader />

        <div className="flex flex-col lg:flex-row gap-6">
          <ContactInfo />
          <ContactFormSection />
        </div>
      </div>
    </div>
  );
}
