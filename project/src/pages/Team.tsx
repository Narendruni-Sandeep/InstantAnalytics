import React from 'react';
import { TeamHero } from '../components/team/TeamHero';
import { TeamMembers } from '../components/team/TeamMembers';
import { TeamCTA } from '../components/team/TeamCTA';

export function Team() {
  return (
    <div className="flex-1">
      <TeamHero />
      <TeamMembers />
      <TeamCTA />
    </div>
  );
}