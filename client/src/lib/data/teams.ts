import { Team } from '../types';
import { generateTeamRoster } from './players';
import { collegeTeams } from './collegeTeams';

// Convert collegeTeams to Team type and initialize records
export const defaultTeams: Team[] = collegeTeams.map(college => ({
  id: college.id,
  name: college.name,
  abbreviation: college.shortName,
  mascot: college.nickname,
  primaryColor: college.primaryColor,
  secondaryColor: college.secondaryColor,
  conferenceId: college.conferenceId,
  players: generateTeamRoster(college.id),
  wins: college.id <= 10 ? Math.floor(Math.random() * 4) + 20 : Math.floor(Math.random() * 15) + 10, // Top 10 teams have 20-23 wins
  losses: college.id <= 10 ? Math.floor(Math.random() * 4) + 1 : Math.floor(Math.random() * 10) + 5, // Top 10 teams have 1-4 losses
  homeWins: 0,
  homeLosses: 0,
  awayWins: 0,
  awayLosses: 0,
  streak: 0
}));

// Get team by ID
export const getTeamById = (teams: Team[], id: number): Team | undefined => {
  return teams.find(team => team.id === id);
};

// Update team record after a game
export const updateTeamRecord = (team: Team, win: boolean, isHome: boolean): Team => {
  const updatedTeam = { ...team };

  if (win) {
    updatedTeam.wins = (updatedTeam.wins || 0) + 1;
    updatedTeam.streak = (updatedTeam.streak || 0) <= 0 ? 1 : updatedTeam.streak + 1;

    if (isHome) {
      updatedTeam.homeWins = (updatedTeam.homeWins || 0) + 1;
    } else {
      updatedTeam.awayWins = (updatedTeam.awayWins || 0) + 1;
    }
  } else {
    updatedTeam.losses = (updatedTeam.losses || 0) + 1;
    updatedTeam.streak = (updatedTeam.streak || 0) >= 0 ? -1 : updatedTeam.streak - 1;

    if (isHome) {
      updatedTeam.homeLosses = (updatedTeam.homeLosses || 0) + 1;
    } else {
      updatedTeam.awayLosses = (updatedTeam.awayLosses || 0) + 1;
    }
  }

  return updatedTeam;
};

export default {
  defaultTeams,
  getTeamById,
  updateTeamRecord
};