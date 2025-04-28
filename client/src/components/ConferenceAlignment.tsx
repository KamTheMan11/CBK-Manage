
import React from 'react';
import { conferences } from '../lib/data/conferences';
import { collegeTeams } from '../lib/data/collegeTeams';
import { Card } from './ui/card';

export const ConferenceAlignment: React.FC = () => {
  const getTeamsInConference = (conferenceId: number) => {
    return collegeTeams.filter(team => team.conferenceId === conferenceId);
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold">Conference Alignment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {conferences.map((conference) => (
          <Card key={conference.id} className="p-4">
            <h3 className="text-lg font-bold mb-2">{conference.name}</h3>
            <ul className="list-disc list-inside">
              {getTeamsInConference(conference.id).map((team) => (
                <li key={team.id}>{team.name}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
};
