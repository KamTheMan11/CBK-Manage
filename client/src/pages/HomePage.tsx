import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Volleyball, Award, Settings, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import StandingsTable from '../components/StandingsTable';
import { useTeams } from '../lib/stores/useTeams';

export default function HomePage() {
  const navigate = useNavigate();
  const { teams } = useTeams();
  
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-xl bg-[#003087] text-white shadow-lg md:py-16 py-10">
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-4">College Hoops Simulator</h1>
          <p className="text-center text-xl mb-8 max-w-2xl">
            Create your teams, customize your games, and experience the excitement of college basketball!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/game')}
              className="bg-[#FFD700] hover:bg-yellow-500 text-[#003087] font-bold"
            >
              <Volleyball className="mr-2 h-5 w-5" />
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
              <Volleyball className="mr-2 h-5 w-5 text-[#FFD700]" />
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
                <Volleyball className="mr-2 h-4 w-4" />
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
    </div>
  );
}
