import React from 'react';
import { Team, GameState } from '../lib/types';

interface ScoreBugProps {
  homeTeam: Team;
  awayTeam: Team;
  gameState: GameState;
  showFouls?: boolean;
}

export const ScoreBug: React.FC<ScoreBugProps> = ({
  homeTeam,
  awayTeam,
  gameState,
  showFouls = true,
}) => {
  // Format time remaining
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  // Get quarter display
  const getQuarterDisplay = (): string => {
    if (gameState.quarter > 4) {
      return `OT${gameState.quarter - 4}`;
    }
    return gameState.quarter.toString();
  };

  // Format possession indicator
  const isPossession = (team: 'home' | 'away'): boolean => {
    return gameState.possession === team;
  };

  return (
    <div className="flex font-bold bg-[#800000] text-white overflow-hidden rounded-sm">
      {/* Away team */}
      <div className="flex items-center">
        {/* Team rank and fouls (left side) */}
        <div className="flex flex-col bg-black p-1 items-center">
          {awayTeam.id === 25 && <div className="text-xs">25</div>}
          {showFouls && (
            <div className="text-xs">
              <span className="font-semibold">FOULS</span> {gameState.fouls.away}
            </div>
          )}
          {isPossession('away') && <div className="text-xs">POSS</div>}
          {gameState.inBonus.away && <div className="text-xs">BONUS</div>}
        </div>
        
        {/* Team name */}
        <div className="px-3 py-1 text-2xl">{awayTeam.abbreviation}</div>
        
        {/* Score */}
        <div className="px-6 py-1 text-3xl">{gameState.score.away}</div>
      </div>
      
      {/* Game time */}
      <div className="flex flex-col items-center justify-center bg-[#333333] px-2 text-xs">
        <div className="text-yellow-300">{formatTime(gameState.timeRemaining)}</div>
        <div>{getQuarterDisplay()}</div>
      </div>
      
      {/* Home team */}
      <div className="flex items-center">
        {/* Score */}
        <div className="px-6 py-1 text-3xl">{gameState.score.home}</div>
        
        {/* Team name */}
        <div className="px-3 py-1 text-2xl">{homeTeam.abbreviation}</div>
        
        {/* Team rank and fouls (right side) */}
        <div className="flex flex-col bg-black p-1 items-center">
          {homeTeam.id === 11 && <div className="text-xs">11</div>}
          {showFouls && (
            <div className="text-xs">
              <span className="font-semibold">FOULS</span> {gameState.fouls.home}
            </div>
          )}
          {isPossession('home') && <div className="text-xs">POSS</div>}
          {gameState.inBonus.home && <div className="text-xs">BONUS</div>}
        </div>
      </div>
    </div>
  );
};

export default ScoreBug;