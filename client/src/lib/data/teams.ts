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
  wins: Math.floor(Math.random() * 15) + 5, // Random wins between 5-19
  losses: Math.floor(Math.random() * 15) + 4, // Random losses between 4-18
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

// Get top 25 teams with specific conference representation
export const getTop25Teams = (teams: Team[]): Team[] => {
  // Filter teams that meet minimum requirements (above .500)
  const eligibleTeams = teams.filter(team => {
    const totalGames = team.wins + team.losses;
    return totalGames >= 19 && totalGames <= 23 && team.wins > team.losses;
  });

  // Separate teams by conference
  const majorConferenceTeams = eligibleTeams.filter(team => 
    [1, 2, 3, 4].includes(team.conferenceId) // ACC, SEC, Big Ten, Big 12
  );

  // Randomly select teams, ensuring major conference representation
  const shuffledMajor = [...majorConferenceTeams].sort(() => Math.random() - 0.5);
  const top25 = shuffledMajor.slice(0, Math.min(20, shuffledMajor.length)); // At least 20 major conference teams

  // Fill remaining spots with other eligible teams
  const remainingSpots = 25 - top25.length;
  if (remainingSpots > 0) {
    const otherTeams = eligibleTeams
      .filter(team => !top25.includes(team))
      .sort(() => Math.random() - 0.5)
      .slice(0, remainingSpots);
    top25.push(...otherTeams);
  }

  return top25;
};

export default {
  defaultTeams,
  getTeamById,
  updateTeamRecord,
  getTop25Teams
};