import React from 'react';
import { Users, Mail, Map } from 'lucide-react';
import { NavigationCard } from './NavigationCard';

const navigationItems = [
  {
    icon: Users,
    title: 'Manage Clients',
    description: 'Add, edit, and manage your client accounts',
    path: '/dashboard/clients',
    delay: 0.1
  },
  {
    icon: Mail,
    title: 'Mailbox Stats',
    description: 'View detailed statistics for all mailbox accounts',
    path: '/dashboard/email/mailbox-stats',
    delay: 0.2
  },
  {
    icon: Mail,
    title: 'Email by Client',
    description: 'Analyze email performance for each client',
    path: '/dashboard/email/by-client',
    delay: 0.3
  },
  {
    icon: Map,
    title: 'Map Mailbox',
    description: 'Map mailbox accounts to specific clients',
    path: '/dashboard/map/mailbox',
    delay: 0.4
  },
  {
    icon: Map,
    title: 'Map Campaign',
    description: 'Map campaigns to specific clients',
    path: '/dashboard/map/campaign',
    delay: 0.5
  }
];

export function NavigationGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {navigationItems.map((item) => (
        <NavigationCard key={item.path} {...item} />
      ))}
    </div>
  );
}