import { Team } from "../lib/types";
import { useTeams } from "../lib/stores/useTeams";
import { conferences } from "../lib/data/conferences";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export default function StandingsTable() {
  const { teams } = useTeams();
  
  // Group teams by conference
  const teamsByConference = conferences.map(conference => {
    const teamsInConference = teams.filter(team => team.conferenceId === conference.id);
    
    // Sort teams by win percentage (assuming wins and losses are tracked)
    const sortedTeams = teamsInConference.sort((a, b) => {
      const aWinPct = a.wins ? a.wins / (a.wins + a.losses) : 0;
      const bWinPct = b.wins ? b.wins / (b.wins + b.losses) : 0;
      return bWinPct - aWinPct;
    });
    
    return {
      conference,
      teams: sortedTeams
    };
  });
  
  // Calculate winning percentage
  const calculateWinPct = (team: Team): string => {
    if (!team.wins && !team.losses) return '.000';
    const winPct = team.wins / (team.wins + team.losses);
    return winPct.toFixed(3).replace(/^0/, '');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold text-[#003087] mb-4">Conference Standings</h2>
      
      <Tabs defaultValue={conferences[0].id.toString()}>
        <TabsList className="mb-4 flex overflow-x-auto">
          {conferences.map(conference => (
            <TabsTrigger key={conference.id} value={conference.id.toString()}>
              {conference.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {teamsByConference.map(({ conference, teams }) => (
          <TabsContent key={conference.id} value={conference.id.toString()}>
            <Table>
              <TableCaption>Current standings for the {conference.name}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead className="text-center">W</TableHead>
                  <TableHead className="text-center">L</TableHead>
                  <TableHead className="text-center">Pct</TableHead>
                  <TableHead className="text-center hidden md:table-cell">Home</TableHead>
                  <TableHead className="text-center hidden md:table-cell">Away</TableHead>
                  <TableHead className="text-center hidden lg:table-cell">Streak</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No teams in this conference yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  teams.map((team, index) => (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: team.primaryColor }}
                          ></div>
                          <span>{team.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{team.wins || 0}</TableCell>
                      <TableCell className="text-center">{team.losses || 0}</TableCell>
                      <TableCell className="text-center">{calculateWinPct(team)}</TableCell>
                      <TableCell className="text-center hidden md:table-cell">{team.homeWins || 0}-{team.homeLosses || 0}</TableCell>
                      <TableCell className="text-center hidden md:table-cell">{team.awayWins || 0}-{team.awayLosses || 0}</TableCell>
                      <TableCell className="text-center hidden lg:table-cell">
                        <span className={team.streak > 0 ? 'text-green-600' : 'text-red-600'}>
                          {team.streak > 0 ? 'W' : team.streak < 0 ? 'L' : '-'}
                          {team.streak ? Math.abs(team.streak) : 0}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
