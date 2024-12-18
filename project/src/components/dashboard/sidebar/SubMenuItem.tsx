import React from 'react';
import { NavLink } from 'react-router-dom';

interface SubMenuItemProps {
  label: string;
  path: string;
}

export function SubMenuItem({ label, path }: SubMenuItemProps) {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) => `
          flex items-center gap-3 px-3 py-2 rounded-lg
          transition-colors duration-200
          ${isActive 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'}
        `}
      >
        {label}
      </NavLink>
    </li>
  );
}