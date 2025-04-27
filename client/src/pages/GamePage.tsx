import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useTeams } from '../lib/stores/useTeams';
import GameSimulation from '../components/GameSimulation';
import { ArrowLeft, Volleyball, Users } from 'lucide-react';
import BackButton from '../components/BackButton';

export default function GamePage() {
  const { teams } = useTeams();
  const navigate = useNavigate();
  const [homeTeamId, setHomeTeamId] = useState<number | null>(null);
  const [awayTeamId, setAwayTeamId] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  
  const handleStartGame = () => {
    if (homeTeamId && awayTeamId) {
      setGameStarted(true);
    }
  };
  
  const handleNewGame = () => {
    setGameStarted(false);
    setHomeTeamId(null);
    setAwayTeamId(null);
  };
  
  // If there are less than 2 teams, prompt to create teams
  if (teams.length < 2) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create Teams First</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              You need at least two teams to play a game. Please create some teams first.
            </p>
            <div className="flex space-x-2">
              <BackButton />
              <Button 
                onClick={() => navigate('/team-management')}
                className="bg-[#003087] hover:bg-[#002a77]"
              >
                <Users className="mr-1 h-4 w-4" />
                Create Teams
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Team selection screen
  if (!gameStarted) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Volleyball className="mr-2 h-5 w-5 text-[#FFD700]" />
              Start New Game
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-medium text-gray-700">Home Team</label>
                <Select 
                  value={homeTeamId?.toString() || ''}
                  onValueChange={(value) => setHomeTeamId(parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Home Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map(team => (
                      <SelectItem 
                        key={team.id} 
                        value={team.id.toString()}
                        disabled={team.id === awayTeamId}
                      >
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="font-medium text-gray-700">Away Team</label>
                <Select 
                  value={awayTeamId?.toString() || ''}
                  onValueChange={(value) => setAwayTeamId(parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Away Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map(team => (
                      <SelectItem 
                        key={team.id} 
                        value={team.id.toString()}
                        disabled={team.id === homeTeamId}
                      >
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <BackButton />
              <Button 
                onClick={handleStartGame}
                disabled={!homeTeamId || !awayTeamId}
                className="bg-[#003087] hover:bg-[#002a77]"
              >
                <Volleyball className="mr-1 h-4 w-4" />
                Start Game
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Game simulation screen
  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={handleNewGame}
          className="border-[#003087] text-[#003087]"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          New Game
        </Button>
      </div>
      
      <GameSimulation 
        homeTeamId={homeTeamId!}
        awayTeamId={awayTeamId!}
      />
    </div>
  );
}
