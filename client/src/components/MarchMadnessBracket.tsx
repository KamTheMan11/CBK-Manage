import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { collegeTeams } from '../lib/data/collegeTeams';
import { defaultTeams } from '../lib/data/teams';
import BackButton from './BackButton';

// List of US cities for tournament locations
const usCities = [
  { city: "New York", state: "NY" },
  { city: "Los Angeles", state: "CA" },
  { city: "Chicago", state: "IL" },
  { city: "Houston", state: "TX" },
  { city: "Phoenix", state: "AZ" },
  { city: "Philadelphia", state: "PA" },
  { city: "San Antonio", state: "TX" },
  { city: "San Diego", state: "CA" },
  { city: "Dallas", state: "TX" },
  { city: "Austin", state: "TX" },
  { city: "San Francisco", state: "CA" },
  { city: "Indianapolis", state: "IN" },
  { city: "Columbus", state: "OH" },
  { city: "Charlotte", state: "NC" },
  { city: "Seattle", state: "WA" },
  { city: "Denver", state: "CO" },
  { city: "Washington", state: "DC" },
  { city: "Boston", state: "MA" },
  { city: "Oklahoma City", state: "OK" },
  { city: "Nashville", state: "TN" },
  { city: "Portland", state: "OR" },
  { city: "Las Vegas", state: "NV" },
  { city: "Milwaukee", state: "WI" },
  { city: "Albuquerque", state: "NM" },
  { city: "Kansas City", state: "MO" },
  { city: "Omaha", state: "NE" },
  { city: "Pittsburgh", state: "PA" },
  { city: "Atlanta", state: "GA" },
  { city: "Cincinnati", state: "OH" },
  { city: "Minneapolis", state: "MN" },
  { city: "Salt Lake City", state: "UT" },
  { city: "Orlando", state: "FL" },
  { city: "Cleveland", state: "OH" },
  { city: "New Orleans", state: "LA" },
  { city: "St. Louis", state: "MO" },
  { city: "Tampa", state: "FL" },
  { city: "Buffalo", state: "NY" },
  { city: "Louisville", state: "KY" },
  { city: "Birmingham", state: "AL" },
  { city: "Providence", state: "RI" },
  { city: "Memphis", state: "TN" },
  { city: "Raleigh", state: "NC" },
  { city: "Spokane", state: "WA" },
  { city: "Sacramento", state: "CA" },
  { city: "Tulsa", state: "OK" },
  { city: "Dayton", state: "OH" },
  { city: "Greensboro", state: "NC" },
  { city: "Albany", state: "NY" }
];

