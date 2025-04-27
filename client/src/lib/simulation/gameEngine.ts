import { Team, Player, GameState, GamePhase, GameEventRecord, ShotType, PlayerGameStats } from '../types';
import timeManager from './timeManager';
import gameStats from './gameStats';
import playerAI from './playerAI';

// Constants
const SIMULATION_STEP = 0.5; // Simulation step in seconds
const POSSESSION_TIME_MIN = 5; // Minimum possession time in seconds
const POSSESSION_TIME_MAX = 20; // Maximum possession time in seconds
const REBOUND_CHANCE = 0.7; // Chance for a rebound (vs out of bounds)
const OFFENSIVE_REBOUND_BASE_CHANCE = 0.3; // Base chance for offensive rebound

// Initialize game state
export const initializeGameState = (
  homeTeam: Team,
  awayTeam: Team,
  gameSettings: any
): GameState => {
  return {
    quarter: 1,
    timeRemaining: gameSettings.quarterLength * 60, // Convert minutes to seconds
    shotClockRemaining: gameSettings.shotClock,
    score: {
      home: 0,
      away: 0
    },
    fouls: {
      home: 0,
      away: 0
    },
    playerFouls: {},
    timeouts: {
      home: gameSettings.timeoutsPerTeam,
      away: gameSettings.timeoutsPerTeam
    },
    possession: Math.random() < 0.5 ? 'home' : 'away',
    ballPosition: [0, 1, 0], // x, y, z coordinates
    shotClock: gameSettings.shotClock,
    events: [],
    inBonus: {
      home: false,
      away: false
    },
    isPaused: true
  };
};

// Reset player stats for a new game
export const resetPlayerStats = (team: Team): Team => {
  if (!team.players) return team;
  
  const updatedPlayers = team.players.map(player => ({
    ...player,
    stats: gameStats.initializePlayerGameStats()
  }));
  
  return { ...team, players: updatedPlayers };
};

// Start a new quarter
export const startNewQuarter = (
  gameState: GameState,
  quarterLength: number
): GameState => {
  const newGameState = { ...gameState };
  newGameState.timeRemaining = quarterLength * 60;
  newGameState.fouls.home = 0;
  newGameState.fouls.away = 0;
  newGameState.inBonus.home = false;
  newGameState.inBonus.away = false;
  
  // Alternate possession after first quarter
  if (gameState.quarter % 2 === 0) {
    newGameState.possession = gameState.possession === 'home' ? 'away' : 'home';
  }
  
  // Reset shot clock
  newGameState.shotClockRemaining = gameState.shotClock;
  
  return newGameState;
};

// Add a game event to the event log
export const addGameEvent = (
  gameState: GameState,
  type: string,
  description: string,
  playerId?: number,
  teamId?: number
): GameState => {
  const eventTime = timeManager.getEventTime(gameState.quarter, gameState.timeRemaining);
  const newEvent: GameEventRecord = {
    time: eventTime,
    type,
    description,
    playerId,
    teamId
  };
  
  return {
    ...gameState,
    events: [...gameState.events, newEvent],
    lastEvent: newEvent
  };
};

