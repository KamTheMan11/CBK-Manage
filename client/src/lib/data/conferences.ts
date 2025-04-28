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
    name: 'Southeastern Conference',
    abbreviation: 'SEC'
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
    name: 'Big East Conference',
    abbreviation: 'BE'
  },
  {
    id: 6,
    name: 'Pacific-12 Conference',
    abbreviation: 'PAC'
  },
  {
    id: 7,
    name: 'American Athletic Conference',
    abbreviation: 'AAC'
  },
  {
    id: 8,
    name: 'Mountain West Conference',
    abbreviation: 'MWC'
  },
  {
    id: 9,
    name: 'Sun Belt Conference',
    abbreviation: 'SBC'
  },
  {
    id: 10,
    name: 'Mid-American Conference',
    abbreviation: 'MAC'
  },
  {
    id: 11,
    name: 'Conference USA',
    abbreviation: 'CUSA'
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