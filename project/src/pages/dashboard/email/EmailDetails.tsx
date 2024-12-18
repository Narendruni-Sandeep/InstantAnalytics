import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout';
import { EmailStats } from '../../../components/dashboard/email/details/EmailStats';
import { EmailHistory } from '../../../components/dashboard/email/details/EmailHistory';
import { ConnectedCampaigns } from '../../../components/dashboard/email/details/ConnectedCampaigns';
import { useEmailDetails } from '../../../hooks/useEmailDetails';

export function EmailDetails() {
  const { email } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading, error } = useEmailDetails(email);

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate('/dashboard/email/all'); // Default fallback
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !data) {
    return (
      <DashboardLayout>
        <div className="max-w-6xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center p-8 rounded-xl bg-card border border-border">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              {error || 'Email not found'}
            </h2>
            <p className="text-muted-foreground">
              The requested email could not be found or you don't have permission to view it.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <EmailStats emailData={data} />
        <ConnectedCampaigns campaigns={data.campaigns} />
        <EmailHistory history={data.history} />
      </div>
    </DashboardLayout>
  );
}