// Function to get random cities
const getRandomCities = (count: number) => {
  const shuffled = [...usCities].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

interface BracketTeam {
  id: number;
  seed: number;
  name: string;
  score?: number;
}

interface BracketGame {
  id: number;
  round: number; // 0 for First Four, 1-6 for main tournament
  region: string;
  team1: BracketTeam | null;
  team2: BracketTeam | null;
  winner?: number; // ID of winning team
  isFirstFour?: boolean;
  firstFourWinnerSlot?: number; // Which slot in Round of 64 this winner goes to
}

interface BracketRegion {
  name: string;
  games: BracketGame[];
}

interface MarchMadnessBracketProps {
  onRoundChange?: (round: number) => void;
}

const MarchMadnessBracket: React.FC<MarchMadnessBracketProps> = ({ onRoundChange }) => {
  const [bracket, setBracket] = useState<BracketRegion[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [regionCities, setRegionCities] = useState<{[key: string]: {city: string, state: string}}>({}); // Cities for each region
  const ncaaLogoUrl = "/images/ncaa-logo.png";
  const ncaaBasketballLogoUrl = "/images/ncaa-basketball-logo.png";
  
  // Notify parent component when round changes
  useEffect(() => {
    if (onRoundChange) {
      onRoundChange(currentRound);
    }
  }, [currentRound, onRoundChange]);
  const marchMadnessLogoUrl = "/images/march-madness-logo.png";
  
  useEffect(() => {
    // Generate a randomized bracket when component loads
    generateBracket();
  }, []);
  
  const generateBracket = () => {
    // Regions of the NCAA tournament
    const regions = ["First Four", "East", "West", "South", "Midwest"];
    
    // Generate random cities for First Four, regions and Final Four
    const randomCities = getRandomCities(6); // Get 6 random cities (First Four + 4 regions + Final Four)
    
    // Dayton, OH is always the First Four host
    const cityList = [...randomCities];
    cityList[0] = { city: "Dayton", state: "OH" };
    const newRegionCities: {[key: string]: {city: string, state: string}} = {};
    
    // Assign cities to regions
    regions.forEach((region, index) => {
      newRegionCities[region] = randomCities[index];
    });
    newRegionCities["Final Four"] = randomCities[4];
    setRegionCities(newRegionCities);
    
    // Major conferences for top seeds
    const majorConferences = [1, 2, 3, 4, 6]; // ACC, SEC, Big Ten, Big 12, American
    
    // Calculate win percentage for ranking
    const rankedTeams = collegeTeams.map(team => {
      const teamData = defaultTeams.find(t => t.id === team.id);
      const winPct = teamData ? teamData.wins / (teamData.wins + teamData.losses) : 0;
      return { ...team, winPct };
    }).sort((a, b) => b.winPct - a.winPct);

    // Top 25 teams are the ones with best win percentage
    const top25Teams = rankedTeams.slice(0, 25);
    const remainingTeams = rankedTeams.slice(25);

    // Select 8 teams for First Four (4 lowest at-large and 4 lowest auto-bids)
    const firstFourTeams = remainingTeams.slice(-8).sort(() => Math.random() - 0.5);
    
    // Filter teams by major conferences and rankings
    const majorConfTeams = rankedTeams.filter(team => 
      [1, 2, 3, 4, 5, 6].includes(team.conferenceId) // ACC, SEC, Big Ten, Big 12, Big East, American
    );
    const otherTeams = rankedTeams.filter(team => 
      ![1, 2, 3, 4, 5, 6].includes(team.conferenceId)
    );

    // Remaining teams for main bracket
    const shuffledTeams = [
      ...majorConfTeams.sort(() => Math.random() - 0.5).slice(0, 16), // Top 16 teams (1-4 seeds)
      ...otherTeams.sort(() => Math.random() - 0.5)
    ].map((team, index) => ({
        id: team.id,
        name: team.shortName,
        primaryColor: team.primaryColor,
        seed: (index % 16) + 1 // Assign seeds 1-16 in each region
      }));
    
    const bracketData: BracketRegion[] = [];
    
    // Create four regions with 8 games each in the first round
    regions.forEach((region, regionIndex) => {
      const regionGames: BracketGame[] = [];
      
      // Define standard NCAA tournament seed matchups for first round
      const seedMatchups = [
        [1, 16], // 1 vs 16 seed
        [8, 9],  // 8 vs 9 seed
        [5, 12], // 5 vs 12 seed
        [4, 13], // 4 vs 13 seed
        [6, 11], // 6 vs 11 seed
        [3, 14], // 3 vs 14 seed
        [7, 10], // 7 vs 10 seed
        [2, 15]  // 2 vs 15 seed
      ];
        
      // First round games (Round of 64)
      seedMatchups.forEach((matchup, i) => {
        // Find teams with these seeds in the current region
        const team1 = shuffledTeams.find(t => 
          t.seed === matchup[0] && 
          Math.floor((shuffledTeams.indexOf(t) / 16)) === regionIndex
        );
        
        const team2 = shuffledTeams.find(t => 
          t.seed === matchup[1] && 
          Math.floor((shuffledTeams.indexOf(t) / 16)) === regionIndex
        );
          
        if (!team1 || !team2) return; // Skip if we can't find matching seeds
        
        // Always create completed games for March Madness
        // 30% chance for upsets, limited to 5 per region
        const upsetCount = regionGames.filter(g => 
          g.winner && g.team1 && g.team2 && 
          ((g.team1.seed < g.team2.seed && g.winner === g.team2.id) ||
           (g.team2.seed < g.team1.seed && g.winner === g.team1.id))
        ).length;
        
        const upsetChance = upsetCount >= 5 ? 0 : 0.3;
        const higherSeedWins = Math.random() > upsetChance;
        
        // Generate scores with at least 50 points for each team in finals
        let team1Score = Math.floor(Math.random() * 30) + 50; // 50-79
        let team2Score = Math.floor(Math.random() * 30) + 50; // 50-79
        let winner = null;
        
        // Adjust scores to match the winner
        if (higherSeedWins && team1.seed < team2.seed) {
          // Team 1 wins (higher seed)
          if (team2Score >= team1Score) team2Score = team1Score - (1 + Math.floor(Math.random() * 5));
          winner = team1.id;
        } else if (higherSeedWins && team2.seed < team1.seed) {
          // Team 2 wins (higher seed)
          if (team1Score >= team2Score) team1Score = team2Score - (1 + Math.floor(Math.random() * 5));
          winner = team2.id;
        } else if (!higherSeedWins && team1.seed < team2.seed) {
          // Upset: Team 2 wins
          if (team1Score >= team2Score) team1Score = team2Score - (1 + Math.floor(Math.random() * 5));
          winner = team2.id;
        } else {
          // Upset: Team 1 wins
          if (team2Score >= team1Score) team2Score = team1Score - (1 + Math.floor(Math.random() * 5));
          winner = team1.id;
        }
        
        // Add the game to the region games
        regionGames.push({
          id: regionIndex * 100 + i,
          round: 1,
          region,
          team1: { ...team1, score: team1Score },
          team2: { ...team2, score: team2Score },
          winner
        });
      });
      
      // Second round games (Round of 32)
      for (let i = 0; i < 4; i++) {
        regionGames.push({
          id: regionIndex * 100 + 8 + i,
          round: 2,
          region,
          team1: null,
          team2: null
        });
      }
      
      // Sweet 16 games
      for (let i = 0; i < 2; i++) {
        regionGames.push({
          id: regionIndex * 100 + 12 + i,
          round: 3,
          region,
          team1: null,
          team2: null
        });
      }
      
      // Elite 8 game
      regionGames.push({
        id: regionIndex * 100 + 14,
        round: 4,
        region,
        team1: null,
        team2: null
      });
      
      bracketData.push({
        name: region,
        games: regionGames
      });
    });
    
    // Final Four games
    const finalFourRegion: BracketRegion = {
      name: "Final Four",
      games: [
        {
          id: 401,
          round: 5,
          region: "Final Four",
          team1: null,
          team2: null
        },
        {
          id: 402,
          round: 5,
          region: "Final Four",
          team1: null,
          team2: null
        },
        {
          id: 403,
          round: 6,
          region: "Championship",
          team1: null,
          team2: null
        }
      ]
    };
    
    bracketData.push(finalFourRegion);
    setBracket(bracketData);
    
    // Simulate the bracket by filling in winners from first round games
    simulateBracket(bracketData);
  };
  
  const simulateBracket = (bracketData: BracketRegion[]) => {
    // This would be called after generating a new bracket to fill in some results
    // For simplicity, we'll randomly advance some teams to later rounds
    
    // We'll update the bracket in stages to simulate tournament progression
    setTimeout(() => {
      // Simulate Round of 32 games (some of them)
      const newBracket = [...bracketData];
      
      newBracket.forEach((region, regionIndex) => {
        if (region.name === "Final Four") return;
        
        // Process first round games to fill in second round matchups
        const firstRoundGames = region.games.filter(g => g.round === 1);
        const secondRoundGames = region.games.filter(g => g.round === 2);
        
        // Only fill in games where both first round games have been completed
        for (let i = 0; i < 4; i++) {
          const game1 = firstRoundGames[i * 2];
          const game2 = firstRoundGames[i * 2 + 1];
          
          if (game1.winner && game2.winner) {
            const team1 = collegeTeams.find(t => t.id === game1.winner);
            const team2 = collegeTeams.find(t => t.id === game2.winner);
            
            if (team1 && team2) {
              const nextRoundGame = secondRoundGames[i];
              nextRoundGame.team1 = {
                id: team1.id,
                name: team1.shortName,
                seed: game1.team1?.id === team1.id ? game1.team1.seed : game1.team2!.seed
              };
              nextRoundGame.team2 = {
                id: team2.id,
                name: team2.shortName,
                seed: game2.team1?.id === team2.id ? game2.team1.seed : game2.team2!.seed
              };
              
              // All games should be completed with 50+ points for each team
              nextRoundGame.team1.score = Math.floor(Math.random() * 30) + 50; // 50-79
              nextRoundGame.team2.score = Math.floor(Math.random() * 30) + 50; // 50-79
              
              if (nextRoundGame.team1.score === nextRoundGame.team2.score) {
                nextRoundGame.team1.score += 2; // Avoid ties
              }
              
              nextRoundGame.winner = nextRoundGame.team1.score! > nextRoundGame.team2.score! 
                ? nextRoundGame.team1.id 
                : nextRoundGame.team2.id;
            }
          }
        }
      });
      
      setBracket(newBracket);
      setCurrentRound(2);
      
      // Continue to Sweet 16
      setTimeout(() => {
        simulateNextRound(newBracket, 3);
      }, 500);
    }, 500);
  };
  
  const simulateNextRound = (bracketData: BracketRegion[], round: number) => {
    // Create a deep copy of the bracket data
    const updatedBracket = [...bracketData];
    
    // Update the current round
    setCurrentRound(round);
    
    updatedBracket.forEach((region) => {
      if (region.name === "Final Four") {
        if (round === 5 || round === 6) {
          // Handle Final Four and Championship games
          const finalFourGames = region.games.filter(g => g.round === 5);
          const championshipGame = region.games.find(g => g.round === 6);
          
          if (round === 5) {
            // Set up Final Four matchups from Elite 8 winners
            const eliteEightWinners = updatedBracket
              .filter(r => r.name !== "Final Four")
              .map(r => {
                const eliteEightGame = r.games.find(g => g.round === 4);
                return eliteEightGame?.winner ? 
                  collegeTeams.find(t => t.id === eliteEightGame.winner) : null;
              })
              .filter((t): t is NonNullable<typeof t> => t !== null);
            
            if (eliteEightWinners.length >= 4) {
              // East vs West, South vs Midwest
              finalFourGames[0].team1 = {
                id: eliteEightWinners[0].id,
                name: eliteEightWinners[0].shortName,
                seed: Math.floor(Math.random() * 8) + 1 // Just for display purposes
              };
              
              finalFourGames[0].team2 = {
                id: eliteEightWinners[1].id,
                name: eliteEightWinners[1].shortName,
                seed: Math.floor(Math.random() * 8) + 1
              };
              
              finalFourGames[1].team1 = {
                id: eliteEightWinners[2].id,
                name: eliteEightWinners[2].shortName,
                seed: Math.floor(Math.random() * 8) + 1
              };
              
              finalFourGames[1].team2 = {
                id: eliteEightWinners[3].id,
                name: eliteEightWinners[3].shortName,
                seed: Math.floor(Math.random() * 8) + 1
              };
              
              // Random winner for 1st Final Four game with 50+ points for each team
              const score1 = Math.floor(Math.random() * 30) + 50; // 50-79
              const score2 = Math.floor(Math.random() * 30) + 50; // 50-79
              
              finalFourGames[0].team1.score = score1;
              finalFourGames[0].team2.score = score2;
              finalFourGames[0].winner = score1 > score2 ? 
                finalFourGames[0].team1.id : finalFourGames[0].team2.id;
            }
          } else if (round === 6 && championshipGame) {
            // Set up Championship game
            if (finalFourGames[0].winner && finalFourGames[1].team1 && finalFourGames[1].team2) {
              const finalist1 = collegeTeams.find(t => t.id === finalFourGames[0].winner);
              
              // Random winner for 2nd Final Four game
              const score1 = Math.floor(Math.random() * 20) + 65;
              const score2 = Math.floor(Math.random() * 20) + 65;
              
              finalFourGames[1].team1.score = score1;
              finalFourGames[1].team2.score = score2;
              finalFourGames[1].winner = score1 > score2 ? 
                finalFourGames[1].team1.id : finalFourGames[1].team2.id;
              
              const finalist2 = collegeTeams.find(t => t.id === finalFourGames[1].winner);
              
              if (finalist1 && finalist2) {
                championshipGame.team1 = {
                  id: finalist1.id,
                  name: finalist1.shortName,
                  seed: Math.floor(Math.random() * 5) + 1
                };
                
                championshipGame.team2 = {
                  id: finalist2.id,
                  name: finalist2.shortName,
                  seed: Math.floor(Math.random() * 5) + 1
                };
                
                // Championship game with both teams scoring 65-85 points
                const champScore1 = Math.floor(Math.random() * 20) + 65;
                const champScore2 = Math.floor(Math.random() * 20) + 65;
                
                // Avoid ties
                championshipGame.team1.score = champScore1;
                championshipGame.team2.score = champScore1 === champScore2 ? champScore2 + 2 : champScore2;
                
                // Determine the champion
                championshipGame.winner = championshipGame.team1.score > championshipGame.team2.score ?
                  championshipGame.team1.id : championshipGame.team2.id;
              }
            }
          }
        }
      } else {
        // For regular regions (East, West, South, Midwest)
        const prevRoundGames = region.games.filter(g => g.round === round - 1);
        const currentRoundGames = region.games.filter(g => g.round === round);
        
        for (let i = 0; i < currentRoundGames.length; i++) {
          const game1Index = i * 2;
          const game2Index = i * 2 + 1;
          
          if (game1Index < prevRoundGames.length && game2Index < prevRoundGames.length) {
            const game1 = prevRoundGames[game1Index];
            const game2 = prevRoundGames[game2Index];
            
            if (game1.winner && game2.winner) {
              const team1 = collegeTeams.find(t => t.id === game1.winner);
              const team2 = collegeTeams.find(t => t.id === game2.winner);
              
              if (team1 && team2) {
                const nextRoundGame = currentRoundGames[i];
                nextRoundGame.team1 = {
                  id: team1.id,
                  name: team1.shortName,
                  seed: game1.team1?.id === team1.id ? game1.team1.seed : game1.team2!.seed
                };
                nextRoundGame.team2 = {
                  id: team2.id,
                  name: team2.shortName,
                  seed: game2.team1?.id === team2.id ? game2.team1.seed : game2.team2!.seed
                };
                
                // All games should have 50+ points for each team
                nextRoundGame.team1.score = Math.floor(Math.random() * 30) + 50; // 50-79
                nextRoundGame.team2.score = Math.floor(Math.random() * 30) + 50; // 50-79
                
                if (nextRoundGame.team1.score === nextRoundGame.team2.score) {
                  nextRoundGame.team1.score += 2; // Avoid ties
                }
                
                nextRoundGame.winner = nextRoundGame.team1.score! > nextRoundGame.team2.score! 
                  ? nextRoundGame.team1.id 
                  : nextRoundGame.team2.id;
              }
            }
          }
        }
      }
    });
    
    // Update the bracket state
    setBracket(updatedBracket);
    
    // Continue to next round if needed
    if (round < 6) {
      setTimeout(() => {
        simulateNextRound(updatedBracket, round + 1);
      }, 500);
    }
  };
  
  const renderGame = (game: BracketGame) => {
    const gameCompleted = game.winner !== undefined;
    
    return (
      <div 
        key={game.id} 
        className="bracket-game bg-white dark:bg-gray-800 p-2 rounded-md shadow mb-2 text-sm"
      >
        <div className={`team ${gameCompleted && game.team1 && game.winner === game.team1.id ? 'font-bold' : ''}`}>
          {game.team1 ? (
            <div className="flex justify-between">
              <span>
                <span className="w-5 inline-block text-center font-semibold mr-1">{game.team1.seed}</span>
                {game.team1.name}
              </span>
              <span>{typeof game.team1.score === 'number' ? game.team1.score : ''}</span>
            </div>
          ) : (
            <div className="h-5 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
          )}
        </div>
        <div className={`team ${gameCompleted && game.team2 && game.winner === game.team2.id ? 'font-bold' : ''}`}>
          {game.team2 ? (
            <div className="flex justify-between">
              <span>
                <span className="w-5 inline-block text-center font-semibold mr-1">{game.team2.seed}</span>
                {game.team2.name}
              </span>
              <span>{typeof game.team2.score === 'number' ? game.team2.score : ''}</span>
            </div>
          ) : (
            <div className="h-5 mt-1 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img src={marchMadnessLogoUrl} alt="March Madness Logo" className="h-12 mr-4" />
          <h1 className="text-2xl font-bold text-[#003087] dark:text-[#4a90e2]">NCAA Tournament Bracket</h1>
        </div>
        <div className="flex items-center">
          <img src={ncaaLogoUrl} alt="NCAA Logo" className="h-8 mr-2" />
          <img src={ncaaBasketballLogoUrl} alt="NCAA Basketball Logo" className="h-10" />
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <BackButton />
          <button
            onClick={generateBracket}
            className="px-4 py-2 bg-[#003087] hover:bg-[#002066] text-white rounded-md"
          >
            Randomize Bracket
          </button>
        </div>
        
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Current Simulation Round: {
            currentRound === 1 ? "First Round" :
            currentRound === 2 ? "Second Round" :
            currentRound === 3 ? "Sweet 16" :
            currentRound === 4 ? "Elite 8" :
            currentRound === 5 ? "Final Four" :
            "Championship"
          }
        </span>
      </div>
      
      <Card className="overflow-hidden">
        <CardContent className="pt-6">
          <div className="overflow-x-auto max-h-[75vh]">
            <div className="w-[2000px] flex flex-col space-y-8">
              {/* First Four */}
              <div className="flex space-x-8">
                <div className="w-[900px]">
                  <h3 className="text-lg font-bold mb-4">
                    First Four – Dayton, OH
                  </h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-gray-500">FIRST FOUR - DAY 1</h4>
                      {bracket[0]?.games.slice(0, 2).map(renderGame)}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-gray-500">FIRST FOUR - DAY 2</h4>
                      {bracket[0]?.games.slice(2, 4).map(renderGame)}
                    </div>
                  </div>
                </div>
              </div>
              {/* First 2 regions */}
              <div className="flex space-x-8">
                {bracket.slice(0, 2).map((region) => (
                  <div key={region.name} className="w-[900px]">
                    <h3 className="text-lg font-bold mb-4">
                      {region.name} Region – {regionCities[region.name] ? `${regionCities[region.name].city}, ${regionCities[region.name].state}` : 'TBD'}
                    </h3>
                    <div className="grid grid-cols-4 gap-8">
                      {/* First Round (Round of 64) */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-gray-500">FIRST ROUND</h4>
                        {region.games.filter(g => g.round === 1).map(renderGame)}
                      </div>
                      
                      {/* Second Round (Round of 32) */}
                      <div className="space-y-2 mt-6">
                        <h4 className="text-xs font-semibold text-gray-500">SECOND ROUND</h4>
                        {region.games.filter(g => g.round === 2).map(renderGame)}
                      </div>
                      
                      {/* Sweet 16 */}
                      <div className="space-y-2 mt-12">
                        <h4 className="text-xs font-semibold text-gray-500">SWEET 16</h4>
                        {region.games.filter(g => g.round === 3).map(renderGame)}
                      </div>
                      
                      {/* Elite 8 */}
                      <div className="space-y-2 mt-16">
                        <h4 className="text-xs font-semibold text-gray-500">ELITE 8</h4>
                        {region.games.filter(g => g.round === 4).map(renderGame)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Final Four */}
              <div className="w-full">
                <h3 className="text-lg font-bold mb-4">
                    Final Four – {regionCities["Final Four"] ? `${regionCities["Final Four"].city}, ${regionCities["Final Four"].state}` : 'TBD'}
                  </h3>
                <div className="flex justify-center">
                  <div className="w-[600px] grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-gray-500">FINAL FOUR</h4>
                      {bracket[4]?.games.filter(g => g.round === 5).map(renderGame)}
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-gray-500">NATIONAL CHAMPIONSHIP</h4>
                      <div className="mt-12">
                        {bracket[4]?.games.filter(g => g.round === 6).map(renderGame)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Last 2 regions */}
              <div className="flex space-x-8">
                {bracket.slice(2, 4).map((region) => (
                  <div key={region.name} className="w-[900px]">
                    <h3 className="text-lg font-bold mb-4">
                      {region.name} Region – {regionCities[region.name] ? `${regionCities[region.name].city}, ${regionCities[region.name].state}` : 'TBD'}
                    </h3>
                    <div className="grid grid-cols-4 gap-8">
                      {/* First Round (Round of 64) */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-gray-500">FIRST ROUND</h4>
                        {region.games.filter(g => g.round === 1).map(renderGame)}
                      </div>
                      
                      {/* Second Round (Round of 32) */}
                      <div className="space-y-2 mt-6">
                        <h4 className="text-xs font-semibold text-gray-500">SECOND ROUND</h4>
                        {region.games.filter(g => g.round === 2).map(renderGame)}
                      </div>
                      
                      {/* Sweet 16 */}
                      <div className="space-y-2 mt-12">
                        <h4 className="text-xs font-semibold text-gray-500">SWEET 16</h4>
                        {region.games.filter(g => g.round === 3).map(renderGame)}
                      </div>
                      
                      {/* Elite 8 */}
                      <div className="space-y-2 mt-16">
                        <h4 className="text-xs font-semibold text-gray-500">ELITE 8</h4>
                        {region.games.filter(g => g.round === 4).map(renderGame)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarchMadnessBracket;