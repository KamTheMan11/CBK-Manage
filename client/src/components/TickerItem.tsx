import React from 'react';
import { isNationalNetwork } from '../lib/data/collegeTeams';

interface TickerGameProps {
  teamA: string;
  teamB: string;
  teamARank?: number;
  teamBRank?: number;
  scoreA?: number;
  scoreB?: number;
  status: string;
  network?: string;
  nationally?: boolean;
}

export const TickerItem: React.FC<TickerGameProps> = ({
  teamA,
  teamB,
  teamARank,
  teamBRank,
  scoreA,
  scoreB,
  status,
  network,
  nationally
}) => {
  // Random time remaining for 1st and 2nd half games
  const getRandomTime = (half: string) => {
    const minutes = half === '1st Half' 
      ? Math.floor(Math.random() * 10) + 10 // 10-19 minutes for 1st half
      : Math.floor(Math.random() * 10) + 1; // 1-10 minutes for 2nd half
    
    const seconds = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    
    // Limit scores based on time remaining in first half
    if (half === '1st Half' && minutes > 10) {
      if ((scoreA || 0) > 25) scoreA = Math.min(scoreA || 0, 25);
      if ((scoreB || 0) > 25) scoreB = Math.min(scoreB || 0, 25);
    }
    
    return `${minutes}:${seconds}`;
  };

  // Status display with time remaining for halves
  const getStatusDisplay = () => {
    if (status === 'Final') {
      return 'Final';
    } else if (status === '1st Half') {
      return `1st Half • ${getRandomTime('1st Half')}`;
    } else if (status === '2nd Half') {
      return `2nd Half • ${getRandomTime('2nd Half')}`;
    } else if (status.includes('PM')) {
      // Ensure FOX games are no later than 7 PM ET
      const time = parseInt(status.split(':')[0]);
      if (network === 'FOX' && time > 7) {
        return '7:00 PM ET';
      }
      return status.replace('PM', 'PM ET');
    } else {
      return status;
    }
  };

  return (
    <div className="ticker-item flex items-center space-x-2 bg-black text-white">
      <div className="flex flex-1 items-center">
        <span className="ticker-team flex items-center">
          {teamARank && <span className="bg-[#D30000] text-white px-1 text-xs mr-1">#{teamARank}</span>}
          {teamA}
        </span>
        
        {/* Show score for games in progress or completed */}
        {(status === 'Final' || status === '1st Half' || status === '2nd Half' || status === 'Halftime') ? (
          <>
            <span className="ticker-score ml-1 font-semibold">{scoreA}</span>
            <span className="mx-2">-</span>
            <span className="ticker-team flex items-center">
              {teamBRank && <span className="bg-[#D30000] text-white px-1 text-xs mr-1">#{teamBRank}</span>}
              {teamB}
            </span>
            <span className="ticker-score ml-1 font-semibold">{scoreB}</span>
          </>
        ) : (
          /* Show vs. between teams for upcoming games */
          <>
            <span className="mx-1 text-white">vs.</span>
            <span className="ticker-team flex items-center">
              {teamBRank && <span className="bg-[#D30000] text-white px-1 text-xs mr-1">#{teamBRank}</span>}
              {teamB}
            </span>
          </>
        )}
      </div>
      
      <div className="flex items-center px-2">
        <span className="ticker-status text-gray-300 text-sm">
          {getStatusDisplay()}
          
          {/* Only show network for upcoming games or nationally televised games - omit for completed games */}
          {(status !== 'Final' && network) && ` • ${network}`}
          {nationally && isNationalNetwork(network || '') && ' • Nat\'l TV'}
        </span>

        {/* Network logo will be shown in status text only */}
      </div>
    </div>
  );
};