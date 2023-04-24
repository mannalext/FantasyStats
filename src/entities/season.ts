export class Season {
  id: number;
  leagueId: number;
  sleeperLeagueId?: string | null;
  year: number;

  constructor(id: number, leagueId: number, year: number, sleeperLeagueId?: string | null) {
    this.id = id;
    this.leagueId = leagueId;
    this.sleeperLeagueId = sleeperLeagueId;
    this.year = year;
  }
}

export class SeasonEntity extends Season {
  constructor(id: number, leagueId: number, year: number, sleeperLeagueId?: string | null) {
    super(id, leagueId, year, sleeperLeagueId);
  }
}
