import { Player, PlayerPosition, PlayerAttributes, PlayerYear } from '../types';

// Generate a random player attribute value between 50 and 90
const randomAttribute = (min = 50, max = 90): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate random player attributes with position adjustments
export const generatePlayerAttributes = (position: string): PlayerAttributes => {
  let attributes: PlayerAttributes = {
    shooting: randomAttribute(),
    passing: randomAttribute(),
    dribbling: randomAttribute(),
    defense: randomAttribute(),
    rebounding: randomAttribute(),
    speed: randomAttribute()
  };
  
  // Adjust attributes based on position
  switch (position) {
    case PlayerPosition.PG:
      attributes.passing += 10;
      attributes.dribbling += 10;
      attributes.speed += 5;
      break;
    case PlayerPosition.SG:
      attributes.shooting += 10;
      attributes.speed += 5;
      break;
    case PlayerPosition.SF:
      attributes.shooting += 5;
      attributes.defense += 5;
      attributes.speed += 5;
      break;
    case PlayerPosition.PF:
      attributes.rebounding += 10;
      attributes.defense += 5;
      break;
    case PlayerPosition.C:
      attributes.rebounding += 15;
      attributes.defense += 10;
      attributes.speed -= 5;
      break;
  }
  
  // Cap attributes at 99
  for (let key in attributes) {
    if (attributes[key as keyof PlayerAttributes] > 99) {
      attributes[key as keyof PlayerAttributes] = 99;
    }
  }
  
  return attributes;
};

// Generate a typical player height based on position
export const getHeightByPosition = (position: string): string => {
  switch (position) {
    case PlayerPosition.PG:
      return ['6\'0"', '6\'1"', '6\'2"', '6\'3"'][Math.floor(Math.random() * 4)];
    case PlayerPosition.SG:
      return ['6\'3"', '6\'4"', '6\'5"', '6\'6"'][Math.floor(Math.random() * 4)];
    case PlayerPosition.SF:
      return ['6\'6"', '6\'7"', '6\'8"', '6\'9"'][Math.floor(Math.random() * 4)];
    case PlayerPosition.PF:
      return ['6\'8"', '6\'9"', '6\'10"', '6\'11"'][Math.floor(Math.random() * 4)];
    case PlayerPosition.C:
      return ['6\'10"', '6\'11"', '7\'0"', '7\'1"'][Math.floor(Math.random() * 4)];
    default:
      return '6\'5"';
  }
};

// Generate a typical player weight based on position
export const getWeightByPosition = (position: string): number => {
  switch (position) {
    case PlayerPosition.PG:
      return Math.floor(Math.random() * 20) + 175; // 175-195 lbs
    case PlayerPosition.SG:
      return Math.floor(Math.random() * 25) + 185; // 185-210 lbs
    case PlayerPosition.SF:
      return Math.floor(Math.random() * 30) + 200; // 200-230 lbs
    case PlayerPosition.PF:
      return Math.floor(Math.random() * 35) + 225; // 225-260 lbs
    case PlayerPosition.C:
      return Math.floor(Math.random() * 40) + 240; // 240-280 lbs
    default:
      return 205;
  }
};

// Generate a default player
export const generateDefaultPlayer = (id: number, position: string): Player => {
  // Randomize player class year
  const years: PlayerYear[] = ['FR', 'SO', 'JR', 'SR'];
  const year = years[Math.floor(Math.random() * years.length)];
  
  return {
    id,
    firstName: `Player`,
    lastName: `${id}`,
    number: id > 50 ? id - 50 : id,
    position,
    height: getHeightByPosition(position),
    weight: getWeightByPosition(position),
    year,
    attributes: generatePlayerAttributes(position),
    stats: {
      points: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      fouls: 0,
      fgMade: 0,
      fgAttempted: 0,
      fg3Made: 0,
      fg3Attempted: 0,
      ftMade: 0,
      ftAttempted: 0,
      minutesPlayed: 0
    }
  };
};

// Generate a complete roster of players for a team
export const generateTeamRoster = (startId: number = 1): Player[] => {
  const roster: Player[] = [];
  let id = startId;
  
  // Generate players by position
  // Typically each team needs 2-3 of each position for depth
  
  // Point Guards (2)
  for (let i = 0; i < 2; i++) {
    roster.push(generateDefaultPlayer(id++, PlayerPosition.PG));
  }
  
  // Shooting Guards (3)
  for (let i = 0; i < 3; i++) {
    roster.push(generateDefaultPlayer(id++, PlayerPosition.SG));
  }
  
  // Small Forwards (2)
  for (let i = 0; i < 2; i++) {
    roster.push(generateDefaultPlayer(id++, PlayerPosition.SF));
  }
  
  // Power Forwards (3)
  for (let i = 0; i < 3; i++) {
    roster.push(generateDefaultPlayer(id++, PlayerPosition.PF));
  }
  
  // Centers (2)
  for (let i = 0; i < 2; i++) {
    roster.push(generateDefaultPlayer(id++, PlayerPosition.C));
  }
  
  return roster;
};

// Reset player game stats
export const resetPlayerGameStats = (player: Player): Player => {
  return {
    ...player,
    stats: {
      points: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      fouls: 0,
      fgMade: 0,
      fgAttempted: 0,
      fg3Made: 0,
      fg3Attempted: 0,
      ftMade: 0,
      ftAttempted: 0,
      minutesPlayed: 0
    }
  };
};

export default {
  generatePlayerAttributes,
  generateDefaultPlayer,
  generateTeamRoster,
  resetPlayerGameStats
};
