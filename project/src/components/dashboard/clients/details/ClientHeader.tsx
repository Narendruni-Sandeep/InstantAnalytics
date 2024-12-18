import React from 'react';

interface Client {
  name: string;
  campaign_name: string;
}

interface ClientHeaderProps {
  client: Client;
}

export function ClientHeader({ client }: ClientHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-foreground mb-2">
        {client.name}
      </h1>
      <p className="text-muted-foreground">
        Client ID: {client.campaign_name}
      </p>
    </div>
  );
}