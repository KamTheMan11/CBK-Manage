import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Award, Settings, Users, Calendar, TrendingUp, Trophy, Crown, PenTool, User } from 'lucide-react';
import { BasketballIcon } from '../components/BasketballIcon';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import StandingsTable from '../components/StandingsTable';
import { useTeams } from '../lib/stores/useTeams';
import { useState, useEffect } from 'react';
import { TickerItem } from '../components/TickerItem';
import { collegeTeams, generateRandomMatchups } from '../lib/data/collegeTeams';

export default function HomePage() {
  const navigate = useNavigate();
  const { teams } = useTeams();
  const [currentDate] = useState(new Date());
  
  // Generate random matchups for the ticker
  const [tickerData, setTickerData] = useState<any[]>([]);
  
  // Initialize ticker data on component mount
  useEffect(() => {
    const generateTicker = () => {
      // Generate 10 random matchups
      const matchups = generateRandomMatchups(10);
      
      // Convert to ticker data format
      const newTickerData = matchups.map(matchup => {
        const homeTeam = collegeTeams.find(team => team.id === matchup.homeTeamId);
        const awayTeam = collegeTeams.find(team => team.id === matchup.awayTeamId);
        
        // For ranked teams (Top 25), set their rank
        const homeTeamRank = matchup.homeTeamId <= 25 ? matchup.homeTeamId : undefined;
        const awayTeamRank = matchup.awayTeamId <= 25 ? matchup.awayTeamId : undefined;
        
        return {
          teamA: homeTeam?.shortName || 'Team A',
          teamB: awayTeam?.shortName || 'Team B',
          teamARank: homeTeamRank,
          teamBRank: awayTeamRank,
          scoreA: matchup.homeScore,
          scoreB: matchup.awayScore,
          status: matchup.status,
          network: matchup.network,
          nationally: matchup.nationally
        };
      });
      
      setTickerData(newTickerData);
    };
    
    generateTicker();
  }, []);
  
  // Format date for college basketball season display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  return (
    <div className="space-y-6 pb-12">
      <section className="relative overflow-hidden rounded-xl bg-[#003087] text-white shadow-lg md:py-16 py-10">
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          <div className="flex items-center mb-6">
            <img src="/assets/sprites/ic_launcher_foreground.png" alt="College Hardwood Logo" className="h-24 w-24 pixel-art" />
          </div>
          <h1 className="text-center text-4xl md:text-6xl font-extrabold mb-4">COLLEGE HARDWOOD</h1>
          <p className="text-center text-xl mb-8 max-w-2xl">
            Experience the excitement of arcade-style college basketball!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/game')}
              className="bg-[#FFD700] hover:bg-yellow-500 text-[#003087] font-bold"
            >
              <BasketballIcon className="mr-2 h-5 w-5" />
              Play Game
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/team-management')}
              className="border-white text-white hover:bg-white/20"
            >
              <Users className="mr-2 h-5 w-5" />
              Manage Teams
            </Button>
          </div>
          
          <div className="absolute top-2 right-2 md:top-4 md:right-6 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
            <div className="flex items-center text-sm md:text-base">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formatDate(currentDate)}</span>
            </div>
          </div>
        </div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="2" fill="white" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>
        </div>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-[#FFD700]" />
              Conference Standings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {teams.length === 0 ? (
              <div className="p-8 text-center bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">No Teams Created Yet</h3>
                <p className="text-gray-500 mb-4">Create your first team to start seeing standings</p>
                <Button 
                  onClick={() => navigate('/team-management')}
                  className="bg-[#003087] hover:bg-[#002a77]"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Create Teams
                </Button>
              </div>
            ) : (
              <StandingsTable />
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BasketballIcon className="mr-2 h-5 w-5 text-[#FFD700]" />
              Quick Play
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-500">Start a new game with your favorite teams!</p>
            
            {teams.length < 2 ? (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
                Create at least two teams to start a game.
              </div>
            ) : (
              <Button 
                onClick={() => navigate('/game')}
                className="w-full bg-[#003087] hover:bg-[#002a77]"
              >
                <BasketballIcon className="mr-2 h-4 w-4" />
                Start New Game
              </Button>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 pt-0">
            <Button 
              variant="outline" 
              onClick={() => navigate('/team-management')}
              className="w-full border-[#003087] text-[#003087]"
            >
              <Users className="mr-2 h-4 w-4" />
              Manage Teams
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/coach-mode')}
              className="w-full border-[#003087] text-[#003087] mb-2"
            >
              <Trophy className="mr-2 h-4 w-4" />
              Coach Mode
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/settings')}
              className="w-full border-[#B2BEB5] text-[#212529]"
            >
              <Settings className="mr-2 h-4 w-4" />
              Game Settings
            </Button>
          </CardFooter>
        </Card>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-[#003087]">Team Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Create and customize your own college basketball teams with unique players, stats, and colors.</p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => navigate('/team-management')}
              className="w-full bg-[#003087] hover:bg-[#002a77]"
            >
              Manage Teams
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-[#003087]">Game Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Play realistic college basketball games with multiple camera angles, broadcast-style presentation, and dynamic gameplay.</p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => navigate('/game')}
              className="w-full bg-[#003087] hover:bg-[#002a77]"
            >
              Play Game
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-[#003087]">Customization</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Adjust game settings, rules, camera angles, and scorebug designs to create your perfect basketball experience.</p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => navigate('/settings')}
              className="w-full bg-[#003087] hover:bg-[#002a77]"
            >
              Customize Settings
            </Button>
          </CardFooter>
        </Card>
      </section>
      
      {/* New features section with March Madness, Create-a-Player, etc. */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[#003087]">Game Modes</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/march-madness')}
          >
            <CardContent className="p-0">
              <div className="bg-blue-600 p-6 text-white flex flex-col items-center text-center">
                <Trophy className="w-12 h-12 mb-2" />
                <h3 className="font-bold text-lg">March Madness</h3>
                <p className="text-sm mt-2">Play through an entire tournament bracket with 64 teams</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="bg-orange-600 p-6 text-white flex flex-col items-center text-center">
                <User className="w-12 h-12 mb-2" />
                <h3 className="font-bold text-lg">Create-a-Player</h3>
                <p className="text-sm mt-2">Build custom players with unique attributes and skills</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="bg-green-600 p-6 text-white flex flex-col items-center text-center">
                <BasketballIcon className="w-12 h-12 mb-2" />
                <h3 className="font-bold text-lg">Practice Mode</h3>
                <p className="text-sm mt-2">Refine your skills with no time limits or pressure</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="bg-purple-600 p-6 text-white flex flex-col items-center text-center">
                <PenTool className="w-12 h-12 mb-2" />
                <h3 className="font-bold text-lg">Custom Commentary</h3>
                <p className="text-sm mt-2">Create your own announcer voice and style</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Top 25 Rankings */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[#003087] flex items-center">
          <Crown className="mr-2 h-6 w-6 text-[#FFD700]" />
          Top 25 Rankings
        </h2>
        <Card>
          <CardContent className="p-4">
            {teams.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Create teams to see rankings</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((rank) => {
                      const team = collegeTeams.find(t => t.id === rank);
                      return (
                        <div key={rank} className="flex items-center border-b pb-1">
                          <div className="w-8 text-center font-bold">{rank}</div>
                          <div className="flex-1">
                            {team?.shortName || 'Team Name'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {team?.id <= 25 ? `${Math.floor(Math.random() * 4) + 17}-${Math.floor(Math.random() * 4) + 2}` : '0-0'}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="space-y-2">
                  {[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map((rank) => (
                    <div key={rank} className="flex items-center border-b pb-1">
                      <div className="w-8 text-center font-bold">{rank}</div>
                      <div className="flex-1">
                        {teams[rank % teams.length]?.name || 'Team Name'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {Math.floor(Math.random() * 10) + 10}-{Math.floor(Math.random() * 10) + 5}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
      
      {/* ESPN-style ticker at the bottom */}
      <div className="espn-ticker">
        <div className="espn-ticker-logo">
          <img src="/assets/logos/espn.png" alt="ESPN" className="h-full w-full object-contain" />
        </div>
        <div className="espn-ticker-content" style={{ paddingLeft: "80px" }}>
          {tickerData.map((game, index) => (
            <TickerItem 
              key={index}
              teamA={game.teamA}
              teamB={game.teamB}
              teamARank={game.teamARank}
              teamBRank={game.teamBRank}
              scoreA={game.scoreA}
              scoreB={game.scoreB}
              status={game.status}
              network={game.network}
              nationally={game.nationally}
            />
          ))}
          
          {/* Duplicate ticker items to create a seamless loop */}
          {tickerData.map((game, index) => (
            <TickerItem 
              key={`dup-${index}`}
              teamA={game.teamA}
              teamB={game.teamB}
              teamARank={game.teamARank}
              teamBRank={game.teamBRank}
              scoreA={game.scoreA}
              scoreB={game.scoreB}
              status={game.status}
              network={game.network}
              nationally={game.nationally}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
