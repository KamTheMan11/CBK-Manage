export interface CollegeTeam {
  id: number;
  name: string;
  shortName: string; // For ticker display (city/school name)
  nickname: string;
  primaryColor: string;
  secondaryColor: string;
  conferenceId: number;
  logoUrl?: string;
}

export interface Conference {
  id: number;
  name: string;
  shortName: string;
  region: string;
}

export const conferences: Conference[] = [
  { id: 1, name: "Atlantic Coast Conference", shortName: "ACC", region: "East" },
  { id: 2, name: "Southeastern Conference", shortName: "SEC", region: "Southeast" },
  { id: 3, name: "Big Ten Conference", shortName: "Big Ten", region: "Midwest" },
  { id: 4, name: "Big 12 Conference", shortName: "Big 12", region: "Central" },
  { id: 5, name: "Pac-12 Conference", shortName: "Pac-12", region: "West" },
  { id: 6, name: "Big East Conference", shortName: "Big East", region: "Northeast" },
  { id: 7, name: "American Athletic Conference", shortName: "AAC", region: "Various" },
  { id: 8, name: "Mountain West Conference", shortName: "MWC", region: "West" },
  { id: 9, name: "Atlantic 10 Conference", shortName: "A-10", region: "East" },
  { id: 10, name: "West Coast Conference", shortName: "WCC", region: "West" },
  { id: 11, name: "Mid-American Conference", shortName: "MAC", region: "Midwest" },
  { id: 12, name: "Conference USA", shortName: "C-USA", region: "South" },
];

