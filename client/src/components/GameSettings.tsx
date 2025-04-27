import { useSettings } from '../lib/stores/useSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Save, RotateCcw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

export default function GameSettings() {
  const { gameSettings, updateSettings, resetToDefaults } = useSettings();
  
  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#003087]">Game Settings</h2>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={resetToDefaults}
            className="border-[#003087] text-[#003087]"
          >
            <RotateCcw className="mr-1 h-4 w-4" />
            Reset Defaults
          </Button>
          
          <Button 
            onClick={handleSave}
            className="bg-[#003087] hover:bg-[#002a77]"
          >
            <Save className="mr-1 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="game">
        <TabsList className="mb-4">
          <TabsTrigger value="game">Game Rules</TabsTrigger>
          <TabsTrigger value="difficulty">Difficulty</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
        </TabsList>
        
        <TabsContent value="game" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quarter Length */}
            <div className="space-y-2">
              <Label htmlFor="quarter-length">Quarter Length (minutes)</Label>
              <Select 
                value={gameSettings.quarterLength.toString()}
                onValueChange={(value) => updateSettings({ quarterLength: parseInt(value) })}
              >
                <SelectTrigger id="quarter-length">
                  <SelectValue placeholder="Select quarter length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="12">12 minutes</SelectItem>
                  <SelectItem value="20">20 minutes (Full)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Shot Clock */}
            <div className="space-y-2">
              <Label htmlFor="shot-clock">Shot Clock (seconds)</Label>
              <Select 
                value={gameSettings.shotClock.toString()}
                onValueChange={(value) => updateSettings({ shotClock: parseInt(value) })}
              >
                <SelectTrigger id="shot-clock">
                  <SelectValue placeholder="Select shot clock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24">24 seconds (NBA)</SelectItem>
                  <SelectItem value="30">30 seconds (NCAA)</SelectItem>
                  <SelectItem value="35">35 seconds (Old NCAA)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Game Clock Speed */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="game-speed">Game Speed</Label>
                <span className="text-sm text-gray-500">
                  {gameSettings.gameSpeed === 1 ? 'Real-time' : 
                   gameSettings.gameSpeed === 2 ? 'Fast' : 
                   gameSettings.gameSpeed === 3 ? 'Very Fast' : 'Super Fast'}
                </span>
              </div>
              <Slider
                id="game-speed"
                min={1}
                max={4}
                step={1}
                value={[gameSettings.gameSpeed]}
                onValueChange={(values) => updateSettings({ gameSpeed: values[0] })}
              />
            </div>
            
            {/* Foul Settings */}
            <div className="space-y-2">
              <Label htmlFor="foul-out">Foul Out Limit</Label>
              <Select 
                value={gameSettings.foulOut.toString()}
                onValueChange={(value) => updateSettings({ foulOut: parseInt(value) })}
              >
                <SelectTrigger id="foul-out">
                  <SelectValue placeholder="Select foul out limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 fouls (NCAA)</SelectItem>
                  <SelectItem value="6">6 fouls (NBA)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Bonus Settings */}
            <div className="space-y-2">
              <Label htmlFor="bonus-threshold">Bonus Threshold</Label>
              <Select 
                value={gameSettings.bonusThreshold.toString()}
                onValueChange={(value) => updateSettings({ bonusThreshold: parseInt(value) })}
              >
                <SelectTrigger id="bonus-threshold">
                  <SelectValue placeholder="Select bonus threshold" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4 team fouls</SelectItem>
                  <SelectItem value="5">5 team fouls</SelectItem>
                  <SelectItem value="7">7 team fouls</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Timeouts */}
            <div className="space-y-2">
              <Label htmlFor="timeouts">Timeouts Per Team</Label>
              <Select 
                value={gameSettings.timeoutsPerTeam.toString()}
                onValueChange={(value) => updateSettings({ timeoutsPerTeam: parseInt(value) })}
              >
                <SelectTrigger id="timeouts">
                  <SelectValue placeholder="Select timeouts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 timeouts</SelectItem>
                  <SelectItem value="4">4 timeouts</SelectItem>
                  <SelectItem value="5">5 timeouts</SelectItem>
                  <SelectItem value="6">6 timeouts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Toggles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="toggle-overtime">Enable Overtime</Label>
                <Switch 
                  id="toggle-overtime"
                  checked={gameSettings.overtimeEnabled}
                  onCheckedChange={(checked) => updateSettings({ overtimeEnabled: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="toggle-fouls">Enable Fouling Out</Label>
                <Switch 
                  id="toggle-fouls"
                  checked={gameSettings.foulsEnabled}
                  onCheckedChange={(checked) => updateSettings({ foulsEnabled: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="toggle-injuries">Enable Injuries</Label>
                <Switch 
                  id="toggle-injuries"
                  checked={gameSettings.injuriesEnabled}
                  onCheckedChange={(checked) => updateSettings({ injuriesEnabled: checked })}
                />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="difficulty" className="space-y-6">
          <div className="space-y-4">
            <Label className="text-lg font-medium">Game Difficulty</Label>
            <RadioGroup 
              value={gameSettings.difficulty}
              onValueChange={(value) => updateSettings({ difficulty: value })}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="easy" id="difficulty-easy" />
                <Label htmlFor="difficulty-easy" className="font-medium">Easy</Label>
                <p className="text-sm text-gray-500 ml-2">For casual players, AI makes more mistakes</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id="difficulty-normal" />
                <Label htmlFor="difficulty-normal" className="font-medium">Normal</Label>
                <p className="text-sm text-gray-500 ml-2">Balanced gameplay experience</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hard" id="difficulty-hard" />
                <Label htmlFor="difficulty-hard" className="font-medium">Hard</Label>
                <p className="text-sm text-gray-500 ml-2">For experienced players, AI plays smarter</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all-american" id="difficulty-all-american" />
                <Label htmlFor="difficulty-all-american" className="font-medium">All-American</Label>
                <p className="text-sm text-gray-500 ml-2">The ultimate challenge, AI plays optimally</p>
              </div>
            </RadioGroup>
            
            <div className="pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="ai-aggression">AI Aggression</Label>
                  <span className="text-sm text-gray-500">{gameSettings.aiAggression}%</span>
                </div>
                <Slider
                  id="ai-aggression"
                  min={20}
                  max={100}
                  step={5}
                  value={[gameSettings.aiAggression]}
                  onValueChange={(values) => updateSettings({ aiAggression: values[0] })}
                />
                <p className="text-xs text-gray-500 mt-1">Higher values make AI more aggressive on offense and defense</p>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="player-advantage">Player Advantage</Label>
                  <span className="text-sm text-gray-500">{gameSettings.playerAdvantage}%</span>
                </div>
                <Slider
                  id="player-advantage"
                  min={-20}
                  max={20}
                  step={5}
                  value={[gameSettings.playerAdvantage]}
                  onValueChange={(values) => updateSettings({ playerAdvantage: values[0] })}
                />
                <p className="text-xs text-gray-500 mt-1">Negative values favor AI teams, positive values favor player teams</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="display" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label className="text-lg font-medium">Scorebug Style</Label>
              <RadioGroup 
                value={gameSettings.scorebugStyle}
                onValueChange={(value) => updateSettings({ scorebugStyle: value })}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                <div className="flex flex-col space-y-2">
                  <div className="border border-gray-300 rounded-lg h-20 flex items-center justify-center bg-gray-50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-4 bg-[#003087]"></div>
                    <RadioGroupItem value="default" id="scorebug-default" className="absolute top-2 right-2" />
                    <div className="text-center">
                      <p className="font-medium">Default</p>
                    </div>
                  </div>
                  <Label htmlFor="scorebug-default" className="text-center text-sm">Default Style</Label>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="border border-gray-300 rounded-lg h-20 flex items-center justify-center bg-gray-50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-[#C41230]"></div>
                    <RadioGroupItem value="espn" id="scorebug-espn" className="absolute top-2 right-2" />
                    <div className="text-center mt-4">
                      <p className="font-medium">ESPN</p>
                    </div>
                  </div>
                  <Label htmlFor="scorebug-espn" className="text-center text-sm">ESPN Style</Label>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="border border-gray-300 rounded-lg h-20 flex items-center justify-center bg-gray-50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-[#004080]"></div>
                    <RadioGroupItem value="cbs" id="scorebug-cbs" className="absolute top-2 right-2" />
                    <div className="text-center mt-4">
                      <p className="font-medium">CBS</p>
                    </div>
                  </div>
                  <Label htmlFor="scorebug-cbs" className="text-center text-sm">CBS Style</Label>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="border border-gray-300 rounded-lg h-20 flex items-center justify-center bg-gray-50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-[#24A9E1]"></div>
                    <RadioGroupItem value="custom" id="scorebug-custom" className="absolute top-2 right-2" />
                    <div className="text-center mt-4">
                      <p className="font-medium">Custom</p>
                    </div>
                  </div>
                  <Label htmlFor="scorebug-custom" className="text-center text-sm">Custom Style</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-4">
              <Label className="text-lg font-medium">Display Options</Label>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="toggle-stats">Show Live Stats</Label>
                  <Switch 
                    id="toggle-stats"
                    checked={gameSettings.showLiveStats}
                    onCheckedChange={(checked) => updateSettings({ showLiveStats: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="toggle-shot-pct">Show Shot Percentages</Label>
                  <Switch 
                    id="toggle-shot-pct"
                    checked={gameSettings.showShotPercentages}
                    onCheckedChange={(checked) => updateSettings({ showShotPercentages: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="toggle-player-fatigue">Show Player Fatigue</Label>
                  <Switch 
                    id="toggle-player-fatigue"
                    checked={gameSettings.showPlayerFatigue}
                    onCheckedChange={(checked) => updateSettings({ showPlayerFatigue: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="toggle-commentators">Enable Commentators</Label>
                  <Switch 
                    id="toggle-commentators"
                    checked={gameSettings.enableCommentators}
                    onCheckedChange={(checked) => updateSettings({ enableCommentators: checked })}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="replay-frequency">Replay Frequency</Label>
                    <span className="text-sm text-gray-500">
                      {gameSettings.replayFrequency === 0 ? 'None' : 
                       gameSettings.replayFrequency === 1 ? 'Key Plays Only' : 
                       gameSettings.replayFrequency === 2 ? 'Medium' : 'High'}
                    </span>
                  </div>
                  <Slider
                    id="replay-frequency"
                    min={0}
                    max={3}
                    step={1}
                    value={[gameSettings.replayFrequency]}
                    onValueChange={(values) => updateSettings({ replayFrequency: values[0] })}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
