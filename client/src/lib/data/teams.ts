import { Team } from '../types';
import { generateTeamRoster } from './players';

// Sample teams data with realistic college basketball teams
export const defaultTeams: Team[] = [
  {
    id: 1,
    name: 'Wildcats',
    abbreviation: 'WILD',
    mascot: 'Wildcats',
    primaryColor: '#003087',
    secondaryColor: '#FFD700',
    conferenceId: 1,
    players: generateTeamRoster(1),
    wins: 0,
    losses: 0,
    homeWins: 0,
    homeLosses: 0,
    awayWins: 0,
    awayLosses: 0,
    streak: 0
  },
  {
    id: 2,
    name: 'Eagles',
    abbreviation: 'EGLS',
    mascot: 'Eagles',
    primaryColor: '#8A2432',
    secondaryColor: '#FFFFFF',
    conferenceId: 1,
    players: generateTeamRoster(13),
    wins: 0,
    losses: 0,
    homeWins: 0,
    homeLosses: 0,
    awayWins: 0,
    awayLosses: 0,
    streak: 0
  },
  {
    id: 3,
    name: 'Bruins',
    abbreviation: 'BRNS',
    mascot: 'Bruins',
    primaryColor: '#2D68C4',
    secondaryColor: '#F2A900',
    conferenceId: 5,
    players: generateTeamRoster(25),
    wins: 0,
    losses: 0,
    homeWins: 0,
    homeLosses: 0,
    awayWins: 0,
    awayLosses: 0,
    streak: 0
  },
  {
    id: 4,
    name: 'Tarheels',
    abbreviation: 'TAR',
    mascot: 'Tarheels',
    primaryColor: '#7BAFD4',
    secondaryColor: '#FFFFFF',
    conferenceId: 1,
    players: generateTeamRoster(37),
    wins: 0,
    losses: 0,
    homeWins: 0,
    homeLosses: 0,
    awayWins: 0,
    awayLosses: 0,
    streak: 0
  },
  {
    id: 5,
    name: 'Bulldogs',
    abbreviation: 'BLDG',
    mascot: 'Bulldogs',
    primaryColor: '#041E42',
    secondaryColor: '#C8102E',
    conferenceId: 9,
    players: generateTeamRoster(49),
    wins: 0,
    losses: 0,
    homeWins: 0,
    homeLosses: 0,
    awayWins: 0,
    awayLosses: 0,
    streak: 0
  },
  {
    id: 6,
    name: 'Tigers',
    abbreviation: 'TIGR',
    mascot: 'Tigers',
    primaryColor: '#522D80',
    secondaryColor: '#F66733',
    conferenceId: 1,
    players: generateTeamRoster(61),
    wins: 0,
    losses: 0,
    homeWins: 0,
    homeLosses: 0,
    awayWins: 0,
    awayLosses: 0,
    streak: 0
  }
];

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
