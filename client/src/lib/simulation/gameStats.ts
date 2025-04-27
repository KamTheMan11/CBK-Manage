import { Player, Team, PlayerGameStats, TeamGameStats } from '../types';

// Initialize player game stats
export const initializePlayerGameStats = (): PlayerGameStats => {
  return {
    points: 0,
    rebounds: 0,
    assists: 0,
    steals: 0,
    blocks: 0,
    turnovers: 0,
    fouls: 0,
    fgMade: 0,
    fgAttempted: 0,
    fg3Made: 0,
    fg3Attempted: 0,
    ftMade: 0,
    ftAttempted: 0,
    minutesPlayed: 0
  };
};

// Initialize team game stats
export const initializeTeamGameStats = (timeoutsTotal: number): TeamGameStats => {
  return {
    points: 0,
    rebounds: 0,
    assists: 0,
    steals: 0,
    blocks: 0,
    turnovers: 0,
    fouls: 0,
    fgMade: 0,
    fgAttempted: 0,
    fg3Made: 0,
    fg3Attempted: 0,
    ftMade: 0,
    ftAttempted: 0,
    timeoutsUsed: 0,
    timeoutsRemaining: timeoutsTotal,
    playerStats: {}
  };
};

// Update player stats after a made field goal
export const updatePlayerStatsAfterFieldGoal = (
  stats: PlayerGameStats,
  points: number,
  isThreePointer: boolean,
  assistedBy?: number
): PlayerGameStats => {
  const newStats = { ...stats };
  newStats.points += points;
  
  if (isThreePointer) {
    newStats.fg3Made += 1;
    newStats.fg3Attempted += 1;
  } else {
    newStats.fgMade += 1;
    newStats.fgAttempted += 1;
  }
  
  return newStats;
};

// Update player stats after a missed field goal
export const updatePlayerStatsAfterMiss = (
  stats: PlayerGameStats,
  isThreePointer: boolean
): PlayerGameStats => {
  const newStats = { ...stats };
  
  if (isThreePointer) {
    newStats.fg3Attempted += 1;
  } else {
    newStats.fgAttempted += 1;
  }
  
  return newStats;
};

// Update player stats after a free throw
export const updatePlayerStatsAfterFreeThrow = (
  stats: PlayerGameStats,
  made: boolean
): PlayerGameStats => {
  const newStats = { ...stats };
  
  if (made) {
    newStats.points += 1;
    newStats.ftMade += 1;
  }
  
  newStats.ftAttempted += 1;
  
  return newStats;
};

// Update player stats after a rebound
export const updatePlayerStatsAfterRebound = (
  stats: PlayerGameStats
): PlayerGameStats => {
  const newStats = { ...stats };
  newStats.rebounds += 1;
  return newStats;
};

// Update player stats after an assist
export const updatePlayerStatsAfterAssist = (
  stats: PlayerGameStats
): PlayerGameStats => {
  const newStats = { ...stats };
  newStats.assists += 1;
  return newStats;
};

// Update player stats after a steal
export const updatePlayerStatsAfterSteal = (
  stats: PlayerGameStats
): PlayerGameStats => {
  const newStats = { ...stats };
  newStats.steals += 1;
  return newStats;
};

// Update player stats after a block
export const updatePlayerStatsAfterBlock = (
  stats: PlayerGameStats
): PlayerGameStats => {
  const newStats = { ...stats };
  newStats.blocks += 1;
  return newStats;
};

// Update player stats after a turnover
export const updatePlayerStatsAfterTurnover = (
  stats: PlayerGameStats
): PlayerGameStats => {
  const newStats = { ...stats };
  newStats.turnovers += 1;
  return newStats;
};

// Update player stats after a foul
export const updatePlayerStatsAfterFoul = (
  stats: PlayerGameStats
): PlayerGameStats => {
  const newStats = { ...stats };
  newStats.fouls += 1;
  return newStats;
};

