import express from 'express';
import { storage } from '../storage';
import { defaultTeams } from '../../client/src/lib/data/teams';
import { Team } from '../../client/src/lib/types';

// Initialize teams in storage
let nextTeamId = defaultTeams.length + 1;
let nextPlayerId = defaultTeams.reduce((maxId, team) => {
  const teamMaxPlayerId = Math.max(...(team.players || []).map(p => p.id));
  return Math.max(maxId, teamMaxPlayerId);
}, 0) + 1;

// Set up teams routes
const router = express.Router();

// Get all teams
router.get('/', (req, res) => {
  const teams = storage.getTeams();
  res.json(teams);
});

// Get team by ID
router.get('/:id', (req, res) => {
  const teamId = parseInt(req.params.id);
  const team = storage.getTeamById(teamId);
  
  if (!team) {
    return res.status(404).json({ message: 'Team not found' });
  }
  
  res.json(team);
});

// Create a new team
router.post('/', (req, res) => {
  const teamData = req.body as Partial<Team>;
  
  if (!teamData.name || !teamData.abbreviation) {
    return res.status(400).json({ message: 'Name and abbreviation are required' });
  }
  
  const newTeam: Team = {
    id: nextTeamId++,
    name: teamData.name,
    abbreviation: teamData.abbreviation,
    mascot: teamData.mascot || 'Team',
    primaryColor: teamData.primaryColor || '#003087',
    secondaryColor: teamData.secondaryColor || '#B2BEB5',
    conferenceId: teamData.conferenceId || 1,
    players: teamData.players || [],
    wins: 0,
    losses: 0,
    homeWins: 0,
    homeLosses: 0,
    awayWins: 0,
    awayLosses: 0,
    streak: 0
  };
  
  // Update nextPlayerId based on newly added players
  if (newTeam.players && newTeam.players.length > 0) {
    const maxPlayerId = Math.max(...newTeam.players.map(p => p.id));
    nextPlayerId = Math.max(nextPlayerId, maxPlayerId + 1);
  }
  
  const createdTeam = storage.createTeam(newTeam);
  res.status(201).json(createdTeam);
});

// Update a team
router.put('/:id', (req, res) => {
  const teamId = parseInt(req.params.id);
  const teamData = req.body as Partial<Team>;
  
  const existingTeam = storage.getTeamById(teamId);
  if (!existingTeam) {
    return res.status(404).json({ message: 'Team not found' });
  }
  
  const updatedTeam = storage.updateTeam(teamId, teamData);
  res.json(updatedTeam);
});

// Delete a team
router.delete('/:id', (req, res) => {
  const teamId = parseInt(req.params.id);
  
  const existingTeam = storage.getTeamById(teamId);
  if (!existingTeam) {
    return res.status(404).json({ message: 'Team not found' });
  }
  
  storage.deleteTeam(teamId);
  res.json({ message: 'Team deleted successfully' });
});

// Reset all team records
router.post('/reset-records', (req, res) => {
  storage.resetAllTeamRecords();
  res.json({ message: 'All team records reset successfully' });
});

// Get team roster
router.get('/:id/roster', (req, res) => {
  const teamId = parseInt(req.params.id);
  const team = storage.getTeamById(teamId);
  
  if (!team) {
    return res.status(404).json({ message: 'Team not found' });
  }
  
  res.json(team.players || []);
});

// Update team record after a game
router.post('/:id/record', (req, res) => {
  const teamId = parseInt(req.params.id);
  const { win, isHome } = req.body;
  
  if (typeof win !== 'boolean' || typeof isHome !== 'boolean') {
    return res.status(400).json({ message: 'win and isHome boolean values are required' });
  }
  
  const team = storage.getTeamById(teamId);
  if (!team) {
    return res.status(404).json({ message: 'Team not found' });
  }
  
  const updatedTeam = storage.updateTeamRecord(teamId, win, isHome);
  res.json(updatedTeam);
});

export default router;
