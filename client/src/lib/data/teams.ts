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
  wins: college.id <= 25 ? Math.floor(Math.random() * 6) + 18 : Math.floor(Math.random() * 15) + 10,
  losses: college.id <= 25 ? Math.floor(Math.random() * 6) + 2 : Math.floor(Math.random() * 10) + 5,
  homeWins: Math.floor(Math.random() * 12) + 8,
  homeLosses: Math.floor(Math.random() * 4) + 1,
  awayWins: Math.floor(Math.random() * 8) + 5,
  awayLosses: Math.floor(Math.random() * 5) + 1,
  streak: Math.floor(Math.random() * 7) - 3
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