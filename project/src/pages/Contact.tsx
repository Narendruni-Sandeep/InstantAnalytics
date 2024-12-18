import React from 'react';
import { ContactHero } from '../components/contact/ContactHero';
import { ContactOptions } from '../components/contact/ContactOptions';
import { ContactCTA } from '../components/contact/ContactCTA';

export function Contact() {
  return (
    <div className="flex-1">
      <ContactHero />
      <ContactOptions />
      <ContactCTA />
    </div>
  );
}