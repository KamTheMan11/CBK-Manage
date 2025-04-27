import { Conference } from '../types';

// List of basketball conferences
export const conferences: Conference[] = [
  {
    id: 1,
    name: 'Atlantic Coast Conference',
    abbreviation: 'ACC'
  },
  {
    id: 2,
    name: 'Big East Conference',
    abbreviation: 'BE'
  },
  {
    id: 3,
    name: 'Big Ten Conference',
    abbreviation: 'B10'
  },
  {
    id: 4,
    name: 'Big 12 Conference',
    abbreviation: 'B12'
  },
  {
    id: 5,
    name: 'Pac-12 Conference',
    abbreviation: 'PAC'
  },
  {
    id: 6,
    name: 'Southeastern Conference',
    abbreviation: 'SEC'
  },
  {
    id: 7,
    name: 'American Athletic Conference',
    abbreviation: 'AAC'
  },
  {
    id: 8,
    name: 'Missouri Valley Conference',
    abbreviation: 'MVC'
  },
  {
    id: 9,
    name: 'West Coast Conference',
    abbreviation: 'WCC'
  },
  {
    id: 10,
    name: 'Mountain West Conference',
    abbreviation: 'MWC'
  },
  {
    id: 11,
    name: 'Mid-American Conference',
    abbreviation: 'MAC'
  },
  {
    id: 12,
    name: 'Atlantic 10 Conference',
    abbreviation: 'A10'
  }
];

// Gets conference by ID
export const getConferenceById = (id: number): Conference | undefined => {
  return conferences.find(conference => conference.id === id);
};

// Gets conference by name
export const getConferenceByName = (name: string): Conference | undefined => {
  return conferences.find(conference => conference.name.toLowerCase() === name.toLowerCase());
};

export default conferences;
