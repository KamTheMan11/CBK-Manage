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

  // Former Big East Teams (Now Pac-12)
  { id: 54, name: "Villanova Wildcats", shortName: "Villanova", nickname: "Wildcats", primaryColor: "#00205B", secondaryColor: "#13B5EA", conferenceId: 5 },
  { id: 55, name: "Creighton Bluejays", shortName: "Creighton", nickname: "Bluejays", primaryColor: "#002E6D", secondaryColor: "#0080FF", conferenceId: 5 },
  { id: 56, name: "Xavier Musketeers", shortName: "Xavier", nickname: "Musketeers", primaryColor: "#0C2340", secondaryColor: "#9EA2A2", conferenceId: 5 },
  { id: 57, name: "Seton Hall Pirates", shortName: "Seton Hall", nickname: "Pirates", primaryColor: "#004488", secondaryColor: "#A2AAAD", conferenceId: 5 },
  { id: 58, name: "Butler Bulldogs", shortName: "Butler", nickname: "Bulldogs", primaryColor: "#13294B", secondaryColor: "#A7A9AC", conferenceId: 5 },
  { id: 59, name: "Providence Friars", shortName: "Providence", nickname: "Friars", primaryColor: "#000000", secondaryColor: "#C4CED4", conferenceId: 5 },
  { id: 60, name: "Marquette Golden Eagles", shortName: "Marquette", nickname: "Golden Eagles", primaryColor: "#003366", secondaryColor: "#FFCC00", conferenceId: 5 },
  { id: 61, name: "St. John's Red Storm", shortName: "St. John's", nickname: "Red Storm", primaryColor: "#BA0C2F", secondaryColor: "#FFFFFF", conferenceId: 5 },
  { id: 62, name: "Georgetown Hoyas", shortName: "Georgetown", nickname: "Hoyas", primaryColor: "#041E42", secondaryColor: "#A7A8AA", conferenceId: 5 },
  { id: 63, name: "DePaul Blue Demons", shortName: "DePaul", nickname: "Blue Demons", primaryColor: "#003DA5", secondaryColor: "#E31837", conferenceId: 5 },

  // Big East Teams (Current)
  { id: 66, name: "UConn Huskies", shortName: "UConn", nickname: "Huskies", primaryColor: "#000E2F", secondaryColor: "#E4002B", conferenceId: 6 },
  { id: 67, name: "Creighton Bluejays", shortName: "Creighton", nickname: "Bluejays", primaryColor: "#002E6D", secondaryColor: "#0080FF", conferenceId: 6 },
  { id: 68, name: "Xavier Musketeers", shortName: "Xavier", nickname: "Musketeers", primaryColor: "#0C2340", secondaryColor: "#9EA2A2", conferenceId: 6 },
  { id: 69, name: "Seton Hall Pirates", shortName: "Seton Hall", nickname: "Pirates", primaryColor: "#004488", secondaryColor: "#A2AAAD", conferenceId: 6 },
  { id: 70, name: "Butler Bulldogs", shortName: "Butler", nickname: "Bulldogs", primaryColor: "#13294B", secondaryColor: "#A7A9AC", conferenceId: 6 },
  { id: 71, name: "Providence Friars", shortName: "Providence", nickname: "Friars", primaryColor: "#000000", secondaryColor: "#C4CED4", conferenceId: 6 },
  { id: 72, name: "Marquette Golden Eagles", shortName: "Marquette", nickname: "Golden Eagles", primaryColor: "#003366", secondaryColor: "#FFCC00", conferenceId: 6 },
  { id: 73, name: "St. John's Red Storm", shortName: "St. John's", nickname: "Red Storm", primaryColor: "#BA0C2F", secondaryColor: "#FFFFFF", conferenceId: 6 },
  { id: 74, name: "Georgetown Hoyas", shortName: "Georgetown", nickname: "Hoyas", primaryColor: "#041E42", secondaryColor: "#A7A8AA", conferenceId: 6 },
  { id: 75, name: "Villanova Wildcats", shortName: "Villanova", nickname: "Wildcats", primaryColor: "#00205B", secondaryColor: "#13B5EA", conferenceId: 6 },

  // American Athletic Conference (AAC) Teams
  { id: 76, name: "Houston Cougars", shortName: "Houston", nickname: "Cougars", primaryColor: "#C8102E", secondaryColor: "#76232F", conferenceId: 7 },
  { id: 77, name: "Memphis Tigers", shortName: "Memphis", nickname: "Tigers", primaryColor: "#003087", secondaryColor: "#8A8D8F", conferenceId: 7 },
  { id: 78, name: "Wichita State Shockers", shortName: "Wichita State", nickname: "Shockers", primaryColor: "#000000", secondaryColor: "#FFCD00", conferenceId: 7 },
  { id: 79, name: "Cincinnati Bearcats", shortName: "Cincinnati", nickname: "Bearcats", primaryColor: "#000000", secondaryColor: "#E00122", conferenceId: 7 },
  { id: 80, name: "SMU Mustangs", shortName: "SMU", nickname: "Mustangs", primaryColor: "#0033A0", secondaryColor: "#C8102E", conferenceId: 7 },
  { id: 81, name: "UCF Knights", shortName: "UCF", nickname: "Knights", primaryColor: "#000000", secondaryColor: "#BA9B37", conferenceId: 7 },
  { id: 82, name: "Tulsa Golden Hurricane", shortName: "Tulsa", nickname: "Golden Hurricane", primaryColor: "#002D72", secondaryColor: "#C8102E", conferenceId: 7 },
  { id: 83, name: "Temple Owls", shortName: "Temple", nickname: "Owls", primaryColor: "#9D2235", secondaryColor: "#FFCD00", conferenceId: 7 },
  { id: 84, name: "East Carolina Pirates", shortName: "East Carolina", nickname: "Pirates", primaryColor: "#592A8A", secondaryColor: "#FDC82F", conferenceId: 7 },
  { id: 85, name: "Tulane Green Wave", shortName: "Tulane", nickname: "Green Wave", primaryColor: "#006747", secondaryColor: "#418FDE", conferenceId: 7 },
  { id: 86, name: "South Florida Bulls", shortName: "South Florida", nickname: "Bulls", primaryColor: "#006747", secondaryColor: "#CFC493", conferenceId: 7 },

  // Mountain West Conference (MWC) Teams
  { id: 87, name: "San Diego State Aztecs", shortName: "San Diego State", nickname: "Aztecs", primaryColor: "#A6192E", secondaryColor: "#000000", conferenceId: 8 },
  { id: 88, name: "UNLV Runnin' Rebels", shortName: "UNLV", nickname: "Runnin' Rebels", primaryColor: "#CF0A2C", secondaryColor: "#231F20", conferenceId: 8 },
  { id: 89, name: "Utah State Aggies", shortName: "Utah State", nickname: "Aggies", primaryColor: "#00263A", secondaryColor: "#8A8D8F", conferenceId: 8 },
  { id: 90, name: "Boise State Broncos", shortName: "Boise State", nickname: "Broncos", primaryColor: "#0033A0", secondaryColor: "#D64309", conferenceId: 8 },
  { id: 91, name: "Nevada Wolf Pack", shortName: "Nevada", nickname: "Wolf Pack", primaryColor: "#003366", secondaryColor: "#807F84", conferenceId: 8 },
  { id: 92, name: "Colorado State Rams", shortName: "Colorado State", nickname: "Rams", primaryColor: "#1E4D2B", secondaryColor: "#C8C372", conferenceId: 8 },
  { id: 93, name: "Fresno State Bulldogs", shortName: "Fresno State", nickname: "Bulldogs", primaryColor: "#DB0032", secondaryColor: "#231F20", conferenceId: 8 },
  { id: 94, name: "Wyoming Cowboys", shortName: "Wyoming", nickname: "Cowboys", primaryColor: "#492F24", secondaryColor: "#FFC425", conferenceId: 8 },
  { id: 95, name: "New Mexico Lobos", shortName: "New Mexico", nickname: "Lobos", primaryColor: "#BA0C2F", secondaryColor: "#63666A", conferenceId: 8 },
  { id: 96, name: "Air Force Falcons", shortName: "Air Force", nickname: "Falcons", primaryColor: "#0033A0", secondaryColor: "#A5A9AD", conferenceId: 8 },
  { id: 97, name: "San Jose State Spartans", shortName: "San Jose State", nickname: "Spartans", primaryColor: "#0055A2", secondaryColor: "#E5A823", conferenceId: 8 },

  // Mid-American Conference (MAC) Teams
  { id: 98, name: "Buffalo Bulls", shortName: "Buffalo", nickname: "Bulls", primaryColor: "#005BBB", secondaryColor: "#FFFFFF", conferenceId: 11 },
  { id: 99, name: "Akron Zips", shortName: "Akron", nickname: "Zips", primaryColor: "#00285E", secondaryColor: "#84754E", conferenceId: 11 },
  { id: 100, name: "Toledo Rockets", shortName: "Toledo", nickname: "Rockets", primaryColor: "#00338D", secondaryColor: "#FFCC80", conferenceId: 11 },
  { id: 101, name: "Kent State Golden Flashes", shortName: "Kent State", nickname: "Golden Flashes", primaryColor: "#002664", secondaryColor: "#EAAB00", conferenceId: 11 },
  { id: 102, name: "Ohio Bobcats", shortName: "Ohio", nickname: "Bobcats", primaryColor: "#00694E", secondaryColor: "#CDA077", conferenceId: 11 },
  { id: 103, name: "Ball State Cardinals", shortName: "Ball State", nickname: "Cardinals", primaryColor: "#BA0C2F", secondaryColor: "#FFFFFF", conferenceId: 11 },
  { id: 104, name: "Bowling Green Falcons", shortName: "Bowling Green", nickname: "Falcons", primaryColor: "#4F2C1D", secondaryColor: "#FF7300", conferenceId: 11 },
  { id: 105, name: "Miami (OH) RedHawks", shortName: "Miami (OH)", nickname: "RedHawks", primaryColor: "#B61E2E", secondaryColor: "#000000", conferenceId: 11 },
  { id: 106, name: "Northern Illinois Huskies", shortName: "Northern Illinois", nickname: "Huskies", primaryColor: "#BA0C2F", secondaryColor: "#000000", conferenceId: 11 },
  { id: 107, name: "Central Michigan Chippewas", shortName: "Central Michigan", nickname: "Chippewas", primaryColor: "#6A0032", secondaryColor: "#FFC82E", conferenceId: 11 },
  { id: 108, name: "Western Michigan Broncos", shortName: "Western Michigan", nickname: "Broncos", primaryColor: "#6C4023", secondaryColor: "#B59966", conferenceId: 11 },
  { id: 109, name: "Eastern Michigan Eagles", shortName: "Eastern Michigan", nickname: "Eagles", primaryColor: "#046A38", secondaryColor: "#FFFFFF", conferenceId: 11 },

  // Former CUSA Teams (Now MAC)
  { id: 110, name: "UAB Blazers", shortName: "UAB", nickname: "Blazers", primaryColor: "#00594C", secondaryColor: "#F4C300", conferenceId: 11 },
  { id: 111, name: "Western Kentucky Hilltoppers", shortName: "Western Kentucky", nickname: "Hilltoppers", primaryColor: "#C8102E", secondaryColor: "#FFFFFF", conferenceId: 11 },
  { id: 112, name: "UTSA Roadrunners", shortName: "UTSA", nickname: "Roadrunners", primaryColor: "#002A5C", secondaryColor: "#E74A25", conferenceId: 11 },
  { id: 113, name: "North Texas Mean Green", shortName: "North Texas", nickname: "Mean Green", primaryColor: "#00853E", secondaryColor: "#FFFFFF", conferenceId: 11 },
  { id: 114, name: "Marshall Thundering Herd", shortName: "Marshall", nickname: "Thundering Herd", primaryColor: "#00B140", secondaryColor: "#000000", conferenceId: 11 },
  { id: 115, name: "Rice Owls", shortName: "Rice", nickname: "Owls", primaryColor: "#00205B", secondaryColor: "#C1C6C8", conferenceId: 11 },
  { id: 116, name: "Middle Tennessee Blue Raiders", shortName: "Middle Tennessee", nickname: "Blue Raiders", primaryColor: "#0066CC", secondaryColor: "#000000", conferenceId: 11 },
  { id: 117, name: "Charlotte 49ers", shortName: "Charlotte", nickname: "49ers", primaryColor: "#046A38", secondaryColor: "#B5A268", conferenceId: 11 },
  { id: 118, name: "Louisiana Tech Bulldogs", shortName: "Louisiana Tech", nickname: "Bulldogs", primaryColor: "#002F8B", secondaryColor: "#E31B23", conferenceId: 11 },
  { id: 119, name: "UTEP Miners", shortName: "UTEP", nickname: "Miners", primaryColor: "#041E42", secondaryColor: "#FF8200", conferenceId: 11 },
  { id: 120, name: "Florida Atlantic Owls", shortName: "Florida Atlantic", nickname: "Owls", primaryColor: "#003366", secondaryColor: "#CC0000", conferenceId: 11 },
  { id: 121, name: "Florida International Panthers", shortName: "FIU", nickname: "Panthers", primaryColor: "#081E3F", secondaryColor: "#B6862C", conferenceId: 11 },
  { id: 122, name: "Old Dominion Monarchs", shortName: "Old Dominion", nickname: "Monarchs", primaryColor: "#003057", secondaryColor: "#7C878E", conferenceId: 11 },
  { id: 123, name: "Southern Miss Golden Eagles", shortName: "Southern Miss", nickname: "Golden Eagles", primaryColor: "#000000", secondaryColor: "#FFC637", conferenceId: 11 },
];

