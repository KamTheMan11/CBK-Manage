// In-memory storage for college basketball simulation

// Import default teams data to initialize the storage
import { defaultTeams } from '../client/src/lib/data/teams';
import { Team, GameState, GameResult } from '../client/src/lib/types';

// Storage class for managing game data
class Storage {
  constructor() {
    // Initialize storage objects
    this.teams = [...defaultTeams];
    this.games = new Map();
    this.gameResults = [];
    this.playerSeasonStats = new Map();
    this.teamSeasonStats = new Map();
  }

  // TEAM OPERATIONS
  getTeams() {
    return this.teams;
  }

  getTeamById(id) {
    return this.teams.find(team => team.id === id);
  }

  createTeam(team) {
    this.teams.push(team);
    return team;
  }

  updateTeam(id, teamData) {
    const index = this.teams.findIndex(team => team.id === id);
    if (index === -1) return null;

    const updatedTeam = { ...this.teams[index], ...teamData };
    this.teams[index] = updatedTeam;
    return updatedTeam;
  }

  deleteTeam(id) {
    const index = this.teams.findIndex(team => team.id === id);
    if (index === -1) return false;

    this.teams.splice(index, 1);
    return true;
  }

  updateTeamRecord(id, win, isHome) {
    const team = this.getTeamById(id);
    if (!team) return null;

    if (win) {
      team.wins = (team.wins || 0) + 1;
      team.streak = (team.streak || 0) <= 0 ? 1 : team.streak + 1;
      
      if (isHome) {
        team.homeWins = (team.homeWins || 0) + 1;
      } else {
        team.awayWins = (team.awayWins || 0) + 1;
      }
    } else {
      team.losses = (team.losses || 0) + 1;
      team.streak = (team.streak || 0) >= 0 ? -1 : team.streak - 1;
      
      if (isHome) {
        team.homeLosses = (team.homeLosses || 0) + 1;
      } else {
        team.awayLosses = (team.awayLosses || 0) + 1;
      }
    }

    return team;
  }

  resetAllTeamRecords() {
    this.teams = this.teams.map(team => ({
      ...team,
      wins: 0,
      losses: 0,
      homeWins: 0,
      homeLosses: 0,
      awayWins: 0,
      awayLosses: 0,
      streak: 0
    }));
    return this.teams;
  }

  // GAME OPERATIONS
  createGame(gameState, homeTeam, awayTeam) {
    const gameId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.games.set(gameId, { gameState, homeTeam, awayTeam });
    return gameId;
  }

  getGameById(gameId) {
    return this.games.get(gameId);
  }

  updateGame(gameId, gameState, homeTeam, awayTeam) {
    const game = this.getGameById(gameId);
    if (!game) return null;

    const updatedGame = {
      gameState,
      homeTeam: homeTeam || game.homeTeam,
      awayTeam: awayTeam || game.awayTeam
    };

    this.games.set(gameId, updatedGame);
    return updatedGame;
  }

  deleteGame(gameId) {
    return this.games.delete(gameId);
  }