export const collegeTeams: CollegeTeam[] = [
  // ACC Teams
  { id: 1, name: "Duke Blue Devils", shortName: "Duke", nickname: "Blue Devils", primaryColor: "#001A57", secondaryColor: "#0736A4", conferenceId: 1 },
  { id: 2, name: "North Carolina Tar Heels", shortName: "North Carolina", nickname: "Tar Heels", primaryColor: "#7BAFD4", secondaryColor: "#FFFFFF", conferenceId: 1 },
  { id: 3, name: "Virginia Cavaliers", shortName: "Virginia", nickname: "Cavaliers", primaryColor: "#232D4B", secondaryColor: "#F84C1E", conferenceId: 1 },
  { id: 4, name: "Louisville Cardinals", shortName: "Louisville", nickname: "Cardinals", primaryColor: "#AD0000", secondaryColor: "#000000", conferenceId: 1 },
  { id: 5, name: "Florida State Seminoles", shortName: "Florida State", nickname: "Seminoles", primaryColor: "#782F40", secondaryColor: "#CEB888", conferenceId: 1 },
  { id: 6, name: "Syracuse Orange", shortName: "Syracuse", nickname: "Orange", primaryColor: "#D44500", secondaryColor: "#000E54", conferenceId: 1 },
  { id: 7, name: "Miami Hurricanes", shortName: "Miami", nickname: "Hurricanes", primaryColor: "#F47321", secondaryColor: "#005030", conferenceId: 1 },
  { id: 8, name: "NC State Wolfpack", shortName: "NC State", nickname: "Wolfpack", primaryColor: "#CC0000", secondaryColor: "#000000", conferenceId: 1 },
  { id: 9, name: "Notre Dame Fighting Irish", shortName: "Notre Dame", nickname: "Fighting Irish", primaryColor: "#0C2340", secondaryColor: "#C99700", conferenceId: 1 },
  { id: 10, name: "Virginia Tech Hokies", shortName: "Virginia Tech", nickname: "Hokies", primaryColor: "#660000", secondaryColor: "#CC5500", conferenceId: 1 },
  { id: 11, name: "Clemson Tigers", shortName: "Clemson", nickname: "Tigers", primaryColor: "#F56600", secondaryColor: "#522D80", conferenceId: 1 },
  { id: 12, name: "Wake Forest Demon Deacons", shortName: "Wake Forest", nickname: "Demon Deacons", primaryColor: "#9E7E38", secondaryColor: "#000000", conferenceId: 1 },
  { id: 13, name: "Georgia Tech Yellow Jackets", shortName: "Georgia Tech", nickname: "Yellow Jackets", primaryColor: "#B3A369", secondaryColor: "#003057", conferenceId: 1 },
  { id: 14, name: "Boston College Eagles", shortName: "Boston College", nickname: "Eagles", primaryColor: "#98002E", secondaryColor: "#BC9B6A", conferenceId: 1 },
  { id: 15, name: "Pittsburgh Panthers", shortName: "Pittsburgh", nickname: "Panthers", primaryColor: "#003594", secondaryColor: "#FFB81C", conferenceId: 1 },

  // SEC Teams
  { id: 16, name: "Kentucky Wildcats", shortName: "Kentucky", nickname: "Wildcats", primaryColor: "#0033A0", secondaryColor: "#FFFFFF", conferenceId: 2 },
  { id: 17, name: "Tennessee Volunteers", shortName: "Tennessee", nickname: "Volunteers", primaryColor: "#FF8200", secondaryColor: "#FFFFFF", conferenceId: 2 },
  { id: 18, name: "Florida Gators", shortName: "Florida", nickname: "Gators", primaryColor: "#0021A5", secondaryColor: "#FA4616", conferenceId: 2 },
  { id: 19, name: "Auburn Tigers", shortName: "Auburn", nickname: "Tigers", primaryColor: "#0C2340", secondaryColor: "#E87722", conferenceId: 2 },
  { id: 20, name: "Alabama Crimson Tide", shortName: "Alabama", nickname: "Crimson Tide", primaryColor: "#9E1B32", secondaryColor: "#FFFFFF", conferenceId: 2 },
  { id: 21, name: "Arkansas Razorbacks", shortName: "Arkansas", nickname: "Razorbacks", primaryColor: "#9D2235", secondaryColor: "#FFFFFF", conferenceId: 2 },
  { id: 22, name: "LSU Tigers", shortName: "LSU", nickname: "Tigers", primaryColor: "#461D7C", secondaryColor: "#FDD023", conferenceId: 2 },
  { id: 23, name: "Missouri Tigers", shortName: "Missouri", nickname: "Tigers", primaryColor: "#F1B82D", secondaryColor: "#000000", conferenceId: 2 },
  { id: 24, name: "South Carolina Gamecocks", shortName: "South Carolina", nickname: "Gamecocks", primaryColor: "#73000A", secondaryColor: "#000000", conferenceId: 2 },
  { id: 25, name: "Mississippi State Bulldogs", shortName: "Mississippi State", nickname: "Bulldogs", primaryColor: "#660000", secondaryColor: "#FFFFFF", conferenceId: 2 },
  { id: 26, name: "Ole Miss Rebels", shortName: "Ole Miss", nickname: "Rebels", primaryColor: "#CE1126", secondaryColor: "#006BA6", conferenceId: 2 },
  { id: 27, name: "Georgia Bulldogs", shortName: "Georgia", nickname: "Bulldogs", primaryColor: "#BA0C2F", secondaryColor: "#000000", conferenceId: 2 },
  { id: 28, name: "Vanderbilt Commodores", shortName: "Vanderbilt", nickname: "Commodores", primaryColor: "#000000", secondaryColor: "#866D4B", conferenceId: 2 },
  { id: 29, name: "Texas A&M Aggies", shortName: "Texas A&M", nickname: "Aggies", primaryColor: "#500000", secondaryColor: "#FFFFFF", conferenceId: 2 },

  // Big Ten Teams
  { id: 30, name: "Michigan Wolverines", shortName: "Michigan", nickname: "Wolverines", primaryColor: "#00274C", secondaryColor: "#FFCB05", conferenceId: 3 },
  { id: 31, name: "Michigan State Spartans", shortName: "Michigan State", nickname: "Spartans", primaryColor: "#18453B", secondaryColor: "#FFFFFF", conferenceId: 3 },
  { id: 32, name: "Ohio State Buckeyes", shortName: "Ohio State", nickname: "Buckeyes", primaryColor: "#BB0000", secondaryColor: "#666666", conferenceId: 3 },
  { id: 33, name: "Purdue Boilermakers", shortName: "Purdue", nickname: "Boilermakers", primaryColor: "#CFB991", secondaryColor: "#000000", conferenceId: 3 },
  { id: 34, name: "Wisconsin Badgers", shortName: "Wisconsin", nickname: "Badgers", primaryColor: "#C5050C", secondaryColor: "#FFFFFF", conferenceId: 3 },
  { id: 35, name: "Iowa Hawkeyes", shortName: "Iowa", nickname: "Hawkeyes", primaryColor: "#FFCD00", secondaryColor: "#000000", conferenceId: 3 },
  { id: 36, name: "Illinois Fighting Illini", shortName: "Illinois", nickname: "Fighting Illini", primaryColor: "#E84A27", secondaryColor: "#13294B", conferenceId: 3 },
  { id: 37, name: "Indiana Hoosiers", shortName: "Indiana", nickname: "Hoosiers", primaryColor: "#990000", secondaryColor: "#FFFFFF", conferenceId: 3 },
  { id: 38, name: "Maryland Terrapins", shortName: "Maryland", nickname: "Terrapins", primaryColor: "#E03a3e", secondaryColor: "#FFD520", conferenceId: 3 },
  { id: 39, name: "Minnesota Golden Gophers", shortName: "Minnesota", nickname: "Golden Gophers", primaryColor: "#7A0019", secondaryColor: "#FFCC33", conferenceId: 3 },
  { id: 40, name: "Nebraska Cornhuskers", shortName: "Nebraska", nickname: "Cornhuskers", primaryColor: "#E41C38", secondaryColor: "#FFFFFF", conferenceId: 3 },
  { id: 41, name: "Northwestern Wildcats", shortName: "Northwestern", nickname: "Wildcats", primaryColor: "#4E2A84", secondaryColor: "#FFFFFF", conferenceId: 3 },
  { id: 42, name: "Penn State Nittany Lions", shortName: "Penn State", nickname: "Nittany Lions", primaryColor: "#041E42", secondaryColor: "#FFFFFF", conferenceId: 3 },
  { id: 43, name: "Rutgers Scarlet Knights", shortName: "Rutgers", nickname: "Scarlet Knights", primaryColor: "#CC0033", secondaryColor: "#5F6A72", conferenceId: 3 },

  // Big 12 Teams
  { id: 44, name: "Kansas Jayhawks", shortName: "Kansas", nickname: "Jayhawks", primaryColor: "#0051BA", secondaryColor: "#E8000D", conferenceId: 4 },
  { id: 45, name: "Baylor Bears", shortName: "Baylor", nickname: "Bears", primaryColor: "#003015", secondaryColor: "#FFB81C", conferenceId: 4 },
  { id: 46, name: "Texas Longhorns", shortName: "Texas", nickname: "Longhorns", primaryColor: "#BF5700", secondaryColor: "#FFFFFF", conferenceId: 4 },
  { id: 47, name: "West Virginia Mountaineers", shortName: "West Virginia", nickname: "Mountaineers", primaryColor: "#002855", secondaryColor: "#EAAA00", conferenceId: 4 },
  { id: 48, name: "Texas Tech Red Raiders", shortName: "Texas Tech", nickname: "Red Raiders", primaryColor: "#CC0000", secondaryColor: "#000000", conferenceId: 4 },
  { id: 49, name: "Oklahoma Sooners", shortName: "Oklahoma", nickname: "Sooners", primaryColor: "#841617", secondaryColor: "#FFFFFF", conferenceId: 4 },
  { id: 50, name: "Oklahoma State Cowboys", shortName: "Oklahoma State", nickname: "Cowboys", primaryColor: "#FF7300", secondaryColor: "#000000", conferenceId: 4 },
  { id: 51, name: "Iowa State Cyclones", shortName: "Iowa State", nickname: "Cyclones", primaryColor: "#C8102E", secondaryColor: "#F1BE48", conferenceId: 4 },
  { id: 52, name: "Kansas State Wildcats", shortName: "Kansas State", nickname: "Wildcats", primaryColor: "#512888", secondaryColor: "#FFFFFF", conferenceId: 4 },
  { id: 53, name: "TCU Horned Frogs", shortName: "TCU", nickname: "Horned Frogs", primaryColor: "#4D1979", secondaryColor: "#A3A9AC", conferenceId: 4 },

  // Pac-12 Teams
  { id: 54, name: "UCLA Bruins", shortName: "UCLA", nickname: "Bruins", primaryColor: "#2D68C4", secondaryColor: "#F2A900", conferenceId: 5 },
  { id: 55, name: "Arizona Wildcats", shortName: "Arizona", nickname: "Wildcats", primaryColor: "#CC0033", secondaryColor: "#003366", conferenceId: 5 },
  { id: 56, name: "Oregon Ducks", shortName: "Oregon", nickname: "Ducks", primaryColor: "#154733", secondaryColor: "#FEE123", conferenceId: 5 },
  { id: 57, name: "Colorado Buffaloes", shortName: "Colorado", nickname: "Buffaloes", primaryColor: "#CFB87C", secondaryColor: "#000000", conferenceId: 5 },
  { id: 58, name: "USC Trojans", shortName: "USC", nickname: "Trojans", primaryColor: "#990000", secondaryColor: "#FFC72C", conferenceId: 5 },
  { id: 59, name: "Stanford Cardinal", shortName: "Stanford", nickname: "Cardinal", primaryColor: "#8C1515", secondaryColor: "#FFFFFF", conferenceId: 5 },
  { id: 60, name: "Oregon State Beavers", shortName: "Oregon State", nickname: "Beavers", primaryColor: "#DC4405", secondaryColor: "#000000", conferenceId: 5 },
  { id: 61, name: "Arizona State Sun Devils", shortName: "Arizona State", nickname: "Sun Devils", primaryColor: "#8C1D40", secondaryColor: "#FFC627", conferenceId: 5 },
  { id: 62, name: "Utah Utes", shortName: "Utah", nickname: "Utes", primaryColor: "#CC0000", secondaryColor: "#FFFFFF", conferenceId: 5 },
  { id: 63, name: "Washington Huskies", shortName: "Washington", nickname: "Huskies", primaryColor: "#4B2E83", secondaryColor: "#B7A57A", conferenceId: 5 },
  { id: 64, name: "California Golden Bears", shortName: "California", nickname: "Golden Bears", primaryColor: "#003262", secondaryColor: "#FDB515", conferenceId: 5 },
  { id: 65, name: "Washington State Cougars", shortName: "Washington State", nickname: "Cougars", primaryColor: "#981E32", secondaryColor: "#5E6A71", conferenceId: 5 },

  // Big East Teams
  { id: 66, name: "Villanova Wildcats", shortName: "Villanova", nickname: "Wildcats", primaryColor: "#00205B", secondaryColor: "#13B5EA", conferenceId: 6 },
  { id: 67, name: "Creighton Bluejays", shortName: "Creighton", nickname: "Bluejays", primaryColor: "#002E6D", secondaryColor: "#0080FF", conferenceId: 6 },
  { id: 68, name: "Xavier Musketeers", shortName: "Xavier", nickname: "Musketeers", primaryColor: "#0C2340", secondaryColor: "#9EA2A2", conferenceId: 6 },
  { id: 69, name: "Seton Hall Pirates", shortName: "Seton Hall", nickname: "Pirates", primaryColor: "#004488", secondaryColor: "#A2AAAD", conferenceId: 6 },
  { id: 70, name: "Butler Bulldogs", shortName: "Butler", nickname: "Bulldogs", primaryColor: "#13294B", secondaryColor: "#A7A9AC", conferenceId: 6 },
  { id: 71, name: "Providence Friars", shortName: "Providence", nickname: "Friars", primaryColor: "#000000", secondaryColor: "#C4CED4", conferenceId: 6 },
  { id: 72, name: "Marquette Golden Eagles", shortName: "Marquette", nickname: "Golden Eagles", primaryColor: "#003366", secondaryColor: "#FFCC00", conferenceId: 6 },
  { id: 73, name: "St. John's Red Storm", shortName: "St. John's", nickname: "Red Storm", primaryColor: "#BA0C2F", secondaryColor: "#FFFFFF", conferenceId: 6 },
  { id: 74, name: "Georgetown Hoyas", shortName: "Georgetown", nickname: "Hoyas", primaryColor: "#041E42", secondaryColor: "#A7A8AA", conferenceId: 6 },
  { id: 75, name: "DePaul Blue Demons", shortName: "DePaul", nickname: "Blue Demons", primaryColor: "#003DA5", secondaryColor: "#E31837", conferenceId: 6 },
];