// Current Top 25 Rankings and records
export const rankings = [
  { id: 18, rank: 1, wins: 36, losses: 4, points: 775, trend: 2, shortName: "FLA", firstPlaceVotes: 31 }, // Florida
  { id: 76, rank: 2, wins: 35, losses: 5, points: 744, trend: 0, shortName: "HOU" }, // Houston
  { id: 1, rank: 3, wins: 35, losses: 4, points: 706, trend: 2, shortName: "DUKE" }, // Duke
  { id: 19, rank: 4, wins: 32, losses: 6, points: 689, trend: 0, shortName: "AUB" }, // Auburn
  { id: 17, rank: 5, wins: 30, losses: 8, points: 621, trend: 1, shortName: "TENN" }, // Tennessee
  { id: 20, rank: 6, wins: 28, losses: 9, points: 610, trend: 2, shortName: "ALA" }, // Alabama
  { id: 31, rank: 7, wins: 30, losses: 7, points: 593, trend: 0, shortName: "MSU" }, // Michigan State
  { id: 48, rank: 8, wins: 28, losses: 9, points: 582, trend: 1, shortName: "TTU" }, // Texas Tech
  { id: 38, rank: 9, wins: 27, losses: 9, points: 469, trend: 3, shortName: "MD" }, // Maryland
  { id: 61, rank: 10, wins: 31, losses: 5, points: 436, trend: 5, shortName: "SJU" }, // St. John's
  { id: 30, rank: 11, wins: 27, losses: 10, points: 427, trend: 4, shortName: "MICH" }, // Michigan
  { id: 33, rank: 12, wins: 24, losses: 12, points: 384, trend: 10, shortName: "PUR" }, // Purdue
  { id: 9, rank: 13, wins: 24, losses: 13, points: 353, trend: 7, shortName: "ARIZ" }, // Arizona
  { id: 16, rank: 14, wins: 24, losses: 12, points: 330, trend: 7, shortName: "UK" }, // Kentucky
  { id: 13, rank: 15, wins: 26, losses: 10, points: 316, trend: 2, shortName: "BYU" }, // BYU
  { id: 34, rank: 16, wins: 27, losses: 10, points: 315, trend: 6, shortName: "WIS" }, // Wisconsin
  { id: 51, rank: 17, wins: 25, losses: 10, points: 280, trend: 3, shortName: "ISU" }, // Iowa State
  { id: 22, rank: 18, wins: 24, losses: 12, points: 214, trend: 8, shortName: "MISS" }, // Ole Miss
  { id: 24, rank: 19, wins: 23, losses: 11, points: 195, trend: 1, shortName: "TA&M" }, // Texas A&M
  { id: 14, rank: 20, wins: 26, losses: 9, points: 155, trend: 3, shortName: "GONZ" }, // Gonzaga
  { id: 4, rank: 21, wins: 27, losses: 8, points: 146, trend: 10, shortName: "LOU" }, // Louisville
  { id: 12, rank: 22, wins: 29, losses: 6, points: 97, trend: 3, shortName: "SMC" }, // Saint Mary's
  { id: 7, rank: 23, wins: 27, losses: 7, points: 95, trend: 10, shortName: "CLEM" }, // Clemson
  { id: 55, rank: 24, wins: 25, losses: 11, points: 90, trend: 2, shortName: "CREI" }, // Creighton
  { id: 21, rank: 25, wins: 22, losses: 14, points: 84, trend: 1, shortName: "ARK" } // Arkansas
];

