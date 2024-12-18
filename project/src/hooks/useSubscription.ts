import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import * as stripeService from '../services/stripeService';
import type { SubscriptionDetails } from '../types/subscription';

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadSubscription();
    }
  }, [user?.id]);

  const loadSubscription = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await stripeService.getSubscriptionStatus(user!.id);
      setSubscription(data);
    } catch (err: any) {
      console.error('Error loading subscription:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const startCheckout = async () => {
    try {
      setError(null);
      const { url } = await stripeService.createCheckoutSession(user!.id);
      window.location.href = url;
    } catch (err: any) {
      console.error('Error starting checkout:', err);
      setError(err.message);
    }
  };

  const manageSubscription = async () => {
    try {
      setError(null);
      const url = await stripeService.createCustomerPortalSession(user!.id);
      window.location.href = url;
    } catch (err: any) {
      console.error('Error opening customer portal:', err);
      setError(err.message);
    }
  };

  const checkTrial = async () => {
    try {
      setError(null);
      return await stripeService.checkTrialStatus(user!.id);
    } catch (err: any) {
      console.error('Error checking trial:', err);
      setError(err.message);
      return false;
    }
  };

  return {
    subscription,
    isLoading,
    error,
    startCheckout,
    manageSubscription,
    checkTrial,
    refresh: loadSubscription
  };
}