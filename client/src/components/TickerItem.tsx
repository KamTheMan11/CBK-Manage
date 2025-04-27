import React from 'react';

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
    } else {
      return status;
    }
  };

  return (
    <div className="ticker-item">
      <span className="ticker-team">
        {teamARank && <span className="bg-[#D30000] text-white px-1 text-xs mr-1">#{teamARank}</span>}
        {teamA}
      </span>
      
      {/* Show score for games in progress or completed */}
      {(status === 'Final' || status === '1st Half' || status === '2nd Half' || status === 'Halftime') ? (
        <>
          <span className="ticker-score">{scoreA}</span>
          <span className="ticker-team">
            {teamBRank && <span className="bg-[#D30000] text-white px-1 text-xs mr-1">#{teamBRank}</span>}
            {teamB}
          </span>
          <span className="ticker-score">{scoreB}</span>
        </>
      ) : (
        /* Show vs. between teams for upcoming games */
        <>
          <span className="mx-1 text-white">vs.</span>
          <span className="ticker-team">
            {teamBRank && <span className="bg-[#D30000] text-white px-1 text-xs mr-1">#{teamBRank}</span>}
            {teamB}
          </span>
        </>
      )}
      
      <span className="ticker-status ml-2">
        {getStatusDisplay()}
        
        {/* Only show network for upcoming games or nationally televised games - omit for completed games */}
        {(status !== 'Final' && network) && ` • ${network}`}
        {nationally && ' • Nat\'l TV'}
      </span>
    </div>
  );
};