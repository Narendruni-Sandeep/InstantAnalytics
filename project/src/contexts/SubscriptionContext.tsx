import React, { createContext, useContext } from 'react';
import { useSubscription } from '../hooks/useSubscription';
import type { SubscriptionDetails } from '../types/subscription';

interface SubscriptionContextType {
  subscription: SubscriptionDetails | null;
  isLoading: boolean;
  error: string | null;
  startCheckout: () => Promise<void>;
  manageSubscription: () => Promise<void>;
  checkTrial: () => Promise<boolean>;
  refresh: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const subscription = useSubscription();

  return (
    <SubscriptionContext.Provider value={subscription}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptionContext() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscriptionContext must be used within a SubscriptionProvider');
  }
  return context;
}