export const STRIPE_CONFIG = {
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
  priceId: import.meta.env.VITE_STRIPE_PRICE_ID,
  trialDays: 5,
  defaultPlan: {
    name: 'Professional Plan',
    price: 87,
    currency: 'USD',
    interval: 'month' as const,
    features: [
      'Real-time email campaign analytics',
      'Unlimited email tracking',
      'Client management portal',
      'Domain & provider analytics',
      'Advanced reporting',
      'Email sequence analytics',
      'Campaign performance insights',
      'Priority support',
    ]
  }
};