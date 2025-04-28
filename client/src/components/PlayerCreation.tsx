
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';

const PlayerCreation: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [position, setPosition] = useState('');
  const [rating, setRating] = useState('');

  const handleCreatePlayer = () => {
    // TODO: Implement player creation logic
    console.log('Creating player:', { playerName, position, rating });
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">Create Player</h2>
      <Input
        placeholder="Player Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <Select
        value={position}
        onValueChange={setPosition}
      >
        <option value="">Select Position</option>
        <option value="PG">Point Guard</option>
        <option value="SG">Shooting Guard</option>
        <option value="SF">Small Forward</option>
        <option value="PF">Power Forward</option>
        <option value="C">Center</option>
      </Select>
      <Input
        type="number"
        placeholder="Rating (40-99)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        min="40"
        max="99"
      />
      <Button onClick={handleCreatePlayer}>Create Player</Button>
    </div>
  );
};


export default PlayerCreation;
