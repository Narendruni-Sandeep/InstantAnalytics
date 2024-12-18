import { LucideIcon } from 'lucide-react';

export interface SubMenuItem {
  label: string;
  path: string;
}

export interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
  submenu?: SubMenuItem[];
}