// Take a shot in the game
export const takeShot = (
  gameState: GameState,
  shooter: Player,
  shotType: ShotType,
  defender: Player | undefined,
  gameSettings: any,
  homeTeam: Team,
  awayTeam: Team
): { gameState: GameState, success: boolean } => {
  // Clone the game state to avoid mutation
  let newGameState = { ...gameState };
  
  // Determine if the shot is successful
  const successChance = playerAI.calculateShotSuccess(shooter, shotType, defender, gameSettings);
  const success = Math.random() < successChance;
  
  // Points for this shot
  let points = 0;
  if (success) {
    points = shotType === ShotType.THREE_POINTER ? 3 : (shotType === ShotType.FREE_THROW ? 1 : 2);
  }
  
  // Update the score
  if (success) {
    if (gameState.possession === 'home') {
      newGameState.score.home += points;
    } else {
      newGameState.score.away += points;
    }
  }
  
  // Update player stats
  const team = gameState.possession === 'home' ? homeTeam : awayTeam;
  const teamRoster = team.players || [];
  const shooterIndex = teamRoster.findIndex(p => p.id === shooter.id);
  
  if (shooterIndex !== -1) {
    const updatedShooter = { ...teamRoster[shooterIndex] };
    const isThreePointer = shotType === ShotType.THREE_POINTER;
    
    if (success) {
      updatedShooter.stats = gameStats.updatePlayerStatsAfterFieldGoal(
        updatedShooter.stats || gameStats.initializePlayerGameStats(),
        points,
        isThreePointer
      );
    } else {
      updatedShooter.stats = gameStats.updatePlayerStatsAfterMiss(
        updatedShooter.stats || gameStats.initializePlayerGameStats(),
        isThreePointer
      );
    }
    
    // Update the player in the roster
    const updatedRoster = [...teamRoster];
    updatedRoster[shooterIndex] = updatedShooter;
    
    // Update the team with the new roster
    if (gameState.possession === 'home') {
      homeTeam.players = updatedRoster;
    } else {
      awayTeam.players = updatedRoster;
    }
  }
  
  // Add the event to the game log
  const shotDescription = `${shooter.firstName} ${shooter.lastName} ${success ? 'made' : 'missed'} a ${
    shotType === ShotType.LAYUP ? 'layup' :
    shotType === ShotType.MID_RANGE ? 'mid-range jumper' :
    shotType === ShotType.THREE_POINTER ? '3-pointer' : 'free throw'
  }${success ? ` (${points} pts)` : ''}`;
  
  newGameState = addGameEvent(
    newGameState, 
    success ? 'score' : 'miss',
    shotDescription,
    shooter.id,
    gameState.possession === 'home' ? homeTeam.id : awayTeam.id
  );
  
  // Reset the shot clock after a made basket (except free throws)
  if (success && shotType !== ShotType.FREE_THROW) {
    newGameState.possession = gameState.possession === 'home' ? 'away' : 'home';
    newGameState.shotClockRemaining = gameState.shotClock;
  }
  
  return { gameState: newGameState, success };
};

