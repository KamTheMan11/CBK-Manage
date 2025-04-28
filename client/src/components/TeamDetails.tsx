
import { Card, CardContent } from './ui/card';
import { Team } from '../lib/types';
import { getTeamDetails } from '../lib/data/teamDetails';
import { conferences } from '../lib/data/conferences';
import { collegeTeams } from '../lib/data/collegeTeams';

interface TeamDetailsProps {
  team: Team;
}

export default function TeamDetails({ team }: TeamDetailsProps) {
  const details = getTeamDetails(team.id);
  const conference = conferences.find(c => c.id === team.conferenceId);
  const rival = collegeTeams.find(t => t.id === details?.rival);

  if (!details) return null;

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: team.primaryColor }}>
          {team.name} {team.mascot}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">General Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Location:</span> {details.city}, {details.state}</p>
              <p><span className="font-medium">Founded:</span> {details.founded}</p>
              <p><span className="font-medium">Conference:</span> {conference?.name}</p>
              <p><span className="font-medium">Home Venue:</span> {details.homeVenue}</p>
              <p><span className="font-medium">Venue Capacity:</span> {details.capacity.toLocaleString()}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Team History</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Championships:</span> {details.championships}</p>
              <p><span className="font-medium">Final Four Appearances:</span> {details.finalFours}</p>
              <p><span className="font-medium">Greatest Player:</span> {details.bestPlayer}</p>
              <p><span className="font-medium">Biggest Rival:</span> {rival?.name}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Team Colors</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: team.primaryColor }}></div>
              <span>Primary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: team.secondaryColor }}></div>
              <span>Secondary</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
