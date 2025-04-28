
import { Card, CardContent } from './ui/card';
import { Team } from '../lib/types';
import { getTeamDetails } from '../lib/data/teamDetails';
import { conferences } from '../lib/data/conferences';
import { collegeTeams } from '../lib/data/collegeTeams';
import { useEffect, useState } from 'react';

interface TeamDetailsProps {
  team: Team;
}

export default function TeamDetails({ team }: TeamDetailsProps) {
  const details = getTeamDetails(team.id);
  const conference = conferences.find(c => c.id === team.conferenceId);
  const rival = collegeTeams.find(t => t.id === details?.rival);
  const [backgroundImage, setBgImage] = useState<string>('/assets/basketball-court.jpg');

  if (!details) return null;

  return (
    <div className="relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <Card className="w-full bg-opacity-90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold" style={{ color: team.primaryColor }}>
              {team.name} {team.mascot}
            </h2>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: team.primaryColor }}></div>
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: team.secondaryColor }}></div>
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: team.tertiaryColor || '#888888' }}></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold border-b pb-2">Program Info</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Location:</span> {details.city}, {details.state}</p>
                <p><span className="font-medium">Founded:</span> {details.founded}</p>
                <p><span className="font-medium">Conference:</span> {conference?.name}</p>
                <p><span className="font-medium">Biggest Rival:</span> {rival?.name || 'Independent'}</p>
                <p><span className="font-medium">Head Coach:</span> {details.headCoach}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold border-b pb-2">Venue</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Arena:</span> {details.homeVenue}</p>
                <p><span className="font-medium">Capacity:</span> {details.capacity.toLocaleString()}</p>
                <p><span className="font-medium">Opened:</span> {details.venueOpened}</p>
                <p><span className="font-medium">Surface:</span> Hardwood</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold border-b pb-2">History</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Championships:</span> {details.championships}</p>
                <p><span className="font-medium">Final Fours:</span> {details.finalFours}</p>
                <p><span className="font-medium">Elite Eights:</span> {details.eliteEights}</p>
                <p><span className="font-medium">Sweet Sixteens:</span> {details.sweetSixteens}</p>
                <p><span className="font-medium">Conference Titles:</span> {details.conferenceTitles}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">Program Legends</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {details.notableAlumni?.map((player, idx) => (
                <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-semibold">{player.name}</p>
                  <p className="text-sm text-gray-500">{player.years}</p>
                  <p className="text-sm">{player.achievements}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">Team Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-2">Colors</h4>
                <div className="flex gap-2">
                  <div>
                    <div className="w-12 h-12 rounded-lg mb-1" style={{ backgroundColor: team.primaryColor }}></div>
                    <p className="text-xs">Primary</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 rounded-lg mb-1" style={{ backgroundColor: team.secondaryColor }}></div>
                    <p className="text-xs">Secondary</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 rounded-lg mb-1" style={{ backgroundColor: team.tertiaryColor || '#888888' }}></div>
                    <p className="text-xs">Tertiary</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-2">Mascot Info</h4>
                <p className="text-sm">{details.mascotHistory || 'No mascot history available.'}</p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-2">Traditions</h4>
                <ul className="text-sm list-disc list-inside">
                  {details.traditions?.map((tradition, idx) => (
                    <li key={idx}>{tradition}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
