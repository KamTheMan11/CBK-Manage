import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Volleyball, Edit2 } from 'lucide-react';
import { Player } from '../lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface PlayerCardProps {
  player: Player;
  editable?: boolean;
  teamColors: {
    primary: string;
    secondary: string;
  };
  onUpdate?: (player: Player) => void;
}

export default function PlayerCard({ player, editable = false, teamColors, onUpdate }: PlayerCardProps) {
  const [editing, setEditing] = useState(false);
  const [playerForm, setPlayerForm] = useState<Player>({ ...player });
  
  const positions: Array<string> = ['PG', 'SG', 'SF', 'PF', 'C'];
  const years: Array<'FR' | 'SO' | 'JR' | 'SR'> = ['FR', 'SO', 'JR', 'SR'];
  
  const handleStartEdit = () => {
    if (!editable) return;
    setEditing(true);
    setPlayerForm({ ...player });
  };
  
  const handleSaveEdit = () => {
    setEditing(false);
    if (onUpdate) {
      onUpdate(playerForm);
    }
  };
  
  const handleCancelEdit = () => {
    setEditing(false);
    setPlayerForm({ ...player });
  };
  
  const handleAttributeChange = (attribute: keyof Player['attributes'], value: number) => {
    setPlayerForm({
      ...playerForm,
      attributes: {
        ...playerForm.attributes,
        [attribute]: value
      }
    });
  };
  
  // Calculate overall rating based on attributes
  const calculateOverall = (player: Player): number => {
    const { shooting, passing, dribbling, defense, rebounding, speed } = player.attributes;
    return Math.round((shooting + passing + dribbling + defense + rebounding + speed) / 6);
  };
  
  const overall = calculateOverall(player);
  
  return (
    <Card className={`overflow-hidden transition-shadow hover:shadow-md ${editing ? 'ring-2 ring-blue-400' : ''}`}>
      <CardHeader className="p-0">
        <div 
          className="h-3"
          style={{ backgroundColor: teamColors.primary }}
        ></div>
      </CardHeader>
      
      <CardContent className="p-4">
        {editing ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[#003087]">Edit Player</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={handleCancelEdit}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveEdit}
                  className="text-xs text-blue-500 hover:text-blue-700 font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor={`player-first-${player.id}`} className="text-xs">First Name</Label>
                <Input 
                  id={`player-first-${player.id}`}
                  value={playerForm.firstName}
                  onChange={(e) => setPlayerForm({...playerForm, firstName: e.target.value})}
                  className="h-8 text-sm"
                />
              </div>
              
              <div>
                <Label htmlFor={`player-last-${player.id}`} className="text-xs">Last Name</Label>
                <Input 
                  id={`player-last-${player.id}`}
                  value={playerForm.lastName}
                  onChange={(e) => setPlayerForm({...playerForm, lastName: e.target.value})}
                  className="h-8 text-sm"
                />
              </div>
              
              <div>
                <Label htmlFor={`player-number-${player.id}`} className="text-xs">Number</Label>
                <Input 
                  id={`player-number-${player.id}`}
                  type="number"
                  min={0}
                  max={99}
                  value={playerForm.number}
                  onChange={(e) => setPlayerForm({...playerForm, number: parseInt(e.target.value) || 0})}
                  className="h-8 text-sm"
                />
              </div>
              
              <div>
                <Label htmlFor={`player-position-${player.id}`} className="text-xs">Position</Label>
                <Select 
                  value={playerForm.position}
                  onValueChange={(val) => setPlayerForm({...playerForm, position: val})}
                >
                  <SelectTrigger id={`player-position-${player.id}`} className="h-8 text-sm">
                    <SelectValue placeholder="Position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map(pos => (
                      <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor={`player-height-${player.id}`} className="text-xs">Height</Label>
                <Input 
                  id={`player-height-${player.id}`}
                  value={playerForm.height}
                  onChange={(e) => setPlayerForm({...playerForm, height: e.target.value})}
                  placeholder="6'2"
                  className="h-8 text-sm"
                />
              </div>
              
              <div>
                <Label htmlFor={`player-year-${player.id}`} className="text-xs">Year</Label>
                <Select 
                  value={playerForm.year}
                  onValueChange={(val) => setPlayerForm({...playerForm, year: val as 'FR' | 'SO' | 'JR' | 'SR'})}
                >
                  <SelectTrigger id={`player-year-${player.id}`} className="h-8 text-sm">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="text-xs font-medium text-gray-500 mb-2">Attributes</div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs">
                    <Label htmlFor={`player-shooting-${player.id}`}>Shooting</Label>
                    <span>{playerForm.attributes.shooting}</span>
                  </div>
                  <Slider
                    id={`player-shooting-${player.id}`}
                    min={40}
                    max={99}
                    step={1}
                    value={[playerForm.attributes.shooting]}
                    onValueChange={(val) => handleAttributeChange('shooting', val[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs">
                    <Label htmlFor={`player-passing-${player.id}`}>Passing</Label>
                    <span>{playerForm.attributes.passing}</span>
                  </div>
                  <Slider
                    id={`player-passing-${player.id}`}
                    min={40}
                    max={99}
                    step={1}
                    value={[playerForm.attributes.passing]}
                    onValueChange={(val) => handleAttributeChange('passing', val[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs">
                    <Label htmlFor={`player-dribbling-${player.id}`}>Dribbling</Label>
                    <span>{playerForm.attributes.dribbling}</span>
                  </div>
                  <Slider
                    id={`player-dribbling-${player.id}`}
                    min={40}
                    max={99}
                    step={1}
                    value={[playerForm.attributes.dribbling]}
                    onValueChange={(val) => handleAttributeChange('dribbling', val[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs">
                    <Label htmlFor={`player-defense-${player.id}`}>Defense</Label>
                    <span>{playerForm.attributes.defense}</span>
                  </div>
                  <Slider
                    id={`player-defense-${player.id}`}
                    min={40}
                    max={99}
                    step={1}
                    value={[playerForm.attributes.defense]}
                    onValueChange={(val) => handleAttributeChange('defense', val[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs">
                    <Label htmlFor={`player-rebounding-${player.id}`}>Rebounding</Label>
                    <span>{playerForm.attributes.rebounding}</span>
                  </div>
                  <Slider
                    id={`player-rebounding-${player.id}`}
                    min={40}
                    max={99}
                    step={1}
                    value={[playerForm.attributes.rebounding]}
                    onValueChange={(val) => handleAttributeChange('rebounding', val[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs">
                    <Label htmlFor={`player-speed-${player.id}`}>Speed</Label>
                    <span>{playerForm.attributes.speed}</span>
                  </div>
                  <Slider
                    id={`player-speed-${player.id}`}
                    min={40}
                    max={99}
                    step={1}
                    value={[playerForm.attributes.speed]}
                    onValueChange={(val) => handleAttributeChange('speed', val[0])}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 text-sm font-bold text-black">
                    {player.number}
                  </div>
                  <div>
                    {player.firstName} {player.lastName}
                  </div>
                </CardTitle>
                <div className="text-sm text-gray-500 mt-1">
                  {player.position} • {player.height} • {player.year}
                </div>
              </div>
              
              {editable && (
                <button 
                  className="text-gray-400 hover:text-[#003087]"
                  onClick={handleStartEdit}
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="mt-4 flex items-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: teamColors.primary }}
              >
                {overall}
              </div>
              
              <div className="ml-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div className="flex items-center">
                  <Volleyball className="h-3 w-3 mr-1 text-[#FFD700]" />
                  <span className="text-gray-600">SHT:</span>
                  <span className="ml-1 font-semibold">{player.attributes.shooting}</span>
                </div>
                
                <div className="flex items-center">
                  <Volleyball className="h-3 w-3 mr-1 text-[#FFD700]" />
                  <span className="text-gray-600">PAS:</span>
                  <span className="ml-1 font-semibold">{player.attributes.passing}</span>
                </div>
                
                <div className="flex items-center">
                  <Volleyball className="h-3 w-3 mr-1 text-[#FFD700]" />
                  <span className="text-gray-600">DRB:</span>
                  <span className="ml-1 font-semibold">{player.attributes.dribbling}</span>
                </div>
                
                <div className="flex items-center">
                  <Volleyball className="h-3 w-3 mr-1 text-[#FFD700]" />
                  <span className="text-gray-600">DEF:</span>
                  <span className="ml-1 font-semibold">{player.attributes.defense}</span>
                </div>
                
                <div className="flex items-center">
                  <Volleyball className="h-3 w-3 mr-1 text-[#FFD700]" />
                  <span className="text-gray-600">REB:</span>
                  <span className="ml-1 font-semibold">{player.attributes.rebounding}</span>
                </div>
                
                <div className="flex items-center">
                  <Volleyball className="h-3 w-3 mr-1 text-[#FFD700]" />
                  <span className="text-gray-600">SPD:</span>
                  <span className="ml-1 font-semibold">{player.attributes.speed}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