// Handle a rebound after a missed shot
export const handleRebound = (
  gameState: GameState,
  homeTeam: Team,
  awayTeam: Team,
  gameSettings: any
): GameState => {
  // Clone the game state to avoid mutation
  let newGameState = { ...gameState };
  
  // Determine if the rebound is successful (vs out of bounds)
  if (Math.random() > REBOUND_CHANCE) {
    // Ball goes out of bounds, possession switches
    newGameState.possession = gameState.possession === 'home' ? 'away' : 'home';
    newGameState.shotClockRemaining = gameState.shotClock;
    
    newGameState = addGameEvent(
      newGameState, 
      'out_of_bounds',
      'Ball out of bounds',
      undefined,
      gameState.possession === 'home' ? homeTeam.id : awayTeam.id
    );
    
    return newGameState;
  }
  
  // Determine offensive vs defensive rebound
  // Offensive rebound chance affected by team rebounding attributes
  let offensiveReboundChance = OFFENSIVE_REBOUND_BASE_CHANCE;
  
  // Get the offensive and defensive teams
  const offensiveTeam = gameState.possession === 'home' ? homeTeam : awayTeam;
  const defensiveTeam = gameState.possession === 'home' ? awayTeam : homeTeam;
  
  // Calculate team rebounding ratings
  const offensiveReboundRating = (offensiveTeam.players || [])
    .reduce((total, player) => total + player.attributes.rebounding, 0) / 
    Math.max(1, (offensiveTeam.players || []).length);
  
  const defensiveReboundRating = (defensiveTeam.players || [])
    .reduce((total, player) => total + player.attributes.rebounding, 0) / 
    Math.max(1, (defensiveTeam.players || []).length);
  
  // Adjust chance based on team ratings
  offensiveReboundChance += (offensiveReboundRating - defensiveReboundRating) / 200;
  
  // Determine who gets the rebound
  const isOffensiveRebound = Math.random() < offensiveReboundChance;
  
  // If offensive rebound, possession stays the same, reset shot clock to 14 sec (based on modern rules)
  if (isOffensiveRebound) {
    newGameState.shotClockRemaining = Math.min(gameState.shotClock, 14);
    
    // Choose a random offensive player for the rebound (weighted by rebounding attribute)
    const offensiveTeamPlayers = offensiveTeam.players || [];
    const totalReboundingRating = offensiveTeamPlayers.reduce(
      (total, player) => total + player.attributes.rebounding, 
      0
    );
    
    let rnd = Math.random() * totalReboundingRating;
    let rebounder: Player | undefined;
    
    for (const player of offensiveTeamPlayers) {
      rnd -= player.attributes.rebounding;
      if (rnd <= 0) {
        rebounder = player;
        break;
      }
    }
    
    if (!rebounder && offensiveTeamPlayers.length > 0) {
      rebounder = offensiveTeamPlayers[0];
    }
    
    // Update player stats
    if (rebounder) {
      const rebounderIndex = offensiveTeamPlayers.findIndex(p => p.id === rebounder!.id);
      if (rebounderIndex !== -1) {
        const updatedRebounder = { ...offensiveTeamPlayers[rebounderIndex] };
        updatedRebounder.stats = gameStats.updatePlayerStatsAfterRebound(
          updatedRebounder.stats || gameStats.initializePlayerGameStats()
        );
        
        // Update the roster
        const updatedRoster = [...offensiveTeamPlayers];
        updatedRoster[rebounderIndex] = updatedRebounder;
        
        if (gameState.possession === 'home') {
          homeTeam.players = updatedRoster;
        } else {
          awayTeam.players = updatedRoster;
        }
      }
      
      newGameState = addGameEvent(
        newGameState, 
        'rebound',
        `${rebounder.firstName} ${rebounder.lastName} grabbed an offensive rebound`,
        rebounder.id,
        offensiveTeam.id
      );
    } else {
      newGameState = addGameEvent(
        newGameState, 
        'rebound',
        `Offensive rebound by ${offensiveTeam.name}`,
        undefined,
        offensiveTeam.id
      );
    }
  } else {
    // Defensive rebound, possession switches
    newGameState.possession = gameState.possession === 'home' ? 'away' : 'home';
    newGameState.shotClockRemaining = gameState.shotClock;
    
    // Choose a random defensive player for the rebound (weighted by rebounding attribute)
    const defensiveTeamPlayers = defensiveTeam.players || [];
    const totalReboundingRating = defensiveTeamPlayers.reduce(
      (total, player) => total + player.attributes.rebounding, 
      0
    );
    
    let rnd = Math.random() * totalReboundingRating;
    let rebounder: Player | undefined;
    
    for (const player of defensiveTeamPlayers) {
      rnd -= player.attributes.rebounding;
      if (rnd <= 0) {
        rebounder = player;
        break;
      }
    }
    
    if (!rebounder && defensiveTeamPlayers.length > 0) {
      rebounder = defensiveTeamPlayers[0];
    }
    
    // Update player stats
    if (rebounder) {
      const rebounderIndex = defensiveTeamPlayers.findIndex(p => p.id === rebounder!.id);
      if (rebounderIndex !== -1) {
        const updatedRebounder = { ...defensiveTeamPlayers[rebounderIndex] };
        updatedRebounder.stats = gameStats.updatePlayerStatsAfterRebound(
          updatedRebounder.stats || gameStats.initializePlayerGameStats()
        );
        
        // Update the roster
        const updatedRoster = [...defensiveTeamPlayers];
        updatedRoster[rebounderIndex] = updatedRebounder;
        
        if (gameState.possession === 'away') {
          homeTeam.players = updatedRoster;
        } else {
          awayTeam.players = updatedRoster;
        }
      }
      
      newGameState = addGameEvent(
        newGameState, 
        'rebound',
        `${rebounder.firstName} ${rebounder.lastName} grabbed a defensive rebound`,
        rebounder.id,
        defensiveTeam.id
      );
    } else {
      newGameState = addGameEvent(
        newGameState, 
        'rebound',
        `Defensive rebound by ${defensiveTeam.name}`,
        undefined,
        defensiveTeam.id
      );
    }
  }
  
  return newGameState;
};

// Handle a turnover
export const handleTurnover = (
  gameState: GameState,
  player: Player,
  homeTeam: Team,
  awayTeam: Team
): GameState => {
  // Clone the game state to avoid mutation
  let newGameState = { ...gameState };
  
  // Switch possession
  newGameState.possession = gameState.possession === 'home' ? 'away' : 'home';
  
  // Reset shot clock
  newGameState.shotClockRemaining = gameState.shotClock;
  
  // Update player stats
  const team = gameState.possession === 'home' ? homeTeam : awayTeam;
  const teamRoster = team.players || [];
  const playerIndex = teamRoster.findIndex(p => p.id === player.id);
  
  if (playerIndex !== -1) {
    const updatedPlayer = { ...teamRoster[playerIndex] };
    updatedPlayer.stats = gameStats.updatePlayerStatsAfterTurnover(
      updatedPlayer.stats || gameStats.initializePlayerGameStats()
    );
    
    // Update the roster
    const updatedRoster = [...teamRoster];
    updatedRoster[playerIndex] = updatedPlayer;
    
    if (gameState.possession === 'home') {
      homeTeam.players = updatedRoster;
    } else {
      awayTeam.players = updatedRoster;
    }
  }
  
  // Add the event
  newGameState = addGameEvent(
    newGameState, 
    'turnover',
    `Turnover by ${player.firstName} ${player.lastName}`,
    player.id,
    gameState.possession === 'home' ? homeTeam.id : awayTeam.id
  );
  
  return newGameState;
};

