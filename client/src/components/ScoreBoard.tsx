import { GameState, Team } from '../lib/types';
import { GameSettings } from '../lib/stores/useSettings';

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

  // Figure out the current quarter
  const getQuarterDisplay = () => {
    if (gameState.quarter > 4) {
      return `OT${gameState.quarter - 4}`;
    }
    return `${gameState.quarter}Q`;
  };
  
  // Check if we're in a bonus situation
  const isHomeBonus = gameState.fouls.home >= gameSettings.bonusThreshold;
  const isAwayBonus = gameState.fouls.away >= gameSettings.bonusThreshold;
  
  return (
    <div className="w-full border border-gray-200 rounded-lg bg-white shadow-md overflow-hidden">
      <div className="bg-[#003087] text-white p-2 flex justify-between items-center">
        <div className="font-bold">{getQuarterDisplay()}</div>
        <div className="text-xl font-bold">{formatTime(gameState.timeRemaining)}</div>
        <div className="text-sm">
          Shot: {formatTime(gameState.shotClockRemaining)}
        </div>
      </div>
      
      <div className="grid grid-cols-3 text-center py-1 bg-gray-100">
        <div className="font-semibold">AWAY</div>
        <div className="font-semibold">SCORE</div>
        <div className="font-semibold">HOME</div>
      </div>
      
      <div className="grid grid-cols-3 text-center p-2">
        <div className="flex flex-col">
          <div className="text-lg font-bold" style={{ color: awayTeam.primaryColor || '#003087' }}>
            {awayTeam.abbreviation}
          </div>
          <div className="text-xs mt-1">
            {gameState.timeouts.away} TO
            {isAwayBonus && <span className="ml-2 bg-[#FFD700] text-[#003087] px-1 rounded">B</span>}
          </div>
        </div>
        
        <div className="text-2xl font-bold">
          {gameState.score.away} - {gameState.score.home}
        </div>
        
        <div className="flex flex-col">
          <div className="text-lg font-bold" style={{ color: homeTeam.primaryColor || '#003087' }}>
            {homeTeam.abbreviation}
          </div>
          <div className="text-xs mt-1">
            {gameState.timeouts.home} TO
            {isHomeBonus && <span className="ml-2 bg-[#FFD700] text-[#003087] px-1 rounded">B</span>}
          </div>
        </div>
      </div>
      
      <div className="p-1 text-sm border-t border-gray-200 flex justify-between items-center">
        <div>
          Fouls: {awayTeam.abbreviation} {gameState.fouls.away} - {homeTeam.abbreviation} {gameState.fouls.home}
        </div>
        <div className="font-semibold">
          Possession: <span className="text-[#003087]">{possessionTeam}</span>
        </div>
      </div>
    </div>
  );
}
