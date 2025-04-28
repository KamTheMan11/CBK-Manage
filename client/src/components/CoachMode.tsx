import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useTeams } from '../lib/stores/useTeams';
import { Team } from '../lib/types';
import { Calendar, Trophy, User } from 'lucide-react';
import { conferences } from '../lib/data/conferences';

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
  const [selectedConference, setSelectedConference] = useState(0);
  const [coach, setCoach] = useState(''); // Added coach state


  const generateSchedule = (team: Team) => {
    const otherTeams = teams.filter(t => t.id !== team.id);
    const confTeams = otherTeams.filter(t => t.conferenceId === team.conferenceId);
    const nonConfTeams = otherTeams.filter(t => t.conferenceId !== team.conferenceId);

    let newSchedule: GameSchedule[] = [];

    // Generate 20 conference games (10 home, 10 away)
    let confOpponents = [...confTeams];
    let homeGames = 10;
    let awayGames = 10;

    while ((homeGames > 0 || awayGames > 0) && confOpponents.length > 0) {
      const randomIndex = Math.floor(Math.random() * confOpponents.length);
      const opponent = confOpponents[randomIndex];

      // Check how many games we've already scheduled with this opponent
      const existingGames = newSchedule.filter(g =>
        g.isConference && (
          (g.homeTeam.id === team.id && g.awayTeam.id === opponent.id) ||
          (g.homeTeam.id === opponent.id && g.awayTeam.id === team.id)
        )
      ).length;

      if (existingGames < 2) {
        const canBeHome = homeGames > 0 && existingGames === 0;
        const canBeAway = awayGames > 0 && existingGames === 0;
        const isHome = canBeHome && (!canBeAway || Math.random() < 0.5);

        if (isHome && homeGames > 0) {
          newSchedule.push({
            week: 0,
            homeTeam: team,
            awayTeam: opponent,
            isConference: true,
            completed: false
          });
          homeGames--;
        } else if (!isHome && awayGames > 0) {
          newSchedule.push({
            week: 0,
            homeTeam: opponent,
            awayTeam: team,
            isConference: true,
            completed: false
          });
          awayGames--;
        }
      }

      // Remove opponent if we've used them twice
      if (existingGames >= 1) {
        confOpponents.splice(randomIndex, 1);
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
            <select
              className="w-full mb-4 p-2 rounded border dark:bg-gray-800 dark:border-gray-700"
              value={selectedConference}
              onChange={(e) => setSelectedConference(parseInt(e.target.value, 10))}
            >
              <option value="0">All Conferences</option>
              {conferences.map(conf => (
                <option key={conf.id} value={conf.id}>
                  {conf.name}
                </option>
              ))}
            </select>
            <div id="teamGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
              {teams
                .sort((a, b) => {
                  const confCompare = a.conferenceId - b.conferenceId;
                  if (confCompare === 0) {
                    return a.name.localeCompare(b.name);
                  }
                  return confCompare;
                })
                .filter(team => selectedConference === 0 || team.conferenceId === selectedConference)
                .map(team => (
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
                      <div className="flex flex-col items-end">
                        {game.completed ? (
                          <div className="text-xl font-bold">
                            {game.awayScore} - {game.homeScore}
                          </div>
                        ) : (
                          <div className={`px-3 py-1 rounded-full text-sm ${game.isConference ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'}`}>
                            {game.isConference ? "Conference" : "Non-Conference"}
                          </div>
                        )}
                      </div>
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