import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Mail,
  FileText,
  Map,
  BarChart2
} from 'lucide-react';
import type { NavItem } from '../types/navigation';

const menuItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Clients', path: '/dashboard/clients' },
  { 
    icon: Mail, 
    label: 'Email', 
    path: '/dashboard/email',
    submenu: [
      { label: 'All Mailbox Accounts', path: '/dashboard/email/all' },
      { label: 'Mailbox Stats', path: '/dashboard/email/mailbox-stats' },
      { label: 'Email by Client', path: '/dashboard/email/by-client' }
    ]
  },
  { 
    icon: FileText, 
    label: 'Campaign', 
    path: '/dashboard/campaign',
    submenu: [
      { label: 'All Campaigns', path: '/dashboard/campaign/all' },
      { label: 'Campaign Stats', path: '/dashboard/campaign/stats' },
      { label: 'Campaign by Client', path: '/dashboard/campaign/by-client' }
    ]
  },
  {
    icon: Map,
    label: 'Map',
    path: '/dashboard/map',
    submenu: [
      { label: 'Map Mailbox', path: '/dashboard/map/mailbox' },
      { label: 'Map Campaign', path: '/dashboard/map/campaign' }
    ]
  },
  { icon: BarChart2, label: 'Others', path: '/dashboard/others' }
];

export function useNavigation() {
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);
  const location = useLocation();

  const handleSubmenuClick = (path: string) => {
    setExpandedSubmenu(expandedSubmenu === path ? null : path);
  };

  const isSubmenuActive = (submenu: { label: string; path: string }[]) => {
    return submenu.some(item => location.pathname === item.path);
  };

  const isMenuItemActive = (item: NavItem) => {
    if (item.submenu) {
      return isSubmenuActive(item.submenu);
    }
    return location.pathname === item.path;
  };

  return {
    items: menuItems,
    expandedSubmenu,
    currentPath: location.pathname,
    handleSubmenuClick,
    isMenuItemActive,
  };
}