// Others receiving votes with points
export const othersReceivingVotes = [
  { name: "Memphis", points: 63 },
  { name: "Drake", points: 52 },
  { name: "Illinois", points: 49 },
  { name: "UConn", points: 41 },
  { name: "Oregon", points: 40 },
  { name: "Missouri", points: 33 },
  { name: "UCLA", points: 33 },
  { name: "Marquette", points: 18 },
  { name: "New Mexico", points: 11 },
  { name: "Colorado State", points: 9 },
  { name: "UC San Diego", points: 7 },
  { name: "Kansas", points: 6 },
  { name: "Baylor", points: 6 },
  { name: "McNeese", points: 1 }
];

// Teams that dropped from rankings
export const droppedFromRankings = [
  { name: "Memphis", prevRank: 16 },
  { name: "Missouri", prevRank: 24 },
  { name: "Marquette", prevRank: 25 }
];

// Get team ranking
export const getTeamRanking = (teamId: number): number | null => {
  const rank = rankings.find(r => r.id === teamId)?.rank;
  return rank || null;
};

// Helper function to get regional TV network based on teams and conference regions
export function getRegionalNetwork(homeTeamId: number, awayTeamId: number): string {
  const homeTeam = collegeTeams.find(team => team.id === homeTeamId);
  const awayTeam = collegeTeams.find(team => team.id === awayTeamId);

  if (!homeTeam || !awayTeam) return "Local TV";

  const homeConference = conferences.find(conf => conf.id === homeTeam.conferenceId);
  const awayConference = conferences.find(conf => conf.id === awayTeam.conferenceId);

  if (!homeConference || !awayConference) return "Local TV";

  // Random chance to get The CW network
  const isCW = Math.random() < 0.15; // 15% chance for a game to be on The CW
  if (isCW) {
    return "The CW";
  }

  // Logic for determining the appropriate Fox Sports regional network
  const regions = [homeConference.region, awayConference.region];

  // Southeast and South region
  if (regions.includes("Southeast") || regions.includes("South")) {
    if (homeTeam.shortName.includes("Florida") || awayTeam.shortName.includes("Florida") ||
        homeTeam.shortName.includes("Miami") || awayTeam.shortName.includes("Miami")) {
      // FL teams get either FOX Sports Florida or FOX Sports Sun
      return Math.random() > 0.5 ? "FOX Sports Florida" : "FOX Sports Sun";
    } else if (
      (homeTeam.shortName.includes("Georgia") || awayTeam.shortName.includes("Georgia")) ||
      (homeTeam.shortName.includes("Alabama") || awayTeam.shortName.includes("Alabama")) ||
      (homeTeam.shortName.includes("Mississippi") || awayTeam.shortName.includes("Mississippi")) ||
      (homeTeam.shortName.includes("South Carolina") || awayTeam.shortName.includes("South Carolina"))
    ) {
      return "FOX Sports South";
    } else if (
      (homeTeam.shortName.includes("Tennessee") || awayTeam.shortName.includes("Tennessee"))
    ) {
      return "FOX Sports Tennessee";
    } else if (
      (homeTeam.shortName.includes("North Carolina") || awayTeam.shortName.includes("North Carolina"))
    ) {
      return "FOX Sports Carolinas";
    } else if (
      (homeTeam.shortName.includes("Louisiana") || awayTeam.shortName.includes("Louisiana"))
    ) {
      return "FOX Sports New Orleans";
    } else {
      return "FOX Sports Southeast";
    }
  }

  // Midwest region
  if (regions.includes("Midwest")) {
    if (homeTeam.shortName.includes("Michigan") || awayTeam.shortName.includes("Michigan")) {
      // Michigan teams get either FOX Sports Detroit or FOX Sports Detroit Plus
      return Math.random() > 0.3 ? "FOX Sports Detroit" : "FOX Sports Detroit Plus";
    } else if (homeTeam.shortName.includes("Indiana") || awayTeam.shortName.includes("Indiana")) {
      return "FOX Sports Indiana";
    } else if (
      (homeTeam.shortName.includes("Minnesota") || awayTeam.shortName.includes("Minnesota")) ||
      (homeTeam.shortName.includes("Wisconsin") || awayTeam.shortName.includes("Wisconsin"))
    ) {
      return homeTeam.shortName.includes("Wisconsin") || awayTeam.shortName.includes("Wisconsin") 
        ? "FOX Sports Wisconsin" : "FOX Sports North";
    } else if (
      (homeTeam.shortName.includes("Ohio") || awayTeam.shortName.includes("Ohio")) ||
      (homeTeam.shortName.includes("Cincinnati") || awayTeam.shortName.includes("Cincinnati"))
    ) {
      // Ohio teams get either FOX Sports Ohio or SportsTime Ohio
      return Math.random() > 0.5 ? "FOX Sports Ohio" : "SportsTime Ohio";
    } else if (
      (homeTeam.shortName.includes("Missouri") || awayTeam.shortName.includes("Missouri")) || 
      (homeTeam.shortName.includes("Illinois") || awayTeam.shortName.includes("Illinois")) ||
      (homeTeam.shortName.includes("Iowa") || awayTeam.shortName.includes("Iowa"))
    ) {
      return "FOX Sports Midwest";
    }
  }

  // Central region
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
      (homeTeam.shortName.includes("Arkansas") || awayTeam.shortName.includes("Arkansas"))
    ) {
      return "FOX Sports Southwest";
    }
  }

  // West region
  if (regions.includes("West")) {
    if (
      (homeTeam.shortName.includes("Arizona") || awayTeam.shortName.includes("Arizona"))
    ) {
      return "FOX Sports Arizona";
    } else if (
      (homeTeam.shortName.includes("Utah") || awayTeam.shortName.includes("Utah"))
    ) {
      return "FOX Sports Utah";
    } else if (
      (homeTeam.shortName.includes("Colorado") || awayTeam.shortName.includes("Colorado")) ||
      (homeTeam.shortName.includes("Wyoming") || awayTeam.shortName.includes("Wyoming"))
    ) {
      return "FOX Sports Rocky Mountain";
    } else if (
      (homeTeam.shortName.includes("San Diego") || awayTeam.shortName.includes("San Diego"))
    ) {
      return "FOX Sports San Diego";
    } else if (
      (homeTeam.shortName.includes("California") || awayTeam.shortName.includes("California")) ||
      (homeTeam.shortName.includes("UCLA") || awayTeam.shortName.includes("UCLA")) ||
      (homeTeam.shortName.includes("USC") || awayTeam.shortName.includes("USC")) ||
      (homeTeam.shortName.includes("Stanford") || awayTeam.shortName.includes("Stanford"))
    ) {
      return "FOX Sports West";
    } else if (
      (homeTeam.shortName.includes("Washington") || awayTeam.shortName.includes("Washington")) ||
      (homeTeam.shortName.includes("Oregon") || awayTeam.shortName.includes("Oregon"))
    ) {
      return "FOX Sports Northwest";
    } else if (
      (homeTeam.shortName.includes("New Mexico") || awayTeam.shortName.includes("New Mexico"))
    ) {
      // New Mexico teams randomly get one of several regional networks
      const possibleNetworks = ["FOX Sports Arizona", "FOX Sports Rocky Mountain", "FOX Sports Southwest"];
      return possibleNetworks[Math.floor(Math.random() * possibleNetworks.length)];
    }
  }

  // East and Northeast region
  if (regions.includes("East") || regions.includes("Northeast")) {
    if (
      (homeTeam.shortName.includes("New York") || awayTeam.shortName.includes("New York")) ||
      (homeTeam.shortName.includes("St. John's") || awayTeam.shortName.includes("St. John's"))
    ) {
      return "FOX Sports New York";
    } else if (
      (homeTeam.shortName.includes("Boston") || awayTeam.shortName.includes("Boston")) ||
      (homeTeam.shortName.includes("Connecticut") || awayTeam.shortName.includes("Connecticut"))
    ) {
      return "FOX Sports Atlantic";
    } else if (
      (homeTeam.shortName.includes("Pittsburgh") || awayTeam.shortName.includes("Pittsburgh")) ||
      (homeTeam.shortName.includes("Penn State") || awayTeam.shortName.includes("Penn State"))
    ) {
      return "FOX Sports Pittsburgh";
    }
  }

  // Default fallback based on home team's conference region
  if (homeConference.region === "Southeast" || homeConference.region === "South") {
    return "FOX Sports South";
  } else if (homeConference.region === "Midwest") {
    return "FOX Sports Midwest";
  } else if (homeConference.region === "Central") {
    return "FOX Sports Central";
  } else if (homeConference.region === "West") {
    return "FOX Sports Pacific";
  } else if (homeConference.region === "East" || homeConference.region === "Northeast") {
    return "FOX Sports Atlantic";
  }

  // Final fallback
  return "Regional Sports Network";
}

