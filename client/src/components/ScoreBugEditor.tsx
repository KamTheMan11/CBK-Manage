import { useState } from 'react';
import { useSettings } from '../lib/stores/useSettings';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { Save, Download, Upload } from 'lucide-react';

export default function ScoreBugEditor() {
  const { gameSettings, updateSettings } = useSettings();
  const [scorebugForm, setScorebugForm] = useState({
    backgroundColor: '#003087',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
    showTeamLogos: true,
    showQuarterTime: true,
    showShotClock: true,
    showFouls: true,
    showTimeouts: true,
    roundedCorners: true,
    position: 'top', // top, bottom
    size: 'medium', // small, medium, large
    style: 'default'
  });
  
  const handleSave = () => {
    updateSettings({ 
      scorebugStyle: 'custom',
      customScorebug: scorebugForm
    });
    toast.success('Custom scorebug saved!');
  };
  
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(scorebugForm));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "scorebug-config.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    toast.success('Scorebug configuration exported!');
  };
  
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        setScorebugForm({
          ...scorebugForm,
          ...json
        });
        toast.success('Scorebug configuration imported!');
      } catch (err) {
        toast.error('Failed to parse configuration file');
      }
    };
    reader.readAsText(file);
  };
  
  // Preview scorebug based on current settings
  const renderScorebugPreview = () => {
    return (
      <div className="border rounded-lg p-2 mt-4 bg-gray-100">
        <div 
          className={`p-2 ${scorebugForm.roundedCorners ? 'rounded-lg' : ''}`}
          style={{ 
            backgroundColor: scorebugForm.backgroundColor,
            color: scorebugForm.textColor
          }}
        >
          <div className="flex justify-between items-center text-xs">
            <div className="font-bold">1Q</div>
            <div className="text-base">10:00</div>
            {scorebugForm.showShotClock && (
              <div className="text-xs">30</div>
            )}
          </div>
          
          <div className="grid grid-cols-3 text-center py-1">
            <div className="text-xs font-semibold">AWAY</div>
            <div className="text-xs font-semibold">SCORE</div>
            <div className="text-xs font-semibold">HOME</div>
          </div>
          
          <div className="grid grid-cols-3 text-center">
            <div>
              {scorebugForm.showTeamLogos && (
                <div className="w-4 h-4 rounded-full bg-white mx-auto mb-1"></div>
              )}
              <div className="text-sm font-bold">VIS</div>
              {scorebugForm.showTimeouts && (
                <div className="text-xs mt-1">4 TO</div>
              )}
            </div>
            
            <div className="text-lg font-bold">0 - 0</div>
            
            <div>
              {scorebugForm.showTeamLogos && (
                <div className="w-4 h-4 rounded-full bg-white mx-auto mb-1"></div>
              )}
              <div className="text-sm font-bold">HOME</div>
              {scorebugForm.showTimeouts && (
                <div className="text-xs mt-1">4 TO</div>
              )}
            </div>
          </div>
          
          {scorebugForm.showFouls && (
            <div className="text-xs pt-1 flex justify-between">
              <div>Fouls: VIS 0 - HOME 0</div>
              <div className="font-semibold">
                Poss: <span style={{ color: scorebugForm.accentColor }}>HOME</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scorebug Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between">
          <div className="space-y-4">
            <div>
              <Label htmlFor="scorebug-style">Preset Style</Label>
              <Select
                value={scorebugForm.style}
                onValueChange={(value) => setScorebugForm({...scorebugForm, style: value})}
              >
                <SelectTrigger id="scorebug-style">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="espn">ESPN Style</SelectItem>
                  <SelectItem value="cbs">CBS Style</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="scorebug-position">Position</Label>
                <Select
                  value={scorebugForm.position}
                  onValueChange={(value) => setScorebugForm({...scorebugForm, position: value as 'top' | 'bottom'})}
                >
                  <SelectTrigger id="scorebug-position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top">Top</SelectItem>
                    <SelectItem value="bottom">Bottom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="scorebug-size">Size</Label>
                <Select
                  value={scorebugForm.size}
                  onValueChange={(value) => setScorebugForm({...scorebugForm, size: value as 'small' | 'medium' | 'large'})}
                >
                  <SelectTrigger id="scorebug-size">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleExport}
              title="Export Configuration"
            >
              <Download className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => document.getElementById('import-config')?.click()}
              title="Import Configuration"
            >
              <Upload className="h-4 w-4" />
              <input
                id="import-config"
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImport}
              />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Appearance</h3>
            
            <div>
              <Label htmlFor="background-color">Background Color</Label>
              <div className="flex space-x-2">
                <Input 
                  id="background-color"
                  type="color"
                  value={scorebugForm.backgroundColor}
                  onChange={(e) => setScorebugForm({...scorebugForm, backgroundColor: e.target.value})}
                  className="w-12 h-10 p-1"
                />
                <Input 
                  value={scorebugForm.backgroundColor}
                  onChange={(e) => setScorebugForm({...scorebugForm, backgroundColor: e.target.value})}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="text-color">Text Color</Label>
              <div className="flex space-x-2">
                <Input 
                  id="text-color"
                  type="color"
                  value={scorebugForm.textColor}
                  onChange={(e) => setScorebugForm({...scorebugForm, textColor: e.target.value})}
                  className="w-12 h-10 p-1"
                />
                <Input 
                  value={scorebugForm.textColor}
                  onChange={(e) => setScorebugForm({...scorebugForm, textColor: e.target.value})}
                  placeholder="#FFFFFF"
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="accent-color">Accent Color</Label>
              <div className="flex space-x-2">
                <Input 
                  id="accent-color"
                  type="color"
                  value={scorebugForm.accentColor}
                  onChange={(e) => setScorebugForm({...scorebugForm, accentColor: e.target.value})}
                  className="w-12 h-10 p-1"
                />
                <Input 
                  value={scorebugForm.accentColor}
                  onChange={(e) => setScorebugForm({...scorebugForm, accentColor: e.target.value})}
                  placeholder="#FFD700"
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="rounded-corners"
                checked={scorebugForm.roundedCorners}
                onCheckedChange={(checked) => setScorebugForm({...scorebugForm, roundedCorners: checked})}
              />
              <Label htmlFor="rounded-corners">Rounded Corners</Label>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Elements</h3>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="show-logos"
                checked={scorebugForm.showTeamLogos}
                onCheckedChange={(checked) => setScorebugForm({...scorebugForm, showTeamLogos: checked})}
              />
              <Label htmlFor="show-logos">Show Team Logos</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="show-quarter-time"
                checked={scorebugForm.showQuarterTime}
                onCheckedChange={(checked) => setScorebugForm({...scorebugForm, showQuarterTime: checked})}
              />
              <Label htmlFor="show-quarter-time">Show Quarter & Time</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="show-shot-clock"
                checked={scorebugForm.showShotClock}
                onCheckedChange={(checked) => setScorebugForm({...scorebugForm, showShotClock: checked})}
              />
              <Label htmlFor="show-shot-clock">Show Shot Clock</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="show-fouls"
                checked={scorebugForm.showFouls}
                onCheckedChange={(checked) => setScorebugForm({...scorebugForm, showFouls: checked})}
              />
              <Label htmlFor="show-fouls">Show Fouls & Possession</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="show-timeouts"
                checked={scorebugForm.showTimeouts}
                onCheckedChange={(checked) => setScorebugForm({...scorebugForm, showTimeouts: checked})}
              />
              <Label htmlFor="show-timeouts">Show Timeouts</Label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Preview</h3>
          {renderScorebugPreview()}
        </div>
        
        <Button 
          onClick={handleSave}
          className="w-full bg-[#003087] hover:bg-[#002a77]"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Scorebug
        </Button>
      </CardContent>
    </Card>
  );
}
