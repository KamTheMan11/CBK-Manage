import { Player, Team, GameState, ShotType } from '../types';

// Calculate the chances a player makes a shot based on their attributes
export const calculateShotSuccess = (
  player: Player,
  shotType: ShotType,
  defender?: Player,
  gameSettings?: any
): number => {
  // Base chances based on shot type and player attribute
  let baseChance = 0;
  
  switch (shotType) {
    case ShotType.LAYUP:
      baseChance = 0.65 + (player.attributes.shooting / 200);
      break;
    case ShotType.MID_RANGE:
      baseChance = 0.40 + (player.attributes.shooting / 200);
      break;
    case ShotType.THREE_POINTER:
      baseChance = 0.35 + (player.attributes.shooting / 250);
      break;
    case ShotType.FREE_THROW:
      baseChance = 0.70 + (player.attributes.shooting / 300);
      break;
  }
  
  // Adjust for defensive pressure if a defender is provided
  if (defender && shotType !== ShotType.FREE_THROW) {
    const defensiveImpact = defender.attributes.defense / 200;
    baseChance -= defensiveImpact;
  }
  
  // Apply game difficulty adjustments if settings are provided
  if (gameSettings) {
    // Adjust based on difficulty and player advantage
    const difficultyAdjustment = {
      'easy': 0.05,
      'normal': 0,
      'hard': -0.05,
      'all-american': -0.10
    }[gameSettings.difficulty] || 0;
    
    // Player advantage (from -20 to +20) converted to a percentage adjustment
    const playerAdvantage = gameSettings.playerAdvantage / 200;
    
    baseChance += difficultyAdjustment + playerAdvantage;
  }
  
  // Ensure the chance is within bounds (0 to 1)
  return Math.max(0, Math.min(1, baseChance));
};

// Determine if a shot should be taken based on player attributes and game situation
export const shouldTakeShot = (
  player: Player, 
  shotType: ShotType,
  shotClockRemaining: number,
  gameState: GameState,
  aiAggression: number
): boolean => {
  // Base likelihood of taking shot based on shot type and player attribute
  let baseLikelihood = 0;
  
  switch (shotType) {
    case ShotType.LAYUP:
      baseLikelihood = 0.8 + (player.attributes.shooting / 400);
      break;
    case ShotType.MID_RANGE:
      baseLikelihood = 0.4 + (player.attributes.shooting / 300);
      break;
    case ShotType.THREE_POINTER:
      baseLikelihood = 0.3 + (player.attributes.shooting / 250);
      break;
  }
  
  // Adjust based on shot clock situation
  if (shotClockRemaining < 5) {
    // Under pressure, more likely to shoot
    baseLikelihood += 0.3;
  } else if (shotClockRemaining < 10) {
    // Looking for a shot, slightly more likely
    baseLikelihood += 0.1;
  }
  
  // Adjust based on score differential
  const scoreDiff = gameState.score.home - gameState.score.away;
  const teamIsBehind = 
    (gameState.possession === 'home' && scoreDiff < 0) ||
    (gameState.possession === 'away' && scoreDiff > 0);
  
  if (teamIsBehind) {
    // More aggressive shooting when behind
    baseLikelihood += 0.1;
  }
  
  // Adjust based on AI aggression setting (0-100)
  baseLikelihood *= (0.75 + (aiAggression / 400));
  
  // Random chance to decide if shot is taken
  return Math.random() < baseLikelihood;
};

// Determine best player to pass to
export const determineBestPassingOption = (
  currentPlayer: Player,
  teammates: Player[],
  defenders: Player[]
): Player => {
  // Simple logic to find the most open teammate with best scoring ability
  return teammates.reduce((best, teammate) => {
    if (teammate.id === currentPlayer.id) return best;
    
    // Calculate a simple "openness" score (higher is better)
    const openness = Math.random() * 10 + teammate.attributes.speed / 10;
    
    // Weighted scoring ability
    const scoringAbility = teammate.attributes.shooting;
    
    // Combined score
    const score = openness + (scoringAbility / 10);
    
    if (!best || score > best.score) {
      return { player: teammate, score };
    }
    return best;
  }, { player: teammates[0], score: 0 }).player;
};

// Determine if a player should attempt a steal
export const shouldAttemptSteal = (
  defender: Player,
  ballHandler: Player,
  aiAggression: number
): boolean => {
  // Base chance based on defender's defensive attribute vs ball handler's dribbling
  const defensiveEdge = (defender.attributes.defense - ballHandler.attributes.dribbling) / 100;
  let stealChance = 0.1 + Math.max(0, defensiveEdge);
  
  // Adjust based on AI aggression
  stealChance *= (0.75 + (aiAggression / 400));
  
  return Math.random() < stealChance;
};

// Determine if a player should attempt a block
export const shouldAttemptBlock = (
  defender: Player,
  shooter: Player,
  shotType: ShotType,
  aiAggression: number
): boolean => {
  // More likely to try to block layups than jump shots
  let baseChance = shotType === ShotType.LAYUP ? 0.4 : 0.2;
  
  // Adjust based on defender's attributes
  baseChance += defender.attributes.defense / 200;
  
  // Adjust based on AI aggression
  baseChance *= (0.75 + (aiAggression / 400));
  
  return Math.random() < baseChance;
};

// Get all players by position
export const getPlayersByPosition = (team: Team, position: string): Player[] => {
  if (!team.players) return [];
  return team.players.filter(player => player.position === position);
};

// Select the best player for a given position
export const getBestPlayerForPosition = (team: Team, position: string): Player | undefined => {
  const positionPlayers = getPlayersByPosition(team, position);
  if (positionPlayers.length === 0) return undefined;
  
  // Sort by overall rating
  return positionPlayers.sort((a, b) => {
    const aRating = calculatePlayerRating(a);
    const bRating = calculatePlayerRating(b);
    return bRating - aRating;
  })[0];
};

// Calculate overall player rating
export const calculatePlayerRating = (player: Player): number => {
  const { shooting, passing, dribbling, defense, rebounding, speed } = player.attributes;
  return Math.round((shooting + passing + dribbling + defense + rebounding + speed) / 6);
};

// Determine if AI should call a timeout
export const shouldCallTimeout = (
  gameState: GameState,
  team: 'home' | 'away',
  runAgainst: number,
  timeoutsRemaining: number
): boolean => {
  // Don't call timeout if no timeouts remaining
  if (timeoutsRemaining <= 0) return false;
  
  // More likely to call timeout when opponent is on a run
  const baseChance = 0.1 + (runAgainst / 20);
  
  // Less likely to call timeout if few remaining
  const timeoutAdjustment = timeoutsRemaining / 10;
  
  // Random chance
  return Math.random() < (baseChance + timeoutAdjustment);
};

export default {
  calculateShotSuccess,
  shouldTakeShot,
  determineBestPassingOption,
  shouldAttemptSteal,
  shouldAttemptBlock,
  getPlayersByPosition,
  getBestPlayerForPosition,
  calculatePlayerRating,
  shouldCallTimeout
};
