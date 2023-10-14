export class Season {
  id: number;
  leagueId: number;
  year: number;

  constructor(id: number, leagueId: number, year: number) {
    this.id = id;
    this.leagueId = leagueId;
    this.year = year;
  }
}

export class SleeperSeason extends Season {
  id: number;
  sleeperLeagueId: string;
  leagueId: number;
  year: number;

  constructor(id: number, sleeperLeagueId: string, leagueId: number, year: number) {
    super(id, leagueId, year);
    this.id = id;
    this.sleeperLeagueId = sleeperLeagueId;
    this.leagueId = leagueId;
    this.year = year;
  }
}

export class SleeperSeasonEntityRelation {
  seasonId: number;
  sleeperLeagueId: string;

  constructor(seasonId: number, sleeperLeagueId: string) {
    this.seasonId = seasonId;
    this.sleeperLeagueId = sleeperLeagueId;
  }
}
