// Types for the basketball simulation game

// Enums
export enum GamePhase {
  READY = 'ready',
  PLAYING = 'playing',
  PAUSED = 'paused',
  QUARTER_END = 'quarter_end',
  HALFTIME = 'halftime',
  ENDED = 'ended'
}

export enum PossessionType {
  HOME = 'home',
  AWAY = 'away'
}

export enum GameEvent {
  SCORE = 'score',
  FOUL = 'foul',
  TURNOVER = 'turnover',
  REBOUND = 'rebound',
  BLOCK = 'block',
  STEAL = 'steal',
  TIMEOUT = 'timeout',
  SUBSTITUTION = 'substitution',
  QUARTER_END = 'quarter_end',
  GAME_END = 'game_end'
}

export enum ShotType {
  LAYUP = 'layup',
  MID_RANGE = 'mid_range',
  THREE_POINTER = 'three_pointer',
  FREE_THROW = 'free_throw'
}

export enum PlayerPosition {
  PG = 'PG', // Point Guard
  SG = 'SG', // Shooting Guard
  SF = 'SF', // Small Forward
  PF = 'PF', // Power Forward
  C = 'C'    // Center
}

// Player year (class)
export type PlayerYear = 'FR' | 'SO' | 'JR' | 'SR';

// Conference interface
export interface Conference {
  id: number;
  name: string;
  abbreviation: string;
}

// Player attributes
export interface PlayerAttributes {
  shooting: number;     // Shooting ability (0-99)
  passing: number;      // Passing ability (0-99)
  dribbling: number;    // Ball handling (0-99)
  defense: number;      // Defensive ability (0-99)
  rebounding: number;   // Rebounding ability (0-99)
  speed: number;        // Speed and agility (0-99)
}

// Player interface
export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  number: number;           // Jersey number
  position: string;         // Position (PG, SG, SF, PF, C)
  height: string;           // Height (e.g., "6'2")
  weight: number;           // Weight in pounds
  year: PlayerYear;         // Year in school (FR, SO, JR, SR)
  attributes: PlayerAttributes;
  // Stats that get updated during games
  stats?: PlayerGameStats;
}

// Team interface
export interface Team {
  id: number;
  name: string;           // Team name
  abbreviation: string;   // Short team name (3-4 letters)
  mascot: string;         // Team mascot
  primaryColor: string;   // Primary team color (hex)
  secondaryColor: string; // Secondary team color (hex)
  conferenceId: number;   // Conference ID
  players?: Player[];     // Team roster
  
  // Season stats
  wins?: number;
  losses?: number;
  homeWins?: number;
  homeLosses?: number;
  awayWins?: number;
  awayLosses?: number;
  confWins?: number;     // Conference wins
  confLosses?: number;   // Conference losses
  streak?: number;        // Positive for win streak, negative for losing streak
}

// Game event interface
export interface GameEventRecord {
  time: string;           // Formatted game time (e.g., "Q1 10:30")
  type: string;           // Event type
  description: string;    // Description of the event
  playerId?: number;      // Player who performed the action
  teamId?: number;        // Team involved
}

// Game state interface
export interface GameState {
  quarter: number;           // Current quarter
  timeRemaining: number;     // Time remaining in quarter (seconds)
  shotClockRemaining: number; // Shot clock (seconds)
  score: {
    home: number;
    away: number;
  };
  fouls: {
    home: number;            // Team fouls for current quarter
    away: number;
  };
  playerFouls: {             // Individual player fouls
    [playerId: number]: number;
  };
  timeouts: {
    home: number;
    away: number;
  };
  possession: string;        // 'home' or 'away'
  ballPosition: [number, number, number];  // x, y, z coordinates
  shotClock: number;         // Shot clock duration
  events: GameEventRecord[];  // Game event log
  lastEvent?: GameEventRecord; // Most recent event
  inBonus: {
    home: boolean;
    away: boolean;
  };
  isPaused: boolean;
}

// Player game statistics
export interface PlayerGameStats {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  fgMade: number;        // Field goals made
  fgAttempted: number;   // Field goals attempted
  fg3Made: number;       // 3-pointers made 
  fg3Attempted: number;  // 3-pointers attempted
  ftMade: number;        // Free throws made
  ftAttempted: number;   // Free throws attempted
  minutesPlayed: number; // Minutes played
}

// Team game statistics
export interface TeamGameStats {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  fgMade: number;       // Field goals made
  fgAttempted: number;  // Field goals attempted
  fg3Made: number;      // 3-pointers made
  fg3Attempted: number; // 3-pointers attempted
  ftMade: number;       // Free throws made
  ftAttempted: number;  // Free throws attempted
  timeoutsUsed: number;
  timeoutsRemaining: number;
  playerStats: { [playerId: number]: PlayerGameStats };
}

// Game result interface
export interface GameResult {
  gameId: string;
  date: string;
  homeTeam: number;      // Team ID
  awayTeam: number;      // Team ID
  homeScore: number;
  awayScore: number;
  quarters: {
    home: number[];      // Score by quarter for home team
    away: number[];      // Score by quarter for away team
  };
  homeStats: TeamGameStats;
  awayStats: TeamGameStats;
  events: GameEventRecord[];
}
