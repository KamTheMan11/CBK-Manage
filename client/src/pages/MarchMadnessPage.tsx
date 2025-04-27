import { useState, useEffect } from 'react';
import MarchMadnessBracket from '../components/MarchMadnessBracket';
import PerfectBracketTracker from '../components/PerfectBracketTracker';

export default function MarchMadnessPage() {
  const [currentRound, setCurrentRound] = useState(1);
  
  // Listen for bracket round updates
  useEffect(() => {
    const handleBracketRoundUpdate = (event: CustomEvent) => {
      if (event.detail && typeof event.detail.round === 'number') {
        setCurrentRound(event.detail.round);
      }
    };
    
    // Add event listener for custom bracket round updates
    window.addEventListener('bracketRoundUpdate' as any, handleBracketRoundUpdate as any);
    
    return () => {
      window.removeEventListener('bracketRoundUpdate' as any, handleBracketRoundUpdate as any);
    };
  }, []);
  
  return (
    <div className="mb-20 space-y-6"> {/* Add margin to avoid overlap with ticker */}
      {/* Perfect Bracket Tracker */}
      <div className="container mx-auto">
        <PerfectBracketTracker currentRound={currentRound} />
      </div>
      
      {/* March Madness Bracket */}
      <MarchMadnessBracket onRoundChange={setCurrentRound} />
    </div>
  );
}