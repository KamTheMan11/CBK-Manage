
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Label } from './ui/label';
import { collegeTeams } from '../lib/data/collegeTeams';
import { PlayerPosition } from '../lib/types';

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL',
  'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT',
  'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const PlayerCreation: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    number: '',
    position: '',
    height: '',
    weight: '',
    team: '',
    hometown: '',
    state: '',
    birthdate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.position) {
        throw new Error('Please fill in all required fields');
      }
      
      // TODO: Implement player creation logic
      console.log('Creating player:', formData);
    } catch (error) {
      console.error('Error creating player:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-2xl mx-auto bg-card rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Create New Player</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="number">Jersey Number</Label>
          <Input
            id="number"
            name="number"
            type="number"
            min="0"
            max="99"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Select
            name="position"
            value={formData.position}
            onValueChange={(value) => setFormData({...formData, position: value})}
          >
            <option value="">Select Position</option>
            {Object.values(PlayerPosition).map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            name="height"
            placeholder="6'2"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Weight (lbs)</Label>
          <Input
            id="weight"
            name="weight"
            type="number"
            min="100"
            max="400"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="team">Team</Label>
          <Select
            name="team"
            value={formData.team}
            onValueChange={(value) => setFormData({...formData, team: value})}
          >
            <option value="">Select Team</option>
            {collegeTeams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthdate">Birthdate</Label>
          <Input
            id="birthdate"
            name="birthdate"
            type="date"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hometown">Hometown</Label>
          <Input
            id="hometown"
            name="hometown"
            value={formData.hometown}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select
            name="state"
            value={formData.state}
            onValueChange={(value) => setFormData({...formData, state: value})}
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <Button type="submit" className="w-full md:w-auto">
          Create Player
        </Button>
      </div>
    </form>
  );
};

export default PlayerCreation;
