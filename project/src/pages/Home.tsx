import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/home/Features';
import { Analytics } from '../components/home/Analytics';
import { ClientPortal } from '../components/home/ClientPortal';
import { ClientMapping } from '../components/home/ClientMapping';
import { AnalyticsShowcase } from '../components/home/AnalyticsShowcase';
import { HowItWorks } from '../components/home/HowItWorks';
import { FAQ } from '../components/home/FAQ';
import { CTA } from '../components/home/CTA';

export function Home() {
  return (
    <div className="flex-1">
      <Hero />
      <Features />
      <Analytics />
      <ClientPortal />
      <ClientMapping />
      <AnalyticsShowcase />
      <HowItWorks />
      <FAQ />
      <CTA />
    </div>
  );
}