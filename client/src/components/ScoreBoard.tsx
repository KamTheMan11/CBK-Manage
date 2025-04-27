import { GameState, Team } from '../lib/types';
import { GameSettings } from '../lib/stores/useSettings';
import ScoreBug from './ScoreBug';

interface ScoreBoardProps {
  homeTeam: Team;
  awayTeam: Team;
  gameState: GameState;
  gameSettings: GameSettings;
}

export default function ScoreBoard({ homeTeam, awayTeam, gameState, gameSettings }: ScoreBoardProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Determine which team has possession
  const possessionTeam = gameState.possession === 'home' ? homeTeam.name : awayTeam.name;
  
  // Check if we're in a bonus situation
  const isHomeBonus = gameState.fouls.home >= gameSettings.bonusThreshold;
  const isAwayBonus = gameState.fouls.away >= gameSettings.bonusThreshold;
  
  // Update inBonus in gameState to reflect current bonus status
  gameState.inBonus = {
    home: isHomeBonus,
    away: isAwayBonus
  };
  
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main ScoreBug based on the template provided */}
      <ScoreBug 
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        gameState={gameState}
        showFouls={true}
      />
      
      {/* Additional game information */}
      <div className="w-full border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md overflow-hidden">        
        <div className="grid grid-cols-3 text-center p-2 dark:text-white">
          <div className="flex flex-col">
            <div className="text-sm mt-1">
              Timeouts: {gameState.timeouts.away}
            </div>
          </div>
          
          <div className="text-sm font-semibold">
            Shot Clock: {formatTime(gameState.shotClockRemaining)}
          </div>
          
          <div className="flex flex-col">
            <div className="text-sm mt-1">
              Timeouts: {gameState.timeouts.home}
            </div>
          </div>
        </div>
        
        <div className="p-2 text-sm border-t border-gray-200 dark:border-gray-700 flex justify-between items-center dark:text-white">
          <div className="font-semibold">
            Possession: <span className="text-blue-600 dark:text-blue-400">{possessionTeam}</span>
          </div>
          <div>
            Last Event: {gameState.lastEvent?.description || "Game in progress"}
          </div>
        </div>
      </div>
    </div>
  );
}
