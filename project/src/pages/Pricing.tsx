import React from 'react';
import { PricingHero } from '../components/pricing/PricingHero';
import { PricingPlan } from '../components/pricing/PricingPlan';
import { PricingFAQ } from '../components/pricing/PricingFAQ';
import { PricingCTA } from '../components/pricing/PricingCTA';

export function Pricing() {
  return (
    <div className="flex-1">
      <PricingHero />
      <PricingPlan />
      <PricingFAQ />
      <PricingCTA />
    </div>
  );
}