
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy, MapPin, Calendar, User, Home, Users, Crown } from "lucide-react";
import { Team } from "../lib/types";
import { teamDetails, getTeamDetails } from "../lib/data/teamDetails";
import { collegeTeams } from "../lib/data/collegeTeams";
import { conferences } from "../lib/data/conferences";

interface TeamDetailsProps {
  team: Team;
}

export default function TeamDetails({ team }: TeamDetailsProps) {
  const details = getTeamDetails(team.id);
  const conference = conferences.find(c => c.id === team.conferenceId);
  const rival = collegeTeams.find(t => t.id === details?.rival);

  if (!details) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full" style={{ backgroundColor: team.primaryColor }} />
          {team.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {details.city}, {details.state}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Founded {details.founded}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {details.bestPlayer}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              {details.homeVenue}
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Capacity: {details.capacity.toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Championships: {details.championships}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Badge variant="secondary">{conference?.name}</Badge>
          {rival && (
            <Badge variant="destructive" className="ml-2">
              Rival: {rival.name}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