// Helper function to get regional TV network based on teams and conference regions
export function getRegionalNetwork(homeTeamId: number, awayTeamId: number): string {
  const homeTeam = collegeTeams.find(team => team.id === homeTeamId);
  const awayTeam = collegeTeams.find(team => team.id === awayTeamId);
  
  if (!homeTeam || !awayTeam) return "Local TV";
  
  const homeConference = conferences.find(conf => conf.id === homeTeam.conferenceId);
  const awayConference = conferences.find(conf => conf.id === awayTeam.conferenceId);
  
  if (!homeConference || !awayConference) return "Local TV";
  
  // Logic for determining the appropriate Fox Sports regional network
  const regions = [homeConference.region, awayConference.region];
  
  if (regions.includes("Southeast") || regions.includes("South")) {
    if (homeTeam.shortName.includes("Florida") || awayTeam.shortName.includes("Florida") ||
        homeTeam.shortName.includes("Miami") || awayTeam.shortName.includes("Miami")) {
      return "FOX Sports Florida";
    } else if (
      (homeTeam.shortName.includes("Georgia") || awayTeam.shortName.includes("Georgia")) ||
      (homeTeam.shortName.includes("Alabama") || awayTeam.shortName.includes("Alabama")) ||
      (homeTeam.shortName.includes("Mississippi") || awayTeam.shortName.includes("Mississippi")) ||
      (homeTeam.shortName.includes("South Carolina") || awayTeam.shortName.includes("South Carolina"))
    ) {
      return "FOX Sports South";
    } else if (
      (homeTeam.shortName.includes("Tennessee") || awayTeam.shortName.includes("Tennessee")) ||
      (homeTeam.shortName.includes("North Carolina") || awayTeam.shortName.includes("North Carolina"))
    ) {
      return "FOX Sports Southeast";
    }
  }
  
  if (regions.includes("Midwest")) {
    if (homeTeam.shortName.includes("Michigan") || awayTeam.shortName.includes("Michigan")) {
      return "FOX Sports Detroit";
    } else if (homeTeam.shortName.includes("Indiana") || awayTeam.shortName.includes("Indiana")) {
      return "FOX Sports Indiana";
    } else if (
      (homeTeam.shortName.includes("Minnesota") || awayTeam.shortName.includes("Minnesota")) ||
      (homeTeam.shortName.includes("Wisconsin") || awayTeam.shortName.includes("Wisconsin"))
    ) {
      return "FOX Sports North";
    } else if (
      (homeTeam.shortName.includes("Ohio") || awayTeam.shortName.includes("Ohio")) ||
      (homeTeam.shortName.includes("Cincinnati") || awayTeam.shortName.includes("Cincinnati"))
    ) {
      return "FOX Sports Ohio";
    } else if (
      (homeTeam.shortName.includes("Missouri") || awayTeam.shortName.includes("Missouri")) || 
      (homeTeam.shortName.includes("Illinois") || awayTeam.shortName.includes("Illinois")) ||
      (homeTeam.shortName.includes("Iowa") || awayTeam.shortName.includes("Iowa"))
    ) {
      return "FOX Sports Midwest";
    }
  }
  
  if (regions.includes("Central")) {
    if (
      (homeTeam.shortName.includes("Kansas") || awayTeam.shortName.includes("Kansas")) ||
      (homeTeam.shortName.includes("Nebraska") || awayTeam.shortName.includes("Nebraska"))
    ) {
      return "FOX Sports Kansas City";
    } else if (homeTeam.shortName.includes("Oklahoma") || awayTeam.shortName.includes("Oklahoma")) {
      return "FOX Sports Oklahoma";
    } else if (
      (homeTeam.shortName.includes("Texas") || awayTeam.shortName.includes("Texas")) ||
      (homeTeam.shortName.includes("Arkansas") || awayTeam.shortName.includes("Arkansas")) ||
      (homeTeam.shortName.includes("Louisiana") || awayTeam.shortName.includes("Louisiana"))
    ) {
      return "FOX Sports Southwest";
    }
  }
  
  // Default fallback
  return "Regional Sports Network";
}