// Update player minutes played
export const updatePlayerMinutesPlayed = (
  stats: PlayerGameStats,
  minutes: number
): PlayerGameStats => {
  const newStats = { ...stats };
  newStats.minutesPlayed += minutes;
  return newStats;
};

// Calculate field goal percentage
export const calculateFieldGoalPercentage = (made: number, attempted: number): number => {
  if (attempted === 0) return 0;
  return (made / attempted) * 100;
};

// Calculate three-point percentage
export const calculateThreePointPercentage = (made: number, attempted: number): number => {
  if (attempted === 0) return 0;
  return (made / attempted) * 100;
};

// Calculate free throw percentage
export const calculateFreeThrowPercentage = (made: number, attempted: number): number => {
  if (attempted === 0) return 0;
  return (made / attempted) * 100;
};

// Calculate team stats from player stats
export const calculateTeamStats = (
  players: Player[],
  timeoutsRemaining: number,
  timeoutsTotal: number
): TeamGameStats => {
  const teamStats: TeamGameStats = initializeTeamGameStats(timeoutsTotal);
  teamStats.timeoutsRemaining = timeoutsRemaining;
  teamStats.timeoutsUsed = timeoutsTotal - timeoutsRemaining;
  
  players.forEach(player => {
    if (!player.stats) return;
    
    const { id, stats } = player;
    teamStats.playerStats[id] = { ...stats };
    
    // Accumulate team stats
    teamStats.points += stats.points;
    teamStats.rebounds += stats.rebounds;
    teamStats.assists += stats.assists;
    teamStats.steals += stats.steals;
    teamStats.blocks += stats.blocks;
    teamStats.turnovers += stats.turnovers;
    teamStats.fouls += stats.fouls;
    teamStats.fgMade += stats.fgMade;
    teamStats.fgAttempted += stats.fgAttempted;
    teamStats.fg3Made += stats.fg3Made;
    teamStats.fg3Attempted += stats.fg3Attempted;
    teamStats.ftMade += stats.ftMade;
    teamStats.ftAttempted += stats.ftAttempted;
  });
  
  return teamStats;
};

// Get a formatted stat line for a player
export const getPlayerStatLine = (stats: PlayerGameStats): string => {
  return `${stats.points} pts, ${stats.rebounds} reb, ${stats.assists} ast`;
};

// Get a player's shooting line
export const getPlayerShootingLine = (stats: PlayerGameStats): string => {
  const fgPct = calculateFieldGoalPercentage(stats.fgMade, stats.fgAttempted);
  const threePct = calculateThreePointPercentage(stats.fg3Made, stats.fg3Attempted);
  const ftPct = calculateFreeThrowPercentage(stats.ftMade, stats.ftAttempted);
  
  return `FG: ${stats.fgMade}/${stats.fgAttempted} (${fgPct.toFixed(1)}%), ` +
         `3PT: ${stats.fg3Made}/${stats.fg3Attempted} (${threePct.toFixed(1)}%), ` +
         `FT: ${stats.ftMade}/${stats.ftAttempted} (${ftPct.toFixed(1)}%)`;
};

export default {
  initializePlayerGameStats,
  initializeTeamGameStats,
  updatePlayerStatsAfterFieldGoal,
  updatePlayerStatsAfterMiss,
  updatePlayerStatsAfterFreeThrow,
  updatePlayerStatsAfterRebound,
  updatePlayerStatsAfterAssist,
  updatePlayerStatsAfterSteal,
  updatePlayerStatsAfterBlock,
  updatePlayerStatsAfterTurnover,
  updatePlayerStatsAfterFoul,
  updatePlayerMinutesPlayed,
  calculateFieldGoalPercentage,
  calculateThreePointPercentage,
  calculateFreeThrowPercentage,
  calculateTeamStats,
  getPlayerStatLine,
  getPlayerShootingLine
};
