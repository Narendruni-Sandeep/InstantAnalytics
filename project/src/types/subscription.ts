export type SubscriptionStatus = 
  | 'trial'
  | 'active'
  | 'past_due'
  | 'cancelled'
  | 'expired';

export type PaymentProvider = 'stripe' | 'razorpay';

export interface SubscriptionDetails {
  id: string;
  status: SubscriptionStatus;
  provider: PaymentProvider;
  customerId: string;
  subscriptionId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAt?: Date;
  cancelledAt?: Date;
  trialEndsAt?: Date;
  billingEmail?: string;
  billingName?: string;
  billingAddress?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  isPopular?: boolean;
}