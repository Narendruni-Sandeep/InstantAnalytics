import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface OnboardingStatus {
  isLoading: boolean;
  isComplete: boolean;
  currentStep: number;
  data: {
    instantly_user: string | null;
    instantly_password: string | null;
    instantly_token: string | null;
    org_id: string | null;
    org_token: string | null;
    instantly_api_key: string | null;
  } | null;
}

export function useOnboardingStatus(userId: string | undefined): OnboardingStatus {
  const [status, setStatus] = useState<OnboardingStatus>({
    isLoading: true,
    isComplete: false,
    currentStep: 1,
    data: null,
  });

  useEffect(() => {
    let mounted = true;

    async function checkStatus() {
      if (!userId) {
        if (mounted) {
          setStatus(prev => ({ ...prev, isLoading: false }));
        }
        return;
      }

      try {
        const { data, error } = await supabase
          .from('instantly_user')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) throw error;

        if (!data) {
          if (mounted) {
            setStatus({
              isLoading: false,
              isComplete: false,
              currentStep: 1,
              data: null,
            });
          }
          return;
        }

        // Check if all required fields are present
        const hasCredentials = !!(data.instantly_user && data.instantly_password && data.instantly_token);
        const hasOrg = !!(data.org_id && data.org_token);
        const hasApiKey = !!data.instantly_api_key;

        // Determine completion status
        const isComplete = hasCredentials && hasOrg && hasApiKey;

        // Determine current step
        let currentStep = 1;
        if (hasCredentials) {
          currentStep = 2;
          if (hasOrg) {
            currentStep = 3;
          }
        }

        if (mounted) {
          setStatus({
            isLoading: false,
            isComplete,
            currentStep,
            data: {
              instantly_user: data.instantly_user,
              instantly_password: data.instantly_password,
              instantly_token: data.instantly_token,
              org_id: data.org_id,
              org_token: data.org_token,
              instantly_api_key: data.instantly_api_key,
            },
          });
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        if (mounted) {
          setStatus({
            isLoading: false,
            isComplete: false,
            currentStep: 1,
            data: null,
          });
        }
      }
    }

    checkStatus();

    return () => {
      mounted = false;
    };
  }, [userId]);

  return status;
}