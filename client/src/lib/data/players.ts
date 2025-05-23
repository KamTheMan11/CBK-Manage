
// Random name generation
const firstNames = ['James', 'John', 'Michael', 'David', 'Chris', 'Brian', 'Kevin', 'Marcus', 'Anthony', 'Robert', 'William', 'Thomas', 'Daniel', 'Eric', 'Ryan'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Davis', 'Miller', 'Wilson', 'Anderson', 'Taylor', 'Moore', 'Jackson', 'White', 'Harris', 'Thompson'];

const getRandomFirstName = () => firstNames[Math.floor(Math.random() * firstNames.length)];
const getRandomLastName = () => lastNames[Math.floor(Math.random() * lastNames.length)];


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

// Historic players data with real legends
const legendaryPlayers = {
  UCLA: [
    { firstName: "Kareem", lastName: "Abdul-Jabbar", position: "C", number: 33, attributes: { shooting: 95, passing: 85, dribbling: 80, defense: 99, rebounding: 99, speed: 85 } },
    { firstName: "Bill", lastName: "Walton", position: "C", number: 32, attributes: { shooting: 90, passing: 90, dribbling: 85, defense: 95, rebounding: 99, speed: 80 } },
    { firstName: "Reggie", lastName: "Miller", position: "SG", number: 31, attributes: { shooting: 99, passing: 85, dribbling: 90, defense: 85, rebounding: 75, speed: 90 } }
  ],
  Duke: [
    { firstName: "Christian", lastName: "Laettner", position: "PF", number: 32, attributes: { shooting: 90, passing: 85, dribbling: 85, defense: 90, rebounding: 90, speed: 85 } },
    { firstName: "Grant", lastName: "Hill", position: "SF", number: 33, attributes: { shooting: 88, passing: 90, dribbling: 92, defense: 90, rebounding: 85, speed: 95 } },
    { firstName: "J.J.", lastName: "Redick", position: "SG", number: 4, attributes: { shooting: 99, passing: 85, dribbling: 88, defense: 80, rebounding: 75, speed: 85 } }
  ],
  "North Carolina": [
    { firstName: "Michael", lastName: "Jordan", position: "SG", number: 23, attributes: { shooting: 99, passing: 90, dribbling: 99, defense: 99, rebounding: 85, speed: 99 } },
    { firstName: "James", lastName: "Worthy", position: "SF", number: 52, attributes: { shooting: 90, passing: 85, dribbling: 90, defense: 90, rebounding: 85, speed: 95 } },
    { firstName: "Vince", lastName: "Carter", position: "SG", number: 15, attributes: { shooting: 92, passing: 85, dribbling: 95, defense: 88, rebounding: 85, speed: 99 } }
  ],
  Kentucky: [
    { firstName: "Anthony", lastName: "Davis", position: "PF", number: 23, attributes: { shooting: 85, passing: 80, dribbling: 85, defense: 99, rebounding: 95, speed: 90 } },
    { firstName: "John", lastName: "Wall", position: "PG", number: 11, attributes: { shooting: 85, passing: 95, dribbling: 95, defense: 90, rebounding: 75, speed: 99 } },
    { firstName: "Dan", lastName: "Issel", position: "C", number: 44, attributes: { shooting: 90, passing: 80, dribbling: 80, defense: 85, rebounding: 95, speed: 80 } }
  ],
  Kansas: [
    { firstName: "Wilt", lastName: "Chamberlain", position: "C", number: 13, attributes: { shooting: 90, passing: 80, dribbling: 80, defense: 99, rebounding: 99, speed: 90 } },
    { firstName: "Paul", lastName: "Pierce", position: "SF", number: 34, attributes: { shooting: 95, passing: 85, dribbling: 90, defense: 85, rebounding: 85, speed: 85 } },
    { firstName: "Jo Jo", lastName: "White", position: "PG", number: 10, attributes: { shooting: 88, passing: 92, dribbling: 92, defense: 88, rebounding: 75, speed: 90 } }
  ]
};

// Generate a default player
export const generateDefaultPlayer = (id: number, position: string, teamName?: string): Player => {
  // Check if we should use a legendary player
  if (teamName && legendaryPlayers[teamName as keyof typeof legendaryPlayers]) {
    const teamLegends = legendaryPlayers[teamName as keyof typeof legendaryPlayers];
    const legendIndex = id % teamLegends.length;
    const legend = teamLegends[legendIndex];

    return {
      id,
      firstName: legend.firstName,
      lastName: legend.lastName,
      number: legend.number,
      position: legend.position as PlayerPosition,
      height: getHeightByPosition(legend.position),
      weight: getWeightByPosition(legend.position),
      year: 'SR',
      attributes: legend.attributes,
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
  }

  // Randomize player class year for non-legendary players
  const years: PlayerYear[] = ['FR', 'SO', 'JR', 'SR'];
  const year = years[Math.floor(Math.random() * years.length)];

  return {
    id,
    firstName: getRandomFirstName(),
    lastName: getRandomLastName(),
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