import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useTeams } from '../lib/stores/useTeams';
import { Team, Player, Conference } from '../lib/types';
import PlayerCard from './PlayerCard';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Pencil, Save, X, PlusCircle, Trash2 } from 'lucide-react';
import { conferences } from '../lib/data/conferences';

export default function TeamManagement() {
  const { teams, updateTeam, createTeam, deleteTeam } = useTeams();
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [newTeam, setNewTeam] = useState(false);
  
  // Form state for team editing
  const [teamForm, setTeamForm] = useState<Partial<Team>>({
    name: '',
    abbreviation: '',
    mascot: '',
    primaryColor: '#003087',
    secondaryColor: '#B2BEB5',
    conferenceId: 1,
    players: []
  });
  
  // Get the currently selected team
  const selectedTeam = selectedTeamId ? teams.find(t => t.id === selectedTeamId) : null;
  
  // Handle team selection
  const handleSelectTeam = (teamId: number) => {
    if (editMode) {
      if (!confirm('You have unsaved changes. Discard them?')) {
        return;
      }
    }
    
    setSelectedTeamId(teamId);
    setEditMode(false);
    setNewTeam(false);
    
    // Reset form with selected team data
    const team = teams.find(t => t.id === teamId);
    if (team) {
      setTeamForm({ ...team });
    }
  };
  
  // Start editing the current team
  const handleEditTeam = () => {
    if (!selectedTeam && !newTeam) return;
    
    if (!newTeam) {
      setTeamForm({ ...selectedTeam! });
    }
    setEditMode(true);
  };
  
  // Create a new team
  const handleNewTeam = () => {
    if (editMode) {
      if (!confirm('You have unsaved changes. Discard them?')) {
        return;
      }
    }
    
    setSelectedTeamId(null);
    setNewTeam(true);
    setEditMode(true);
    setTeamForm({
      name: 'New Team',
      abbreviation: 'NEW',
      mascot: 'Team Mascot',
      primaryColor: '#003087',
      secondaryColor: '#B2BEB5',
      conferenceId: 1,
      players: Array(12).fill(null).map((_, i) => ({
        id: i + 1,
        firstName: `Player`,
        lastName: `${i + 1}`,
        number: i + 1,
        position: i < 5 ? 'G' : i < 8 ? 'F' : 'C',
        height: "6'2\"",
        weight: 185,
        year: 'FR',
        attributes: {
          shooting: 70,
          passing: 70,
          dribbling: 70,
          defense: 70,
          rebounding: 70,
          speed: 70,
        }
      }))
    });
  };
  
  // Cancel editing
  const handleCancelEdit = () => {
    setEditMode(false);
    if (newTeam) {
      setNewTeam(false);
      setSelectedTeamId(null);
    } else if (selectedTeam) {
      setTeamForm({ ...selectedTeam });
    }
  };
  
  // Save team changes
  const handleSaveTeam = () => {
    if (!teamForm.name || !teamForm.abbreviation) {
      alert('Team name and abbreviation are required!');
      return;
    }
    
    if (newTeam) {
      // Create a new team
      const newTeamData = {
        ...teamForm,
        name: teamForm.name || 'New Team',
        abbreviation: teamForm.abbreviation || 'NEW',
      } as Team;
      
      const createdTeam = createTeam(newTeamData);
      setSelectedTeamId(createdTeam.id);
      setNewTeam(false);
    } else if (selectedTeam) {
      // Update existing team
      updateTeam(selectedTeamId!, teamForm as Team);
    }
    
    setEditMode(false);
  };
  
  // Delete the current team
  const handleDeleteTeam = () => {
    if (!selectedTeam) return;
    
    if (confirm(`Are you sure you want to delete ${selectedTeam.name}?`)) {
      deleteTeam(selectedTeam.id);
      setSelectedTeamId(null);
      setEditMode(false);
    }
  };
  
  // Update a specific player
  const handleUpdatePlayer = (playerIndex: number, updatedPlayer: Player) => {
    if (!editMode) return;
    
    const updatedPlayers = [...(teamForm.players || [])];
    updatedPlayers[playerIndex] = updatedPlayer;
    
    setTeamForm({
      ...teamForm,
      players: updatedPlayers
    });
  };
  
  // Get the conference name for a team
  const getConferenceName = (conferenceId: number): string => {
    const conf = conferences.find(c => c.id === conferenceId);
    return conf ? conf.name : 'Independent';
  };
  
  return (
    <div className="bg-gray-50 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#003087]">Team Management</h2>
        
        <div className="flex space-x-2">
          <Button
            onClick={handleNewTeam}
            className="bg-[#003087] hover:bg-[#002a77]"
            disabled={editMode}
          >
            <PlusCircle className="mr-1 h-4 w-4" />
            New Team
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Team List */}
        <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3 text-[#003087]">Teams</h3>
          <div className="max-h-[70vh] overflow-y-auto space-y-1">
            {teams.length === 0 ? (
              <div className="text-gray-500 italic py-2">No teams yet. Create your first team!</div>
            ) : (
              teams.map(team => (
                <div 
                  key={team.id}
                  className={`p-2 rounded cursor-pointer border transition-colors ${
                    selectedTeamId === team.id 
                      ? 'border-[#003087] bg-blue-50' 
                      : 'border-transparent hover:bg-gray-100'
                  }`}
                  onClick={() => handleSelectTeam(team.id)}
                >
                  <div className="font-medium">{team.name}</div>
                  <div className="text-xs text-gray-500">{team.mascot} • {getConferenceName(team.conferenceId)}</div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Team Details */}
        <div className="md:col-span-3">
          {!selectedTeamId && !newTeam ? (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <p className="mb-2">Select a team to view or edit, or create a new team.</p>
                <Button 
                  onClick={handleNewTeam}
                  className="bg-[#003087] hover:bg-[#002a77]"
                >
                  <PlusCircle className="mr-1 h-4 w-4" />
                  Create Team
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {/* Team Edit/View Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#003087]">
                  {newTeam ? 'Create New Team' : editMode ? 'Edit Team' : selectedTeam?.name}
                </h3>
                
                <div className="flex space-x-2">
                  {editMode ? (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={handleCancelEdit}
                      >
                        <X className="mr-1 h-4 w-4" />
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSaveTeam}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="mr-1 h-4 w-4" />
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={handleEditTeam}
                        className="border-[#003087] text-[#003087]"
                      >
                        <Pencil className="mr-1 h-4 w-4" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={handleDeleteTeam}
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              {/* Team Form */}
              {editMode ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="team-name">Team Name</Label>
                    <Input 
                      id="team-name"
                      value={teamForm.name || ''}
                      onChange={(e) => setTeamForm({...teamForm, name: e.target.value})}
                      placeholder="Team Name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="team-abbr">Abbreviation</Label>
                    <Input 
                      id="team-abbr"
                      value={teamForm.abbreviation || ''}
                      onChange={(e) => setTeamForm({...teamForm, abbreviation: e.target.value})}
                      placeholder="ABC"
                      maxLength={4}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="team-mascot">Mascot</Label>
                    <Input 
                      id="team-mascot"
                      value={teamForm.mascot || ''}
                      onChange={(e) => setTeamForm({...teamForm, mascot: e.target.value})}
                      placeholder="Team Mascot"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="team-conference">Conference</Label>
                    <Select 
                      value={teamForm.conferenceId?.toString() || '1'}
                      onValueChange={(val) => setTeamForm({...teamForm, conferenceId: parseInt(val)})}
                    >
                      <SelectTrigger id="team-conference">
                        <SelectValue placeholder="Select a conference" />
                      </SelectTrigger>
                      <SelectContent>
                        {conferences.map(conference => (
                          <SelectItem key={conference.id} value={conference.id.toString()}>
                            {conference.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="primary-color"
                        type="color"
                        value={teamForm.primaryColor || '#003087'}
                        onChange={(e) => setTeamForm({...teamForm, primaryColor: e.target.value})}
                        className="w-16 h-10 p-1"
                      />
                      <Input 
                        value={teamForm.primaryColor || '#003087'}
                        onChange={(e) => setTeamForm({...teamForm, primaryColor: e.target.value})}
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="secondary-color"
                        type="color"
                        value={teamForm.secondaryColor || '#B2BEB5'}
                        onChange={(e) => setTeamForm({...teamForm, secondaryColor: e.target.value})}
                        className="w-16 h-10 p-1"
                      />
                      <Input 
                        value={teamForm.secondaryColor || '#B2BEB5'}
                        onChange={(e) => setTeamForm({...teamForm, secondaryColor: e.target.value})}
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 mb-6 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-500">Team Details</div>
                    <div className="text-lg font-bold">{selectedTeam?.name} {selectedTeam?.mascot}</div>
                    <div className="text-sm">{getConferenceName(selectedTeam?.conferenceId || 1)}</div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Primary</div>
                      <div 
                        className="w-10 h-10 rounded-full border border-gray-300"
                        style={{ backgroundColor: selectedTeam?.primaryColor || '#003087' }}
                      ></div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Secondary</div>
                      <div 
                        className="w-10 h-10 rounded-full border border-gray-300"
                        style={{ backgroundColor: selectedTeam?.secondaryColor || '#B2BEB5' }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Team Roster */}
              <Tabs defaultValue="roster" className="mt-4">
                <TabsList>
                  <TabsTrigger value="roster">Roster</TabsTrigger>
                  <TabsTrigger value="stats">Team Stats</TabsTrigger>
                </TabsList>
                
                <TabsContent value="roster" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(editMode ? teamForm.players : selectedTeam?.players)?.map((player, index) => (
                      <PlayerCard 
                        key={index}
                        player={player}
                        editable={editMode}
                        teamColors={{
                          primary: teamForm.primaryColor || '#003087',
                          secondary: teamForm.secondaryColor || '#B2BEB5'
                        }}
                        onUpdate={(updatedPlayer) => handleUpdatePlayer(index, updatedPlayer)}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="stats" className="mt-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Season Statistics</h3>
                    <div className="text-center text-gray-500 py-4">
                      Team statistics will appear here as games are played.
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
