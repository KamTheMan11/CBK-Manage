import React from 'react';
import { Card, CardContent } from './ui/card';

interface PerfectBracketTrackerProps {
  currentRound: number;
  totalEliminatedCount?: number; // If provided, uses this instead of calculating
}

export default function PerfectBracketTracker({ 
  currentRound,
  totalEliminatedCount
}: PerfectBracketTrackerProps) {
  // Initial number of brackets (3 million)
  const initialBrackets = 3000000;
  
  // Calculate brackets remaining based on round
  // Each round eliminates more brackets exponentially
  const calculateBracketsRemaining = (): number => {
    if (totalEliminatedCount !== undefined) {
      return Math.max(0, initialBrackets - totalEliminatedCount);
    }
    
    // Default elimination rates by round if totalEliminatedCount not provided
    const eliminationRates = [
      0,           // Round 0 (not started)
      0.82,        // Round 1 (First Round): 82% eliminated
      0.94,        // Round 2 (Second Round): 94% eliminated
      0.98,        // Round 3 (Sweet 16): 98% eliminated
      0.9992,      // Round 4 (Elite 8): 99.92% eliminated
      0.99998,     // Round 5 (Final Four): 99.998% eliminated
      1.0,         // Round 6 (Championship): 100% eliminated
    ];
    
    const rate = eliminationRates[Math.min(currentRound, eliminationRates.length - 1)];
    return Math.round(initialBrackets * (1 - rate));
  };
  
  const bracketsRemaining = calculateBracketsRemaining();
  const bracketsEliminated = initialBrackets - bracketsRemaining;
  const percentageEliminated = ((bracketsEliminated / initialBrackets) * 100).toFixed(6);
  
  // Format large numbers with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-bold text-center text-[#003087] dark:text-[#4a90e2]">
            Perfect Bracket Tracker
          </h3>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mt-2">
            <div 
              className="bg-[#003087] dark:bg-[#4a90e2] h-4 rounded-full" 
              style={{ width: `${percentageEliminated}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm mt-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
              <div className="text-sm text-gray-500 dark:text-gray-400">Brackets Remaining</div>
              <div className="text-xl font-bold text-[#003087] dark:text-[#4a90e2]">
                {formatNumber(bracketsRemaining)}
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
              <div className="text-sm text-gray-500 dark:text-gray-400">Brackets Eliminated</div>
              <div className="text-xl font-bold text-red-600 dark:text-red-400">
                {formatNumber(bracketsEliminated)}
              </div>
            </div>
          </div>
          
          <div className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
            {percentageEliminated}% of brackets have been eliminated
          </div>
          
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            {currentRound > 0 ? 
              `Current Round: ${
                currentRound === 1 ? "First Round" :
                currentRound === 2 ? "Second Round" :
                currentRound === 3 ? "Sweet 16" :
                currentRound === 4 ? "Elite 8" :
                currentRound === 5 ? "Final Four" :
                "Championship"
              }` : 
              "Tournament Not Started"
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
}