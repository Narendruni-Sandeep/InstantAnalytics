import React from 'react';
import { MenuItem } from './MenuItem';
import { useNavigation } from '../../../hooks/useNavigation';

export function SidebarNav({ isExpanded }: { isExpanded: boolean }) {
  const { 
    items, 
    expandedSubmenu, 
    currentPath, 
    handleSubmenuClick, 
    isMenuItemActive 
  } = useNavigation();

  return (
    <nav className="flex-1 py-4">
      <ul className="space-y-2 px-2">
        {items.map((item) => (
          <li key={item.path}>
            <MenuItem
              {...item}
              isExpanded={isExpanded}
              isActive={isMenuItemActive(item)}
              expandedSubmenu={expandedSubmenu}
              onSubmenuClick={handleSubmenuClick}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}