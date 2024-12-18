import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

interface Organization {
  id: string;
  name: string;
}

interface OnboardingState {
  currentStep: number;
  isLoading: boolean;
  error: string | null;
  organizations: Organization[];
  selectedOrg: string;
  sessionToken: string;
  orgToken: string;
  formData: {
    instantly_user: string;
    instantly_password: string;
    instantly_api_key: string;
  };
  setStep: (step: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setOrganizations: (orgs: Organization[]) => void;
  setSelectedOrg: (orgId: string) => void;
  setSessionToken: (token: string) => void;
  setOrgToken: (token: string) => void;
  updateFormData: (data: Partial<OnboardingState['formData']>) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 1,
  isLoading: false,
  error: null,
  organizations: [],
  selectedOrg: '',
  sessionToken: '',
  orgToken: '',
  formData: {
    instantly_user: '',
    instantly_password: '',
    instantly_api_key: '',
  },
};

export const useOnboardingStore = create<OnboardingState>()(
  devtools(
    (set) => ({
      ...initialState,
      setStep: (step) => set({ currentStep: step }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      setOrganizations: (organizations) => set({ organizations }),
      setSelectedOrg: (orgId) => set({ selectedOrg: orgId }),
      setSessionToken: (token) => set({ sessionToken: token }),
      setOrgToken: (token) => set({ orgToken: token }),
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      reset: () => set(initialState),
    }),
    { name: 'onboarding-store' }
  )
);