// Function to determine if a game should be nationally televised
export function shouldBeNationallyTelevised(homeTeamId: number, awayTeamId: number): boolean {
  const homeTeam = collegeTeams.find(team => team.id === homeTeamId);
  const awayTeam = collegeTeams.find(team => team.id === awayTeamId);
  
  if (!homeTeam || !awayTeam) return false;
  
  // Top 25 ranked teams should be nationally televised (we'll use team IDs 1-25 as our "ranked" teams)
  if (homeTeamId <= 25 && awayTeamId <= 25) return true;
  
  // Rivalry games
  const rivalries = [
    // Famous college basketball rivalries
    [1, 2],   // Duke vs North Carolina
    [30, 31], // Michigan vs Michigan State
    [32, 33], // Ohio State vs Purdue
    [44, 52], // Kansas vs Kansas State
    [16, 27], // Kentucky vs Georgia
    [54, 58], // UCLA vs USC
    [19, 20]  // Auburn vs Alabama
  ];
  
  return rivalries.some(
    ([teamA, teamB]) => 
      (homeTeamId === teamA && awayTeamId === teamB) || 
      (homeTeamId === teamB && awayTeamId === teamA)
  );
}

// Function to get a national TV network
export function getNationalTVNetwork(): string {
  const networks = ["ABC", "CBS", "ESPN", "FOX"];
  return networks[Math.floor(Math.random() * networks.length)];
}

