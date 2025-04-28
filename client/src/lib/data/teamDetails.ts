
import { conferences } from './conferences';

export interface TeamDetails {
  id: number;
  state: string;
  city: string;
  founded: number;
  bestPlayer: string;
  rival: number; // ID of rival team
  homeVenue: string;
  capacity: number;
  championships: number;
  finalFours: number;
}

export const teamDetails: Record<number, TeamDetails> = {
  1: {
    id: 1,
    state: "North Carolina",
    city: "Durham",
    founded: 1905,
    bestPlayer: "Christian Laettner",
    rival: 2,
    homeVenue: "Cameron Indoor Stadium",
    capacity: 9314,
    championships: 5,
    finalFours: 17
  },
  2: {
    id: 2,
    state: "North Carolina",
    city: "Chapel Hill",
    founded: 1910,
    bestPlayer: "Michael Jordan",
    rival: 1,
    homeVenue: "Dean Smith Center",
    capacity: 21750,
    championships: 6,
    finalFours: 20
  },
  // Add more team details...
};

export const getTeamDetails = (teamId: number): TeamDetails | undefined => {
  return teamDetails[teamId];
};
