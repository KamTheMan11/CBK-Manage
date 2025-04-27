import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Team, Player } from '../types';
import { defaultTeams } from '../data/teams';
import { generateTeamRoster } from '../data/players';

// Team store interface
interface TeamState {
  teams: Team[];
  nextTeamId: number;
  nextPlayerId: number;
  
  // Actions
  getTeamById: (id: number) => Team | undefined;
  createTeam: (team: Partial<Team>) => Team;
  updateTeam: (id: number, team: Partial<Team>) => void;
  deleteTeam: (id: number) => void;
  updateTeamRecord: (id: number, win: boolean, isHome: boolean) => void;
  resetAllTeamRecords: () => void;
}

export const useTeams = create<TeamState>()(
  persist(
    (set, get) => ({
      teams: defaultTeams,
      nextTeamId: defaultTeams.length + 1,
      nextPlayerId: 
        defaultTeams.reduce(
          (maxId, team) => {
            if (team.players) {
              const teamMaxId = Math.max(...team.players.map(p => p.id));
              return Math.max(maxId, teamMaxId);
            }
            return maxId;
          }, 
          0
        ) + 1,
      
      getTeamById: (id: number) => {
        return get().teams.find(team => team.id === id);
      },
      
      createTeam: (teamData: Partial<Team>) => {
        const { nextTeamId, nextPlayerId } = get();
        
        // Generate default players if not provided
        const players = teamData.players || generateTeamRoster(nextPlayerId);
        
        // Create the new team
        const newTeam: Team = {
          id: nextTeamId,
          name: teamData.name || 'New Team',
          abbreviation: teamData.abbreviation || 'NEW',
          mascot: teamData.mascot || 'Team',
          primaryColor: teamData.primaryColor || '#003087',
          secondaryColor: teamData.secondaryColor || '#B2BEB5',
          conferenceId: teamData.conferenceId || 1,
          players,
          wins: 0,
          losses: 0,
          homeWins: 0,
          homeLosses: 0,
          awayWins: 0,
          awayLosses: 0,
          streak: 0
        };
        
        // Get the highest player ID for the next player ID
        const highestPlayerId = players.reduce(
          (maxId, player) => Math.max(maxId, player.id),
          0
        );
        
        set(state => ({
          teams: [...state.teams, newTeam],
          nextTeamId: state.nextTeamId + 1,
          nextPlayerId: highestPlayerId + 1
        }));
        
        return newTeam;
      },
      
      updateTeam: (id: number, teamData: Partial<Team>) => {
        set(state => ({
          teams: state.teams.map(team => 
            team.id === id
              ? { ...team, ...teamData }
              : team
          )
        }));
      },
      
      deleteTeam: (id: number) => {
        set(state => ({
          teams: state.teams.filter(team => team.id !== id)
        }));
      },
      
      updateTeamRecord: (id: number, win: boolean, isHome: boolean) => {
        set(state => ({
          teams: state.teams.map(team => {
            if (team.id !== id) return team;
            
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
          })
        }));
      },
      
      resetAllTeamRecords: () => {
        set(state => ({
          teams: state.teams.map(team => ({
            ...team,
            wins: 0,
            losses: 0,
            homeWins: 0,
            homeLosses: 0,
            awayWins: 0,
            awayLosses: 0,
            streak: 0
          }))
        }));
      }
    }),
    {
      name: 'college-bball-teams'
    }
  )
);

export default useTeams;