// Handle a foul
export const handleFoul = (
  gameState: GameState,
  foulingPlayer: Player,
  fouledPlayer: Player | undefined,
  homeTeam: Team,
  awayTeam: Team,
  gameSettings: any
): GameState => {
  // Clone the game state to avoid mutation
  let newGameState = { ...gameState };
  
  // Determine which team committed the foul
  const foulingTeam = (homeTeam.players || []).find(p => p.id === foulingPlayer.id) 
    ? 'home' 
    : 'away';
  
  // Update team fouls
  if (foulingTeam === 'home') {
    newGameState.fouls.home += 1;
    
    // Check if in bonus
    if (newGameState.fouls.home >= gameSettings.bonusThreshold) {
      newGameState.inBonus.away = true;
    }
  } else {
    newGameState.fouls.away += 1;
    
    // Check if in bonus
    if (newGameState.fouls.away >= gameSettings.bonusThreshold) {
      newGameState.inBonus.home = true;
    }
  }
  
  // Update player fouls
  if (!newGameState.playerFouls[foulingPlayer.id]) {
    newGameState.playerFouls[foulingPlayer.id] = 0;
  }
  newGameState.playerFouls[foulingPlayer.id] += 1;
  
  // Update player stats
  const foulingTeamObj = foulingTeam === 'home' ? homeTeam : awayTeam;
  const teamRoster = foulingTeamObj.players || [];
  const playerIndex = teamRoster.findIndex(p => p.id === foulingPlayer.id);
  
  if (playerIndex !== -1) {
    const updatedPlayer = { ...teamRoster[playerIndex] };
    updatedPlayer.stats = gameStats.updatePlayerStatsAfterFoul(
      updatedPlayer.stats || gameStats.initializePlayerGameStats()
    );
    
    // Update the roster
    const updatedRoster = [...teamRoster];
    updatedRoster[playerIndex] = updatedPlayer;
    
    if (foulingTeam === 'home') {
      homeTeam.players = updatedRoster;
    } else {
      awayTeam.players = updatedRoster;
    }
  }
  
  // Add the event
  const foulDescription = fouledPlayer
    ? `Foul on ${foulingPlayer.firstName} ${foulingPlayer.lastName} (${newGameState.playerFouls[foulingPlayer.id]}) against ${fouledPlayer.firstName} ${fouledPlayer.lastName}`
    : `Foul on ${foulingPlayer.firstName} ${foulingPlayer.lastName} (${newGameState.playerFouls[foulingPlayer.id]})`;
  
  newGameState = addGameEvent(
    newGameState, 
    'foul',
    foulDescription,
    foulingPlayer.id,
    foulingTeam === 'home' ? homeTeam.id : awayTeam.id
  );
  
  // Check if player fouled out
  if (gameSettings.foulsEnabled && newGameState.playerFouls[foulingPlayer.id] >= gameSettings.foulOut) {
    newGameState = addGameEvent(
      newGameState, 
      'foul_out',
      `${foulingPlayer.firstName} ${foulingPlayer.lastName} has fouled out of the game`,
      foulingPlayer.id,
      foulingTeam === 'home' ? homeTeam.id : awayTeam.id
    );
  }
  
  return newGameState;
};

