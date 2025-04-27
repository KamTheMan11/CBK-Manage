import { create } from 'zustand';
import { Team, GameState, GamePhase } from '../types';
import gameEngine from '../simulation/gameEngine';
import { useTeams } from './useTeams';
import { useSettings } from './useSettings';

interface SimulationState {
  // Game state data
  gamePhase: GamePhase;
  gameState: GameState;
  homeTeam: Team | null;
  awayTeam: Team | null;
  currentTime: number;
  simulationInterval: number | null;
  isGamePaused: boolean;
  
  // Actions
  startGame: () => void;
  pauseGame: () => void;
  resetGame: (homeTeamId: number, awayTeamId: number) => void;
  skipToNextQuarter: () => void;
  callTimeout: (team: 'home' | 'away') => void;
  simulationStep: () => void;
}

export const useSimulation = create<SimulationState>((set, get) => {
  // Game simulation interval (in ms)
  const SIMULATION_INTERVAL = 100;

  return {
    // Initial state
    gamePhase: GamePhase.READY,
    gameState: {} as GameState,
    homeTeam: null,
    awayTeam: null,
    currentTime: 0,
    simulationInterval: null,
    isGamePaused: true,
    
    // Start the game simulation
    startGame: () => {
      const { gamePhase, simulationInterval } = get();
      
      // Only start if the game is in READY or PAUSED phase
      if (gamePhase !== GamePhase.READY && gamePhase !== GamePhase.PAUSED) {
        return;
      }
      
      // Clear any existing interval
      if (simulationInterval !== null) {
        clearInterval(simulationInterval);
      }
      
      // Start a new simulation interval
      const interval = setInterval(() => {
        get().simulationStep();
      }, SIMULATION_INTERVAL);
      
      set({ 
        gamePhase: GamePhase.PLAYING,
        simulationInterval: interval,
        isGamePaused: false
      });
    },
    
    // Pause the game simulation
    pauseGame: () => {
      const { simulationInterval } = get();
      
      // Clear the interval
      if (simulationInterval !== null) {
        clearInterval(simulationInterval);
      }
      
      set({ 
        gamePhase: GamePhase.PAUSED,
        simulationInterval: null,
        isGamePaused: true
      });
    },
    
    // Reset the game with new teams
    resetGame: (homeTeamId: number, awayTeamId: number) => {
      const { simulationInterval } = get();
      const { getTeamById } = useTeams.getState();
      const { gameSettings } = useSettings.getState();
      
      // Clear any existing interval
      if (simulationInterval !== null) {
        clearInterval(simulationInterval);
      }
      
      // Get the teams
      let homeTeam = getTeamById(homeTeamId);
      let awayTeam = getTeamById(awayTeamId);
      
      if (!homeTeam || !awayTeam) {
        console.error('Invalid team IDs provided');
        return;
      }
      
      // Reset player stats
      homeTeam = gameEngine.resetPlayerStats(homeTeam);
      awayTeam = gameEngine.resetPlayerStats(awayTeam);
      
      // Initialize the game state
      const gameState = gameEngine.initializeGameState(homeTeam, awayTeam, gameSettings);
      
      set({
        gamePhase: GamePhase.READY,
        gameState,
        homeTeam,
        awayTeam,
        simulationInterval: null,
        isGamePaused: true
      });
    },
    
    // Skip to the next quarter
    skipToNextQuarter: () => {
      const { gameState, homeTeam, awayTeam } = get();
      const { gameSettings } = useSettings.getState();
      
      if (!homeTeam || !awayTeam) return;
      
      // Set time remaining to 0 to trigger end of quarter
      const updatedGameState = {
        ...gameState,
        timeRemaining: 0
      };
      
      // Handle the quarter end
      const newGameState = gameEngine.handleQuarterEnd(updatedGameState, homeTeam, awayTeam, gameSettings);
      
      // Check if the game has ended
      const gameEnded = newGameState.events.some(event => event.type === 'game_end');
      
      set({
        gameState: newGameState,
        gamePhase: gameEnded ? GamePhase.ENDED : get().gamePhase
      });
    },
    
    // Call a timeout
    callTimeout: (team: 'home' | 'away') => {
      const { gameState, homeTeam, awayTeam } = get();
      
      if (!homeTeam || !awayTeam) return;
      
      // Check if timeouts are available
      if (gameState.timeouts[team] <= 0) {
        return;
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
      
      // Pause the game
      get().pauseGame();
      
      set({ gameState: updatedGameState });
    },
    
    // Run one step of the simulation
    simulationStep: () => {
      const { gameState, homeTeam, awayTeam, gamePhase } = get();
      const { gameSettings } = useSettings.getState();
      const { updateTeamRecord } = useTeams.getState();
      
      // Skip if the game is not in PLAYING phase
      if (gamePhase !== GamePhase.PLAYING || !homeTeam || !awayTeam) {
        return;
      }
      
      // Run the game simulation step
      const newGameState = gameEngine.simulateStep(gameState, homeTeam, awayTeam, gameSettings);
      
      // Check if the game has ended
      const gameEnded = newGameState.events.some(event => event.type === 'game_end');
      
      // Update team records if the game has ended
      if (gameEnded) {
        // Determine the winner
        const homeWin = newGameState.score.home > newGameState.score.away;
        
        // Update team records
        updateTeamRecord(homeTeam.id, homeWin, true);
        updateTeamRecord(awayTeam.id, !homeWin, false);
        
        // Stop the simulation
        if (get().simulationInterval !== null) {
          clearInterval(get().simulationInterval);
        }
      }
      
      // Update state
      set({
        gameState: newGameState,
        gamePhase: gameEnded ? GamePhase.ENDED : gamePhase
      });
    }
  };
});

export default useSimulation;
