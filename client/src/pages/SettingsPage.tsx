import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import GameSettings from '../components/GameSettings';
import ScoreBugEditor from '../components/ScoreBugEditor';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#003087]">Game Settings</h1>
      
      <Tabs defaultValue="game-settings">
        <TabsList className="mb-4">
          <TabsTrigger value="game-settings">Game Rules & Display</TabsTrigger>
          <TabsTrigger value="scorebug">Scorebug Editor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="game-settings">
          <GameSettings />
        </TabsContent>
        
        <TabsContent value="scorebug">
          <ScoreBugEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}
