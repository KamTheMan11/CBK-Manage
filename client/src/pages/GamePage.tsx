
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useTeams } from '../lib/stores/useTeams';
import GameSimulation from '../components/GameSimulation';
import { ArrowLeft, Volleyball, ArrowUp, ArrowDown } from 'lucide-react';
import BackButton from '../components/BackButton';

export default function GamePage() {
  const { teams } = useTeams();
  const navigate = useNavigate();
  const [homeTeamIndex, setHomeTeamIndex] = useState(0);
  const [awayTeamIndex, setAwayTeamIndex] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);

  const sortedTeams = [...teams].sort((a, b) => a.name.localeCompare(b.name));
  const homeTeam = sortedTeams[homeTeamIndex];
  const awayTeam = sortedTeams[awayTeamIndex];

  const handleHomeTeamChange = (direction: 'up' | 'down') => {
    let newIndex = direction === 'up' 
      ? (homeTeamIndex - 1 + sortedTeams.length) % sortedTeams.length
      : (homeTeamIndex + 1) % sortedTeams.length;
    
    if (newIndex === awayTeamIndex) {
      newIndex = direction === 'up'
        ? (newIndex - 1 + sortedTeams.length) % sortedTeams.length
        : (newIndex + 1) % sortedTeams.length;
    }
    setHomeTeamIndex(newIndex);
  };

  const handleAwayTeamChange = (direction: 'up' | 'down') => {
    let newIndex = direction === 'up'
      ? (awayTeamIndex - 1 + sortedTeams.length) % sortedTeams.length
      : (awayTeamIndex + 1) % sortedTeams.length;
    
    if (newIndex === homeTeamIndex) {
      newIndex = direction === 'up'
        ? (newIndex - 1 + sortedTeams.length) % sortedTeams.length
        : (newIndex + 1) % sortedTeams.length;
    }
    setAwayTeamIndex(newIndex);
  };

  const handleStartGame = () => {
    if (homeTeam && awayTeam) {
      setGameStarted(true);
    }
  };

  const handleNewGame = () => {
    setGameStarted(false);
    setHomeTeamIndex(0);
    setAwayTeamIndex(1);
  };

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
                Create Teams
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Volleyball className="mr-2 h-5 w-5 text-[#FFD700]" />
              Team Select
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-8">
              {/* Away Team */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Away Team</h3>
                  <div className="flex flex-col">
                    <Button variant="ghost" size="sm" onClick={() => handleAwayTeamChange('up')}>
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleAwayTeamChange('down')}>
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div 
                  className="p-6 rounded-lg text-white"
                  style={{ backgroundColor: awayTeam?.primaryColor }}
                >
                  <div className="text-2xl font-bold mb-2">{awayTeam?.name}</div>
                  <div className="text-lg">{awayTeam?.mascot}</div>
                </div>
              </div>

              {/* Team Stats */}
              <div className="space-y-6 flex flex-col items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">VS</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between gap-8">
                      <span>Offense:</span>
                      <div className="flex gap-2">
                        <span>{Math.floor(Math.random() * 20) + 80}</span>
                        <span>vs</span>
                        <span>{Math.floor(Math.random() * 20) + 80}</span>
                      </div>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Defense:</span>
                      <div className="flex gap-2">
                        <span>{Math.floor(Math.random() * 20) + 80}</span>
                        <span>vs</span>
                        <span>{Math.floor(Math.random() * 20) + 80}</span>
                      </div>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Prestige:</span>
                      <div className="flex gap-2">
                        <span>{Math.floor(Math.random() * 3) + 3}</span>
                        <span>vs</span>
                        <span>{Math.floor(Math.random() * 3) + 3}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleStartGame}
                  className="bg-[#003087] hover:bg-[#002a77] w-full"
                >
                  Start Game
                </Button>
              </div>

              {/* Home Team */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Home Team</h3>
                  <div className="flex flex-col">
                    <Button variant="ghost" size="sm" onClick={() => handleHomeTeamChange('up')}>
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleHomeTeamChange('down')}>
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div 
                  className="p-6 rounded-lg text-white"
                  style={{ backgroundColor: homeTeam?.primaryColor }}
                >
                  <div className="text-2xl font-bold mb-2">{homeTeam?.name}</div>
                  <div className="text-lg">{homeTeam?.mascot}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        homeTeamId={homeTeam.id}
        awayTeamId={awayTeam.id}
      />
    </div>
  );
}
