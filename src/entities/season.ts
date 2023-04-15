export class Season {
  id: number;
  leagueId: number;
  year: number;

  constructor(id: number, leagueId: number, year: number) {
    this.id = id;
    (this.leagueId = leagueId), (this.year = year);
  }
}

export class SeasonEntity extends Season {
  constructor(id: number, leagueId: number, year: number) {
    super(id, leagueId, year);
  }
}
