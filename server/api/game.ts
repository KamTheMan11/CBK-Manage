import express from 'express';
import { storage } from '../storage';
import { GameState, GameSettings } from '../../client/src/lib/types';
import gameEngine from '../../client/src/lib/simulation/gameEngine';

// Set up game routes
const router = express.Router();

// Start a new game
router.post('/start', (req, res) => {
  const { homeTeamId, awayTeamId, settings } = req.body;
  
  if (!homeTeamId || !awayTeamId) {
    return res.status(400).json({ message: 'Home and away team IDs are required' });
  }
  
  const homeTeam = storage.getTeamById(homeTeamId);
  const awayTeam = storage.getTeamById(awayTeamId);
  
  if (!homeTeam || !awayTeam) {
    return res.status(404).json({ 
      message: `${!homeTeam ? 'Home' : 'Away'} team not found`,
      homeTeamFound: !!homeTeam,
      awayTeamFound: !!awayTeam
    });
  }
  
  // Reset player stats for both teams
  const resetHomeTeam = gameEngine.resetPlayerStats(homeTeam);
  const resetAwayTeam = gameEngine.resetPlayerStats(awayTeam);
  
  // Initialize game state with the provided settings or default settings
  const gameState = gameEngine.initializeGameState(resetHomeTeam, resetAwayTeam, settings || {
    quarterLength: 10,
    shotClock: 30,
    gameSpeed: 2,
    timeoutsPerTeam: 4,
    foulOut: 5,
    bonusThreshold: 7,
    overtimeEnabled: true,
    foulsEnabled: true,
    injuriesEnabled: false,
    difficulty: 'normal',
    aiAggression: 50,
    playerAdvantage: 0
  });
  
  // Store the game state in memory with a unique ID
  const gameId = storage.createGame(gameState, resetHomeTeam, resetAwayTeam);
  
  res.status(201).json({
    gameId,
    gameState,
    homeTeam: resetHomeTeam,
    awayTeam: resetAwayTeam
  });
});

// Get current game state
router.get('/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  const game = storage.getGameById(gameId);
  
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }
  
  res.json(game);
});

// Simulate a step in the game
router.post('/:gameId/step', (req, res) => {
  const gameId = req.params.gameId;
  const game = storage.getGameById(gameId);
  
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }
  
  const { gameState, homeTeam, awayTeam } = game;
  const { settings } = req.body || {};
  
  // Simulate one step of the game
  const newGameState = gameEngine.simulateStep(
    gameState, 
    homeTeam, 
    awayTeam, 
    settings || {
      quarterLength: 10,
      shotClock: 30,
      gameSpeed: 2,
      timeoutsPerTeam: 4,
      foulOut: 5,
      bonusThreshold: 7,
      overtimeEnabled: true,
      foulsEnabled: true,
      injuriesEnabled: false,
      difficulty: 'normal',
      aiAggression: 50,
      playerAdvantage: 0
    }
  );
  
  // Update the game state in storage
  const updatedGame = storage.updateGame(gameId, newGameState);
  
  // Check if the game has ended
  const gameEnded = newGameState.events.some(event => event.type === 'game_end');
  
  // If the game has ended, update team records
  if (gameEnded) {
    const homeWin = newGameState.score.home > newGameState.score.away;
    storage.updateTeamRecord(homeTeam.id, homeWin, true);
    storage.updateTeamRecord(awayTeam.id, !homeWin, false);
    
    // Save game result for statistics
    const gameResult = {
      gameId,
      date: new Date().toISOString(),
      homeTeam: homeTeam.id,
      awayTeam: awayTeam.id,
      homeScore: newGameState.score.home,
      awayScore: newGameState.score.away,
      quarters: {
        home: [/* would contain quarter scores */],
        away: [/* would contain quarter scores */]
      },
      // Would typically calculate full stats here
      homeStats: { /* team stats */ },
      awayStats: { /* team stats */ },
      events: newGameState.events
    };
    
    storage.saveGameResult(gameResult);
  }
  
  res.json({
    gameState: newGameState,
    homeTeam,
    awayTeam,
    ended: gameEnded
  });
});

// Call a timeout
router.post('/:gameId/timeout', (req, res) => {
  const gameId = req.params.gameId;
  const { team } = req.body;
  
  if (team !== 'home' && team !== 'away') {
    return res.status(400).json({ message: 'Invalid team specified (must be "home" or "away")' });
  }
  
  const game = storage.getGameById(gameId);
  
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }
  
  const { gameState, homeTeam, awayTeam } = game;
  
  // Check if timeouts are available
  if (gameState.timeouts[team] <= 0) {
    return res.status(400).json({ message: 'No timeouts remaining' });
  }
  
  // Update timeouts
  const newGameState = {
    ...gameState,
    timeouts: {
      ...gameState.timeouts,
      [team]: gameState.timeouts[team] - 1
    }
  };
  
  // Add the event
  const teamName = team === 'home' ? homeTeam.name : awayTeam.name;
  const updatedGameState = gameEngine.addGameEvent(
    newGameState,
    'timeout',
    `Timeout called by ${teamName}`,
    undefined,
    team === 'home' ? homeTeam.id : awayTeam.id
  );
  
  // Update the game state in storage
  const updatedGame = storage.updateGame(gameId, updatedGameState);
  
  res.json({
    gameState: updatedGameState,
    homeTeam,
    awayTeam
  });
});

