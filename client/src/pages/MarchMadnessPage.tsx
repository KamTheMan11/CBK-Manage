import React, { useState, useEffect } from 'react';
import MarchMadnessBracket from '../components/MarchMadnessBracket';
import PerfectBracketTracker from '../components/PerfectBracketTracker';

const MarchMadnessPage: React.FC = () => {
  const [currentRound, setCurrentRound] = useState(1);
  
  // Update the current round based on the bracket component
  const handleRoundChange = (round: number) => {
    setCurrentRound(round);
  };
  
  return (
    <div className="mb-20 space-y-6"> {/* Add margin to avoid overlap with ticker */}
      {/* Perfect Bracket Tracker */}
      <div className="container mx-auto">
        <PerfectBracketTracker currentRound={currentRound} />
      </div>
      
      {/* March Madness Bracket */}
      <MarchMadnessBracket onRoundChange={handleRoundChange} />
    </div>
  );
};

export default MarchMadnessPage;