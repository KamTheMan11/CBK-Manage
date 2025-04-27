
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useTeams } from '../lib/stores/useTeams';
import { Team } from '../lib/types';
import { Calendar, Trophy } from 'lucide-react';

interface GameSchedule {
  week: number;
  homeTeam: Team;
  awayTeam: Team;
  isConference: boolean;
  completed: boolean;
  homeScore?: number;
  awayScore?: number;
}

export default function CoachMode() {
  const { teams } = useTeams();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [schedule, setSchedule] = useState<GameSchedule[]>([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [record, setRecord] = useState({ wins: 0, losses: 0, confWins: 0, confLosses: 0 });

  const generateSchedule = (team: Team) => {
    const otherTeams = teams.filter(t => t.id !== team.id);
    const confTeams = otherTeams.filter(t => t.conferenceId === team.conferenceId);
    const nonConfTeams = otherTeams.filter(t => t.conferenceId !== team.conferenceId);
    
    let newSchedule: GameSchedule[] = [];
    
    // Generate 20 conference games (10 home, 10 away)
    const confGameCount = 20;
    const gamesPerTeam = confGameCount / 2;
    
    // Shuffle conference teams
    const shuffledConfTeams = [...confTeams].sort(() => Math.random() - 0.5);
    
    // Generate home and away games
    for (let i = 0; i < gamesPerTeam; i++) {
      const opponent = shuffledConfTeams[i];
      if (opponent) {
        // Home game
        newSchedule.push({
          week: 0,
          homeTeam: team,
          awayTeam: opponent,
          isConference: true,
          completed: false
        });
        
        // Away game
        newSchedule.push({
          week: 0,
          homeTeam: opponent,
          awayTeam: team,
          isConference: true,
          completed: false
        });
      }
    }

    // Generate 10 non-conference games
    for (let i = 0; i < 10; i++) {
      const opponent = nonConfTeams[Math.floor(Math.random() * nonConfTeams.length)];
      const isHome = Math.random() > 0.5;
      
      newSchedule.push({
        week: 0,
        homeTeam: isHome ? team : opponent,
        awayTeam: isHome ? opponent : team,
        isConference: false,
        completed: false
      });
    }

    // Shuffle and assign weeks
    newSchedule = newSchedule.sort(() => Math.random() - 0.5)
      .map((game, index) => ({
        ...game,
        week: Math.floor(index / 2) + 1 // 2 games per week
      }));

    setSchedule(newSchedule);
  };

  const simulateGame = () => {
    const homeScore = Math.floor(Math.random() * 30) + 60;
    const awayScore = Math.floor(Math.random() * 30) + 60;
    return { homeScore, awayScore };
  };

  const advanceWeek = () => {
    const updatedSchedule = [...schedule];
    const weekGames = updatedSchedule.filter(game => game.week === currentWeek);
    
    weekGames.forEach(game => {
      const scores = simulateGame();
      game.homeScore = scores.homeScore;
      game.awayScore = scores.awayScore;
      game.completed = true;

      if (game.homeTeam.id === selectedTeam?.id) {
        if (scores.homeScore > scores.awayScore) {
          setRecord(prev => ({
            ...prev,
            wins: prev.wins + 1,
            confWins: game.isConference ? prev.confWins + 1 : prev.confWins
          }));
        } else {
          setRecord(prev => ({
            ...prev,
            losses: prev.losses + 1,
            confLosses: game.isConference ? prev.confLosses + 1 : prev.confLosses
          }));
        }
      } else if (game.awayTeam.id === selectedTeam?.id) {
        if (scores.awayScore > scores.homeScore) {
          setRecord(prev => ({
            ...prev,
            wins: prev.wins + 1,
            confWins: game.isConference ? prev.confWins + 1 : prev.confWins
          }));
        } else {
          setRecord(prev => ({
            ...prev,
            losses: prev.losses + 1,
            confLosses: game.isConference ? prev.confLosses + 1 : prev.confLosses
          }));
        }
      }
    });

    setSchedule(updatedSchedule);
    setCurrentWeek(prev => prev + 1);
  };

  const startNewSeason = (team: Team) => {
    setSelectedTeam(team);
    setCurrentWeek(1);
    setRecord({ wins: 0, losses: 0, confWins: 0, confLosses: 0 });
    generateSchedule(team);
  };

  return (
    <div className="space-y-4">
      {!selectedTeam ? (
        <Card>
          <CardHeader>
            <CardTitle>Select Your Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teams.map(team => (
                <Button
                  key={team.id}
                  onClick={() => startNewSeason(team)}
                  className="h-24 flex flex-col items-center justify-center"
                  style={{
                    backgroundColor: team.primaryColor,
                    color: 'white'
                  }}
                >
                  <div className="font-bold">{team.name}</div>
                  <div className="text-sm">{team.mascot}</div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{selectedTeam.name} Season</span>
                <span className="text-xl">
                  {record.wins}-{record.losses} ({record.confWins}-{record.confLosses})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Week {currentWeek}</span>
                </div>
                <Button 
                  onClick={advanceWeek}
                  disabled={currentWeek > 15}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Simulate Week {currentWeek}
                </Button>
              </div>

              <div className="space-y-2">
                {schedule
                  .filter(game => game.week === currentWeek)
                  .map((game, index) => (
                    <div 
                      key={index}
                      className="p-4 border rounded-lg flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <div className="font-bold">{game.awayTeam.name}</div>
                        <div>at</div>
                        <div className="font-bold">{game.homeTeam.name}</div>
                      </div>
                      {game.completed ? (
                        <div className="text-xl font-bold">
                          {game.awayScore} - {game.homeScore}
                        </div>
                      ) : (
                        <div className="text-gray-500">
                          {game.isConference ? "Conference Game" : "Non-Conference"}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Conference Standings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {teams
                  .filter(t => t.conferenceId === selectedTeam?.conferenceId)
                  .sort((a, b) => {
                    const aRecord = schedule
                      .filter(g => g.completed && g.isConference && (g.homeTeam.id === a.id || g.awayTeam.id === a.id))
                      .reduce((acc, game) => {
                        const isHome = game.homeTeam.id === a.id;
                        const won = isHome ? (game.homeScore! > game.awayScore!) : (game.awayScore! > game.homeScore!);
                        return {
                          wins: acc.wins + (won ? 1 : 0),
                          losses: acc.losses + (won ? 0 : 1)
                        };
                      }, { wins: 0, losses: 0 });
                    
                    const bRecord = schedule
                      .filter(g => g.completed && g.isConference && (g.homeTeam.id === b.id || g.awayTeam.id === b.id))
                      .reduce((acc, game) => {
                        const isHome = game.homeTeam.id === b.id;
                        const won = isHome ? (game.homeScore! > game.awayScore!) : (game.awayScore! > game.homeScore!);
                        return {
                          wins: acc.wins + (won ? 1 : 0),
                          losses: acc.losses + (won ? 0 : 1)
                        };
                      }, { wins: 0, losses: 0 });
                    
                    return bRecord.wins - aRecord.wins;
                  })
                  .map(team => {
                    const teamRecord = schedule
                      .filter(g => g.completed && g.isConference && (g.homeTeam.id === team.id || g.awayTeam.id === team.id))
                      .reduce((acc, game) => {
                        const isHome = game.homeTeam.id === team.id;
                        const won = isHome ? (game.homeScore! > game.awayScore!) : (game.awayScore! > game.homeScore!);
                        return {
                          wins: acc.wins + (won ? 1 : 0),
                          losses: acc.losses + (won ? 0 : 1)
                        };
                      }, { wins: 0, losses: 0 });
                    
                    return (
                      <div 
                        key={team.id} 
                        className={`flex justify-between items-center p-2 rounded ${team.id === selectedTeam?.id ? 'bg-primary/10' : ''}`}
                      >
                        <span>{team.name}</span>
                        <span>{teamRecord.wins}-{teamRecord.losses}</span>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          {currentWeek > 15 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6" />
                  Season Complete
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold">
                    Final Record: {record.wins}-{record.losses}
                  </div>
                  <div className="text-xl">
                    Conference: {record.confWins}-{record.confLosses}
                  </div>
                  <Button 
                    onClick={() => {
                      setSelectedTeam(null);
                      setSchedule([]);
                    }}
                    className="mt-4"
                  >
                    Start New Season
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
