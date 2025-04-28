import TeamManagement from '../components/TeamManagement';
import TeamDetails from '../components/TeamDetails';
import BackButton from '../components/BackButton';
import { useState } from 'react';
import { useTeams } from '../lib/stores/useTeams';
import { Team } from '../lib/types';
import { ScrollArea } from '../components/ui/scroll-area';

export default function TeamManagementPage() {
  const { teams } = useTeams();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <BackButton />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Team Management</h2>
          <TeamManagement onSelectTeam={setSelectedTeam} />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Team Information</h2>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {selectedTeam ? (
                <TeamDetails team={selectedTeam} />
              ) : (
                <div className="text-center text-gray-500 p-4">
                  Select a team to view details
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
