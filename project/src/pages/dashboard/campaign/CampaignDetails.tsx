import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout';
import { CampaignSummary } from '../../../components/dashboard/campaign/details/CampaignSummary';
import { EmailMetricsChart } from '../../../components/dashboard/campaign/details/EmailMetricsChart';
import { LeadMetricsChart } from '../../../components/dashboard/campaign/details/LeadMetricsChart';
import { SequenceAnalytics } from '../../../components/dashboard/campaign/details/SequenceAnalytics';
import { EmailList } from '../../../components/dashboard/campaign/details/EmailList';
import { CampaignHistory } from '../../../components/dashboard/campaign/details/CampaignHistory';
import { useCampaignDetails } from '../../../hooks/useCampaignDetails';

export function CampaignDetails() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useCampaignDetails(campaignId);

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
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center p-8 rounded-xl bg-card border border-border">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              {error || 'Campaign not found'}
            </h2>
            <p className="text-muted-foreground">
              The requested campaign could not be found or you don't have permission to view it.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <CampaignSummary campaign={data.summary} />

        {/* Full width charts */}
        <EmailMetricsChart emailMetrics={data.emails} />
        <LeadMetricsChart history={data.history} />
        
        {/* Sequence Analytics */}
        <SequenceAnalytics emailMetrics={data.emails} />
        
        {/* Side by side lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EmailList emails={data.emails} />
          <CampaignHistory history={data.history} />
        </div>
      </div>
    </DashboardLayout>
  );
}