// Function to determine if a game should be nationally televised
export function shouldBeNationallyTelevised(homeTeamId: number, awayTeamId: number): boolean {
  const homeTeam = collegeTeams.find(team => team.id === homeTeamId);
  const awayTeam = collegeTeams.find(team => team.id === awayTeamId);

  if (!homeTeam || !awayTeam) return false;

  // Top 25 ranked teams should be nationally televised (we'll use team IDs 1-25 as our "ranked" teams)
  if (getTeamRanking(homeTeamId) <= 25 && getTeamRanking(awayTeamId) <= 25) return true;

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

  // Different statuses for games - with limited late games (only ~9% chance for 9:00 PM starts)
  const statuses = ["Final", "2nd Half", "1st Half", "Halftime", "7:00 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:00 PM", "8:30 PM", "9:00 PM"];

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
      // Different score ranges based on game status
      if (status === "Final" || status === "2nd Half") {
        // Final or 2nd half score range (50-85)
        matchup.homeScore = Math.floor(Math.random() * 36) + 50;
        matchup.awayScore = Math.floor(Math.random() * 36) + 50;
      } else {
        // 1st half or halftime score range (22-45) - ensures teams don't exceed 50 at halftime
        matchup.homeScore = Math.floor(Math.random() * 24) + 22;
        matchup.awayScore = Math.floor(Math.random() * 24) + 22;
      }

      // Make sure there's a difference for final games
      if (status === "Final" && matchup.homeScore === matchup.awayScore) {
        matchup.homeScore += Math.floor(Math.random() * 10) + 1;
      }
    }

    matchups.push(matchup);
  }

  return matchups;
}