  // GAME RESULTS OPERATIONS
  saveGameResult(gameResult) {
    // Add a generated ID if not present
    if (!gameResult.gameId) {
      gameResult.gameId = `result_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    this.gameResults.push(gameResult);
    
    // Also update the season stats
    this.updateSeasonStats(gameResult);
    
    return gameResult;
  }

  getGameResults() {
    return this.gameResults;
  }

  getGameResultById(gameId) {
    return this.gameResults.find(result => result.gameId === gameId);
  }

  // STATS OPERATIONS
  updateSeasonStats(gameResult) {
    // Update team season stats
    this.updateTeamSeasonStats(gameResult.homeTeam, gameResult.homeStats, true);
    this.updateTeamSeasonStats(gameResult.awayTeam, gameResult.awayStats, false);
    
    // Update player season stats
    if (gameResult.homeStats && gameResult.homeStats.playerStats) {
      this.updatePlayerSeasonStats(gameResult.homeStats.playerStats);
    }
    
    if (gameResult.awayStats && gameResult.awayStats.playerStats) {
      this.updatePlayerSeasonStats(gameResult.awayStats.playerStats);
    }
  }

  updateTeamSeasonStats(teamId, gameStats, isHome) {
    if (!gameStats) return;
    
    // Get existing season stats or initialize new ones
    let seasonStats = this.teamSeasonStats.get(teamId) || {
      teamId,
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      homeWins: 0,
      homeLosses: 0,
      awayWins: 0,
      awayLosses: 0,
      points: 0,
      pointsAllowed: 0,
      fgMade: 0,
      fgAttempted: 0,
      fg3Made: 0,
      fg3Attempted: 0,
      ftMade: 0,
      ftAttempted: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      fouls: 0
    };
    
    // Update season stats with game stats
    seasonStats.gamesPlayed += 1;
    seasonStats.points += gameStats.points || 0;
    seasonStats.fgMade += gameStats.fgMade || 0;
    seasonStats.fgAttempted += gameStats.fgAttempted || 0;
    seasonStats.fg3Made += gameStats.fg3Made || 0;
    seasonStats.fg3Attempted += gameStats.fg3Attempted || 0;
    seasonStats.ftMade += gameStats.ftMade || 0;
    seasonStats.ftAttempted += gameStats.ftAttempted || 0;
    seasonStats.rebounds += gameStats.rebounds || 0;
    seasonStats.assists += gameStats.assists || 0;
    seasonStats.steals += gameStats.steals || 0;
    seasonStats.blocks += gameStats.blocks || 0;
    seasonStats.turnovers += gameStats.turnovers || 0;
    seasonStats.fouls += gameStats.fouls || 0;
    
    this.teamSeasonStats.set(teamId, seasonStats);
  }

  updatePlayerSeasonStats(playerStatsMap) {
    for (const [playerId, gameStats] of Object.entries(playerStatsMap)) {
      const id = parseInt(playerId);
      
      // Get existing season stats or initialize new ones
      let seasonStats = this.playerSeasonStats.get(id) || {
        playerId: id,
        gamesPlayed: 0,
        gamesStarted: 0,
        points: 0,
        fgMade: 0,
        fgAttempted: 0,
        fg3Made: 0,
        fg3Attempted: 0,
        ftMade: 0,
        ftAttempted: 0,
        rebounds: 0,
        assists: 0,
        steals: 0,
        blocks: 0,
        turnovers: 0,
        fouls: 0,
        minutesPlayed: 0
      };
      
      // Update season stats with game stats
      seasonStats.gamesPlayed += 1;
      seasonStats.points += gameStats.points || 0;
      seasonStats.fgMade += gameStats.fgMade || 0;
      seasonStats.fgAttempted += gameStats.fgAttempted || 0;
      seasonStats.fg3Made += gameStats.fg3Made || 0;
      seasonStats.fg3Attempted += gameStats.fg3Attempted || 0;
      seasonStats.ftMade += gameStats.ftMade || 0;
      seasonStats.ftAttempted += gameStats.ftAttempted || 0;
      seasonStats.rebounds += gameStats.rebounds || 0;
      seasonStats.assists += gameStats.assists || 0;
      seasonStats.steals += gameStats.steals || 0;
      seasonStats.blocks += gameStats.blocks || 0;
      seasonStats.turnovers += gameStats.turnovers || 0;
      seasonStats.fouls += gameStats.fouls || 0;
      seasonStats.minutesPlayed += gameStats.minutesPlayed || 0;
      
      this.playerSeasonStats.set(id, seasonStats);
    }
  }

  getTeamStats(teamId) {
    return this.teamSeasonStats.get(teamId);
  }

  getPlayerStats(playerId) {
    return this.playerSeasonStats.get(playerId);
  }

  getTeamSeasonStats(teamId) {
    return this.teamSeasonStats.get(teamId);
  }

  getPlayerSeasonStats(playerId) {
    return this.playerSeasonStats.get(playerId);
  }

  getConferenceStandings(conferenceId) {
    const teamsInConference = this.teams.filter(team => team.conferenceId === conferenceId);
    
    // Sort teams by win percentage
    return teamsInConference.sort((a, b) => {
      const aWinPct = a.wins ? a.wins / (a.wins + a.losses) : 0;
      const bWinPct = b.wins ? b.wins / (b.wins + b.losses) : 0;
      return bWinPct - aWinPct;
    });
  }

  getAllConferenceStandings() {
    // Get all unique conference IDs
    const conferenceIds = [...new Set(this.teams.map(team => team.conferenceId))];
    
    // Get standings for each conference
    return conferenceIds.map(confId => ({
      conferenceId: confId,
      teams: this.getConferenceStandings(confId)
    }));
  }
}

// Create and export the storage instance
export const storage = new Storage();
