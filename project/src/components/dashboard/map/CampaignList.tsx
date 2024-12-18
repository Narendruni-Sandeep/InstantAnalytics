import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

interface Campaign {
  id: string;
  campaign_name: string;
  combination: string | null;
  client: string | null;
}

interface CampaignListProps {
  campaigns: Campaign[];
  clients: { id: string; name: string }[];
  isLoading: boolean;
  onMapToClient: (campaignId: string, clientName: string) => void;
  selectedCampaigns?: Campaign[];
  onSelectionChange?: (campaigns: Campaign[]) => void;
}

export function CampaignList({ 
  campaigns, 
  clients, 
  isLoading, 
  onMapToClient,
  selectedCampaigns = [],
  onSelectionChange
}: CampaignListProps) {
  const handleClientChange = (campaignId: string, clientName: string) => {
    onMapToClient(campaignId, clientName);
  };

  const handleCheckboxChange = (campaign: Campaign, checked: boolean) => {
    if (!onSelectionChange) return;
    
    if (checked) {
      onSelectionChange([...selectedCampaigns, campaign]);
    } else {
      onSelectionChange(selectedCampaigns.filter(c => c.id !== campaign.id));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 rounded-xl bg-card border border-border"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-display font-semibold text-foreground mb-2">
          No Campaigns Found
        </h3>
        <p className="text-muted-foreground max-w-md">
          No campaigns are available in this category.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <motion.div
          key={campaign.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onSelectionChange && (
                <input
                  type="checkbox"
                  checked={selectedCampaigns.some(c => c.id === campaign.id)}
                  onChange={(e) => handleCheckboxChange(campaign, e.target.checked)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
              )}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground">
                      {campaign.campaign_name}
                    </h3>
                    {campaign.combination && (
                      <p className="text-sm text-muted-foreground">
                        {campaign.combination}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <select
                onChange={(e) => handleClientChange(campaign.id, e.target.value)}
                value={campaign.client || ""}
                className="px-4 py-2 rounded-lg bg-card text-foreground border border-input focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="" disabled>Select Client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.name}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}