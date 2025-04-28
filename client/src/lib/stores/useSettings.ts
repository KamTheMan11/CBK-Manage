import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Game settings interface
export interface GameSettings {
  // Game Rules
  quarterLength: number;      // Length of quarters in minutes
  shotClock: number;          // Shot clock duration in seconds
  gameSpeed: number;          // 1 = real-time, 2 = fast, 3 = very fast, 4 = super fast
  timeoutsPerTeam: number;    // Number of timeouts per team
  foulOut: number;            // Number of fouls a player fouling out
  bonusThreshold: number;     // Team fouls for bonus free throws
  overtimeEnabled: boolean;   // Whether overtime is enabled
  foulsEnabled: boolean;      // Whether fouling out is enabled
  injuriesEnabled: boolean;   // Whether injuries are enabled
  
  // Difficulty
  difficulty: string;         // 'easy', 'normal', 'hard', 'all-american'
  aiAggression: number;       // AI aggression level (percentage)
  playerAdvantage: number;    // Player advantage (-20 to +20)
  
  // Display
  scorebugStyle: string;      // 'default', 'espn', 'cbs', 'custom'
  showLiveStats: boolean;     // Whether to show live stats
  darkMode: boolean;          // Whether dark mode is enabled
  showShotPercentages: boolean; // Whether to show shot percentages
  showPlayerFatigue: boolean;  // Whether to show player fatigue
  enableCommentators: boolean; // Whether to enable commentators
  replayFrequency: number;     // 0 = none, 1 = key plays, 2 = medium, 3 = high
  
  // Custom scorebug settings
  customScorebug?: {
    backgroundColor: string;
    textColor: string;
    accentColor: string;
    showTeamLogos: boolean;
    showQuarterTime: boolean;
    showShotClock: boolean;
    showFouls: boolean;
    showTimeouts: boolean;
    roundedCorners: boolean;
    position: string;
    size: string;
    style: string;
  };
}

// Default settings
const defaultSettings: GameSettings = {
  // Game Rules
  quarterLength: 10,
  shotClock: 30,
  gameSpeed: 2,
  timeoutsPerTeam: 4,
  foulOut: 5,
  bonusThreshold: 7,
  overtimeEnabled: true,
  foulsEnabled: true,
  injuriesEnabled: false,
  
  // Difficulty
  difficulty: 'normal',
  aiAggression: 50,
  playerAdvantage: 0,
  
  // Display
  scorebugStyle: 'default',
  showLiveStats: true,
  showShotPercentages: true,
  showPlayerFatigue: true,
  enableCommentators: true,
  replayFrequency: 2,
  
  // Custom scorebug
  customScorebug: {
    backgroundColor: '#003087',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
    showTeamLogos: true,
    showQuarterTime: true,
    showShotClock: true,
    showFouls: true,
    showTimeouts: true,
    roundedCorners: true,
    position: 'top',
    size: 'medium',
    style: 'default'
  }
};

// Settings store
interface SettingsState {
  gameSettings: GameSettings;
  updateSettings: (settings: Partial<GameSettings>) => void;
  resetToDefaults: () => void;
}

// Create the store with persisted state
export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      gameSettings: defaultSettings,
      
      updateSettings: (settings: Partial<GameSettings>) => 
        set(state => ({
          gameSettings: {
            ...state.gameSettings,
            ...settings,
            // Handle nested customScorebug updates
            customScorebug: settings.customScorebug 
              ? { ...state.gameSettings.customScorebug, ...settings.customScorebug }
              : state.gameSettings.customScorebug
          }
        })),
      
      resetToDefaults: () => set({ gameSettings: defaultSettings })
    }),
    {
      name: 'college-bball-settings'
    }
  )
);

export default useSettings;
