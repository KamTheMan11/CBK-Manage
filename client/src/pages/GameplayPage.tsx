
import { useEffect, useState } from 'react';
import { useSettings } from '../lib/stores/useSettings';
import { useGame } from '../lib/stores/useGame';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import BackButton from '../components/BackButton';
import GameSimulation from '../components/GameSimulation';

export default function GameplayPage() {
  const { gameSettings } = useSettings();
  const [selectedTeams, setSelectedTeams] = useState({ home: 1, away: 2 });

  if (!selectedTeams) {
    return (
      <div className="p-4">
        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Select Teams</h2>
            {/* Team selection UI here */}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <BackButton />
      </div>
      
      <GameSimulation 
        homeTeamId={selectedTeams.home}
        awayTeamId={selectedTeams.away}
      />
    </div>
  );
}