// Handle free throws
export const handleFreeThrows = (
  gameState: GameState,
  shooter: Player,
  numFreeThrows: number,
  homeTeam: Team,
  awayTeam: Team,
  gameSettings: any
): GameState => {
  // Clone the game state to avoid mutation
  let newGameState = { ...gameState };
  
  for (let i = 0; i < numFreeThrows; i++) {
    // Determine if the free throw is successful
    const successChance = playerAI.calculateShotSuccess(shooter, ShotType.FREE_THROW, undefined, gameSettings);
    const success = Math.random() < successChance;
    
    // Update the score
    if (success) {
      if (gameState.possession === 'home') {
        newGameState.score.home += 1;
      } else {
        newGameState.score.away += 1;
      }
    }
    
    // Update player stats
    const team = gameState.possession === 'home' ? homeTeam : awayTeam;
    const teamRoster = team.players || [];
    const shooterIndex = teamRoster.findIndex(p => p.id === shooter.id);
    
    if (shooterIndex !== -1) {
      const updatedShooter = { ...teamRoster[shooterIndex] };
      updatedShooter.stats = gameStats.updatePlayerStatsAfterFreeThrow(
        updatedShooter.stats || gameStats.initializePlayerGameStats(),
        success
      );
      
      // Update the roster
      const updatedRoster = [...teamRoster];
      updatedRoster[shooterIndex] = updatedShooter;
      
      if (gameState.possession === 'home') {
        homeTeam.players = updatedRoster;
      } else {
        awayTeam.players = updatedRoster;
      }
    }
    
    // Add the event
    const ftDescription = `${shooter.firstName} ${shooter.lastName} ${success ? 'made' : 'missed'} free throw ${i + 1} of ${numFreeThrows}`;
    
    newGameState = addGameEvent(
      newGameState, 
      success ? 'score' : 'miss',
      ftDescription,
      shooter.id,
      gameState.possession === 'home' ? homeTeam.id : awayTeam.id
    );
  }
  
  // After free throws, possession goes to the other team
  newGameState.possession = gameState.possession === 'home' ? 'away' : 'home';
  newGameState.shotClockRemaining = gameState.shotClock;
  
  return newGameState;
};

// Handle shot clock violation
export const handleShotClockViolation = (
  gameState: GameState,
  homeTeam: Team,
  awayTeam: Team
): GameState => {
  // Clone the game state to avoid mutation
  let newGameState = { ...gameState };
  
  // Change possession and reset shot clock
  newGameState.possession = gameState.possession === 'home' ? 'away' : 'home';
  newGameState.shotClockRemaining = gameState.shotClock;
  
  // Add the event
  const team = gameState.possession === 'home' ? homeTeam : awayTeam;
  newGameState = addGameEvent(
    newGameState, 
    'shot_clock_violation',
    `Shot clock violation on ${team.name}`,
    undefined,
    team.id
  );
  
  return newGameState;
};

// Handle end of quarter
export const handleQuarterEnd = (
  gameState: GameState,
  homeTeam: Team,
  awayTeam: Team,
  gameSettings: any
): GameState => {
  // Clone the game state to avoid mutation
  let newGameState = { ...gameState };
  
  // Add the event
  newGameState = addGameEvent(
    newGameState, 
    'quarter_end',
    `End of ${
      gameState.quarter === 1 ? '1st' : 
      gameState.quarter === 2 ? '2nd' : 
      gameState.quarter === 3 ? '3rd' : 
      gameState.quarter === 4 ? '4th' : 
      `OT${gameState.quarter - 4}`
    } quarter`
  );
  
  // If it's halftime, add an additional event
  if (gameState.quarter === 2) {
    newGameState = addGameEvent(
      newGameState, 
      'halftime',
      `Halftime: ${awayTeam.name} ${newGameState.score.away}, ${homeTeam.name} ${newGameState.score.home}`
    );
  }
  
  // Check if game has ended
  let gameEnded = false;
  
  if (gameState.quarter === 4 && newGameState.score.home !== newGameState.score.away) {
    // Game ends after 4th quarter if scores are not tied
    gameEnded = true;
  } else if (gameState.quarter > 4) {
    // In overtime
    if (!gameSettings.overtimeEnabled || newGameState.score.home !== newGameState.score.away) {
      // Game ends after any OT period if scores are not tied or if OT is disabled
      gameEnded = true;
    }
  }
  
  if (gameEnded) {
    // Game is over
    newGameState = addGameEvent(
      newGameState, 
      'game_end',
      `Game Over: ${awayTeam.name} ${newGameState.score.away}, ${homeTeam.name} ${newGameState.score.home}`
    );
    
    // Determine winner
    const homeWin = newGameState.score.home > newGameState.score.away;
    const winningTeam = homeWin ? homeTeam : awayTeam;
    const losingTeam = homeWin ? awayTeam : homeTeam;
    
    newGameState = addGameEvent(
      newGameState, 
      'winner',
      `${winningTeam.name} defeats ${losingTeam.name}, ${
        homeWin 
          ? `${newGameState.score.home}-${newGameState.score.away}` 
          : `${newGameState.score.away}-${newGameState.score.home}`
      }`
    );
    
    return newGameState;
  }
  
  // Move to next quarter
  newGameState.quarter += 1;
  
  // Reset quarter-specific state
  newGameState = startNewQuarter(newGameState, gameState.quarter < 4 ? gameSettings.quarterLength : 5);
  
  return newGameState;
};

