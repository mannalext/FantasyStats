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
  seasonId: number;
  sleeperSeasonId: string;
  leagueId: number;
  year: number;

  constructor(seasonId: number, sleeperSeasonId: string, leagueId: number, year: number) {
    super(seasonId, leagueId, year);
    this.seasonId = seasonId;
    this.sleeperSeasonId = sleeperSeasonId;
    this.leagueId = leagueId;
    this.year = year;
  }
}
