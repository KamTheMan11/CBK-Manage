// Time management for basketball games

// Convert seconds to minutes:seconds format
export const formatGameTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Convert quarter and time to a display string
export const formatQuarterTime = (quarter: number, timeRemaining: number): string => {
  const quarterDisplay = quarter > 4 ? `OT${quarter - 4}` : `${quarter}Q`;
  return `${quarterDisplay} ${formatGameTime(timeRemaining)}`;
};

// Get formatted time for event log
export const getEventTime = (quarter: number, timeRemaining: number): string => {
  return formatQuarterTime(quarter, timeRemaining);
};

// Calculate the actual seconds to simulate based on game speed
export const calculateSimulationTime = (
  secondsToSimulate: number, 
  gameSpeed: number
): number => {
  // gameSpeed: 1 = real-time, 2 = fast, 3 = very fast, 4 = super fast
  const speedMultiplier = [1, 4, 8, 12][gameSpeed - 1] || 4;
  return secondsToSimulate * speedMultiplier;
};

// Simulate time passing in the game (returns the new time remaining)
export const simulateTime = (
  currentTime: number, 
  secondsToSimulate: number, 
  gameSpeed: number
): number => {
  const simTime = calculateSimulationTime(secondsToSimulate, gameSpeed);
  const newTime = Math.max(0, currentTime - simTime);
  return newTime;
};

// Shot clock management
export const resetShotClock = (shotClockDuration: number): number => {
  return shotClockDuration;
};

// Adjust shot clock when very little game time remains
export const adjustShotClock = (
  shotClockRemaining: number, 
  timeRemaining: number
): number => {
  // If game clock is less than shot clock, reduce shot clock to match
  if (timeRemaining < shotClockRemaining) {
    return timeRemaining;
  }
  return shotClockRemaining;
};

// Simulate shot clock time passing
export const simulateShotClock = (
  currentShotClock: number, 
  secondsToSimulate: number, 
  gameSpeed: number
): number => {
  const simTime = calculateSimulationTime(secondsToSimulate, gameSpeed);
  const newShotClock = Math.max(0, currentShotClock - simTime);
  return newShotClock;
};

// Check if the shot clock has expired
export const hasShotClockExpired = (shotClockRemaining: number): boolean => {
  return shotClockRemaining <= 0;
};

// Check if the quarter has ended
export const hasQuarterEnded = (timeRemaining: number): boolean => {
  return timeRemaining <= 0;
};

// Check if time to display shot clock warning
export const shouldDisplayShotClockWarning = (shotClockRemaining: number): boolean => {
  return shotClockRemaining <= 5 && shotClockRemaining > 0;
};

export default {
  formatGameTime,
  formatQuarterTime,
  getEventTime,
  calculateSimulationTime,
  simulateTime,
  resetShotClock,
  adjustShotClock,
  simulateShotClock,
  hasShotClockExpired,
  hasQuarterEnded,
  shouldDisplayShotClockWarning
};