// Get a random player from a team, weighted by rating
export const getRandomWeightedPlayer = (team: Team): Player => {
  const players = team.players || [];
  if (players.length === 0) {
    throw new Error('Team has no players');
  }
  
  // Calculate total weights
  const totalRating = players.reduce(
    (total, player) => total + playerAI.calculatePlayerRating(player), 
    0
  );
  
  // Pick a random player weighted by rating
  let rnd = Math.random() * totalRating;
  for (const player of players) {
    rnd -= playerAI.calculatePlayerRating(player);
    if (rnd <= 0) {
      return player;
    }
  }
  
  return players[0];
};

// Simulate one step of the game
export const simulateStep = (
  gameState: GameState,
  homeTeam: Team,
  awayTeam: Team,
  gameSettings: any
): GameState => {
  // Clone the game state to avoid mutation
  let newGameState = { ...gameState };
  
  // Update time
  newGameState.timeRemaining = timeManager.simulateTime(
    gameState.timeRemaining, 
    SIMULATION_STEP,
    gameSettings.gameSpeed
  );
  
  // Update shot clock
  newGameState.shotClockRemaining = timeManager.simulateShotClock(
    gameState.shotClockRemaining,
    SIMULATION_STEP,
    gameSettings.gameSpeed
  );
  
  // Check if quarter has ended
  if (timeManager.hasQuarterEnded(newGameState.timeRemaining)) {
    return handleQuarterEnd(newGameState, homeTeam, awayTeam, gameSettings);
  }
  
  // Check if shot clock has expired
  if (timeManager.hasShotClockExpired(newGameState.shotClockRemaining)) {
    return handleShotClockViolation(newGameState, homeTeam, awayTeam);
  }
  
  // Determine possession team
  const possessionTeam = gameState.possession === 'home' ? homeTeam : awayTeam;
  const defendingTeam = gameState.possession === 'home' ? awayTeam : homeTeam;
  
  // Randomized possession time - how long until a shot or turnover
  const randomPossessionTime = POSSESSION_TIME_MIN + Math.random() * (POSSESSION_TIME_MAX - POSSESSION_TIME_MIN);
  
  // Only take an action if enough time has elapsed in the possession
  if (gameState.shotClock - gameState.shotClockRemaining > randomPossessionTime || 
      gameState.shotClockRemaining < 3) {
    
    // Choose a random player with the ball
    const ballHandler = getRandomWeightedPlayer(possessionTeam);
    
    // Choose a random defender
    const defender = getRandomWeightedPlayer(defendingTeam);
    
    // Chance of turnover
    const turnoverChance = 0.15;
    if (Math.random() < turnoverChance) {
      return handleTurnover(newGameState, ballHandler, homeTeam, awayTeam);
    }
    
    // Chance of foul
    const foulChance = 0.12;
    if (Math.random() < foulChance) {
      newGameState = handleFoul(newGameState, defender, ballHandler, homeTeam, awayTeam, gameSettings);
      
      // Check if team is in bonus
      const inBonus = gameState.possession === 'home' 
        ? newGameState.inBonus.home 
        : newGameState.inBonus.away;
      
      if (inBonus) {
        // Award free throws in bonus situation
        return handleFreeThrows(newGameState, ballHandler, 2, homeTeam, awayTeam, gameSettings);
      }
      
      return newGameState;
    }
    
    // Determine shot type based on player position and attributes
    let shotType: ShotType;
    const shotTypeRandom = Math.random();
    
    if (shotTypeRandom < 0.3) {
      shotType = ShotType.LAYUP;
    } else if (shotTypeRandom < 0.7) {
      shotType = ShotType.MID_RANGE;
    } else {
      shotType = ShotType.THREE_POINTER;
    }
    
    // Take a shot
    const shotResult = takeShot(newGameState, ballHandler, shotType, defender, gameSettings, homeTeam, awayTeam);
    newGameState = shotResult.gameState;
    
    // If the shot was missed, handle rebound
    if (!shotResult.success) {
      newGameState = handleRebound(newGameState, homeTeam, awayTeam, gameSettings);
    }
    
    return newGameState;
  }
  
  return newGameState;
};

export default {
  initializeGameState,
  resetPlayerStats,
  startNewQuarter,
  addGameEvent,
  takeShot,
  handleRebound,
  handleTurnover,
  handleFoul,
  handleFreeThrows,
  handleShotClockViolation,
  handleQuarterEnd,
  getRandomWeightedPlayer,
  simulateStep
};
