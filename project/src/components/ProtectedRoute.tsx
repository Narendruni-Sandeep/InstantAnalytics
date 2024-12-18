import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function checkOnboardingStatus() {
      if (!user?.id) {
        navigate('/signin', { replace: true });
        return;
      }

      try {
        const { data, error } = await supabase
          .from('instantly_user')
          .select('verified')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        const isOnboardingComplete = data?.verified;
        const isOnboardingRoute = location.pathname === '/onboarding';

        if (!isOnboardingComplete && !isOnboardingRoute) {
          navigate('/onboarding', { replace: true });
        } else if (isOnboardingComplete && isOnboardingRoute) {
          navigate('/dashboard', { replace: true });
        }
      } catch (err) {
        console.error('Error checking onboarding status:', err);
      }
    }

    if (!authLoading) {
      checkOnboardingStatus();
    }
  }, [user, authLoading, navigate, location.pathname]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return user ? <>{children}</> : null;
}