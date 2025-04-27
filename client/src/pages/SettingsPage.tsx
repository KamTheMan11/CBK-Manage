import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import GameSettings from '../components/GameSettings';
import ScoreBugEditor from '../components/ScoreBugEditor';
import BackButton from '../components/BackButton';
import { useState } from 'react';

export default function SettingsPage() {
  const [arcadeMode, setArcadeMode] = useState(true);
  const [broadcastOverlays, setBroadcastOverlays] = useState(true);
  const [commentaryEnabled, setCommentaryEnabled] = useState(true);
  const [showReplays, setShowReplays] = useState(true);
  const [nationalBroadcast, setNationalBroadcast] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#003087] dark:text-[#4a90e2]">Game Settings</h1>
        <BackButton />
      </div>
      
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="arcade-mode" className="font-medium">Arcade Mode</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Faster gameplay with exaggerated player movements</p>
              </div>
              <Switch 
                id="arcade-mode" 
                checked={arcadeMode}
                onCheckedChange={setArcadeMode}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="broadcast-overlays" className="font-medium">Broadcast Overlays</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Display network logos and scorebug</p>
              </div>
              <Switch 
                id="broadcast-overlays" 
                checked={broadcastOverlays}
                onCheckedChange={setBroadcastOverlays}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="commentary" className="font-medium">Commentary</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Enable in-game commentary</p>
              </div>
              <Switch 
                id="commentary" 
                checked={commentaryEnabled}
                onCheckedChange={setCommentaryEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="replays" className="font-medium">Show Replays</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Show replay highlights after big plays</p>
              </div>
              <Switch 
                id="replays" 
                checked={showReplays}
                onCheckedChange={setShowReplays}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="national-broadcast" className="font-medium">National Broadcast</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Set games as nationally televised</p>
              </div>
              <Switch 
                id="national-broadcast" 
                checked={nationalBroadcast}
                onCheckedChange={setNationalBroadcast}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="game-settings">
        <TabsList className="mb-4">
          <TabsTrigger value="game-settings">Game Rules & Display</TabsTrigger>
          <TabsTrigger value="scorebug">Scorebug Editor</TabsTrigger>
          <TabsTrigger value="fox-regions">Fox Sports Regions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="game-settings">
          <GameSettings />
        </TabsContent>
        
        <TabsContent value="scorebug">
          <ScoreBugEditor />
        </TabsContent>
        
        <TabsContent value="fox-regions">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-4">Fox Sports Regional Coverage</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Fox Sports South</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Georgia, Alabama, Mississippi, South Carolina</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Fox Sports Southeast</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tennessee, Georgia, Alabama, North Carolina, South Carolina</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Fox Sports Midwest</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Missouri, Illinois, Iowa, Nebraska, Kansas</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Fox Sports Indiana</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Primarily Indiana</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Fox Sports Detroit</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Focused on Michigan</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Fox Sports Florida</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Florida, including Orlando and Tampa Bay regions</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Fox Sports Ohio</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ohio, including Cleveland and Columbus</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Fox Sports Southwest</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Texas, Arkansas, Louisiana, Oklahoma</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