// Skip to next quarter
router.post('/:gameId/skip-quarter', (req, res) => {
  const gameId = req.params.gameId;
  const game = storage.getGameById(gameId);
  
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }
  
  const { gameState, homeTeam, awayTeam } = game;
  const { settings } = req.body || {};
  
  // Set time remaining to 0 to trigger end of quarter
  const updatedGameState = {
    ...gameState,
    timeRemaining: 0
  };
  
  // Handle the quarter end
  const newGameState = gameEngine.handleQuarterEnd(
    updatedGameState, 
    homeTeam, 
    awayTeam, 
    settings || {
      quarterLength: 10,
      shotClock: 30,
      overtimeEnabled: true
      // other settings would be included here
    }
  );
  
  // Update the game state in storage
  const updatedGame = storage.updateGame(gameId, newGameState);
  
  // Check if the game has ended
  const gameEnded = newGameState.events.some(event => event.type === 'game_end');
  
  // If the game has ended, update team records
  if (gameEnded) {
    const homeWin = newGameState.score.home > newGameState.score.away;
    storage.updateTeamRecord(homeTeam.id, homeWin, true);
    storage.updateTeamRecord(awayTeam.id, !homeWin, false);
    
    // Save game result for statistics
    const gameResult = {
      gameId,
      date: new Date().toISOString(),
      homeTeam: homeTeam.id,
      awayTeam: awayTeam.id,
      homeScore: newGameState.score.home,
      awayScore: newGameState.score.away,
      quarters: {
        home: [/* would contain quarter scores */],
        away: [/* would contain quarter scores */]
      },
      // Would typically calculate full stats here
      homeStats: { /* team stats */ },
      awayStats: { /* team stats */ },
      events: newGameState.events
    };
    
    storage.saveGameResult(gameResult);
  }
  
  res.json({
    gameState: newGameState,
    homeTeam,
    awayTeam,
    ended: gameEnded
  });
});

// End the game early
router.post('/:gameId/end', (req, res) => {
  const gameId = req.params.gameId;
  const game = storage.getGameById(gameId);
  
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }
  
  const { gameState, homeTeam, awayTeam } = game;
  
  // Add game end event
  let newGameState = gameEngine.addGameEvent(
    gameState,
    'game_end',
    `Game ended early: ${awayTeam.name} ${gameState.score.away}, ${homeTeam.name} ${gameState.score.home}`
  );
  
  // Determine winner
  const homeWin = gameState.score.home > gameState.score.away;
  const winningTeam = homeWin ? homeTeam : awayTeam;
  const losingTeam = homeWin ? awayTeam : homeTeam;
  
  newGameState = gameEngine.addGameEvent(
    newGameState,
    'winner',
    `${winningTeam.name} defeats ${losingTeam.name}, ${
      homeWin 
        ? `${gameState.score.home}-${gameState.score.away}` 
        : `${gameState.score.away}-${gameState.score.home}`
    }`
  );
  
  // Update the game state in storage
  const updatedGame = storage.updateGame(gameId, newGameState);
  
  // Update team records
  storage.updateTeamRecord(homeTeam.id, homeWin, true);
  storage.updateTeamRecord(awayTeam.id, !homeWin, false);
  
  // Save game result for statistics
  const gameResult = {
    gameId,
    date: new Date().toISOString(),
    homeTeam: homeTeam.id,
    awayTeam: awayTeam.id,
    homeScore: gameState.score.home,
    awayScore: gameState.score.away,
    quarters: {
      home: [/* would contain quarter scores */],
      away: [/* would contain quarter scores */]
    },
    // Would typically calculate full stats here
    homeStats: { /* team stats */ },
    awayStats: { /* team stats */ },
    events: newGameState.events
  };
  
  storage.saveGameResult(gameResult);
  
  res.json({
    gameState: newGameState,
    homeTeam,
    awayTeam,
    ended: true
  });
});

// Reset a game to start over
router.post('/:gameId/reset', (req, res) => {
  const gameId = req.params.gameId;
  const game = storage.getGameById(gameId);
  const { settings } = req.body || {};
  
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }
  
  const { homeTeam, awayTeam } = game;
  
  // Reset player stats for both teams
  const resetHomeTeam = gameEngine.resetPlayerStats(homeTeam);
  const resetAwayTeam = gameEngine.resetPlayerStats(awayTeam);
  
  // Initialize a new game state
  const newGameState = gameEngine.initializeGameState(
    resetHomeTeam, 
    resetAwayTeam, 
    settings || {
      quarterLength: 10,
      shotClock: 30,
      gameSpeed: 2,
      timeoutsPerTeam: 4,
      foulOut: 5,
      bonusThreshold: 7,
      overtimeEnabled: true,
      foulsEnabled: true,
      injuriesEnabled: false,
      difficulty: 'normal',
      aiAggression: 50,
      playerAdvantage: 0
    }
  );
  
  // Update the game in storage
  const updatedGame = storage.updateGame(gameId, newGameState, resetHomeTeam, resetAwayTeam);
  
  res.json({
    gameId,
    gameState: newGameState,
    homeTeam: resetHomeTeam,
    awayTeam: resetAwayTeam
  });
});

export default router;
