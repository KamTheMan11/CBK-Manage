import express from 'express';
import { storage } from '../storage';
import { GameResult, TeamGameStats, PlayerGameStats } from '../../client/src/lib/types';

// Set up stats routes
const router = express.Router();

// Get all game results
router.get('/games', (req, res) => {
  const games = storage.getGameResults();
  res.json(games);
});

// Get game result by ID
router.get('/games/:id', (req, res) => {
  const gameId = req.params.id;
  const game = storage.getGameResultById(gameId);
  
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }
  
  res.json(game);
});

// Save a new game result
router.post('/games', (req, res) => {
  const gameData = req.body as GameResult;
  
  if (!gameData.homeTeam || !gameData.awayTeam) {
    return res.status(400).json({ message: 'Home team and away team are required' });
  }
  
  const savedGame = storage.saveGameResult(gameData);
  res.status(201).json(savedGame);
});

// Get team stats
router.get('/teams/:teamId', (req, res) => {
  const teamId = parseInt(req.params.teamId);
  const teamStats = storage.getTeamStats(teamId);
  
  if (!teamStats) {
    return res.status(404).json({ message: 'Team stats not found' });
  }
  
  res.json(teamStats);
});

// Get player stats
router.get('/players/:playerId', (req, res) => {
  const playerId = parseInt(req.params.playerId);
  const playerStats = storage.getPlayerStats(playerId);
  
  if (!playerStats) {
    return res.status(404).json({ message: 'Player stats not found' });
  }
  
  res.json(playerStats);
});

// Get season stats for a team
router.get('/season/teams/:teamId', (req, res) => {
  const teamId = parseInt(req.params.teamId);
  const seasonStats = storage.getTeamSeasonStats(teamId);
  
  if (!seasonStats) {
    return res.status(404).json({ message: 'Team season stats not found' });
  }
  
  res.json(seasonStats);
});

// Get season stats for a player
router.get('/season/players/:playerId', (req, res) => {
  const playerId = parseInt(req.params.playerId);
  const seasonStats = storage.getPlayerSeasonStats(playerId);
  
  if (!seasonStats) {
    return res.status(404).json({ message: 'Player season stats not found' });
  }
  
  res.json(seasonStats);
});

// Get conference standings
router.get('/standings/conference/:conferenceId', (req, res) => {
  const conferenceId = parseInt(req.params.conferenceId);
  const standings = storage.getConferenceStandings(conferenceId);
  
  if (!standings) {
    return res.status(404).json({ message: 'Conference standings not found' });
  }
  
  res.json(standings);
});

// Get all conference standings
router.get('/standings', (req, res) => {
  const allStandings = storage.getAllConferenceStandings();
  res.json(allStandings);
});

export default router;