// Function to generate random matchups
export function generateRandomMatchups(count: number = 8): Array<{
  homeTeamId: number,
  awayTeamId: number,
  status: string,
  homeScore?: number,
  awayScore?: number,
  network: string,
  nationally: boolean
}> {
  const matchups = [];
  const usedTeams = new Set<number>();
  
  // Different statuses for games
  const statuses = ["Final", "2nd Half", "1st Half", "Halftime", "8:00 PM", "9:00 PM", "7:30 PM"];
  
  for (let i = 0; i < count; i++) {
    // Get random teams that haven't been used yet
    let homeTeamId: number;
    let awayTeamId: number;
    
    do {
      homeTeamId = Math.floor(Math.random() * collegeTeams.length) + 1;
    } while (usedTeams.has(homeTeamId));
    usedTeams.add(homeTeamId);
    
    do {
      awayTeamId = Math.floor(Math.random() * collegeTeams.length) + 1;
    } while (usedTeams.has(awayTeamId) || homeTeamId === awayTeamId);
    usedTeams.add(awayTeamId);
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const nationally = shouldBeNationallyTelevised(homeTeamId, awayTeamId);
    
    const matchup: any = {
      homeTeamId,
      awayTeamId,
      status,
      network: nationally ? getNationalTVNetwork() : getRegionalNetwork(homeTeamId, awayTeamId),
      nationally
    };
    
    // Add scores if the game has started or is complete
    if (status === "Final" || status === "2nd Half" || status === "1st Half" || status === "Halftime") {
      matchup.homeScore = Math.floor(Math.random() * 50) + 30; // 30-79
      matchup.awayScore = Math.floor(Math.random() * 50) + 30; // 30-79
      
      // Make sure there's a difference for final games
      if (status === "Final" && matchup.homeScore === matchup.awayScore) {
        matchup.homeScore += Math.floor(Math.random() * 10) + 1;
      }
    }
    
    matchups.push(matchup);
  }
  
  return matchups;
}