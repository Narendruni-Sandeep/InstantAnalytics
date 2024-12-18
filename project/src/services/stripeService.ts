import { supabase } from '../lib/supabase';
import { STRIPE_CONFIG } from '../lib/stripe/config';
import type { SubscriptionDetails } from '../types/subscription';

export async function createCheckoutSession(userId: string) {
  try {
    const { data: user } = await supabase
      .from('instantly_user')
      .select('email, first_name, last_name')
      .eq('id', userId)
      .single();

    if (!user) throw new Error('User not found');

    const response = await fetch('https://n8n.chillreach.in/webhook/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        email: user.email,
        name: `${user.first_name} ${user.last_name}`.trim(),
        priceId: STRIPE_CONFIG.priceId,
        successUrl: `${window.location.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/pricing`,
      }),
    });

    const { sessionId, url } = await response.json();
    
    if (!url) throw new Error('Failed to create checkout session');

    return { sessionId, url };
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    throw new Error(error.message || 'Failed to create checkout session');
  }
}

export async function createCustomerPortalSession(userId: string) {
  try {
    const response = await fetch('https://n8n.chillreach.in/webhook/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        returnUrl: `${window.location.origin}/dashboard`,
      }),
    });

    const { url } = await response.json();
    
    if (!url) throw new Error('Failed to create portal session');

    return url;
  } catch (error: any) {
    console.error('Error creating portal session:', error);
    throw new Error(error.message || 'Failed to create portal session');
  }
}

export async function getSubscriptionStatus(userId: string): Promise<SubscriptionDetails | null> {
  try {
    const { data, error } = await supabase
      .from('instantly_user')
      .select(`
        subscription_status,
        subscription_id,
        subscription_provider,
        provider_customer_id,
        trial_ends_at,
        current_period_start,
        current_period_end,
        cancel_at,
        cancelled_at,
        billing_email,
        billing_name,
        billing_address
      `)
      .eq('id', userId)
      .single();

    if (error) throw error;

    if (!data) return null;

    return {
      id: userId,
      status: data.subscription_status,
      provider: data.subscription_provider,
      customerId: data.provider_customer_id,
      subscriptionId: data.subscription_id,
      currentPeriodStart: new Date(data.current_period_start),
      currentPeriodEnd: new Date(data.current_period_end),
      cancelAt: data.cancel_at ? new Date(data.cancel_at) : undefined,
      cancelledAt: data.cancelled_at ? new Date(data.cancelled_at) : undefined,
      trialEndsAt: data.trial_ends_at ? new Date(data.trial_ends_at) : undefined,
      billingEmail: data.billing_email,
      billingName: data.billing_name,
      billingAddress: data.billing_address
    };
  } catch (error: any) {
    console.error('Error getting subscription status:', error);
    throw new Error(error.message || 'Failed to get subscription status');
  }
}

export async function checkTrialStatus(userId: string): Promise<boolean> {
  try {
    const response = await fetch('https://n8n.chillreach.in/webhook/check-trial-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    const { isTrialActive } = await response.json();
    return isTrialActive;
  } catch (error: any) {
    console.error('Error checking trial status:', error);
    throw new Error(error.message || 'Failed to check trial status');
  }
}