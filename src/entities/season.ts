interface ISeason {
  id: number,
  leagueId: number,
  year: number,
}

export class Season implements ISeason {
  readonly id: number;
  readonly leagueId: number;
  readonly year: number;

  constructor({
    id,
    leagueId,
    year,
  }: ISeason) {
    this.id = id;
    this.leagueId = leagueId,
    this.year = year;
  }
}